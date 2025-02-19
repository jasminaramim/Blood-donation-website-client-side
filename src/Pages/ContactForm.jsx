import React, { useState } from "react";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendEmail = () => {
        const { name, email, message } = formData;
        const mailtoLink = `mailto:your-email@example.com?subject=New Message from ${name}&body=${encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;

        window.location.href = mailtoLink;
    };

    return (
        <div className="max-w-lg mt-16 mb-16  mx-auto bg-red-100 p-8 rounded-lg shadow-lg border border-red-400">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-center text-red-700 mb-6">
                    Get in Touch
                </h2>

                {/* Form */}
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        className="p-3 border border-red-300 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-red-500 w-full"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        className="p-3 border border-red-300 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-red-500 w-full"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <textarea
                        name="message"
                        rows="5"
                        placeholder="Your Message"
                        required
                        className="p-3 border border-red-300 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-red-500 w-full"
                        value={formData.message}
                        onChange={handleChange}
                    />

                    {/* Send Button */}
                    <button
                        onClick={handleSendEmail}
                        className="bg-red-600  hover:bg-red-700 text-white font-bold py-3 rounded-md transition-all"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
