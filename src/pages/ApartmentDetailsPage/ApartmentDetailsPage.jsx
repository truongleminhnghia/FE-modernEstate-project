import React, { useState, useRef } from "react";
import "./ApartmentDetailsPage.css";
import { Breadcrumb, Tabs, Carousel } from "antd";
import { RightOutlined, ShareAltOutlined, HeartOutlined, LeftOutlined, HomeOutlined, BorderOutlined, BoxPlotOutlined, PhoneFilled, CalendarOutlined, MessageOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import MessagePopup from '../../components/popup/MessagePopup';
import ChatPopup from '../../components/popup/ChatPopup';

export function MajesticonsShare(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m20 12l-6.4-7v3.5C10.4 8.5 4 10.6 4 19c0-1.167 1.92-3.5 9.6-3.5V19z"></path></svg>);
}

const images = [
  "/src/assets/images/ap1.jpg",
  "/src/assets/images/ap2.jpg",
  "/src/assets/images/ap3.jpg",
  "/src/assets/images/ap4.jpg",
  "/src/assets/images/ap5.jpg"
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

// Duplicate related items to have more cards for the carousel
const baseRelated = Array.from({ length: 4 }).map((_, i) => ({
  id: i + 1,
  image: images[i % images.length],
  title: "BÁN GẤP CĂN HỘ CAO CẤP CHUNG CƯ MASTERI AN PHÚ, TP...",
  price: "25 triệu/tháng",
  area: "50 m²",
  bed: "2 PN",
  bath: "2 WC",
  location: "Q7, TP Hồ Chí Minh"
}));

const related = [...baseRelated, ...baseRelated, ...baseRelated]; // Duplicate the items

const ApartmentDetailsPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('details');
  const [showPopup, setShowPopup] = useState(false);
  const [currentPopupView, setCurrentPopupView] = useState('message');

  const carouselRef1 = useRef(null); // Ref for the first carousel
  const carouselRef2 = useRef(null); // Ref for the second carousel

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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
    if (!showPopup) { // When opening the popup, reset to the message view
      setCurrentPopupView('message');
    }
  };

  // Function to switch to the chat form view
  const switchToChatView = () => {
    setCurrentPopupView('chat');
  };

  // Function to switch back to the message view (for the back button in ChatPopup)
  const switchToMessageView = () => {
    setCurrentPopupView('message');
  };

  return (
    <div className="apartment-detail-bg">
      {/* Breadcrumb */}
      <div className="apartment-detail-breadcrumb">
        <Link to="/">Trang chủ</Link> / <Link to="/mua-ban-can-ho">Căn hộ</Link> / <span>Chi tiết căn hộ</span>
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
          <button className="top-button"><MajesticonsShare /></button>
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
          <div 
            className={`tab ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => handleTabChange('details')}
          >
            Thông tin chi tiết
          </div>
          <div 
            className={`tab ${activeTab === 'project' ? 'active' : ''}`}
            onClick={() => handleTabChange('project')}
          >
            Thông tin dự án
          </div>
          <div 
            className={`tab ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => handleTabChange('map')}
          >
            Bản đồ khu vực
          </div>
        </div>
        <div className="apartment-detail-tab-content">
          {activeTab === 'details' && (
            <>
              <div className="apartment-detail-desc-title">Chi tiết căn</div>
              <div className="apartment-detail-tab-underline"></div>
              <div className="apartment-detail-desc-body">
                Sở hữu vị trí đẹp cạnh các trục đường chính, bất động sản với công năng shophouse mang đến cơ hội kinh doanh hấp dẫn tới các khách hàng. Bất động sản được hoàn thiện tiêu chuẩn có đồ rời được hoàn thiện phòng ngủ, nhà vệ sinh, khu vực bếp để sẵn sàng cho cư dân sử dụng. Tầng 1 được để trống để làm mặt bằng kinh doanh. Những căn hộ được hoàn thiện với phòng khách có sofa, khu vực bếp với bộ bàn ghế ăn, phòng ngủ với giường và rèm, nhà vệ sinh giúp cư dân về ở nhanh chóng và thuận tiện hơn. Bất động sản được thiết kế thông thoáng, đón gió và ánh sáng tự nhiên cùng nội khu đa tiện ích, rộng rãi hứa hẹn mang đến không gian sống thoải mái. Shophouse là sự kết hợp hoàn hảo giữa ở và kinh doanh giúp cư dân tiết kiệm chi phí đầu tư và vận hành kinh doanh tiện lợi hơn. Tiêu chuẩn bàn giao của bất động sản có thể thay đổi bởi Modern Estate tùy thuộc từng giai đoạn mà không có thông báo trước.
              </div>
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
            </>
          )}

          {activeTab === 'project' && (
            <>
              <div className="apartment-detail-desc-title">Thông tin dự án</div>
              <div className="apartment-detail-tab-underline"></div>
              <div className="apartment-detail-desc-body">
                VINHOMES GRAND PARK là một dự án bất động sản cao cấp được phát triển bởi Vinhomes tại Quận 9, TP.HCM. Dự án có tổng diện tích 120.000m2, bao gồm các căn hộ cao cấp, biệt thự và shophouse. Với vị trí đắc địa, tiện ích đẳng cấp và thiết kế hiện đại, VINHOMES GRAND PARK mang đến không gian sống lý tưởng cho cư dân.
              </div>
            </>
          )}

          {activeTab === 'map' && (
            <>
              <div className="apartment-detail-desc-title">Bản đồ khu vực</div>
              <div className="apartment-detail-tab-underline"></div>
              <div className="apartment-detail-desc-body">
                <div style={{ width: '100%', height: '400px', overflow: 'hidden', borderRadius: '8px' }}>
                  <img 
                    src="/src/assets/images/map.jpg" 
                    alt="Bản đồ khu vực" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }} 
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ABC section */}
      <div className="apartment-detail-related-wrapper">
        <div className="apartment-detail-related-section">
          <div className="apartment-detail-related-title">Bất động sản ABC 
            <div className="related-title-nav">
              {/* Use refs to control the first carousel */}
              <button className="lr" onClick={() => carouselRef1.current.prev()}><LeftOutlined></LeftOutlined></button>
              <button className="lr" onClick={() => carouselRef1.current.next()}><RightOutlined></RightOutlined></button>
            </div>
          </div>
          {/* Wrap the list with Carousel and assign ref */}
          <Carousel ref={carouselRef1} dots={false} infinite={false} slidesToShow={4} slidesToScroll={1}> {/* Hide dots, disable infinite loop */}
            {related.map((apt, index) => (
              <div key={index} className="apartment-detail-related-card"> {/* Keep the card div */}
                <img src={apt.image} alt={apt.title} />
                <div className="apartment-detail-related-info">
                  <div className="apartment-detail-related-title2">{apt.title}</div>
                  <div className="apartment-detail-related-price">{apt.price}</div>
                  <div className="apartment-detail-related-meta">{apt.area} • {apt.bed} • {apt.bath}</div>
                  <div className="apartment-detail-related-location">{apt.location}</div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>      

      {/* Related section */}
      <div className="apartment-detail-related-wrapper">
        <div className="apartment-detail-related-section">
          <div className="apartment-detail-related-title">Bất động sản liên quan 
            <div className="related-title-nav">
              {/* Use refs to control the second carousel */}
              <button className="lr" onClick={() => carouselRef2.current.prev()}><LeftOutlined></LeftOutlined></button>
              <button className="lr" onClick={() => carouselRef2.current.next()}><RightOutlined></RightOutlined></button>
            </div>
          </div>
          {/* Wrap the list with Carousel and assign ref */}
          <Carousel ref={carouselRef2} dots={false} infinite={false} slidesToShow={4} slidesToScroll={1}> {/* Hide dots, disable infinite loop */}
            {related.map((apt, index) => (
             <div key={index} className="apartment-detail-related-card"> {/* Keep the card div */}
                <img src={apt.image} alt={apt.title} />
                <div className="apartment-detail-related-info">
                  <div className="apartment-detail-related-title2">{apt.title}</div>
                  <div className="apartment-detail-related-price">{apt.price}</div>
                  <div className="apartment-detail-related-meta">{apt.area} • {apt.bed} • {apt.bath}</div>
                  <div className="apartment-detail-related-location">{apt.location}</div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Message Button */}
      <button className="message-button" onClick={togglePopup}>
        <MessageOutlined />
      </button>

      {/* Conditionally render MessagePopup or ChatPopup */}
      {showPopup && currentPopupView === 'message' && (
        <MessagePopup showPopup={showPopup} togglePopup={togglePopup} onSwitchToChat={switchToChatView} />
      )}

      {showPopup && currentPopupView === 'chat' && (
        <ChatPopup showPopup={showPopup} togglePopup={togglePopup} onSwitchToMessage={switchToMessageView} />
      )}
    </div>
  );
};

export default ApartmentDetailsPage;
