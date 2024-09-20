import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const AlertModal = ({ isVisible, onClose, title, message }) => {
  return (
    <Modal
      open={isVisible}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyles}>
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography id="modal-description" variant="body1" gutterBottom>
          {message}
        </Typography>
        <Button style={{marginTop:"10px"}} variant="contained" color="error" onClick={onClose}>
          Ok
        </Button>
      </Box>
    </Modal>
  );
};

const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

export default AlertModal;

