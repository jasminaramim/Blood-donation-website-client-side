import { BsFingerprint, BsPlusCircle } from 'react-icons/bs';  // Import the 'Plus' icon
import MenuItem from './MenuItems';  // Assuming MenuItem is a reusable component for displaying menu items
import { useState } from 'react';
import BecomeSellerModal from '../../../Modal/BecomeVolentiarModal';
import { MdDashboard } from "react-icons/md";
const DonorMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <MenuItem icon={MdDashboard} label="Dashboard" address="dashboard-donor" />

      {/* My Donation Requests Menu Item */}
      <MenuItem icon={BsFingerprint} label="My Donation Requests" address="My-donation-request" />
      
      {/* Create Donation Request Menu Item with Plus Icon */}
      <MenuItem icon={BsPlusCircle} label="Create Donation Request" address="add-blood" />
    
    </>
  );
};

export default DonorMenu;
