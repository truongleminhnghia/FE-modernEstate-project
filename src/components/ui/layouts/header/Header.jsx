import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Dropdown, Menu, Button } from "antd";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoginButtonHovered, setIsLoginButtonHovered] = useState(false);

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  // Xác định role
  const role = user?.role?.roleName || null;

  // Tạo menu items theo role
  let menuItems = [];
  if (role === "ROLE_ADMIN") {
    menuItems = [
      { label: "Quản trị viên", key: "admin-dashboard" },
      { label: "Quản lý người dùng", key: "admin-users" },
      { label: "Quản lý giao dịch", key: "admin-transactions" },
      { label: "Hồ sơ quản trị", key: "admin-profile" },
      { type: "divider" },
      { label: "Đăng xuất", key: "logout", danger: true },
    ];
  } else if (role === "ROLE_STAFF") {
    menuItems = [
      { label: "Trang nhân viên", key: "staff-dashboard" },
      { label: "Quản lý tin đăng", key: "staff-listings" },
      { label: "Quản lý dịch vụ", key: "staff-services" },
      { label: "Quản lý dự án", key: "staff-projects" },
      { label: "Tin chờ duyệt", key: "staff-pending" },
      { label: "Quản lý tin tức", key: "staff-news" },
      { type: "divider" },
      { label: "Đăng xuất", key: "logout", danger: true },
    ];
  } else if (role === "ROLE_BROKER") {
    menuItems = [
      { label: "Tài khoản môi giới", key: "profile" },
      { label: "Giao dịch môi giới", key: "transaction" },
      { label: "Danh sách yêu thích", key: "favorite" },
      { type: "divider" },
      { label: "Đăng xuất", key: "logout", danger: true },
    ];
  } else if (role === "ROLE_OWNER") {
    menuItems = [
      { label: "Tài khoản chủ nhà", key: "profile" },
      { label: "Lịch sử giao dịch", key: "transaction" },
      { label: "Danh sách yêu thích", key: "favorite" },
      { type: "divider" },
      { label: "Đăng xuất", key: "logout", danger: true },
    ];
  } else {
    // Mặc định là user
    menuItems = [
      { label: "Tài khoản của tôi", key: "profile" },
      { label: "Lịch sử giao dịch", key: "transaction" },
      { label: "Danh sách yêu thích", key: "favorite" },
      { type: "divider" },
      { label: "Đăng xuất", key: "logout", danger: true },
    ];
  }

  const menu = (
    <Menu
      onClick={(info) => {
        if (info.key === "logout") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/");
        } else if (info.key === "profile") {
          if (role === "ROLE_BROKER") {
            navigate("/broker-profile");
          } else if (role === "ROLE_OWNER") {
            navigate("/owner-profile");
          } else {
            navigate("/user-profile");
          }
        } else if (info.key === "transaction") {
          if (role === "ROLE_BROKER") {
            navigate("/broker-transaction");
          } else if (role === "ROLE_OWNER") {
            navigate("/owner-transaction");
          } else {
            navigate("/user-transactions");
          }
        } else if (info.key === "favorite") {
          if (role === "ROLE_BROKER") {
            navigate("/broker-favorite");
          } else if (role === "ROLE_OWNER") {
            navigate("/owner-favorites");
          } else {
            navigate("/user-favorite");
          }
        } else if (info.key === "admin-dashboard") {
          navigate("/admin/dashboard");
        } else if (info.key === "admin-users") {
          navigate("/admin/users");
        } else if (info.key === "admin-transactions") {
          navigate("/admin/transactions");
        } else if (info.key === "admin-profile") {
          navigate("/admin/profile");
        } else if (info.key === "staff-dashboard" || info.key === "staff-listings") {
          navigate("/staff/listings");
        } else if (info.key === "staff-services") {
          navigate("/staff/services");
        } else if (info.key === "staff-projects") {
          navigate("/staff/projects");
        } else if (info.key === "staff-pending") {
          navigate("/staff/listings/pending-approval");
        } else if (info.key === "staff-news") {
          navigate("/staff/news");
        }
      }}
      items={menuItems}
    />
  );

  const loginButtonStyle = {
    backgroundColor: "#4a90e2",
    borderColor: "#4a90e2",
    color: "#fff",
    borderRadius: "4px",
    transition:
      "background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease",
  };

  const loginButtonHoverStyle = {
    backgroundColor: "#357abd",
    borderColor: "#357abd",
    color: "#fff",
  };

  const getNavLinkClass = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <Link to="/">
            <img src="/images/logos/logo-estate.png" alt="Modern Estate" />
          </Link>
        </div>
        <nav className="main-nav">
          <Link className={getNavLinkClass("/")} to="/">
            Trang chủ
          </Link>
          <Link className={getNavLinkClass("/services")} to="/services">
            Dịch vụ
          </Link>
          <Link className={getNavLinkClass("/information")} to="/information">
            Thông tin
          </Link>
          <Link className={getNavLinkClass("/post")} to="/post">
            Đăng bài viết
          </Link>
        </nav>
        {localStorage.getItem("token") && user ? (
          <Dropdown overlay={menu} trigger={["click"]}>
            <div
              className="user-dropdown"
              onClick={(e) => e.preventDefault()}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "16px",
                cursor: "pointer",
                padding: "5px 10px",
                borderRadius: "4px",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="#4a90e2"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
              <span style={{ fontWeight: 500 }}>
                {user.firstName + " " + user.lastName}
              </span>
            </div>
          </Dropdown>
        ) : (
          <Button
            style={{
              ...loginButtonStyle,
              ...(isLoginButtonHovered ? loginButtonHoverStyle : {}),
            }}
            onMouseEnter={() => setIsLoginButtonHovered(true)}
            onMouseLeave={() => setIsLoginButtonHovered(false)}
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            Đăng nhập
          </Button>
        )}
      </div>
      <div className="header-bottom">
        <nav className="sub-nav">
          <Link className={getNavLinkClass("/can-ho")} to="/can-ho">
            CĂN HỘ
          </Link>
          <Link className={getNavLinkClass("/du-an")} to="/du-an">
            DỰ ÁN
          </Link>
          <Link
            className={getNavLinkClass("/market-analysis")}
            to="/market-analysis"
          >
            PHÂN TÍCH ĐÁNH GIÁ
          </Link>
          <Link className={getNavLinkClass("/news")} to="/news">
            TIN TỨC
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
