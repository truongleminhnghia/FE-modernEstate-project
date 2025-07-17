import React, { useState } from 'react';
import {
  Button,
  Card,
  Typography,
  message
} from 'antd';
import {
  HomeOutlined
} from '@ant-design/icons';
import { registerPropertyOwner } from '../../apis/apiCustomer.api';

const { Title, Text } = Typography;

const OwnerRegistration = ({ userData, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleRegisterOwner = async () => {
    setLoading(true);
    try {
      const response = await registerPropertyOwner();
      
      // Cập nhật user data trong localStorage
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = {
        ...currentUser,
        isOwner: true,
        role: { ...currentUser.role, roleName: 'ROLE_OWNER' }
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Gọi callback để cập nhật UI
      onUpdate(updatedUser);
      
      message.success('Đăng ký làm chủ sở hữu thành công!');
    } catch (error) {
      console.error('Lỗi đăng ký chủ sở hữu:', error);
      const errorMsg = error.response?.data?.message || 'Có lỗi xảy ra khi đăng ký chủ sở hữu!';
      message.error(errorMsg);
    }
    setLoading(false);
  };

  if (userData?.isOwner) {
    return (
      <Card>
        <div className="flex justify-between items-center mb-6">
          <Title level={4} style={{ margin:0 }}>
            <HomeOutlined style={{ marginRight: 8 }} />
            Thông tin chủ sở hữu
          </Title>
          <Button type="primary" disabled icon={<HomeOutlined />}>
            Đã đăng ký chủ sở hữu
          </Button>
        </div>
        
        <div className="text-center py-8">
            <Text type="secondary">
            Bạn đã đăng ký thành công làm chủ sở hữu bất động sản!
          </Text>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <Title level={4} style={{ margin:0 }}>
          <HomeOutlined style={{ marginRight:8}} />
          Thông tin chủ sở hữu
        </Title>
        <Button 
          type="primary" 
          onClick={handleRegisterOwner} 
          loading={loading}
          icon={<HomeOutlined />}
          size="large"
        >
          Đăng ký làm chủ sở hữu
        </Button>
      </div>
      
      <div className="text-center py-12">
        <HomeOutlined style={{ fontSize:48, color: '#d9d99', marginBottom: '16px' }} />
        <Title level={4} type="secondary">
          Bạn chưa đăng ký làm chủ sở hữu
        </Title>
        <Text type="secondary" style={{ fontSize:16 }}>
          Nhấn vào nút "Đăng ký làm chủ sở hữu" để bắt đầu quản lý tài sản bất động sản
        </Text>
      </div>
    </Card>
  );
};

export default OwnerRegistration;