import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { Dropdown, List, Menu, Select } from "antd";

const Header = () => {
  const menu = (
    <Menu
      onClick={(info) => {
        if (info.key === 'logout') {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/";
        }
          if (info.key === 'profile') {
            window.location.href = "/my-profile";
          }
          if (info.key === 'transactions') {
            window.location.href = "/my-transactions";
          }
          if (info.key === 'favorite') {
            window.location.href = "/my-favorite";
          }
      }}
      items={[
        {
          label: 'Tài khoản của tôi',
          key: 'profile',
        },
        {
          label: 'Lịch sử giao dịch',
          key: 'transactions',
        },
        {
          label: 'Danh sách yêu thích',
          key: 'favorite',
        },
        {
          label: 'Đăng xuất',
          key: 'logout',
        },
      ]}
    />
  );
  

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <img src="/images/logos/logo-estate.png" alt="Modern Estate" />
      </div>
      <nav className="main-nav">
        <a className="active" href="#">
          Trang chủ
        </a>
        <a href="#">Dịch vụ</a>
        <a href="#">Thông tin</a>
      </nav>
      {localStorage.getItem("token") ? (
          <Dropdown overlay={menu} trigger={['click']}>
            <div className="user-dropdown" onClick={(e) => e.preventDefault()} style={{display: "flex", alignItems: "center", gap: "10px", fontSize: "16px", cursor: "pointer"}}>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="#4a90e2"
            class="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
          {JSON.parse(localStorage.getItem("user")).firstName + " " + JSON.parse(localStorage.getItem("user")).lastName}
            </div>
          </Dropdown>
      ) : (
        <button className="login-btn">
          <Link to="/login">Đăng nhập</Link>
        </button>
      )}
    </div>
    <div className="header-bottom">
      <nav className="sub-nav">
        <a href="#">MUA BÁN CĂN HỘ</a>
        <a href="#">CHO THUÊ CĂN HỘ</a>
        <a href="#">DỰ ÁN</a>
        <a href="/introduction">GIỚI THIỆU</a>
        <a href="#">PHÂN TÍCH ĐÁNH GIÁ</a>
        <a href="/news">NEWS</a>
      </nav>
      </div>
    </header>
  );
};

export default Header;
