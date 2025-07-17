import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Avatar, 
  Typography, 
  Row, 
  Col, 
  Button, 
  Form, 
  Input, 
  Upload, 
  message,
  Tabs,
  Divider
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  EditOutlined,
  CameraOutlined,
  LockOutlined,
  ShopOutlined,
  HomeOutlined
} from '@ant-design/icons';
import BrokerRegistration from '../../../components/user/BrokerRegistration';
import OwnerRegistration from '../../../components/user/OwnerRegistration';
import './MyProfile.css';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export default function MyProfile() {
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
      form.setFieldsValue({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber
      });
    }
  }, [form]);

  const handleUpdateProfile = async (values) => {
    setLoading(true);
    try {
      message.success('Cập nhật thông tin thành công!');
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật thông tin!');
    }
    setLoading(false);
  };

  const handleChangePassword = async (values) => {
    setLoading(true);
    try {
      message.success('Đổi mật khẩu thành công!');
    } catch (error) {
      message.error('Có lỗi xảy ra khi đổi mật khẩu!');
    }
    setLoading(false);
  };

  const handleBrokerUpdate = async (brokerInfo) => {
    setLoading(true);
    try {
      setUser(prev => ({
        ...prev,
        ...brokerInfo
      }));
      message.success('Cập nhật thông tin môi giới thành công!');
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật thông tin môi giới!');
    }
    setLoading(false);
  };

  const handleOwnerUpdate = async (ownerInfo) => {
    setLoading(true);
    try {
      setUser(prev => ({
        ...prev,
        ...ownerInfo
      }));
      message.success('Cập nhật thông tin chủ sở hữu thành công!');
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật thông tin chủ sở hữu!');
    }
    setLoading(false);
  };

  return (
    <div className="profile-container">
      <Row gutter={[24, 24]}>
        {/* Left Column - Profile Overview */}
        <Col xs={24} md={8}>
          <Card className="profile-card">
            <div className="profile-header">
              <Avatar 
                size={120} 
                icon={<UserOutlined />} 
                src={user?.avatar}
                className="profile-avatar"
              />
              <Upload
                showUploadList={false}
                beforeUpload={() => false}
                onChange={({ file }) => {
                  if (file) {
                    // Add your image upload logic here
                    message.success('Cập nhật ảnh đại diện thành công!');
                  }
                }}
              >
                <Button 
                  type="primary" 
                  icon={<CameraOutlined/>}
                  className="avatar-upload-button"
                >
                  Thay đổi ảnh
                </Button>
              </Upload>
            </div>
            <Title level={4} className="profile-name">
              {user?.firstName} {user?.lastName}
            </Title>
            <Text type="secondary" className="profile-email">
              {user?.email}
            </Text>
            <Divider />
            <div className="profile-stats">
              <div className="stat-item">
                <Text strong>0</Text>
                <Text type="secondary">Tin đã đăng</Text>
              </div>
              <div className="stat-item">
                <Text strong>0</Text>
                <Text type="secondary">Tin đã lưu</Text>
              </div>
              {user?.isBroker && (
                <div className="stat-item">
                  <Text strong>0</Text>
                  <Text type="secondary">Giao dịch thành công</Text>
                </div>
              )}
              {user?.isOwner && (
                <div className="stat-item">
                  <Text strong>{user?.propertyCount || 0}</Text>
                  <Text type="secondary">Tài sản sở hữu</Text>
                </div>
              )}
            </div>
          </Card>
        </Col>

        {/* Right Column - Profile Settings */}
        <Col xs={24} md={16}>
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane 
                tab={
                  <span>
                    <UserOutlined style={{ marginRight: "5px" }} />
                    Thông tin cá nhân
                  </span>
                } 
                key="1"
              >
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleUpdateProfile}
                  initialValues={{
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    email: user?.email,
                    phoneNumber: user?.phoneNumber
                  }}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="firstName"
                        label="Tên"
                        rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                      >
                        <Input prefix={<UserOutlined  />} placeholder="Nhập tên" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="lastName"
                        label="Họ"
                        rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
                      >
                        <Input prefix={<UserOutlined />} placeholder="Nhập họ" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Vui lòng nhập email' },
                      { type: 'email', message: 'Email không hợp lệ' }
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="Nhập email" />
                  </Form.Item>
                  <Form.Item
                    name="phoneNumber"
                    label="Số điện thoại"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                  >
                    <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" />
                  </Form.Item>
                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      loading={loading}
                      icon={<EditOutlined />}
                    >
                      Cập nhật thông tin
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane 
                tab={
                  <span>
                    <LockOutlined style={{ marginRight: "5px" }} />
                    Đổi mật khẩu
                  </span>
                } 
                key="2"
              >
                <Form
                  layout="vertical"
                  onFinish={handleChangePassword}
                >
                  <Form.Item
                    name="currentPassword"
                    label="Mật khẩu hiện tại"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu hiện tại" />
                  </Form.Item>
                  <Form.Item
                    name="newPassword"
                    label="Mật khẩu mới"
                    rules={[
                      { required: true, message: 'Vui lòng nhập mật khẩu mới' },
                      { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu mới" />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    label="Xác nhận mật khẩu mới"
                    dependencies={['newPassword']}
                    rules={[
                      { required: true, message: 'Vui lòng xác nhận mật khẩu mới' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject('Mật khẩu xác nhận không khớp');
                        },
                      }),
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu mới" />
                  </Form.Item>
                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      loading={loading}
                      icon={<LockOutlined />}
                    >
                      Đổi mật khẩu
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>

              {/* Tab Thông tin môi giới chỉ hiển thị nếu chưa là owner */}
              {!user?.isOwner && (
                <TabPane 
                  tab={
                    <span>
                      <ShopOutlined style={{ marginRight: "5px" }} />
                      Thông tin môi giới
                    </span>
                  } 
                  key="3"
                >
                  <BrokerRegistration 
                    userData={user}
                    onUpdate={handleBrokerUpdate}
                  />
                </TabPane>
              )}

              {/* Tab Thông tin chủ sở hữu chỉ hiển thị nếu chưa là broker */}
              {!user?.isBroker && (
                <TabPane 
                  tab={
                    <span>
                      <HomeOutlined style={{ marginRight: "5px" }} />
                      Thông tin chủ sở hữu
                    </span>
                  } 
                  key="4"
                >
                  <OwnerRegistration 
                    userData={user}
                    onUpdate={handleOwnerUpdate}
                  />
                </TabPane>
              )}
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
