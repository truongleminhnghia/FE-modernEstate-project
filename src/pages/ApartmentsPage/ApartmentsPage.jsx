import React, { useState } from "react";
import "./ApartmentsPage.css";
import { Select, Card, Tag, Pagination } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { MessageOutlined } from '@ant-design/icons';

const { Option } = Select;

const apartments = Array.from({ length: 200 }).map((_, i) => ({
  id: i + 1,
  image: "https://www.nitco.in/nitcoassets/blog/main/scale-down.jpg",
  title: "BÁN GẤP CĂN HỘ CAO CẤP CHUNG CƯ MASTERI AN PHÚ, TP. HCM",
  price: "25 triệu/tháng",
  area: "50 m²",
  bed: "2 PN",
  bath: "2 WC",
  location: "Q7, TP Hồ Chí Minh",
  tag: i % 3 === 0 ? "Mua" : "Cho thuê",
}));

const PAGE_SIZE = 20;

const ApartmentsPage = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(apartments.length / PAGE_SIZE);
  const pagedApts = apartments.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const navigate = useNavigate();

  return (
    <div className="apartments-bg">
      {/* Breadcrumb */}
      <div className="apartments-breadcrumb">
        <Link to="/">Trang chủ</Link> / <span>Căn hộ</span>
      </div>

      {/* Filter */}
      <div className="home-filter-form">
        <div className="home-filter-select">
          <label>Loại căn hộ</label>
          <Select
            defaultValue=""
            style={{ width: 180 }}
            size="large"
            placeholder="Chọn loại căn hộ"
          >
            <Option value="" disabled>
              Chọn loại căn hộ
            </Option>
            <Option value="1pn">Căn hộ 1 phòng ngủ</Option>
            <Option value="2pn">Căn hộ 2 phòng ngủ</Option>
            <Option value="3pn">Căn hộ 3 phòng ngủ</Option>
            <Option value="All">Tất cả</Option>
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
            <Option value="" disabled>
              Chọn vị trí
            </Option>
            <Option value="q1">Quận 1</Option>
            <Option value="q2">Quận 2</Option>
            <Option value="q7">Quận 7</Option>
            <Option value="All">Tất cả</Option>
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
            <Option value="" disabled>
              Thấp - Cao
            </Option>
            <Option value="duoi2ty">Dưới 2 tỷ</Option>
            <Option value="2-4ty">2 - 4 tỷ</Option>
            <Option value="tren4ty">Trên 4 tỷ</Option>
            <Option value="All">Tất cả</Option>
          </Select>
        </div>
        <button className="home-filter-btn">Tìm kiếm</button>
      </div>

      {/* Apartment Grid */}
      <div className="apartments-grid">
        {pagedApts.map((apt) => (
          <Card
            key={apt.id}
            className="apartment-card"
            hoverable
            onClick={() => navigate(`/can-ho/${apt.id}`)}
            cover={
              <div className="apartment-card-img-wrap">
                <img alt={apt.title} src={apt.image} className="apartment-card-img" />
                <Tag className="apartment-card-tag" color={apt.tag === "Mua" ? "#52c41a" : "#4a90e2"}>{apt.tag}</Tag>
              </div>
            }
            bodyStyle={{ padding: 16 }}
          >
            <div className="apartment-card-title">{apt.title}</div>
            <div className="apartment-card-price">{apt.price}</div>
            <div className="apartment-card-info">
              <span>{apt.area}</span>
              <span>•</span>
              <span>{apt.bed}</span>
              <span>•</span>
              <span>{apt.bath}</span>
            </div>
            <div className="apartment-card-location">{apt.location}</div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="apartments-pagination">
        <Pagination
          current={page}
          pageSize={PAGE_SIZE}
          total={apartments.length}
          onChange={(page) => setPage(page)}
          showSizeChanger={false}
        />
      </div>
      {/* Message Button */}
      <button className="message-button">
        <MessageOutlined />
      </button>
    </div>
  );
};

export default ApartmentsPage;
