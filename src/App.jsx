import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Screens/Login';
import Forgot from './Screens/Forgot';
import NewPassword from './Screens/NewPassword';
import Tab from './Components/Tab';
import QrCodescan from './Screens/QrCodescan';
export default function App() {
  const RequireAuth = ({ children }) => {
    const currentUser = localStorage.getItem("id");
    return currentUser?.length>0 && currentUser !=undefined  ? children : <Navigate to="/" />;
  };

  const RequireAuthlogin = ({ children }) => {
    const currentUser = localStorage.getItem("id");
    return !currentUser ? children : <Navigate to="/tab" />;
  };
  return (
   <>
   <Router>
   <div className='app'>
     <div className='screen'>
       <Routes>
         <Route path="/" element={<RequireAuthlogin><Login /></RequireAuthlogin>} />
         <Route path="/forgot" element={<RequireAuthlogin><Forgot/></RequireAuthlogin>} />
         <Route path="/newpassword" element={<RequireAuthlogin><NewPassword/></RequireAuthlogin>} />
         <Route path="/tab" element={<RequireAuth><Tab/></RequireAuth>} />
         <Route path="/qrscan" element={<RequireAuth><QrCodescan/></RequireAuth>} />



      
       </Routes>
     </div>
   </div>
 </Router>
   </>
  )
}
