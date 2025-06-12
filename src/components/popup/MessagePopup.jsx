import React, { useState } from 'react';
import './MessagePopup.css';
import { RightOutlined, UserOutlined } from '@ant-design/icons'; // Import necessary icons

const MessagePopup = ({ showPopup, togglePopup, onSwitchToChat }) => {
    // Remove chat-specific state and effects
    // const [messages, setMessages] = useState([]);
    // const [input, setInput] = useState('');

    // Optional: Reset messages when popup opens
    // useEffect(() => {
    //   if (showPopup) {
    //     setMessages([]);
    //     setInput('');
    //   }
    // }, [showPopup]);

    // Remove chat-specific message handling
    // const handleSendMessage = () => {
    //   if (input.trim()) {
    //     const newUserMessage = { text: input, sender: 'user' };
    //     setMessages([...messages, newUserMessage]);
    //     setInput('');

    //     // Simulate AI response
    //     setTimeout(() => {
    //       const botResponse = { text: `Bạn vừa hỏi: ${input}`, sender: 'ai' };
    //       setMessages(currentMessages => [...currentMessages, botResponse]);
    //     }, 1000);
    //   }
    // };

    // const handleKeyPress = (e) => {
    //   if (e.key === 'Enter') {
    //     handleSendMessage();
    //   }
    // };

    if (!showPopup) {
        return null; // Don't render if not visible
    }

    return (
        <div className="message-popup-overlay" onClick={togglePopup}> {/* Allow closing by clicking overlay */}
            <div className="message-popup" onClick={(e) => e.stopPropagation()}> {/* Prevent clicks inside popup from closing it */}
                <div className="popup-header">
                    {/* Title from image with line breaks */}
                    <h3>
                        CHAT VỚI<br />
                        MONDERN<br />
                        ESTATE
                    </h3>
                    {/* Close button */}
                    <button onClick={togglePopup}>X</button>
                </div>
                {/* New container for message-area and input-area */}
                <div className="popup-content">
                    <div className="message-area"> {/* Content area */}
                        <div className="message-prompt-box"> {/* Container for the prompt message */}
                            <div className="message-prompt-icon"><UserOutlined /></div> {/* User icon */}
                            <div className="message-prompt-text">
                                Hãy để lại lời nhắn để chúng tôi có
                                thế phản hồi trong thời gian sớm
                                nhất!
                            </div>
                        </div>
                    </div>
                    <div className="input-area"> {/* Button area */}
                        <button onClick={onSwitchToChat}> {/* Button still closes the popup */}
                            Để lại lời nhắn <RightOutlined />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagePopup; 