import React from 'react';
import Lottie from 'lottie-react';
import verifyEmail from './verify-email.json'; 

const CheckEmailNotice = () => (
  <div style={{
    minHeight: '70vh', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#f8f9fa', 
    padding: '20px 40px 40px 40px', 
    textAlign: 'center' 
  }}>

    <div style={{
      width: 'clamp(150px, 50vw, 250px)', 
      marginBottom: '30px' 
    }}>
      <Lottie animationData={verifyEmail} loop={false} />
    </div>

    <h2 style={{
      fontSize: 'clamp(28px, 5vw, 36px)', 
      fontWeight: '700',
      marginBottom: '20px', 
      color: '#343a40', 
    }}>
      Kiểm tra hộp thư của bạn!
    </h2>

    <p style={{
      fontSize: 'clamp(16px, 2.5vw, 19px)', 
      maxWidth: '650px',
      lineHeight: '1.7', 
      marginBottom: '35px', 
      color: '#5a6268', 
    }}>
      Chúng tôi đã gửi thông báo xác thực đến địa chỉ email bạn đã đăng ký.
      Vui lòng mở email và làm theo hướng dẫn để hoàn tất việc kích hoạt tài khoản của bạn.
    </p>

     {/* <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '25px' 
    }}>
      <p style={{
        fontSize: '16px',
        color: '#6c757d',
        marginBottom: '15px' 
      }}>
        Chưa nhận được email xác thực?
      </p>
      <button
        onClick={() => alert('Đã gửi lại email xác thực! Vui lòng kiểm tra hộp thư của bạn.')}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '14px 32px',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          fontSize: '17px',
          fontWeight: '600',
          transition: 'background-color 0.2s ease-in-out, transform 0.1s ease-in-out, box-shadow 0.2s ease-in-out',
          boxShadow: '0 4px 12px rgba(0, 123, 255, 0.25)', 
          fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#0056b3';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 86, 179, 0.3)'; 
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#007bff';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.25)';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.97)';
          e.currentTarget.style.backgroundColor = '#004da8'; 
        }}
        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        Gửi lại email
      </button>
    </div>  */}

     <p style={{
        fontSize: '15px', 
        color: '#6c757d',
    }}>
        Nếu bạn gặp bất kỳ vấn đề nào, vui lòng <a href="/support" style={{color: '#007bff', textDecoration: 'none', fontWeight: '500'}}>liên hệ bộ phận hỗ trợ</a> của chúng tôi.
    </p> 
  </div>
);

export default CheckEmailNotice;