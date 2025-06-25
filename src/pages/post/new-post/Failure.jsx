import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import failureAnimation from './failure.json';
const Failure = ({
  title = 'Thanh toán thất bại!',
  description = 'Vui lòng kiểm tra lại thông tin thanh toán và thử lại.',
  buttonText = 'Thử lại',
  onButtonClick
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      navigate('/create-post');
    }
  };
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <div style={{ width: 230, height: 240 }}>
        <Lottie animationData={failureAnimation} loop={true} />
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

export default Failure; 