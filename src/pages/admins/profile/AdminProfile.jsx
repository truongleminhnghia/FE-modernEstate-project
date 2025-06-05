import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Avatar,
  Typography,
  Button,
  Modal,
  Form,
  Input,
  Upload, 
  message,
  Descriptions, 
  Space,
  Divider,
  Tag
} from 'antd';
import {
  UserOutlined,
  EditOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  UploadOutlined, 
  SaveOutlined,
  CloseCircleOutlined,
  KeyOutlined 
} from '@ant-design/icons';
import moment from 'moment';

const { Title, Text, Paragraph } = Typography;
const primaryColor = '#4a90e2';

const initialAdminData = {
  id: 'ADMIN001',
  name: 'Admin Master',
  email: 'admin.master@example.com',
  phone: '0987654321',
  role: 'Super Administrator',
  avatarUrl: 'https://media.istockphoto.com/id/177228186/vi/anh/capybara-tr%E1%BA%BB.jpg?s=612x612&w=0&k=20&c=yPcmfbI-Z3goVW045v7KOHwFiOsO8EfY7tEertGPrQ8=', 
  registrationDate: '2022-01-01T10:00:00Z',
  lastLogin: '2025-05-24T14:30:00Z',
};

const AdminProfile = () => {
  const [adminData, setAdminData] = useState(initialAdminData);
  const [isEditProfileModalVisible, setIsEditProfileModalVisible] = useState(false);
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);
  
  const [editProfileForm] = Form.useForm();
  const [changePasswordForm] = Form.useForm();

  useEffect(() => {
  }, []);

  const showEditProfileModal = () => {
    editProfileForm.setFieldsValue({
      name: adminData.name,
      phone: adminData.phone,
    });
    setIsEditProfileModalVisible(true);
  };

  const handleEditProfileCancel = () => {
    setIsEditProfileModalVisible(false);
  };

  const handleEditProfileSubmit = (values) => {
    let newAvatarUrl = adminData.avatarUrl;
    if (values.avatar && values.avatar.length > 0 && values.avatar[0].originFileObj) {
        
        message.info("Tính năng upload avatar đang được mô phỏng.");
        newAvatarUrl = `https://i.pravatar.cc/150?u=${Date.now()}`; 
    } else if (values.avatar === null) { 
        newAvatarUrl = ''; 
    }


    const updatedAdminData = {
      ...adminData,
      name: values.name,
      phone: values.phone,
      avatarUrl: newAvatarUrl, 
    };
    setAdminData(updatedAdminData);
    message.success('Cập nhật thông tin cá nhân thành công!');
    setIsEditProfileModalVisible(false);
  };

  const showChangePasswordModal = () => {
    changePasswordForm.resetFields();
    setIsChangePasswordModalVisible(true);
  };

  const handleChangePasswordCancel = () => {
    setIsChangePasswordModalVisible(false);
  };

  const handleChangePasswordSubmit = (values) => {
        console.log('Thông tin đổi mật khẩu:', values);
    if (values.newPassword !== values.confirmNewPassword) {
      message.error('Mật khẩu mới và xác nhận mật khẩu không khớp!');
      return;
    }
    message.success('Đổi mật khẩu thành công!');
    setIsChangePasswordModalVisible(false);
  };

  const uploadProps = {
    name: 'avatar',
    listType: 'picture-card',
    className: 'avatar-uploader',
    showUploadList: false,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('Bạn chỉ có thể upload file JPG/PNG!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Hình ảnh phải nhỏ hơn 2MB!');
      }
      
      editProfileForm.setFieldsValue({ avatar: [file] }); 
      return false; 
    },
    
  };


  return (
    <div style={{ padding: '24px', background: '#f0f2f5' }}>
      <Title level={2} style={{ marginBottom: '24px', color: primaryColor }}>
        <UserOutlined /> Thông tin cá nhân Admin
      </Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8} lg={7} xl={6}>
          <Card bordered={false} style={{ textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.09)' }}>
            <Avatar size={128} src={adminData.avatarUrl} icon={<UserOutlined />} />
            <Title level={4} style={{ marginTop: 16, color: primaryColor }}>{adminData.name}</Title>
            <Tag color="blue" style={{ fontSize: '0.9em', padding: '4px 10px' }}>{adminData.role}</Tag>
            <Divider />
            <Space direction="vertical" align="center" style={{ width: '100%' }}>
              <Button 
                type="primary" 
                icon={<EditOutlined />} 
                onClick={showEditProfileModal}
                style={{ backgroundColor: primaryColor, borderColor: primaryColor, width: '90%' }}
              >
                Chỉnh sửa Thông tin
              </Button>
              <Button 
                icon={<LockOutlined />} 
                onClick={showChangePasswordModal}
                style={{ width: '90%' }}
              >
                Đổi Mật khẩu
              </Button>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={16} lg={17} xl={18}>
          <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.09)' }}>
            <Title level={4} style={{color: primaryColor, marginBottom: 20}}>Chi tiết tài khoản</Title>
            <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
              <Descriptions.Item label={<Space><UserOutlined />Tên đầy đủ</Space>}>{adminData.name}</Descriptions.Item>
              <Descriptions.Item label={<Space><MailOutlined />Email</Space>}>{adminData.email}</Descriptions.Item>
              <Descriptions.Item label={<Space><PhoneOutlined />Số điện thoại</Space>}>{adminData.phone || 'Chưa cập nhật'}</Descriptions.Item>
              <Descriptions.Item label={<Space><UserOutlined />Vai trò</Space>}>{adminData.role}</Descriptions.Item>
              <Descriptions.Item label={<Space><CalendarOutlined />Ngày đăng ký</Space>}>
                {moment(adminData.registrationDate).format('DD/MM/YYYY HH:mm')}
              </Descriptions.Item>
              <Descriptions.Item label={<Space><CalendarOutlined />Đăng nhập lần cuối</Space>}>
                {moment(adminData.lastLogin).format('DD/MM/YYYY HH:mm')} ({moment(adminData.lastLogin).fromNow()})
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      <Modal
        title={<span style={{color: primaryColor, fontWeight: 'bold'}}><EditOutlined /> Chỉnh sửa Thông tin Cá nhân</span>}
        visible={isEditProfileModalVisible}
        onCancel={handleEditProfileCancel}
        footer={null} 
        destroyOnClose
        width={600}
      >
        <Form form={editProfileForm} layout="vertical" onFinish={handleEditProfileSubmit}>
          <Form.Item label="Ảnh đại diện">
            <Form.Item name="avatar" valuePropName="fileList" getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList}>
                 <Upload {...uploadProps} maxCount={1}>
                    {adminData.avatarUrl || (editProfileForm.getFieldValue('avatar') && editProfileForm.getFieldValue('avatar').length > 0) ? 
                        <Avatar size={100} src={ 
                            (editProfileForm.getFieldValue('avatar') && editProfileForm.getFieldValue('avatar').length > 0 && editProfileForm.getFieldValue('avatar')[0].originFileObj) ? 
                            URL.createObjectURL(editProfileForm.getFieldValue('avatar')[0].originFileObj) : 
                            adminData.avatarUrl
                        } icon={<UserOutlined />} />
                        : 
                        (<div><UploadOutlined /><div style={{ marginTop: 8 }}>Chọn ảnh</div></div>)
                    }
                </Upload>
            </Form.Item>
            { (adminData.avatarUrl || (editProfileForm.getFieldValue('avatar') && editProfileForm.getFieldValue('avatar').length > 0 )) &&
                <Button size="small" danger onClick={() => {
                    editProfileForm.setFieldsValue({ avatar: null }); 
                    message.info("Avatar sẽ được xóa khi bạn lưu thay đổi.");
                }}>Xóa ảnh hiện tại</Button>
            }
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên đầy đủ"
            rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nhập tên đầy đủ" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input prefix={<MailOutlined />} disabled value={adminData.email} /> 
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Row justify="end" style={{ marginTop: 24 }}>
            <Space>
              <Button icon={<CloseCircleOutlined />} onClick={handleEditProfileCancel}>Hủy</Button>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />} style={{ backgroundColor: primaryColor, borderColor: primaryColor }}>
                Lưu thay đổi
              </Button>
            </Space>
          </Row>
        </Form>
      </Modal>

      <Modal
        title={<span style={{color: primaryColor, fontWeight: 'bold'}}><LockOutlined /> Đổi Mật khẩu</span>}
        visible={isChangePasswordModalVisible}
        onCancel={handleChangePasswordCancel}
        footer={null}
        destroyOnClose
        width={500}
      >
        <Form form={changePasswordForm} layout="vertical" onFinish={handleChangePasswordSubmit}>
          <Form.Item
            name="currentPassword"
            label="Mật khẩu hiện tại"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
          >
            <Input.Password prefix={<KeyOutlined />} placeholder="Nhập mật khẩu hiện tại" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
              { min: 6, message: 'Mật khẩu mới phải có ít nhất 6 ký tự!' }
            ]}
            hasFeedback 
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)" />
          </Form.Item>
          <Form.Item
            name="confirmNewPassword"
            label="Xác nhận mật khẩu mới"
            dependencies={['newPassword']} 
            hasFeedback
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Nhập lại mật khẩu mới" />
          </Form.Item>
          <Row justify="end" style={{ marginTop: 24 }}>
            <Space>
              <Button icon={<CloseCircleOutlined />} onClick={handleChangePasswordCancel}>Hủy</Button>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />} style={{ backgroundColor: primaryColor, borderColor: primaryColor }}>
                Đổi mật khẩu
              </Button>
            </Space>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProfile;