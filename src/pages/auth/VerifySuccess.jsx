import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import successAnimation from './success.json';

const VerifySuccess = () => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <div style={{ width: 245 }}>
        <Lottie animationData={successAnimation} loop={false} />
      </div>
      <h2 style={{marginTop: 0}}>Xác thực email thành công!</h2>
      <p>Bạn đã xác thực tài khoản thành công. Hãy đăng nhập để tiếp tục.</p>
      <button
        style={{
          marginTop: 22,
          padding: '10px 24px',
          background: '#4a90e2',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          fontSize: 16,
          cursor: 'pointer'
        }}
        onClick={() => navigate('/login')}
      >
        Đến trang đăng nhập
      </button>
    </div>
  );
};

export default VerifySuccess; 