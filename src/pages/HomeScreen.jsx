import React from "react";
import "./HomeScreen.css";
import homeFormImg from '../assets/images/home-form.png';
import { Select } from 'antd';
import 'antd/dist/reset.css';

const { Option } = Select;

const HomeScreen = () => {
  return (
    <div className="home-filter-bg">
      <h1 className="home-filter-title">Chọn nhà ưng ý, giá trị xứng tầm</h1>
      <div className="home-filter-form">
        <div className="home-filter-select">
          <label>Loại căn hộ</label>
          <Select
            defaultValue=""
            style={{ width: 180 }}
            size="large"
            placeholder="Chọn loại căn hộ"
          >
            <Option value="" disabled>Chọn loại căn hộ</Option>
            <Option value="1pn">Căn hộ 1 phòng ngủ</Option>
            <Option value="2pn">Căn hộ 2 phòng ngủ</Option>
            <Option value="3pn">Căn hộ 3 phòng ngủ</Option>
          </Select>
        </div>
        <div className="home-filter-select">
          <label>Vị trí</label>
          <Select
            defaultValue=""
            style={{ width: 180 }}
            size="large"
            placeholder="Chọn vị trí"
          >
            <Option value="" disabled>Chọn vị trí</Option>
            <Option value="q1">Quận 1</Option>
            <Option value="q2">Quận 2</Option>
            <Option value="q7">Quận 7</Option>
          </Select>
        </div>
        <div className="home-filter-select">
          <label>Khoảng giá</label>
          <Select
            defaultValue=""
            style={{ width: 180 }}
            size="large"
            placeholder="Thấp - Cao"
          >
            <Option value="" disabled>Thấp - Cao</Option>
            <Option value="duoi2ty">Dưới 2 tỷ</Option>
            <Option value="2-4ty">2 - 4 tỷ</Option>
            <Option value="tren4ty">Trên 4 tỷ</Option>
          </Select>
        </div>
        <button className="home-filter-btn">Tìm kiếm</button>
      </div>
      <div className="home-filter-image-outer">
        <div className="home-filter-image-bg"></div>
        <img
          src={homeFormImg}
          alt="Apartment"
          className="home-filter-image"
          style={{ marginBottom: "150px" }}
        />
      </div>
    </div>
  );
};

export default HomeScreen;
