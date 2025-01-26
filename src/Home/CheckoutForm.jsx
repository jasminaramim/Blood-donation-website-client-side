import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import useAxiosSecure from "../Hoooks/useAxiosSecure";
import useAuth from "../Hoooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ cartItems }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const totalPrice = (cartItems || []).reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => {
                    console.log('Error fetching client secret:', err);
                });
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            console.log('Stripe or Elements are not ready');
            setError('Payment processing is not ready. Please try again.');
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            },
        });

        if (confirmError) {
            setError(confirmError.message);
        } else {
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);
                const donation = {
                    email: user.email,
                    amount: totalPrice,
                    transactionId: paymentIntent.id,
                    status: 'success',
                    date: new Date(),
                };

                try {
                    const res = await axiosSecure.post('/donate', donation);
                    if (res.data?.donationResult?.insertedId) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Thank you for your donation!',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        navigate('/dashboard/paymentHistory');
                    }
                } catch (err) {
                    console.error('Error saving donation:', err);
                }
            }
        }
    };

    const handleCardChange = (event) => {
        if (event.complete) {
            setError(''); // Clear any previous error when the card number is complete
        } else {
            setError('Your card number is incomplete');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
                onChange={handleCardChange}
            />
            <button
                className="btn btn-sm btn-primary my-4"
                type="submit"
                disabled={!stripe || !elements || !clientSecret || error}
            >
                Donate
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600">Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;
