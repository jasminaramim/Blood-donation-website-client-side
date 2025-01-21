import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItems'
import { BsGraphUp } from 'react-icons/bs'
import { MdOutlineBloodtype } from "react-icons/md";
import { TbArrowAutofitContentFilled } from "react-icons/tb";
const AdminMenu = () => {
  return (
    <>
    
      <MenuItem icon={BsGraphUp} label='Statistics' address='/dashboard' />
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={MdOutlineBloodtype} label='All BloodDonate Request' address='all-blood-donation-request' />
      <MenuItem icon={ TbArrowAutofitContentFilled } label='Content Management' address='ContentManagementPage' />
    </>
  )
}

export default AdminMenu