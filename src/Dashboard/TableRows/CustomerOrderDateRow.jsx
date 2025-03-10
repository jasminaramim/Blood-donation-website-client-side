// import PropTypes from 'prop-types';
// import { useState } from 'react';
// import DeleteModal from '../../Modal/DeleteModal';

// const CustomerOrderDataRow = ({ order }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const closeModal = () => setIsOpen(false);

//   return (
//     <tr>
//       {/* Image */}
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <div className='flex items-center'>
//           <div className='flex-shrink-0'>
//             <div className='block relative'>
//               <img
//                 alt={order.name}
//                 src={order.imageUrl} // Use the order's imageUrl
//                 className='mx-auto object-cover rounded h-10 w-15 '
//               />
//             </div>
//           </div>
//         </div>
//       </td>

//       {/* Recipient Name */}
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900 whitespace-no-wrap'>{order.name}</p>
//       </td>

//       {/* Category */}
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900 whitespace-no-wrap'>{order.category}</p>
//       </td>

//       {/* Price */}
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900 whitespace-no-wrap'>${order.price}</p>
//       </td>

//       {/* Quantity */}
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900 whitespace-no-wrap'>{order.quantity}</p>
//       </td>

//       {/* Status */}
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900 whitespace-no-wrap'>{order.status}</p>
//       </td>

//       {/* Action Button */}
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <button
//           onClick={() => setIsOpen(true)}
//           className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight'
//         >
//           <span className='absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full'></span>
//           <span className='relative cursor-pointer'>Cancel</span>
//         </button>

//         {/* Delete Modal */}
//         <DeleteModal isOpen={isOpen} closeModal={closeModal} />
//       </td>
//     </tr>
//   );
// };

// CustomerOrderDataRow.propTypes = {
//   order: PropTypes.object.isRequired, // Ensure `order` is passed and is an object
// };

// export default CustomerOrderDataRow;
