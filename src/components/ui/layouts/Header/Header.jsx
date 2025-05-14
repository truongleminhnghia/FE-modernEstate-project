import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";


const Header = () => (
  <header className="header">
    <div className="header-top">
      <div className="logo">
        <Link to={'/'}>
          <img src="/images/logos/logo-estate.png" alt="Modern Estate" />
        </Link>
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
        <a href="/mua-ban-can-ho">MUA BÁN CĂN HỘ</a>
        <a href="/cho-thue-can-ho">CHO THUÊ CĂN HỘ</a>
        <a href="#">DỰ ÁN</a>
        <a href="#">GIỚI THIỆU</a>
        <a href="#">PHÂN TÍCH ĐÁNH GIÁ</a>
        <a href="#">BLOG</a>
      </nav>
    </div>
  </header>
);

export default Header;