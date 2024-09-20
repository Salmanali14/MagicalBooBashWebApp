// LogoutModal.js
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const LogoutModal = ({ isVisible, onConfirm, onCancel }) => {
  return (
    <Modal
      open={isVisible}
      onClose={onCancel} // Close modal on background click or escape key
      aria-labelledby="logout-modal-title"
      aria-describedby="logout-modal-description"
    >
      <Box sx={styles.modalBackground} >
        <Box sx={styles.modalContent}>
          <Typography id="logout-modal-title" sx={styles.title}>
            Are you sure you want to log out?
          </Typography>
          <Box sx={styles.buttonContainer}>
            <button
                 className='w-[120px] h-[35px] fontf rounded-md text-black border'
              onClick={onCancel}
            >
              No
            </button>
            <button
            className='w-[120px] h-[35px] rounded-md ml-4 text-white'
               onClick={onConfirm}
               style={{ background: 'linear-gradient(90deg, #020A35 0%, #001378 100%)' }}
             >
               Yes
             </button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

const styles = {
  modalBackground: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90vh',
  width:"100%"
  },
  modalContent: {

    maxWidth: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    p: 3,
    boxShadow: 24,
  },
  title: {
    marginBottom: 2,
    fontWeight: '500',
    color: '#000',
    fontFamily: 'Inter',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: 2,
  },
  buttonYes: {
    flex: 1,
    marginRight: 1,
  },
  buttonNo: {
    flex: 1,
    marginLeft: 1,
  },
};

export default LogoutModal;
