import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutModal from '../Modal/LogoutModal';
import logout from "../Images/log.png"

const Setting = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [email, setEmail] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Function to load user data from localStorage
    const loadUserData = async () => {
      try {
        const storedName = localStorage.getItem('name');
        const storedImageUrl = localStorage.getItem('imageUrl');
        const storedEmail = localStorage.getItem('email');

        if (storedName) setName(storedName);
        if (storedImageUrl) setImageUrl(storedImageUrl);
        if (storedEmail) setEmail(storedEmail);
      } catch (error) {
        alert('Failed to load user data.');
      }
    };

    loadUserData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/'); // Navigate to login page
    setModalVisible(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white w-[100%]">
      <div className="flex flex-col items-center bg-white w-[90%]">
        <p className="text-black font-bold text-2xl mt-5">Settings</p>

        <div className="mt-5 h-32 rounded-lg w-[100%] bg-gray-200 border border-gray-300 flex items-center justify-center">
          <div className="flex flex-row w-[90%] justify-start items-center">
            <img
              src={imageUrl} 
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mr-4"
            />
            <div>
              <p className="text-black font-bold text-lg">{name || 'User Name'}</p>
              <p className="text-gray-500 text-sm">{email || 'user@example.com'}</p>
            </div>
          </div>
        </div>

      

        <button
          className="w-full h-12 border border-gray-300 mt-5 rounded-lg flex justify-start items-center px-5"
          onClick={() => setModalVisible(true)}
        >
          <img src={logout} alt="Logout" className="w-5 h-5 mr-5" />
          <p className="text-black font-bold">Log Out</p>
        </button>
      </div>

      <LogoutModal
        isVisible={isModalVisible}
        onConfirm={handleLogout}
        onCancel={() => setModalVisible(false)}
      />
    </div>
  );
};

export default Setting;
