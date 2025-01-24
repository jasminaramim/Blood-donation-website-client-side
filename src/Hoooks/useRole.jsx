import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';  
const useRole = () => {
    const axiosSecure = useAxiosSecure();  
    const { user, loading } = useAuth(); 

    const { data: role, isLoading, error } = useQuery({
        queryKey: ['role', user?.email],
        queryFn: async () => {
          const { data } = await axiosSecure(`/all-users/role/${user.email}`);
          return data;
        },
        enabled: !!user?.email,
        onError: (err) => console.error('Error fetching role:', err),
      });
      

    return [role, isLoading];
};

export default useRole;
