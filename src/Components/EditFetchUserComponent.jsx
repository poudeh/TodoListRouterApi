import React from 'react'

const EditFetchUserComponent = ({ selectedUser, setSelectedUser, closeModal, handleEditSubmit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl mb-4">Edit User</h2>
        <form onSubmit={handleEditSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    className="mt-1 p-2 w-full border border-gray-300 rounded"
                    value={selectedUser.name}
                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className="mt-1 p-2 w-full border border-gray-300 rounded"
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
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
                    Save Changes
                </button>
            </div>
        </form>
    </div>
</div>  )
}

export default EditFetchUserComponent
