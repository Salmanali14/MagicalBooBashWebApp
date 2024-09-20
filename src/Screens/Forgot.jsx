import React, { useState } from 'react';
import axios from 'axios';
import AlertModal from '../Modal/AlertModal';
import logoname from "../Images/logoname.png"
import emailimage from "../Images/Email.png"
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
const Forgot = () => {
    const nevigate = useNavigate();
  const [email, setEmail] = useState('');
  const [buttonLoader, setButtonLoader] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

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

    try {
      setButtonLoader(true);
      const response = await axios.post(`https://apis.mbbvendor.com/api/forgot-password`, {
        email: email,
      });

      if (response?.data?.status === true) {
        localStorage.setItem('email', email);
        setButtonLoader(false);
        nevigate('/newpassword');
      }
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
      <h1 className="text-black font-semibold text-xl">Forgot Password?</h1>
      <p className="text-black text-sm mt-2 mb-8">Enter the email to recover the password</p>
      <div className="w-full flex items-center bg-white p-4 mb-4 border border-gray-300 rounded-lg h-12">
        <img src={emailimage} alt="Email Icon" className="w-6 h-6 mr-2" />
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 outline-none text-gray-900"
        />
      </div>
      <button
        onClick={handleLogin}
        className="w-full  text-white h-[50px] py-3 rounded-full flex items-center justify-center"
        disabled={buttonLoader}
        style={{ background: 'linear-gradient(90deg, #020A35 0%, #001378 100%)' }}
      >
        {buttonLoader ? (
          <ClipLoader color='#fff' size={25} className='mt-[0px]'/>
        ) : (
          'Get Verification Code'
        )}
      </button>
      <p className='text-[16px] mt-3 text-[#878EA1]'>Remember your password?<span onClick={()=>nevigate("/")} className='font-[500] cursor-pointer text-[#020A33]'>Try log in.</span></p>
      <AlertModal
        isVisible={isModalVisible}
        onClose={hideModal}
        title={modalTitle}
        message={modalMessage}
      />
    </div>
  );
};

export default Forgot;
