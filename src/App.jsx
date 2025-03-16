import './App.css';
import Todo from './Pages/Todo';
import SuggestTaskPage from './Pages/SuggestTaskPage';
import User from './Pages/User';
import { useState } from 'react';
import Profile from './Pages/Profile';
import NoPageFound from './Pages/NoPageFound';
import AddOrEditUser from './Pages/AddOrEditUser';
import EditUserAlert from './Components/EditUserAlert';
import { BrowserRouter , Routes , Route , Navigate } from 'react-router-dom';
import UploadUsers from './Pages/UploadUsers';

function App() {
  const [admin, isAdmin] = useState(true);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Todo />} />
          <Route path='/SuggestedTasks/*' replace element={<SuggestTaskPage />} />
          <Route path='/Profile' element={admin ? <Profile /> : <Navigate to="/" />} />
          <Route path='/User' element={<User />} />
          <Route path='/User/add' element={<AddOrEditUser />}>
            <Route path=':userId' element={<EditUserAlert />} />
          </Route>
          <Route path='/UploadUsers' element={<UploadUsers/>}>

          </Route>
          
          <Route path='*' element={<NoPageFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;