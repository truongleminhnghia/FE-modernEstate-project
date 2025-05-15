import React from "react";
import { Card } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./News.css"; 

const newsList = [
  {
    id: 1,
    image: "https://vinhomesland.vn/wp-content/uploads/2024/09/trung-tam-hoi-cho-trien-lam-quoc-gia.jpg",
    title: "Thách Thức Của Thị Trường Bán Lẻ Thành phố Hồ Chí Minh",
  },
  {
    id: 2,
    image: "https://vinhomesland.vn/wp-content/uploads/2024/09/khach-san-vinhomes-global-gate.jpg",
    title: "3 Lý Do Người Thành Phố Yêu Thích Gem Park",
  },
  {
    id: 3,
    image: "https://vinhomesland.vn/wp-content/uploads/2024/09/cong-vien-xu-so-than-tien-vinhomes-global-gate.jpg",
    title: "Lãi Suất Hạ Và Ổn Định, Cơ Hội Mua Nhà Dễ An Cư Và...",
  },
  {
    id: 4,
    image: "https://vinhomesland.vn/wp-content/uploads/2024/09/biet-thu-tu-lap-tinh-hoa-vinhomes-global-gate.jpg",
    title: "Xu Hướng Thiết Kế Nội Thất 2024 Cho Căn Hộ",
  },
  {
    id: 5,
    image: "https://vinhomesland.vn/wp-content/uploads/2024/09/biet-thu-song-lap-tinh-hoa-vinhomes-global-gate.jpg",
    title: "Chính Sách Ưu Đãi Khi Mua Nhà Đầu Năm",
  },
  {
    id: 6,
    image: "https://vinhomesland.vn/wp-content/uploads/2024/09/biet-thu-don-lap-tinh-hoa-vinhomes-global-gate.jpg",
    title: "Bí Quyết Đầu Tư Căn Hộ Sinh Lời Cao",
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: { slidesToShow: 2, slidesToScroll: 2 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
  ],
};

const News = () => {
  return (
    <div>
        <div style={{ fontSize: 26, fontWeight: 600, marginBottom: 24, textAlign: "left" }}>
          <span style={{ color: "#4a90e2" }}>Tin tức</span> thị trường căn hộ
        </div>
        <div style={{ position: "relative" }}>
          <Slider {...sliderSettings}>
            {newsList.map((news, idx) => (
              <div key={news.id} style={{ padding: 12 }}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={news.title}
                      src={news.image}
                      style={{
                        height: 180,
                        objectFit: "cover",
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                      }}
                    />
                  }
                  style={{
                    borderRadius: 12,
                    boxShadow: "0 2px 12px #e0e7ef33",
                    marginBottom: 16,
                    background: "#fff",
                    padding: 0,
                  }}
                  bodyStyle={{ padding: 16 }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span
                      style={{
                        fontSize: 36,
                        color: "#4a90e2",
                        fontWeight: 700,
                        minWidth: 48,
                        lineHeight: 1,
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontSize: 16, fontWeight: 500, color: "#222" }}>
                      {news.title}
                    </span>
                  </div>
                </Card>
              </div>
            ))}
          </Slider>
        </div>
      </div>
  );
};

export default News;
