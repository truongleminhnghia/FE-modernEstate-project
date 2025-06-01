import React from "react";
import "./HomeScreen.css";
import { Select, Card, Button, Row, Col, Tag } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "antd/dist/reset.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import News from "../../../components/ui/layouts/home/news/News";
import AboutModernEstate from "../../../components/ui/layouts/home/AboutModernEstate";

const { Option } = Select;

const HomeScreen = () => {
  const sliderRef = React.useRef();
  const areas = [
    {
      id: 1,
      name: "TP. Hồ Chí Minh",
      image: "https://vietnamstory.in/wp-content/uploads/2024/07/2-3.jpg",
      large: true,
    },
    {
      id: 2,
      name: "Quận 1",
      image: "https://cdn.silverlandhotels.com/wp-content/uploads/2024/08/district-1-hcmc.jpg",
    },
    {
      id: 3,
      name: "Quận 2",
      image: "https://nasaland.vn/wp-content/uploads/2022/09/Quan-2-1.jpg",
    },
    {
      id: 4,
      name: "Thủ Đức",
      image: "https://www.phatdat.com.vn/wp-content/uploads/2023/07/Astral.jpg",
    },
    {
      id: 5,
      name: "Quận 7",
      image: "https://iwater.vn/Image/Picture/New/333/quan_7.jpg",
    },
  ];

  const apartments = [
    {
      id: 1,
      image: "https://www.nitco.in/nitcoassets/blog/main/scale-down.jpg",
      title: "BÁN GẤP CĂN HỘ CAO CẤP CHUNG CƯ MASTERI AN PHÚ",
      price: "25 triệu/tháng",
      area: "50 m²",
      bed: "2 PN",
      bath: "2 WC",
      location: "Q7, TP Hồ Chí Minh",
    },
    {
      id: 2,
      image: "https://www.nitco.in/nitcoassets/blog/main/scale-down.jpg",
      title: "CĂN HỘ THE SUN AVENUE VIEW SÔNG, FULL NỘI THẤT",
      price: "22 triệu/tháng",
      area: "60 m²",
      bed: "2 PN",
      bath: "2 WC",
      location: "Q2, TP Hồ Chí Minh",
    },
    {
      id: 3,
      image: "https://www.nitco.in/nitcoassets/blog/main/scale-down.jpg",
      title: "CĂN HỘ CAO CẤP VINHOMES CENTRAL PARK, TẦNG CAO",
      price: "30 triệu/tháng",
      area: "70 m²",
      bed: "3 PN",
      bath: "2 WC",
      location: "Bình Thạnh, TP Hồ Chí Minh",
    },
    {
      id: 4,
      image: "https://www.nitco.in/nitcoassets/blog/main/scale-down.jpg",
      title: "CHO THUÊ CĂN HỘ SAI GON SOUTH RESIDENCE FULL ĐỒ ",
      price: "18 triệu/tháng",
      area: "55 m²",
      bed: "2 PN",
      bath: "1 WC",
      location: "Q7, TP Hồ Chí Minh",
    },
    {
      id: 5,
      image: "https://www.nitco.in/nitcoassets/blog/main/scale-down.jpg",
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
  const projects = [
    {
      id: 1,
      name: "HT PEARL",
      status: "Đang xây dựng",
      price: "20 - 30 triệu/m²",
      area: "9200 m²",
      address: "Thuận Giao 09, P. Thuận Giao, TP. Thuận An, Bình Dương",
      type: "Chung cư",
      company: "Cty CP DTTM BĐS Đại Quang Minh",
      image: "https://vcdn1-kinhdoanh.vnecdn.net/2021/04/12/h1-1608362518-2459-1608368047-5797-9436-1618201907.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=M6yQE8ca3G50ckdBgBMT3Q",
      featured: false,
    },
    {
      id: 2,
      name: "HT PEARL",
      status: "Đang xây dựng",
      price: "20 - 30 triệu/m²",
      area: "9200 m²",
      address: "Thuận Giao 09, P. Thuận Giao, TP. Thuận An, Bình Dương",
      type: "Chung cư",
      company: "Cty CP DTTM BĐS Đại Quang Minh",
      image: "https://vcdn1-kinhdoanh.vnecdn.net/2021/04/12/h1-1608362518-2459-1608368047-5797-9436-1618201907.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=M6yQE8ca3G50ckdBgBMT3Q",
      featured: false,
    },
    {
      id: 3,
      name: "HT PEARL",
      status: "Đang xây dựng",
      price: "20 - 30 triệu/m²",
      area: "9200 m²",
      address: "Thuận Giao 09, P. Thuận Giao, TP. Thuận An, Bình Dương",
      type: "Chung cư",
      company: "Cty CP DTTM BĐS Đại Quang Minh",
      image: "https://vcdn1-kinhdoanh.vnecdn.net/2021/04/12/h1-1608362518-2459-1608368047-5797-9436-1618201907.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=M6yQE8ca3G50ckdBgBMT3Q",
      featured: false,
    },
    {
      id: 4,
      name: "HT PEARL",
      status: "Đang xây dựng",
      price: "20 - 30 triệu/m²",
      area: "9200 m²",
      address: "Thuận Giao 09, P. Thuận Giao, TP. Thuận An, Bình Dương",
      type: "Chung cư",
      company: "Cty CP DTTM BĐS Đại Quang Minh",
      image: "https://vcdn1-kinhdoanh.vnecdn.net/2021/04/12/h1-1608362518-2459-1608368047-5797-9436-1618201907.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=M6yQE8ca3G50ckdBgBMT3Q",
      featured: false,
    },
    {
      id: 5,
      name: "Thuận Giao RESIDENCE",
      status: "Đang xây dựng",
      price: "20 - 30 triệu/m²",
      area: "9200 m²",
      address: "Thuận Giao 09, P. Thuận Giao, TP. Thuận An, Bình Dương",
      type: "Chung cư",
      company: "Cty CP DTTM BĐS Đại Quang Minh",
      image: "https://vinhomesland.vn/wp-content/uploads/2024/09/vinhomes-global-gate.jpg",
      featured: true,
    },
  ];
  const featured = projects.find((p) => p.featured);
  const normalProjects = projects.filter((p) => !p.featured);
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
          src={"https://lifetimeenvironmental.com/wp-content/uploads/2025/01/94.jpg"}
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
                    marginTop: 5,
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
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            marginBottom: 16,
            textAlign: "left",
          }}
        >
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
      <div className="main-container">
        <div style={{ margin: "40px 0" }}>
          <div style={{ marginBottom: 24, textAlign: "left" }}>
            <span style={{ fontSize: 28, fontWeight: 600 }}>
              <span style={{ color: "#4a90e2" }}>Dự án</span> trọng điểm
            </span>
            <div style={{ color: "#888", fontSize: 16, marginTop: 4 }}>
              Đầu tư thông minh, tương lai vững chắc.
            </div>
          </div>
          <Row gutter={24} align="stretch">
            <Col xs={24} md={12}>
              <Row gutter={[16, 16]}>
                {normalProjects.slice(0, 4).map((project) => (
                  <Col xs={24} sm={12} key={project.id}>
                    <Card
                      hoverable
                      cover={
                        <img
                          alt={project.name}
                          src={project.image}
                          style={{ height: 110, objectFit: "cover" }}
                        />
                      }
                      style={{
                        borderRadius: 16,
                        boxShadow: "0 2px 12px #e0e7ef33",
                        border: "1px solid #e0e7ef",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        background: "#fff",
                        padding: 0,
                      }}
                      bodyStyle={{ display: "flex", flexDirection: "column", height: "100%", padding: 10 }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>
                          {project.name}
                        </div>
                        <div style={{ color: "#4a90e2", fontWeight: 500, fontSize: 14, marginBottom: 2 }}>
                          {project.price}
                        </div>
                        <div style={{ marginBottom: 2 }}>
                          <Tag color="green" style={{ margin: 0, fontSize: 12 }}>{project.status}</Tag>
                        </div>
                        <div style={{ color: "#888", fontSize: 12, marginBottom: 2 }}>
                          {project.area} • {project.type}
                        </div>
                        <div style={{ color: "#888", fontSize: 13, marginBottom: 2 }}>
                          {project.address.split(',').slice(0, 3).join(',')}
                        </div>
                      </div>
                      <div style={{ marginTop: 2, fontWeight: 500, fontSize: 14}}>
                        <span role="img" aria-label="company">🏢</span> {project.company}
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col xs={24} md={12}>
              {featured && (
                <Card
                  hoverable
                  cover={
                    <img
                      alt={featured.name}
                      src={featured.image}
                      style={{ height: 380, objectFit: "cover" }}
                    />
                  }
                  style={{
                    borderRadius: 16,
                    boxShadow: "0 4px 24px #ffd70055",
                    border: "2px solid #FFD700",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: "#fffbe6",
                    position: "relative",
                  }}
                  bodyStyle={{ display: "flex", flexDirection: "column", height: "100%" }}
                >
                  <div style={{
                    position: "absolute",
                    top: 16,
                    left: -16,
                    background: "#FFD700",
                    color: "#fff",
                    fontWeight: 700,
                    padding: "4px 24px",
                    borderTopLeftRadius: 16,
                    borderBottomRightRadius: 16,
                    fontSize: 15,
                    boxShadow: "0 2px 8px #ffd70055",
                    zIndex: 2
                  }}>
                    NỔI BẬT
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4, color: "#b8860b" }}>
                      {featured.name}
                    </div>
                    <div style={{ color: "#4a90e2", fontWeight: 600, marginBottom: 2 }}>
                      {featured.price}
                    </div>
                    <div style={{ marginBottom: 2 }}>
                      <Tag color="gold" style={{ margin: 0, fontWeight: 600 }}>{featured.status}</Tag>
                    </div>
                    <div style={{ color: "#888", fontSize: 15, marginBottom: 2 }}>
                      {featured.area} • {featured.type}
                    </div>
                    <div style={{ color: "#888", fontSize: 15, marginBottom: 2 }}>
                      {featured.address.split(',').slice(0, 3).join(',')}
                    </div>
                  </div>
                  <div style={{ marginTop: 4, fontWeight: 600, fontSize: 15 }}>
                    <span role="img" aria-label="company">🏢</span> {featured.company}
                  </div>
                </Card>
              )}
            </Col>
          </Row>
        </div>
        <News className="main-container" />
      <AboutModernEstate/>
      </div>
    </div>
  );
};

export default HomeScreen;
