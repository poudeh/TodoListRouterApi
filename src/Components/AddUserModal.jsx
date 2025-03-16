import React, { useState } from 'react';

export default function AddUserModal({ isOpen, closeModal, addUser }) {
    const [newUser, setNewUser] = useState({
        name: '',
        username: '',
        email: '',
        address: {
            street: '',
            city: '',
            suite: '',
            zipcode: ''
        }
    });

    // Handle input changes for new user data, including nested address fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Check if the input is related to the address object
        if (name.includes('address.')) {
            const addressField = name.split('.')[1]; // Extract the address field (street, city, etc.)
            setNewUser((prevState) => ({
                ...prevState,
                address: {
                    ...prevState.address,
                    [addressField]: value, // Update the specific field inside address
                }
            }));
        } else {
            setNewUser((prevState) => ({
                ...prevState,
                [name]: value, // Update other fields like name, username, email
            }));
        }
    };

    // Handle form submission to add the user
    const handleSubmit = (e) => {
        e.preventDefault();
        addUser(newUser); // Call the function to add the new user
        closeModal(); // Close the modal after submission
    };

    if (!isOpen) return null; // Don't render the modal if not open

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-2xl mb-4">Add New User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                            value={newUser.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                            value={newUser.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                            value={newUser.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Address Fields */}
                    <div className="mb-4">
                        <label
                            htmlFor="address.street"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Street
                        </label>
                        <input
                            type="text"
                            id="address.street"
                            name="address.street"
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                            value={newUser.address.street}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="address.city"
                            className="block text-sm font-medium text-gray-700"
                        >
                            City
                        </label>
                        <input
                            type="text"
                            id="address.city"
                            name="address.city"
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                            value={newUser.address.city}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="address.suite"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Suite
                        </label>
                        <input
                            type="text"
                            id="address.suite"
                            name="address.suite"
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                            value={newUser.address.suite}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="address.zipcode"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Zipcode
                        </label>
                        <input
                            type="text"
                            id="address.zipcode"
                            name="address.zipcode"
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                            value={newUser.address.zipcode}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}