import React from 'react';
import { Layout, Button, Space, Avatar, Dropdown, Menu, Typography, Tooltip } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;
const { Text } = Typography;

const AdminHeader = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();

  const userMenuItems = (
    <Menu
      onClick={({ key }) => {
        if (key === 'logout') {
          localStorage.removeItem('token');
          navigate('/login');
        } else if (key === 'profile') {
          navigate('/admin/profile');
        } else if (key === 'settings') {
          navigate('/admin/settings');
        }
      }}
    >
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Thông tin cá nhân
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Cài đặt tài khoản
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  return (
    <Header
      style={{
        padding: 0,
        background: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #f0f0f0',
        position: 'sticky',
        top: 0,
        zIndex: 999,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => onCollapse(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <Space size="middle" style={{ paddingRight: '24px' }}>
        <Tooltip title="Thông báo">
          <Button type="text" shape="circle" icon={<BellOutlined style={{ fontSize: '18px' }} />} />
        </Tooltip>
        <Dropdown overlay={userMenuItems} placement="bottomRight">
          <Space style={{ cursor: 'pointer' }}>
            <Avatar style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
            <span style={{ fontWeight: 500 }}>
                {user.firstName + " " + user.lastName}
              </span>
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default AdminHeader; 