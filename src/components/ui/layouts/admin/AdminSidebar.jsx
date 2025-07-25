import React from "react";
import { Layout, Menu} from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  FileTextOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

const AdminSidebar = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Tổng quan",
      path: "/admin/dashboard",
    },
    {
      key: "users",
      icon: <UserOutlined />,
      label: "Quản lý tài khoản",
      path: "/admin/users",
    },
    {
      key: "transactions",
      icon: <ShoppingCartOutlined />,
      label: "Giao dịch",
      path: "/admin/transactions",
    },
    {
      key: "reviews",
      icon: <StarOutlined />,
      label: "Quản lý đánh giá",
      path: "/admin/reviews",
    }
  ];

  const handleMenuClick = ({ key, keyPath }) => {
    const findPath = (items, targetKey) => {
      for (const item of items) {
        if (item.key === targetKey) return item.path;
        if (item.children) {
          const childPath = findPath(item.children, targetKey);
          if (childPath) return childPath;
        }
      }
      return null;
    };

    const path = findPath(menuItems, key);
    if (path) {
      navigate(path);
    }
  };

  const getSelectedKey = () => {
    const path = location.pathname;
    const findKey = (items) => {
      for (const item of items) {
        if (item.path && path.startsWith(item.path)) return item.key;
        if (item.children) {
          const childKey = findKey(item.children);
          if (childKey) return childKey;
        }
      }
      return null;
    };
    return findKey(menuItems) || "dashboard";
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

export default AdminSidebar;
