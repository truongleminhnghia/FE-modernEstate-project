import React from "react";
import { Layout, Menu, Typography } from "antd";
import {
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
      children: [
        {
          key: "pending-approval",
          icon: <FileTextOutlined />,
          label: "Tin đăng chờ duyệt",
          path: "/staff/pending-approval",
          onClick: () => {
            navigate("/staff/listings/pending-approval");
          },
        },
        {
          key: "listings",
          icon: <FileTextOutlined />,
          label: "Danh sách tin đăng",
          path: "/staff/listings",
          onClick: () => {
            navigate("/staff/listings");
          },
        },
      ],
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
      label: "Quản lý gói tin đăng",
      path: "/staff/listings/services/package-management",
    },
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
      width={240}
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