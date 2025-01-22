import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';  

const useStatus = () => {
  const axiosSecure = useAxiosSecure();  
  const { user, loading } = useAuth(); 

  const { data: status, isLoading, error } = useQuery({
    queryKey: ['status', user?.email],
    queryFn: async () => {
  
      const { data } = await axiosSecure(`/all-users/status/${user.email}`);
      return data;  
    },
    enabled: !!user?.email,  
    onError: (err) => console.error('Error fetching status:', err),  // Error handling
  });

  return [status, isLoading, error]; 
};

export default useStatus;
