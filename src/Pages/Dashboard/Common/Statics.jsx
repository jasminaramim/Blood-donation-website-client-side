import { Helmet } from 'react-helmet-async';
import AdminStatistics from '../../../Dashboard/Statics/AdminStatics';
import useRole from '../../../Hoooks/useRole';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../../../Shared/LoadingSpinner';
import DonorDashboard from '../Customer/DonorDashboard';
import VolunteerDashboard from '../Volentiar/VolunteerDashboard';

const Statistics = () => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;
  if (!role) return <p>Unable to determine role. Please try again later.</p>;

  console.log('isLoading:', isLoading);
  console.log('Role:', role);

  // Ensure you're accessing the 'role' property of the object
  const userRole = role?.role;

  // Redirect if role is not 'admin' or 'donor'
  if (userRole !== 'admin' && userRole !== 'donor' && userRole !== 'volunteer') {
    return <Navigate to="/login" />; 
  }

  return (
    <>
      <Helmet>
        <title>{userRole === 'admin' ? 'Admin Dashboard' : 'Dashboard'}</title>
      </Helmet>

      {userRole === 'admin' && <AdminStatistics />}
      {userRole === 'donor' && <DonorDashboard />}
      {userRole === 'volunteer' && <VolunteerDashboard />}
    </>
  );
};

export default Statistics;
