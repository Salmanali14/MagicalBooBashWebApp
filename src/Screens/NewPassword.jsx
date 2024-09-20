import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../Modal/AlertModal';
import logoname from "../Images/logoname.png";
import passwordimage from "../Images/Password.png";
import { ClipLoader } from 'react-spinners';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import eye icons

export default function NewPassword() {
  const navigate = useNavigate();
  const [buttonLoader, setButtonLoader] = useState(false);
  const [newPassword, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const inputRefs = useRef([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const showModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  const hideModal = () => setModalVisible(false);

  const handleInputChange = (value, index) => {
    if (value.length > 1) {
      value = value[0];
    }
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !inputRefs.current[index].value && index > 0) {
      inputRefs.current[index - 1].focus();
      inputRefs.current[index - 1].value = '';
    }
  };

  const enteredOtp = inputRefs.current.map(input => input.value).join('');

  const handleSubmit = async () => {
    const passwordRegEx = /^[A-Za-z\d!@#$%^&*]{6}$/;
   
    if (!newPassword) {
      showModal('Alert', 'All fields are required!');
      return;
    }
    if (!passwordRegEx.test(newPassword)) {
      showModal("Password must be exactly 6 characters long.");
      return;
    }

    // Get the email from localStorage
    const email = localStorage.getItem('email');
    
    try {
      setButtonLoader(true);
      const response = await axios.post(`https://apis.mbbvendor.com/api/reset-password`, {
        email: email,
        verification_code: enteredOtp,
        new_password: newPassword,
      });

      if (response?.data?.status === true) {
        showModal('Success', 'Password changed successfully!');
        setTimeout(() => {
            navigate('/');
        }, 1000);
        localStorage.removeItem('email');
      }
    } catch (err) {
      showModal('Error', err.response?.data?.message || 'An error occurred.');
    } finally {
      setButtonLoader(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-[90%] bg-white relative">
      <img
        src={logoname}
        alt="Logo"
        className="w-3/5 mb-8 absolute top-12"
      />
      <div className="w-full h-4/5 rounded-2xl flex flex-col items-center justify-center">
        <h1 className="text-black font-semibold text-lg mt-5">Reset Password</h1>
        <p className="text-black text-sm mt-2">Enter the OTP to recover the password</p>
        <div className="flex mt-5 mb-5">
          {[...Array(4)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center border rounded-lg mx-2 bg-gray-100 text-black text-xl"
              onChange={e => handleInputChange(e.target.value, index)}
              onKeyDown={e => handleKeyDown(e, index)}
              ref={el => (inputRefs.current[index] = el)}
            />
          ))}
        </div>
        <label className="text-gray-600 text-sm w-full mt-2">New Password</label>
        <div className="flex items-center border border-gray-300 rounded-lg p-3 w-full mt-2">
          <img src={passwordimage} alt="Password Icon" className="w-6 h-6 mr-2" />
          <input
            type={passwordVisible ? 'text' : 'password'} // Toggle input type based on visibility state
            placeholder="Enter New Password"
            className="flex-1 outline-none text-gray-900"
            value={newPassword}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="text-gray-500 ml-2"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? (
              <AiOutlineEyeInvisible size={22} />
            ) : (
              <AiOutlineEye size={22} />
            )}
          </button>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full h-[50px] text-white py-3 rounded-full flex items-center justify-center mt-5"
          disabled={buttonLoader}
          style={{ background: 'linear-gradient(90deg, #020A35 0%, #001378 100%)' }}
        >
          {buttonLoader ? (
            <ClipLoader color='#fff' size={25} className='mt-[0px]' />
          ) : (
            'Change Password'
          )}
        </button>
      </div>
      <AlertModal
        isVisible={isModalVisible}
        onClose={hideModal}
        title={modalTitle}
        message={modalMessage}
      />
    </div>
  );
}
