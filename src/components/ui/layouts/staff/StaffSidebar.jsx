import React from "react";
import { Layout, Menu, Typography } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  BellOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;
const { Title } = Typography;

const StaffSidebar = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    // {
    //   key: "dashboard",
    //   icon: <DashboardOutlined />,
    //   label: "Tổng quan",
    //   path: "/staff/dashboard",
    // },
    {
      key: "listings",
      icon: <UserOutlined />,
      label: "Quản lý tin đăng",
      path: "/staff/listings",
    },
    // {
    //   key: "contracts",
    //   icon: <FileTextOutlined />,
    //   label: "Quản lý hợp đồng",
    //   path: "/staff/contracts",
    // },
    {
      key: "services",
      icon: <FileTextOutlined />,
      label: "Quản lý dịch vụ",
      path: "/staff/services",
    },
<<<<<<< Tai
    {
      key: "projects",
      icon: <FileTextOutlined />,
      label: "Quản lý dự án",
      path: "/staff/projects",
    },
    {
      key: "news",
      icon: <FileTextOutlined />,
      label: "Quản lý tin tức",
      path: "/staff/news",
    },
    {
      key: "notifications",
      icon: <BellOutlined />,
      label: "Thông báo",
      path: "/staff/notifications",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Cài đặt",
      path: "/staff/settings",
    },
=======
    // {
    //   key: "notifications",
    //   icon: <BellOutlined />,
    //   label: "Thông báo",
    //   path: "/staff/notifications",
    // },
    // {
    //   key: "settings",
    //   icon: <SettingOutlined />,
    //   label: "Cài đặt",
    //   path: "/staff/settings",
    // },
>>>>>>> main
  ];

  const handleMenuClick = ({ key }) => {
    const menuItem = menuItems.find((item) => item.key === key);
    if (menuItem) {
      navigate(menuItem.path);
    }
  };

  const getSelectedKey = () => {
    const path = location.pathname;
    const menuItem = menuItems.find((item) => path.startsWith(item.path));
    return menuItem ? menuItem.key : "dashboard";
  };

  return (
    <Sider
      width={230}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      trigger={null}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <img
          src="/images/logos/logo-estate.png"
          alt="Logo"
          style={{ height: 40 }}
        />
      </div>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[getSelectedKey()]}
        onClick={handleMenuClick}
        items={menuItems}
      />
    </Sider>
  );
};

export default StaffSidebar; 