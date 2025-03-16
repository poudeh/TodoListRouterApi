import React, { useEffect, useState } from 'react';

export default function EditUserModal({ isShowProps, setIsShowProps, user, setUser }) {
    const [editedUser, setEditedUser] = useState(user);
    
    useEffect(() => {
        setEditedUser(user);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({ ...prev, [name]: value })); //It cane be role or name and becayse name is variable it can be name of value
    };

    const handleSave = () => {
        setUser(prevUsers =>
            prevUsers.map(u => (u.id === editedUser.id ? editedUser : u))
        );
        setIsShowProps(false);
    };

    if (!isShowProps) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Edit User</h2>

                <label className="block mb-2 text-sm font-medium text-gray-700">Name:</label>
                <input
                    type="text"
                    name="Name"
                    value={editedUser?.Name || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Role:</label>
                <select
                    name="Role"
                    value={editedUser?.Role || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                </select>

                <div className="flex justify-end space-x-3 mt-6">
                    <button onClick={() => setIsShowProps(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}