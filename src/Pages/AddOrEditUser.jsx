import { useParams, useNavigate, Outlet } from 'react-router-dom'; // Import necessary hooks
import User from '../DB/UserDB';

export default function AddOrEditUser() {
    const params = useParams();
    const { userId } = params;  // Extract the userId from URL params
    const navigate = useNavigate();  // For navigation after form submission
    // Form state for user data
    const [formData, setFormData] = useState({
        name: '',
        role: 'Admin', // Default role
    });

    // If editing, pre-fill the form with the existing user data
    useEffect(() => {
        if (userId) {
            const userToEdit = User.find(user => user.id === parseInt(userId));
            if (userToEdit) {
                setFormData({
                    name: userToEdit.Name,
                    role: userToEdit.Role,
                });
            }
        }
    }, [userId]);

    // Handle input change for form
    const handleInputChange = (e) => {
        const { name, value } = e.target; 
        setFormData((prev) => ({...prev, [name]: value,}));
    };

    // Add or Edit user handler
    const addOrEditUserHandler = (e) => {
        e.preventDefault();
        if (!userId) {
            const newUser = {
                id: User.length + 1, 
                Name: formData.name,
                Role: formData.role,
            };
            User.push(newUser); 
            navigate(-1)
        } else {
            // Editing an existing user
            const userIndex = User.findIndex(user => user.id === parseInt(userId));
            if (userIndex !== -1) {
                User[userIndex] = { 
                    ...User[userIndex],  // Shallow copy of the user object
                    Name: formData.name,   // Update Name
                    Role: formData.role, // Update Role
                };
            }
            navigate('/User');

        }
    };
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">{userId ? "Edit User" : "Create User"}</h2>
            <form onSubmit={addOrEditUserHandler}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">User Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name} // Controlled input value
                        onChange={handleInputChange} // Handle input change
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter user name"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role} // Controlled input value
                        onChange={handleInputChange} // Handle input change
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="Admin">Admin</option>
                        <option value="Editor">Editor</option>
                        <option value="Viewer">Viewer</option>
                    </select>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        {userId ? "Edit" : "Add"}
                    </button>
                </div>
            </form>
            <Outlet />
            {/* The Outlet will render the child route component here */}
        </div>
    );
}