import React, { useState } from 'react';
import './ChatPopup.css';
import { LeftOutlined, RightOutlined, UserOutlined } from '@ant-design/icons'; // Import necessary icons

const ChatPopup = ({ showPopup, togglePopup, onSwitchToMessage }) => {

  if (!showPopup) {
    return null; // Don't render if not visible
  }

  // This component will represent the form view shown in the latest image
  return (
    <div className="chat-popup-overlay" onClick={togglePopup}> {/* Allow closing by clicking overlay */}
      <div className="chat-popup" onClick={(e) => e.stopPropagation()}> {/* Prevent clicks inside popup from closing it */}
        <div className="chat-popup-header">
          <button className="back-button" onClick={onSwitchToMessage}><LeftOutlined /></button> {/* Back arrow button */}
          <h3>CHAT VỚI MONDERN ESTATE</h3> {/* Header title */}
          <button className="close-button" onClick={togglePopup}>X</button> {/* Close button */}
        </div>
        <div className="chat-popup-content">
          <div className="chat-intro-text">
            Cảm ơn bạn đã ghé thăm<br/>
            Modern Estate!<br/>
            Hãy để lại lời nhắn của bạn. Chúng tôi sẽ hỗ trợ<br/>
            sớm nhất có thể.
          </div>

          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Tên</label>
              <input type="text" id="name" name="name" placeholder="Hiếu thứ ba" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="hieunhangheo@gmai.com" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">SĐT</label>
              <input type="tel" id="phone" name="phone" placeholder="0123456979" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Lời nhắn</label>
              <textarea id="message" name="message" rows="4" placeholder="Tôi hiện tại đang muốn tham khảo các gói vay mua nhà bên bạn"></textarea>
            </div>
            <button type="submit" className="submit-button">Để lại lời nhắn</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup; 