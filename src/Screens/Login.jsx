import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logoname from "../Images/logoname.png";
import emailimage from "../Images/Email.png";
import passwordimage from "../Images/Password.png";
import AlertModal from '../Modal/AlertModal';
import { ClipLoader } from 'react-spinners';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import eye icons

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonLoader, setButtonLoader] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // New state for password visibility

  const showModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  const hideModal = () => setModalVisible(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async () => {
    if (!email) {
      showModal('Alert', 'Email is required.');
      return;
    }

    if (!validateEmail(email)) {
      showModal('Error', 'Invalid email format.');
      return;
    }

    if (!password) {
      showModal('Alert', 'Password is required.');
      return;
    }

    try {
      setButtonLoader(true);
      const response = await axios.post(`https://apis.mbbvendor.com/api/supplier/login`, {
        email: email,
        password: password,
      });

      const { id, authToken, name, imageUrl } = response?.data?.data?.authResponse ?? {};

      // Store the data in localStorage or another method for web
      localStorage.setItem('id', JSON.stringify(id ?? '0'));
      localStorage.setItem('token', authToken ?? '');
      localStorage.setItem('name', name ?? '');
      localStorage.setItem('imageUrl', imageUrl ?? '');

      setButtonLoader(false);
      navigate('/tab');
    } catch (error) {
      setButtonLoader(false);
      showModal('Error', error?.response?.data?.message ?? 'Login failed.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-[90%] bg-white relative">
      <img
        src={logoname}
        alt="Logo"
        className="w-3/5 mb-8 absolute top-12"
      />
      <h2 className="text-black font-semibold text-xl">Login</h2>
      <p className="text-black text-sm mt-2 mb-8">Enter your Email and Password to Login</p>

      <div className="w-full mb-4">
        <label className="text-gray-500 text-sm mb-2 block">Email</label>
        <div className="flex items-center border border-gray-300 rounded-lg p-3">
          <img src={emailimage} alt="Email Icon" className="w-6 h-6 mr-2" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 outline-none"
          />
        </div>
      </div>

      <div className="w-full mb-4">
        <label className="text-gray-500 text-sm mb-2 block">Password</label>
        <div className="flex items-center border border-gray-300 rounded-lg p-3">
          <img src={passwordimage} alt="Password Icon" className="w-6 h-6 mr-2" />
          <input
            type={passwordVisible ? 'text' : 'password'} // Toggle input type based on visibility state
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 outline-none"
          />
          <button
            type="button"
            className="text-gray-500"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? (
              <AiOutlineEyeInvisible size={22} />
            ) : (
              <AiOutlineEye size={22} />
            )}
          </button>
        </div>
      </div>

      <div className="w-full text-right">
        <button
          onClick={() => navigate('/forgot')}
          className="text-sm text-gray-500"
        >
          Forgot Password?
        </button>
      </div>

      <button
        onClick={handleLogin}
        className="mt-6 w-full h-[50px] text-white py-3 rounded-full flex justify-center items-center"
        disabled={buttonLoader}
        style={{ background: 'linear-gradient(90deg, #020A35 0%, #001378 100%)' }}
      >
        {buttonLoader ? (
          <div className="loader">
            <ClipLoader color='#fff' size={25} className='mt-[7px]' />
          </div>
        ) : (
          'Login'
        )}
      </button>

      <AlertModal
        isVisible={isModalVisible}
        onClose={hideModal}
        title={modalTitle}
        message={modalMessage}
      />
    </div>
  );
};

export default Login;
