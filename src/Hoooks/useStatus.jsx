import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';  // Corrected import

const useStatus = () => {
  const axiosSecure = useAxiosSecure();  // Hook to make secure API calls
  const { user, loading } = useAuth();  // Hook to get the authenticated user

  const { data: status, isLoading, error } = useQuery({
    queryKey: ['status', user?.email],
    queryFn: async () => {
      // Make a request to fetch the status for the logged-in user
      const { data } = await axiosSecure(`/all-users/status/${user.email}`);
      return data;  // Assuming the API response contains the status
    },
    enabled: !!user?.email,  // Only fetch data if the user is authenticated
    onError: (err) => console.error('Error fetching status:', err),  // Error handling
  });

  return [status, isLoading, error];  // Return status data, loading state, and any errors
};

export default useStatus;
