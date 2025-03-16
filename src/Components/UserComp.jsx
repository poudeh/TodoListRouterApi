import React, { useState } from 'react';
import EditUserModal from './EditUserModal';

export default function UserComp(props) {
    const { id, Name, Role, setUser } = props;
    const [isShowProps, SetIsShowProps] = useState(false);

    const deleteUser = (userId) => {
        setUser(prevUsers => prevUsers.filter(user => user.id !== userId));
    };

    return (
        <>
            <tr>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                        <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">{Name}</p>
                        </div>
                    </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        john.doe@example.com
                    </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{Role}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex space-x-4">
                        <button onClick={() => SetIsShowProps(true)} className="text-blue-500 hover:text-blue-700">
                            Edit
                        </button>
                        <button onClick={() => deleteUser(id)} className="text-red-500 hover:text-red-700">
                            Delete
                        </button>
                    </div>
                </td>
            </tr>

            {/* ✅ Pass the user object correctly */}
            <EditUserModal 
                isShowProps={isShowProps} 
                setIsShowProps={SetIsShowProps} 
                setUser={setUser} 
                user={{ id, Name, Role }} 
            />
        </>
    );
}