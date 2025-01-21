import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { UserGroupIcon } from '@heroicons/react/outline'; // Import the Manage User Icon
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hoooks/useAxiosSecure'; // Your custom Axios hook
import useAuth from '../../../Hoooks/useAuth'; // Auth context for user details

const ManageUsers = () => {
  const { user } = useAuth(); // Get the logged-in user's details
  const axiosSecure = useAxiosSecure(); // Axios instance with token
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch all users with react-query
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axiosSecure('/all-users');
      return data;
    },
  });

  // Filter users based on status (if applicable)
  const filteredUsers = filter === 'all' ? users : users.filter(user => user.status === filter);

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // Handle actions for blocking, unblocking, and changing roles
  const handleStatusChange = async (userId, newStatus) => {
    try {
      await axiosSecure.put(`/users/status/${userId}`, { status: newStatus });
      alert(`User ${newStatus === 'active' ? 'unblocked' : 'blocked'}`);
    } catch (error) {
      console.error("Error changing status:", error);
      alert('Failed to change user status');
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axiosSecure.put(`/users/role/${userId}`, { role: newRole });
      alert(`User role changed to ${newRole}`);
    } catch (error) {
      console.error("Error changing role:", error);
      alert('Failed to change user role');
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <Helmet>
        <title>Manage Users</title>
      </Helmet>
      <div className="py-8">
        <h2 className="text-2xl font-semibold leading-tight text-red-600 flex items-center">
          <UserGroupIcon className="w-6 h-6 mr-2 text-red-600" /> Manage Users
        </h2>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <label htmlFor="filter" className="mr-2 text-red-600">Filter by Status:</label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded px-2 py-1 text-red-600"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b bg-red-100 text-red-600 text-left text-sm uppercase">Avatar</th>
                  <th className="px-5 py-3 border-b bg-red-100 text-red-600 text-left text-sm uppercase">Name</th>
                  <th className="px-5 py-3 border-b bg-red-100 text-red-600 text-left text-sm uppercase">Email</th>
                  <th className="px-5 py-3 border-b bg-red-100 text-red-600 text-left text-sm uppercase">Role</th>
                  <th className="px-5 py-3 border-b bg-red-100 text-red-600 text-left text-sm uppercase">Status</th>
                  <th className="px-5 py-3 border-b bg-red-100 text-red-600 text-left text-sm uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="px-5 py-5 border-b bg-white text-sm">
                      <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full" />
                    </td>
                    <td className="px-5 py-5 border-b bg-white text-sm">{user.name}</td>
                    <td className="px-5 py-5 border-b bg-white text-sm">{user.email}</td>
                    <td className="px-5 py-5 border-b bg-white text-sm">{user.role}</td>
                    <td className="px-5 py-5 border-b bg-white text-sm">{user.status || 'N/A'}</td>
                    <td className="px-5 py-5 border-b bg-white text-sm">
                      <Menu as="div" className="relative inline-block text-left">
                        <div>
                          <Menu.Button className="px-4 py-2 bg-red-200 rounded text-red-600">
                            Actions <ChevronDownIcon className="w-4 h-4 ml-2" />
                          </Menu.Button>
                        </div>
                        <Transition>
                          <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`block px-4 py-2 text-sm w-full text-left ${active ? 'bg-red-100' : ''}`}
                                  onClick={() =>
                                    handleStatusChange(user._id, user.status === 'active' ? 'blocked' : 'active')
                                  }
                                >
                                  {user.status === 'active' ? 'Block' : 'Unblock'}
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`block px-4 py-2 text-sm w-full text-left ${active ? 'bg-red-100' : ''}`}
                                  onClick={() => handleRoleChange(user._id, 'volunteer')}
                                >
                                  Make Volunteer
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`block px-4 py-2 text-sm w-full text-left ${active ? 'bg-red-100' : ''}`}
                                  onClick={() => handleRoleChange(user._id, 'admin')}
                                >
                                  Make Admin
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-red-200 rounded text-red-600"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-red-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 bg-red-200 rounded text-red-600"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
