import React, { useState } from 'react';
import axios from 'axios';
import EditFetchUserComponent from './EditFetchUserComponent'; // Assuming this is the path

export default function UsersTable({ users, setUsers }) {
    const [isModalOpen, setIsModalOpen] = useState(false); // For opening/closing modal
    const [selectedUser, setSelectedUser] = useState(null); // To hold the selected user for editing
    const [searchQuery, setSearchQuery] = useState(""); // To hold the search query

    // Open the modal and populate selected user
    const openModal = (user) => {
        setSelectedUser(user); // Populate selected user
        setIsModalOpen(true);   // Open the modal
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null); // Clear selected user
    };

    // Delete a user
    const deleteUser = (userId) => {
        axios.request({
            method: 'DELETE',
            url: `https://jsonplaceholder.typicode.com/users/${userId}`
        })
        .then(res => {
            if (res.status === 200) {
                setUsers(prevState => prevState.filter(user => user.id !== userId));
                alert(`User with ID ${userId} deleted successfully!`);
            }
        })
        .catch(error => {
            console.error("There was an error deleting the user:", error);
        });
    };

    // Handle form submission (saving user)
    const handleEditSubmit = (e) => {
        e.preventDefault(); 
        axios.put(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`, selectedUser)
            .then(res => {
                setUsers((prevState) => 
                    prevState.map(user =>
                        user.id === selectedUser.id ? selectedUser : user
                    )
                );                
                alert('User updated successfully!');
                console.log(res.data); // Log the response
                closeModal(); // Close the modal after successful update
            })
            .catch(error => {
                console.error("There was an error updating the user:", error);
                alert("An error occurred while updating the user.");
            });
    };

    // Filter users based on the search query (only filter if searchQuery is not empty)
    const filteredUsers = searchQuery
        ? users.filter(user => {
            return (
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.username.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }): users; // If no search query, show all users

    return (
        <div className="overflow-x-auto">
            <div className="mb-4">
                {/* Search Input */}
                <input
                    type="text"
                    className="p-2 border border-gray-300 rounded"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b text-left">ID</th>
                        <th className="py-2 px-4 border-b text-left">Name</th>
                        <th className="py-2 px-4 border-b text-left">Email</th>
                        <th className="py-2 px-4 border-b text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="py-2 px-4 text-center">No users found</td>
                        </tr>
                    ) : (
                        filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{user.id}</td>
                                <td className="py-2 px-4 border-b">{user.name}</td>
                                <td className="py-2 px-4 border-b">{user.email}</td>
                                <td className="py-2 px-4 border-b text-center">
                                    <button
                                        onClick={() => openModal(user)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Modal for editing user */}
            {isModalOpen && selectedUser && (
                <EditFetchUserComponent                   
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    closeModal={closeModal}
                    handleEditSubmit={handleEditSubmit}
                />
            )}
        </div>
    );
}