import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import successAnimation from '../../auth/success.json';
const Success = ({
  title = 'Thanh toán thành công!',
  description = 'Chúc bạn sớm kết nối được với khách hàng phù hợp.',
  buttonText = 'Xem danh sách tin đăng',
  onButtonClick
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      navigate('/can-ho');
    }
  };
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <div style={{ width: 245 }}>
        <Lottie animationData={successAnimation} loop={false} />
      </div>
      <h2 style={{marginTop: 0}}>{title}</h2>
      <p>{description}</p>
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
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Success; 