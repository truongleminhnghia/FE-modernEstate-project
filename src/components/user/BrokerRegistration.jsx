import React, { useState } from 'react';
import {
  Button,
  Card,
  Typography,
  message
} from 'antd';
import {
  ShopOutlined
} from '@ant-design/icons';
import { registerBroker } from '../../apis/apiCustomer.api';

const { Title, Text } = Typography;

const BrokerRegistration = ({ userData, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleRegisterBroker = async () => {
    setLoading(true);
    try {
      const response = await registerBroker();
      
      // Cập nhật user data trong localStorage
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = {
        ...currentUser,
        isBroker: true,
        role: { ...currentUser.role, roleName: 'ROLE_BROKER' }
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Gọi callback để cập nhật UI
      onUpdate(updatedUser);
      
      message.success('Đăng ký làm môi giới thành công!');
    } catch (error) {
      console.error('Lỗi đăng ký môi giới:', error);
      const errorMsg = error.response?.data?.message || 'Có lỗi xảy ra khi đăng ký môi giới!';
      message.error(errorMsg);
    }
    setLoading(false);
  };

  if (userData?.isBroker) {
    return (
      <Card>
        <div className="flex justify-between items-center mb-6">
          <Title level={4} style={{ margin: 0 }}>
            <ShopOutlined style={{ marginRight: 8 }} />
            Thông tin môi giới
          </Title>
          <Button type="primary" disabled icon={<ShopOutlined />}>
            Đã đăng ký môi giới
          </Button>
        </div>
        
        <div className="text-center py-8">
          <Text type="secondary">
            Bạn đã đăng ký thành công làm môi giới bất động sản!
          </Text>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <Title level={4} style={{ margin: 0 }}>
          <ShopOutlined style={{ marginRight: 8 }} />
          Thông tin môi giới
        </Title>
        <Button 
          type="primary" 
          onClick={handleRegisterBroker} 
          loading={loading}
          icon={<ShopOutlined />}
          size="large"
        >
          Đăng ký làm môi giới
        </Button>
      </div>
      
      <div className="text-center py-12">
        <ShopOutlined style={{ fontSize: 48, color: '#d9d9d9', marginBottom: '16px' }} />
        <Title level={4} type="secondary">
          Bạn chưa đăng ký làm môi giới
        </Title>
        <Text type="secondary" style={{ fontSize: '16px' }}>
          Nhấn vào nút "Đăng ký làm môi giới" để bắt đầu hành trình môi giới bất động sản
        </Text>
      </div>
    </Card>
  );
};

export default BrokerRegistration;