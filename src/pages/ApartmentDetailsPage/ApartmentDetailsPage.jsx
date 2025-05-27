import React, { useState } from "react";
import "./ApartmentDetailsPage.css";
import { Breadcrumb, Tabs } from "antd";
import { RightOutlined, ShareAltOutlined, HeartOutlined, LeftOutlined, HomeOutlined, BorderOutlined, BoxPlotOutlined, PhoneFilled, CalendarOutlined, MessageOutlined } from '@ant-design/icons';

const images = [
  "https://placehold.co/600x400/gray/gray",
  "https://placehold.co/600x400/gray/gray",
  "https://placehold.co/600x400/gray/gray",
  "https://placehold.co/600x400/gray/gray",
  "https://placehold.co/600x400/gray/gray"
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="apartment-detail-bg">
      {/* Breadcrumb */}
      <div className="apartment-detail-breadcrumb">
        <span>Trang chủ</span> / <span>Mua bán căn hộ</span> / <span className="active">Chi tiết</span>
      </div>

      {/* Top section: Image + Info */}
      <div className="apartment-detail-top">
        <div className="apartment-detail-images">
          <img className="main-img" src={images[currentImageIndex]} alt="main" onClick={handleNextClick} />
          <button className="arrow-button left" onClick={handlePrevClick}><LeftOutlined /></button>
          <button className="arrow-button right" onClick={handleNextClick}><RightOutlined /></button>
          <div className="thumb-list">
            {images.map((img, idx) => (
              <img key={idx} src={img} alt="thumb" className={`thumb-img ${idx === currentImageIndex ? 'active' : ''}`} onClick={() => setCurrentImageIndex(idx)} />
            ))}
          </div>
        </div>
        <div className="apartment-detail-info">
          <div className="apartment-detail-title">{details.title}</div>
          <div className="apartment-detail-price-views-row">
            <div className="apartment-detail-price-left">
              <span className="apartment-detail-label">Giá:</span>
              <span className="apartment-detail-price">{details.price}</span>
            </div>
            <div className="apartment-detail-views">1k lượt xem</div>
          </div>
          <div className="apartment-detail-property-details-row">
            <div className="apartment-detail-icon-item">
            <HomeOutlined />
              <div className="apartment-detail-icon-text">
                <span>Loại hình</span>
                <div>{details.type}</div>
              </div>
            </div>
            <div className="apartment-detail-icon-item">
            <BorderOutlined />
              <div className="apartment-detail-icon-text">
                <span>Diện tích</span>
                <div>{details.area}</div>
              </div>
            </div>
            <div className="apartment-detail-icon-item">
            <BoxPlotOutlined />
              <div className="apartment-detail-icon-text">
                <span>Phòng ngủ</span>
                <div>{details.bed}</div>
              </div>
            </div>
          </div>
          <div className="apartment-detail-address-row">
            <span>{details.address}</span>
          </div>
          <div className="apartment-detail-actions">
            <button><PhoneFilled /><div>Gọi ngay</div></button>
            <button><CalendarOutlined /><div>Đặt lịch</div></button>
            <button className="primary">Yêu cầu tư vấn</button>
          </div>
        </div>
        {/* New button container */}
        <div className="apartment-detail-top-buttons">
          <button className="top-button"><HeartOutlined /></button>
          <button className="top-button"><RightOutlined /></button>
          <button className="top-button"><ShareAltOutlined /></button>
        </div>
      </div>

      {/* Thông tin căn hộ */}
      <div className="apartment-detail-section">
        <div className="apartment-detail-section-title">Thông tin căn hộ</div>
        <div className="apartment-detail-title-underline"></div>
        <div className="apartment-detail-table">
          <div><b>Hình thức</b><div>Mua bán</div></div>
          <div><b>Loại hình</b><div>Chung cư</div></div>
          <div><b>Dự án</b><div>VINHOMES GRAND PARK</div></div>
          <div><b>Hiện trạng</b><div>Thương lượng</div></div>
        </div>
        <div className="apartment-detail-content">
          <div className="apartment-detail-content-title">Nội Dung</div>
          <div className="apartment-detail-content-underline"></div>
          <div className="apartment-detail-content-body">
            {details.content.map((c, i) => (
              <div key={i}>{c}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="apartment-detail-tabs-container">
        <div className="apartment-detail-tabs">
          <div className="tab active">Thông tin chi tiết</div>
          <div className="tab">Thông tin dự án</div>
          <div className="tab">Bản đồ khu vực</div>
        </div>
        <div className="apartment-detail-tab-content">
          <div className="apartment-detail-desc-title">Chi tiết căn</div>
          <div className="apartment-detail-tab-underline"></div>
          <div className="apartment-detail-desc-body">
          Sở hữu vị trí đẹp cạnh các trục đường chính, bất động sản với công năng shophouse mang đến cơ hội kinh doanh hấp dẫn tới các khách hàng. Bất động sản được hoàn thiện tiêu chuẩn có đồ rời được hoàn thiện phòng ngủ, nhà vệ sinh, khu vực bếp để sẵn sàng cho cư dân sử dụng. Tầng 1 được để trống để làm mặt bằng kinh doanh. Những căn hộ được hoàn thiện với phòng khách có sofa, khu vực bếp với bộ bàn ghế ăn, phòng ngủ với giường và rèm, nhà vệ sinh giúp cư dân về ở nhanh chóng và thuận tiện hơn. Bất động sản được thiết kế thông thoáng, đón gió và ánh sáng tự nhiên cùng nội khu đa tiện ích, rộng rãi hứa hẹn mang đến không gian sống thoải mái. Shophouse là sự kết hợp hoàn hảo giữa ở và kinh doanh giúp cư dân tiết kiệm chi phí đầu tư và vận hành kinh doanh tiện lợi hơn. Tiêu chuẩn bàn giao của bất động sản có thể thay đổi bởi Modern Estate tùy thuộc từng giai đoạn mà không có thông báo trước.        </div>
          <div className="apartment-detail-features-title">Chi tiết căn</div>
          <div className="apartment-detail-tab-underline"></div>
          <div className="features-list">
            {details.features.map((f, i) => (
              <div className="feature-item" key={i}>
                <span className="feature-icon">{f.icon}</span>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ABC section */}
      <div className="apartment-detail-related-wrapper">
        <div className="apartment-detail-related-section">
          <div className="apartment-detail-related-title">Bất động sản ABC 
            <div className="related-title-nav">
              <button className="lr"><LeftOutlined></LeftOutlined></button>
              <button className="lr"><RightOutlined></RightOutlined></button>
            </div>
          </div>
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

      {/* Related section */}
      <div className="apartment-detail-related-wrapper">
        <div className="apartment-detail-related-section">
          <div className="apartment-detail-related-title">Bất động sản liên quan 
            <div className="related-title-nav">
              <button className="lr"><LeftOutlined></LeftOutlined></button>
              <button className="lr"><RightOutlined></RightOutlined></button>
            </div>
          </div>
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

      {/* Message Button */}
      <button className="message-button">
        <MessageOutlined />
      </button>
    </div>
  );
};

export default ApartmentDetailsPage;
