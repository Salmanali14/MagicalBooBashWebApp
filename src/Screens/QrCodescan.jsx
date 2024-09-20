import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader'; // Corrected import
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Box, CircularProgress } from '@mui/material'; // MUI imports
import Afterscan from "../Images/Afterscan.png";
import Accepted from "../Images/Accepted.png";
import dup from "../Images/dup.png";
import Prohibition from "../Images/Prohibition.png";

const apiBaseUrl = 'https://apis.mbbvendor.com/api/badge/scan';

const QrCodescan = () => {
  const navigate = useNavigate();
  const [qrValue, setQrValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [dupModalVisible, setDupModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(true); // New state for controlling scanning

  const sendDateInsteadOfQrValue = false;

  const onScan = async (result, error) => {
    if (result && isScanning) { // Only scan if isScanning is true
      // Vibrate device when QR code is scanned
      if (navigator.vibrate) {
        navigator.vibrate(200); // Vibrate for 200 milliseconds
      }

      setIsScanning(false); // Stop scanning after successful scan
      setQrValue(result.text);
      setLoading(true);

      try {
        const currentUTCTimestamp = Math.floor(Date.now());

        const payload = sendDateInsteadOfQrValue
          ? { date: currentUTCTimestamp }
          : { id: result.text, date: currentUTCTimestamp };

        const response = await axios.post(apiBaseUrl, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Use localStorage or sessionStorage
          },
        });

        if (response?.data?.status === true) {
          setModalVisible(true); // Show success modal
        } else {
          setDupModalVisible(true); // Show duplicate modal
        }
      } catch (error) {
        console.error('API Error:', error.response ? error.response.data : error.message);
        alert('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    if (error) {
      console.info(error);
    }
  };

  const hideModal = () => {
    setModalVisible(false);
    setDupModalVisible(false);
    setIsScanning(true); // Re-enable scanning after closing the modal
    setQrValue(null);
  };

  return (
    <div className="flex flex-col items-center justify-center w-[100%] bg-[#010F56] relative">
    <p className="text-white text-xl absolute top-[50px]">Scan QR Code</p>
      <div className="flex flex-col items-center w-[100%]">
        {isScanning && ( // Conditionally render QrReader based on scanning state
          <QrReader
            onResult={onScan}
            constraints={{ facingMode: 'environment' }}
            className="w-[90%] h-[90%] border-2 border-white rounded-lg"
          />
        )}
       
        <button
          className="bg-white text-[#010F56] w-36 h-12 rounded-lg flex items-center justify-center mt-8"
          onClick={() => navigate('/tab')}
        >
          Close
        </button>
      </div>

      {/* Success Modal */}
      <Modal open={modalVisible} onClose={hideModal}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            maxWidth: '430px',
            height: '100vh',
            margin: '0 auto',
          }}
        >
          <div className="bg-white p-8 rounded-lg w-[90%] text-center">
            {loading ? (
              <CircularProgress color="primary" />
            ) : (
              <>
                <p className="text-[#010F56] text-xl mb-4">Code Scanned Successfully</p>
                <img src={Accepted} alt="Accepted" className="h-12 w-12 mx-auto" />
                <img src={Afterscan} alt="After Scan" className="h-36 w-36 mt-8 mb-8 mx-auto" />
                <button
                  className="w-[120px] h-[40px] rounded-md text-white"
                  style={{ background: 'linear-gradient(90deg, #020A35 0%, #001378 100%)' }}
                  onClick={hideModal}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </Box>
      </Modal>

      {/* Duplicate Scan Modal */}
      <Modal open={dupModalVisible} onClose={hideModal}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            maxWidth: '430px',
            height: '100vh',
            margin: '0 auto',
          }}
        >
          <div className="bg-white p-8 rounded-lg w-[90%] text-center">
            {loading ? (
              <CircularProgress color="primary" />
            ) : (
              <>
                <p className="text-[#010F56] text-xl mb-4">Duplicate Scan</p>
                <img src={Prohibition} alt="Prohibition" className="h-12 w-12 mx-auto" />
                <img src={dup} alt="Duplicate" className="h-36 w-36 mt-8 mb-8 mx-auto" />
                <button
                  className="w-[120px] h-[40px] rounded-md text-white"
                  style={{ background: 'linear-gradient(90deg, #020A35 0%, #001378 100%)' }}
                  onClick={hideModal}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default QrCodescan;
