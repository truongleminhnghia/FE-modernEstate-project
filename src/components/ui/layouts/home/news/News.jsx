import React from "react";
import { Card } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // Thêm Autoplay
import "swiper/css";
import "swiper/css/pagination";

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

const News = () => {
  return (
    <div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 600,
          marginBottom: 24,
          textAlign: "left",
        }}
      >
        <span style={{ color: "#4a90e2" }}>Tin tức</span> thị trường căn hộ
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={16}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
      >
        {newsList.map((news, idx) => (
          <SwiperSlide key={news.id}>
            <div style={{ padding: 12 }}>
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default News;
