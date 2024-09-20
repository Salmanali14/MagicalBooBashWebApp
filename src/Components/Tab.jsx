import React, { useState } from 'react';
import qrimg from "../Images/qr.png";
import qrlogo from "../Images/qrlogo.png";
import hisw from "../Images/hisw.png";
import hist from "../Images/his.png";
import setting5 from "../Images/setting.png";
import sett from "../Images/settingc.png";
import Setting from '../Screens/Setting';
import History from '../Screens/History';
import Qr from '../Screens/QrCode';

const Tab = () => {
  const [his, setHis] = useState(false);
  const [setting, setSetting] = useState(false);
  const [qr, setQr] = useState(true);

  const handleHis = () => {
    setHis(true);
    setSetting(false);
    setQr(false);
  };

  const handleSetting = () => {
    setHis(false);
    setSetting(true);
    setQr(false);
  };

  const handleQr = () => {
    setHis(false);
    setSetting(false);
    setQr(true);
  };

  return (
    <div className="relative h-screen w-[100%]">
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-white w-full">
        {his && <History />}
        {setting && <Setting />}
        {qr && <Qr />}
      </div>
      <div className="fixed bottom-0 max-w-[430px] w-[100%] h-20 rounded-tl-full rounded-tr-full bg-white shadow-lg rounded-t-lg border-t border-gray-300 flex items-center justify-center">
        <div className="flex justify-between items-center w-3/5">
          <button onClick={handleQr} className="p-2">
            <img
              src={qr ? qrlogo : qrimg}
              alt="QR"
              className="w-8 h-8"
            />
          </button>
          <button onClick={handleHis} className="p-2">
            <img
              src={his ? hist : hisw}
              alt="History"
              className="w-8 h-8"
            />
          </button>
          <button onClick={handleSetting} className="p-2">
            <img
              src={setting ? sett : setting5}
              alt="Settings"
              className="w-8 h-8"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tab;
