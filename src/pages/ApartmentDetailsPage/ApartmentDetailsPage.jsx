import React from "react";
import "./ApartmentDetailsPage.css";
import { Breadcrumb, Tabs, Tag } from "antd";

const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429"
];

const details = {
  title: "Căn hộ Origami, Vin Grand Park Q.9, 66.5m2, 2PN, 2WC",
  price: "5.6 tỷ",
  type: "Chung cư",
  area: "66.5 m²",
  bed: "2 PN",
  bath: "2 WC",
  address: "Đường Nguyễn Xiển, P. Long Bình, Q.9, TP Hồ Chí Minh, Việt Nam.",
  project: "VINHOMES GRAND PARK",
  status: "Thương lượng",
  content: [
    "Bán căn hộ 2pn 2wc, diện tích 66.5 m2, Vinhomes grand Park tp Thủ Đức.",
    "View Landmark 81, Sân golf Thủ Đức",
    "Tiện ích hồ bơi, công viên nội khu, bãi đỗ ô tô, công viên 36ha ... đẹp như hình."
  ],
  features: [
    { icon: "🔥", label: "Bình nóng lạnh" },
    { icon: "🍳", label: "Bếp điện" },
    { icon: "🗄️", label: "Tủ bếp" },
    { icon: "🪑", label: "Bàn ghế ăn" },
    { icon: "👚", label: "Tủ quần áo" },
    { icon: "🚿", label: "Buồng tắm đứng" }
  ]
};

const related = Array.from({ length: 4 }).map((_, i) => ({
  id: i + 1,
  image: images[i % images.length],
  title: "BÁN GẤP CĂN HỘ CAO CẤP CHUNG CƯ MASTERI AN PHÚ, TP...",
  price: "25 triệu/tháng",
  area: "50 m²",
  bed: "2 PN",
  bath: "2 WC",
  location: "Q7, TP Hồ Chí Minh"
}));

const ApartmentDetailsPage = () => {
  return (
    <div className="apartment-detail-bg">
      {/* Breadcrumb */}
      <div className="apartment-detail-breadcrumb">
        <span>Trang chủ</span> / <span>Mua bán căn hộ</span> / <span className="active">Chi tiết</span>
      </div>

      {/* Top section: Image + Info */}
      <div className="apartment-detail-top">
        <div className="apartment-detail-images">
          <img className="main-img" src={images[0]} alt="main" />
          <div className="thumb-list">
            {images.map((img, idx) => (
              <img key={idx} src={img} alt="thumb" className="thumb-img" />
            ))}
          </div>
        </div>
        <div className="apartment-detail-info">
          <div className="apartment-detail-title">{details.title}</div>
          <div className="apartment-detail-row">
            <span className="apartment-detail-label">Giá:</span>
            <span className="apartment-detail-price">{details.price}</span>
            <Tag color="blue">{details.type}</Tag>
          </div>
          <div className="apartment-detail-row">
            <span>Diện tích: {details.area}</span>
            <span>Phòng ngủ: {details.bed}</span>
            <span>WC: {details.bath}</span>
          </div>
          <div className="apartment-detail-row">
            <span>{details.address}</span>
          </div>
          <div className="apartment-detail-actions">
            <button>Gọi ngay</button>
            <button>Đặt lịch</button>
            <button className="primary">Yêu cầu tư vấn</button>
          </div>
        </div>
      </div>

      {/* Thông tin căn hộ */}
      <div className="apartment-detail-section">
        <div className="apartment-detail-section-title">Thông tin căn hộ</div>
        <div className="apartment-detail-table">
          <div><b>Hình thức</b><div>Mua bán</div></div>
          <div><b>Loại hình</b><div>Chung cư</div></div>
          <div><b>Dự án</b><div>VINHOMES GRAND PARK</div></div>
          <div><b>Hiện trạng</b><div>Thương lượng</div></div>
        </div>
        <div className="apartment-detail-content">
          <div className="apartment-detail-content-title">Nội Dung</div>
          <div className="apartment-detail-content-body">
            {details.content.map((c, i) => (
              <div key={i}>{c}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="apartment-detail-tabs">
        <div className="tab active">Thông tin chi tiết</div>
        <div className="tab">Thông tin dự án</div>
        <div className="tab">Bản đồ khu vực</div>
      </div>
      <div className="apartment-detail-tab-content">
        <div className="apartment-detail-desc-title">Chi tiết căn</div>
        <div className="apartment-detail-desc-body">
          Sở hữu vị trí đẹp cạnh các trục đường chính, bất động sản với công năng shophouse mang đến cơ hội kinh doanh hấp dẫn... (mô tả mẫu)
        </div>
        <div className="apartment-detail-features-title">Chi tiết căn</div>
        <div className="features-list">
          {details.features.map((f, i) => (
            <div className="feature-item" key={i}>
              <span className="feature-icon">{f.icon}</span>
              <span>{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Related section */}
      <div className="apartment-detail-related-wrapper">
        <div className="apartment-detail-related-section">
          <div className="apartment-detail-related-title">Bất động sản liên quan</div>
          <div className="apartment-detail-related-list">
            {related.map((apt) => (
              <div className="apartment-detail-related-card" key={apt.id}>
                <img src={apt.image} alt={apt.title} />
                <div className="apartment-detail-related-info">
                  <div className="apartment-detail-related-title2">{apt.title}</div>
                  <div className="apartment-detail-related-price">{apt.price}</div>
                  <div className="apartment-detail-related-meta">{apt.area} • {apt.bed} • {apt.bath}</div>
                  <div className="apartment-detail-related-location">{apt.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetailsPage;
