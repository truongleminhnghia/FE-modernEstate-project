import React from "react";
import "./HomeScreen.css";
import homeFormImg from "../../../assets/images/home-form.png";
import tpHCMImg from "../../../assets/images/tp_HCM.jpeg";
import { Select, Card, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import testListHomeImg from "../../../assets/images/test_list_home.webp";
import quan1Img from "../../../assets/images/quan_1.jpg";
import thuducImg from "../../../assets/images/thu_duc.jpg";
import q2Img from "../../../assets/images/quan_2.jpg";
import q7Img from "../../../assets/images/quan_7.jpg";
import Slider from "react-slick";
import "antd/dist/reset.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const { Option } = Select;

const HomeScreen = () => {
  const sliderRef = React.useRef();
  const areas = [
    {
      id: 1,
      name: "TP. Hồ Chí Minh",
      image: tpHCMImg,
      large: true,
    },
    {
      id: 2,
      name: "Quận 1",
      image: quan1Img,
    },
    {
      id: 3,
      name: "Quận 2",
      image: q2Img,
    },
    {
      id: 4,
      name: "Thủ Đức",
      image: thuducImg,
    },
    {
      id: 5,
      name: "Quận 7",
      image: q7Img,
    },
  ];
  
  const apartments = [
    {
      id: 1,
      image: testListHomeImg,
      title: "BÁN GẤP CĂN HỘ CAO CẤP CHUNG CƯ MASTERI AN PHÚ",
      price: "25 triệu/tháng",
      area: "50 m²",
      bed: "2 PN",
      bath: "2 WC",
      location: "Q7, TP Hồ Chí Minh",
    },
    {
      id: 2,
      image: testListHomeImg,
      title: "CĂN HỘ THE SUN AVENUE VIEW SÔNG, FULL NỘI THẤT",
      price: "22 triệu/tháng",
      area: "60 m²",
      bed: "2 PN",
      bath: "2 WC",
      location: "Q2, TP Hồ Chí Minh",
    },
    {
      id: 3,
      image: testListHomeImg,
      title: "CĂN HỘ CAO CẤP VINHOMES CENTRAL PARK, TẦNG CAO",
      price: "30 triệu/tháng",
      area: "70 m²",
      bed: "3 PN",
      bath: "2 WC",
      location: "Bình Thạnh, TP Hồ Chí Minh",
    },
    {
      id: 4,
      image: testListHomeImg,
      title: "CHO THUÊ CĂN HỘ SAI GON SOUTH RESIDENCE FULL ĐỒ ",
      price: "18 triệu/tháng",
      area: "55 m²",
      bed: "2 PN",
      bath: "1 WC",
      location: "Q7, TP Hồ Chí Minh",
    },
    {
      id: 5,
      image: testListHomeImg,
      title: "CĂN HỘ MỚI 100%, VIEW CÔNG VIÊN, GIÁ TỐT",
      price: "20 triệu/tháng",
      area: "48 m²",
      bed: "1 PN",
      bath: "1 WC",
      location: "Q9, TP Thủ Đức",
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

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

      <div className="home-filter-image-outer">
        <div className="home-filter-image-bg"></div>
        <img
          src={homeFormImg}
          alt="Apartment"
          className="home-filter-image"
          style={{ marginBottom: "150px" }}
        />
      </div>

      <div
        className="apartment-section main-container"
        style={{ marginTop: 40 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <span style={{ fontSize: 28, fontWeight: 600 }}>
              Căn hộ <span style={{ color: "#4a90e2" }}>dành cho bạn</span>
            </span>
            <div style={{ color: "#888", fontSize: 16, marginTop: 4 }}>
              Ngôi nhà trong mơ của bạn chỉ cách một cú nhấp chuột!
            </div>
          </div>
          <div>
            <Button
              shape="circle"
              icon={<LeftOutlined />}
              style={{ marginRight: 8 }}
              onClick={() => sliderRef.current?.slickPrev()}
            />
            <Button
              shape="circle"
              icon={<RightOutlined />}
              onClick={() => sliderRef.current?.slickNext()}
            />
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <Slider {...sliderSettings} ref={sliderRef}>
            {apartments.map((apt) => (
              <div key={apt.id} style={{ padding: 12 }}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={apt.title}
                      src={apt.image}
                      style={{
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        height: 180,
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  }
                  style={{
                    borderRadius: 16,
                    boxShadow: "0 2px 12px #e0e7ef33",
                    marginBottom: 16,
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: 15, minHeight: 48 }}>
                    {apt.title}
                  </div>
                  <div
                    style={{
                      color: "#4a90e2",
                      fontWeight: 500,
                      margin: "8px 0 4px 0",
                    }}
                  >
                    {apt.price}
                  </div>
                  <div style={{ color: "#888", fontSize: 14 }}>
                    {apt.area} &nbsp; • &nbsp; {apt.bed} &nbsp; • &nbsp;{" "}
                    {apt.bath}
                  </div>
                  <div style={{ color: "#888", fontSize: 14 }}>
                    {apt.location}
                  </div>
                </Card>
              </div>
            ))}
          </Slider>
        </div>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Button
            type="default"
            style={{
              borderRadius: 20,
              color: "#4a90e2",
              borderColor: "#4a90e2",
            }}
          >
            Xem thêm
          </Button>
        </div>
      </div>

      <div className="area-section main-container" style={{ marginTop: 48 }}>
        <div style={{ fontSize: 28, fontWeight: 600, marginBottom: 16, textAlign: "left" }}>
          Căn hộ <span style={{ color: "#4a90e2" }}>theo khu vực</span>
        </div>
        <div className="area-grid">
          <div className="area-grid-large">
            <div className="area-card">
              <img src={areas[0].image} alt={areas[0].name} />
              <div className="area-label">{areas[0].name}</div>
            </div>
          </div>
          <div className="area-grid-small">
            {areas.slice(1).map((area) => (
              <div className="area-card" key={area.id}>
                <img src={area.image} alt={area.name} />
                <div className="area-label">{area.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
