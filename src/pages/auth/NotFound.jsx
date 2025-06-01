import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import errorAnimation from './error.json'; 

const NotFound = () => {
  const navigate = useNavigate();
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const primaryColor = '#4a90e2'; 
  const primaryDarkerColor = '#0057b2'; 
  const textColorHeading = '#333F4F'; 
  const textColorParagraph = '#6C7A89'; 
  const pageBackground = '#fff  '; 

  const buttonBaseStyle = {
    marginTop: 25,
    padding: '12px 35px',
    backgroundColor: primaryColor,
    color: '#fff',
    border: 'none',
    borderRadius: 25, 
    marginBottom: 25,
    fontSize: 17,
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease',
    boxShadow: '0 4px 12px rgba(74, 112, 226, 0.25)',
  };

  const buttonHoverStyle = {
    backgroundColor: primaryDarkerColor,
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 18px rgba(58, 89, 181, 0.3)',
  };

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      backgroundColor: pageBackground,
      textAlign: 'center',
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" 
    }}>
      <div style={{
        width: 'clamp(280px, 60vw, 420px)', 
        marginBottom: 20, 
      }}>
        <Lottie animationData={errorAnimation} loop={true} />
      </div>

      <h2 style={{ 
        fontSize: 'clamp(22px, 5vw, 32px)', 
        fontWeight: '700',
        color: textColorHeading,
        marginBottom: '15px', 
        marginTop: 5, 
      }}>
        Trang không tồn tại!
      </h2>

      <p style={{
        fontSize: 'clamp(15px, 2.5vw, 17px)',
        color: textColorParagraph,
        maxWidth: '800px', 
        lineHeight: '1.7', 
        marginBottom: '10px',
      }}>
        Rất tiếc, trang bạn đang tìm kiếm không thể được tìm thấy hoặc đã bị di chuyển. Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ.
      </p>

      <button
        style={{
          ...buttonBaseStyle,
          ...(isButtonHovered ? buttonHoverStyle : {})
        }}
        onClick={() => navigate('/')}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
      >
        Về trang chủ
      </button>
    </div>
  );
};

export default NotFound;