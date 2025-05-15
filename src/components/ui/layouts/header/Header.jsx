import React from "react";
import "./Header.css";

const Header = () => (
  <header className="header">
    <div className="header-top">
      <div className="logo">
        <img src="/images/logos/logo-estate.png" alt="Modern Estate" />
      </div>
      <nav className="main-nav">
        <a className="active" href="#">Trang chủ</a>
        <a href="#">Dịch vụ</a>
        <a href="#">Thông tin</a>
      </nav>
      <button className="login-btn">Đăng nhập</button>
    </div>
    <div className="header-bottom">
      <nav className="sub-nav">
        <a href="#">MUA BÁN CĂN HỘ</a>
        <a href="#">CHO THUÊ CĂN HỘ</a>
        <a href="#">DỰ ÁN</a>
        <a href="#">GIỚI THIỆU</a>
        <a href="#">PHÂN TÍCH ĐÁNH GIÁ</a>
        <a href="#">BLOG</a>
      </nav>
    </div>
  </header>
);

export default Header;