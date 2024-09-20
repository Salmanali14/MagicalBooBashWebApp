import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import placeholder from "../Images/user.png"
const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To handle navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem('id');
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        if (id && token) {
          const response = await axios.get(`https://apis.mbbvendor.com/api/badgeScanned/bySupplierId/${id}/all`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in headers
            },
          });
          setHistoryData(response?.data?.data?.scannedBadgesResponse);
        } else {
          console.error('ID or Token not found in localStorage');
        }
      } catch (err) {
        setError(err.message);
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
      <ClipLoader color='#000' size={45} className='mt-[0px]' />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-center">Your internet connection seems to be having issues.</p>
      </div>
    );
  }
  const formatTimestamp = (timestamp) => {
    timestamp =parseInt(timestamp)
    const date = new Date(timestamp);
  
    // Format date as DD/MM/YYYY
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    // Format time as HH:MMAM/PM
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Hour '0' should be '12'
    const formattedHours = String(hours).padStart(2, '0');
  
    return `${day}/${month}/${year} - ${formattedHours}:${minutes}${ampm}`;
  };
  return (
    <div className="flex flex-col items-center w-[100%] bg-white min-h-screen py-5">
    <h2 className="text-2xl font-bold text-black mb-5">History</h2>
    <div className="w-[90%]">
      {historyData.length === 0 ? (
        <div className='flex h-[80vh]  justify-center items-center w-[100%]'>
        <p className="text-center  text-gray-500">No history available</p> 
        </div>
      ) : (
        historyData.map((item) => (
          <div className="bg-gray-100 rounded-lg pl-2 pr-2 pt-4 pb-4 mb-5 flex items-center justify-between" key={item.id}>
            <img
              src={placeholder}
           
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="ml-2 flex-1">
              <h3 className="font-bold text-[14px] text-black">{item?.customer?.name}</h3>
              <p className="text-gray-500 text-[12px]">{formatTimestamp(item.date)}</p>
            </div>
            {item?.status === 'scanned' ? (
              <button className="bg-green-500 text-white px-2 py-1 rounded-lg">Scanned</button>
            ) : (
              <button className="bg-red-500 text-white px-2 py-1 rounded-lg">Duplicate</button>
            )}
          </div>
        ))
      )}
    </div>
    <br></br>
    <br></br>
    <br></br>
  </div>
  );
};

export default History;
