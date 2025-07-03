import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Layout,
  Row,
  Col,
  Breadcrumb,
  Typography,
  Card,
  Button,
  Tag,
  Tabs,
  Descriptions,
  Divider,
  Space,
  Spin,
  message,
} from "antd";
import {
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  DollarOutlined,
  PhoneOutlined,
  MessageOutlined,
  AppstoreOutlined,
  HomeOutlined,
  UserOutlined,
  CompassOutlined,
} from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoogleMap, useLoadScript, Marker, Circle, DirectionsRenderer } from "@react-google-maps/api";
import favoriteApi from "../../apis/favoriteApi";
import { useParams } from "react-router-dom";
const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const fallbackImages = [
  "https://www.lendlease.com/contentassets/302840d3bc9846579cb9f785ed8abb9a/luxury-interior-design.jpg",
  "https://www.lendlease.com/contentassets/b53bcbea462443b8b1cea6583e5a22f5/modern-luxury-apartment-interior-design-ideas.jpg",
  "https://www.lendlease.com/contentassets/302840d3bc9846579cb9f785ed8abb9a/interior-design-in-luxury-apartments.jpg",
  "https://www.lendlease.com/contentassets/302840d3bc9846579cb9f785ed8abb9a/luxury-interior-design.jpg?width=2560&upscale=false&format=webp&mode=crop&anchor=center&quality=50",
  "https://www.lendlease.com/contentassets/302840d3bc9846579cb9f785ed8abb9a/modern-luxury-apartment-interior.jpg?width=2560&upscale=false&format=webp&mode=crop&anchor=center&quality=50",
];

const similarApartments = [
  {
    id: 1,
    image: "https://www.nitco.in/nitcoassets/blog/main/scale-down.jpg",
    title: "CĂN HỘ CAO CẤP VINHOMES CENTRAL PARK, TẦNG CAO",
    price: "30 triệu/tháng",
    area: "70 m²",
    bed: "3 PN",
    bath: "2 WC",
    location: "Bình Thạnh, TP Hồ Chí Minh",
  },
  {
    id: 2,
    image: "https://www.nitco.in/nitcoassets/blog/main/scale-down.jpg",
    title: "BÁN GẤP CĂN HỘ CAO CẤP CHUNG CƯ MASTERI AN PHÚ",
    price: "25 triệu/tháng",
    area: "50 m²",
    bed: "2 PN",
    bath: "2 WC",
    location: "Q7, TP Hồ Chí Minh",
  },
  {
    id: 3,
    image: "https://www.nitco.in/nitcoassets/blog/main/scale-down.jpg",
    title: "CĂN HỘ THE SUN AVENUE VIEW SÔNG, FULL NỘI THẤT",
    price: "22 triệu/tháng",
    area: "60 m²",
    bed: "2 PN",
    bath: "2 WC",
    location: "Q2, TP Hồ Chí Minh",
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
    { breakpoint: 1200, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

const defaultLat = 10.762622;
const defaultLng = 106.660172;

const ApartmentDetail = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDH65U1tsUHeWw-XMgtSyaVU9Sh4QO4J1o",
    libraries: ["places"],
  });
  
  const { id } = useParams();
  console.log('Apartment ID:', id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);

  const [mapLatLng, setMapLatLng] = useState(null);
  const [directions, setDirections] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const streetViewRef = React.useRef(null);
  useEffect(() => {
    if (currentLocation && mapLatLng) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: currentLocation,
          destination: mapLatLng,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
          } else {
            console.error("Không thể tìm đường:", status);
          }
        }
      );
    }
  }, [currentLocation, mapLatLng]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://bemodernestate.site/api/v1/posts/${id}`
        );
        setApartment(response.data.data);
      } catch (error) {
        message.error("Không thể tải dữ liệu căn hộ");
      } finally {
        setLoading(false);
      }
    };


    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const runGeo = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("Lấy được vị trí hiện tại");
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Lỗi định vị:", error);
            switch (error.code) {
            case error.PERMISSION_DENIED:
              message.error("Bạn đã từ chối cấp quyền truy cập vị trí.");
              break;
            case error.POSITION_UNAVAILABLE:
              message.error("Không thể xác định vị trí hiện tại.");
              break;
            case error.TIMEOUT:
              message.error("Yêu cầu vị trí bị quá thời gian.");
              break;
            default:
              message.error("Không thể lấy vị trí.");
              break;
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      } else {
        console.warn("Trình duyệt không hỗ trợ geolocation");
      }
    };

    // Delay để đảm bảo Maps và Symbol đều ready
    const delay = setTimeout(() => {
      runGeo();
    }, 300); // 👈 delay 300ms đảm bảo ổn định

    return () => clearTimeout(delay);
  }, [isLoaded]);


  useEffect(() => {
    if (
      isLoaded &&
      apartment &&
      apartment.property &&
      apartment.property.address
    ) {
      const addressObj = apartment.property.address;
      const addressString = [
        addressObj.houseNumber,
        addressObj.street,
        addressObj.ward,
        addressObj.district,
        addressObj.city,
        addressObj.country,
      ]
        .filter(Boolean)
        .join(", ");

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: addressString }, (results, status) => {
        if (status === "OK" && results[0]) {
          const loc = results[0].geometry.location;
          setMapLatLng({ lat: loc.lat(), lng: loc.lng() });
          if (streetViewRef.current) {
            new window.google.maps.StreetViewPanorama(streetViewRef.current, {
              position: { lat: 10.841172783357809, lng: 106.83782579813013 },
              pov: { heading: 34, pitch: 10 },
              zoom: 1,
            });
          }

        } else {
          setMapLatLng({ lat: defaultLat, lng: defaultLng });
        }
      });
    }
  }, [isLoaded, apartment]);

  useEffect(() => {
    const checkIsFavorite = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const accountId = user?.id;
        const propertyId = apartment?.property?.id;

        if (!accountId || !propertyId) return;

        const res = await favoriteApi.getFavorites(accountId);
        const match = res.data.data.find(fav => fav.propertyId === propertyId);

        if (match) {
          setIsFavorite(true);
          setFavoriteId(match.id);
        }
      } catch (err) {
        console.error("Không thể kiểm tra trạng thái yêu thích", err);
      }
    };

    if (apartment) {
      checkIsFavorite();
    }
  }, [apartment]);

  const handleToggleFavorite = async () => {
    const propertyId = apartment?.property?.id;
    if (!propertyId) {
      message.error("Không xác định được căn hộ.");
      return;
    }

    try {
      if (isFavorite) {
        await favoriteApi.removeFavorite(favoriteId);
        setIsFavorite(false);
        setFavoriteId(null);
        message.success("Đã xoá khỏi yêu thích");
      } else {
        const res = await favoriteApi.addFavorite(propertyId);
        setIsFavorite(true);
        setFavoriteId(res.data.data?.id);
        message.success("Đã thêm vào danh sách yêu thích!");
      }
    } catch (err) {
      message.error("Lỗi thao tác yêu thích");
    }
  };

  if (loading) return <Spin style={{ marginTop: 100 }} />;
  if (!apartment) return null;

  const property = apartment.property;
  const contact = apartment.contact;
  const validImages = (property.propertyImages || [])
    .map(img => img.imageUrl)
    .filter(Boolean); // chỉ lấy ảnh có imageUrl

  const images = validImages.length > 0 ? validImages : fallbackImages;
  const addressObj = property.address;
  const addressString = [
    addressObj.houseNumber,
    addressObj.street,
    addressObj.ward,
    addressObj.district,
    addressObj.city,
    addressObj.country,
  ]
    .filter(Boolean)
    .join(", ");
  console.log(addressString);
  return (
    <Layout
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        padding: "0 8rem",
        minHeight: "100vh",
        background: "#f3f8fd",
      }}
    >
      <Content>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>Mua căn hộ</Breadcrumb.Item>
          <Breadcrumb.Item>Chi tiết</Breadcrumb.Item>
        </Breadcrumb>

        <Row gutter={24}>
          <Col xs={24} md={16}>
            <div style={{ borderRadius: 12, overflow: "hidden" }}>
              <Swiper
                modules={[Navigation, Thumbs]}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                style={{ borderRadius: 12 }}
              >
                {images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      alt={`apartment-${idx}`}
                      style={{
                        width: "100%",
                        height: 400,
                        objectFit: "cover",
                        borderRadius: 12,
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                slidesPerView="auto"
                watchSlidesProgress
                style={{ marginTop: 8, height: 100, width: "100%" }}
              >
                {images.map((img, idx) => (
                  <SwiperSlide
                    key={idx}
                    style={{
                      cursor: "pointer",
                      width: 168,
                      height: 90,
                      marginRight: 5,
                    }}
                  >
                    <img
                      src={img}
                      alt={`thumb-${idx}`}
                      style={{
                        width: 165,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 8,
                        border: "2px solid #eee",
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <Card>
              <Space
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingBottom: "5px",
                }}
              >
                <Button
                  icon={
                    isFavorite ? (
                      <HeartFilled style={{ color: "#f5222d" }} />
                    ) : (
                      <HeartOutlined />
                    )
                  }
                  onClick={handleToggleFavorite}
                />
                <Button icon={<ShareAltOutlined />} />
              </Space>
              <Title level={4}>{property.title}</Title>
              <Space>
                <EnvironmentOutlined />
                <Text>{addressString}</Text>
              </Space>
              <Divider />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#f0f5ff",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "0.75rem",
                  margin: "0.5rem 0 1rem 0",
                  border: "1px solid #e6f0ff",
                  boxShadow: "0 2px 8px rgba(24,144,255,0.05)",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <DollarOutlined style={{ color: "#1890ff", fontSize: 22 }} />
                  <Text strong style={{ fontSize: 22, color: "#1890ff" }}>
                    {property.price.toLocaleString()}{" "}
                    <span style={{ fontSize: 16, color: "#595959" }}>VND</span>
                  </Text>
                </span>
                <Text style={{ fontSize: 16, color: "#8c8c8c" }}>Giá bán</Text>
              </div>
              <div style={{ margin: "24px 10px 20px 40px" }}>
                <Row gutter={24}>
                  <Col xs={12}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 16,
                      }}
                    >
                      <AppstoreOutlined
                        style={{
                          fontSize: 22,
                          color: "#1890ff",
                          marginRight: 10,
                        }}
                      />
                      <span style={{ fontWeight: 500, color: "#555" }}>
                        {property.area} m²
                      </span>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <HomeOutlined
                        style={{
                          fontSize: 22,
                          color: "#1890ff",
                          marginRight: 10,
                        }}
                      />
                      <span style={{ fontWeight: 500, color: "#555" }}>
                        {property.numberOfBedrooms} phòng ngủ
                      </span>
                    </div>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col xs={12}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 16,
                      }}
                    >
                      <UserOutlined
                        style={{
                          fontSize: 22,
                          color: "#1890ff",
                          marginRight: 10,
                        }}
                      />
                      <span style={{ fontWeight: 500, color: "#555" }}>
                        {property.numberOfBathrooms} phòng tắm
                      </span>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <CompassOutlined
                        style={{
                          fontSize: 22,
                          color: "#1890ff",
                          marginRight: 10,
                        }}
                      />
                      <span style={{ fontWeight: 500, color: "#555" }}>
                        {property.houseDirection}
                      </span>
                    </div>
                  </Col>
                </Row>
              </div>
              <Row
                gutter={24}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Col xs={8} style={{ textAlign: "center" }}>
                  <PhoneOutlined style={{ fontSize: 20, color: "#1890ff" }} />
                  <div style={{ marginTop: 4, fontSize: 14 }}>Gọi ngay</div>
                </Col>
                <Col xs={8} style={{ textAlign: "center" }}>
                  <CalendarOutlined
                    style={{ fontSize: 20, color: "#1890ff" }}
                  />
                  <div style={{ marginTop: 4, fontSize: 14 }}>Đặt lịch</div>
                </Col>
              </Row>
              <Button type="primary" style={{ width: "100%", marginTop: 16 }}>
                Yêu cầu tư vấn
              </Button>
            </Card>
          </Col>
        </Row>

        <Row gutter={24} style={{ marginTop: 24 }}>
          <Col xs={24} md={16}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Thông tin chi tiết" key="1">
                <Paragraph style={{ textAlign: "left" }}>
                  {property.description}
                </Paragraph>
                <Divider />
                <div style={{ textAlign: "left" }}>
                  <Text strong style={{ fontSize: 16 }}>
                    Tiện ích
                  </Text>
                  <div
                    style={{
                      marginTop: 12,
                      display: "flex",
                      gap: 12,
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                    }}
                  >
                    {property.attribute.map((attr, idx) => (
                      <Tag
                        key={idx}
                        color="blue"
                        style={{ fontSize: 15, padding: "4px 16px" }}
                      >
                        {attr}
                      </Tag>
                    ))}
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Thông tin dự án" key="2">
                <Text>Dự án: Sunshine City – Quận 7</Text>
              </TabPane>
            </Tabs>
          </Col>
          <Col xs={24} md={8}>
            <Card style={{ height: "170px" }}>
              <Title
                level={5}
                style={{ fontWeight: "bold", color: "#1890ff", fontSize: 20 }}
              >
                Liên hệ
              </Title>
              <Text strong>Người liên hệ:</Text>{" "}
              <Text>{contact.contactName}</Text>
              <br />
              <Text strong>SĐT:</Text> <Text>{contact.contactPhone}</Text>
              <br />
              <Text strong>Email:</Text> <Text>{contact.contactEmail}</Text>
            </Card>
          </Col>
        </Row>
        {/* Section: Bản đồ khu vực */}
        <Row gutter={24}>
          <Col xs={24} md={16}>
            <div
              style={{
                width: "100%",
                height: 450,
                position: "relative",
                margin: "40px 0 0 0",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <Title
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: "left",
                  marginBottom: 10,
                }}
              >
                Bản đồ khu vực
              </Title>
              {console.log("Rendering map with coordinates:", mapLatLng)}
              {console.log("Marker position:", mapLatLng)}
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "400px" }}
                  center={mapLatLng || currentLocation}
                  zoom={15}
                >

                  {directions && (
                    <DirectionsRenderer
                      directions={directions}
                      options={{ suppressMarkers: true }}
                    />
                  )}

                  {/* Marker: Căn hộ */}
                  {mapLatLng && (
                    <Marker
                      position={mapLatLng}
                    />
                  )}

                  {/* Marker vị trí hiện tại */}
                  {currentLocation && window.google?.maps?.SymbolPath && (
                    <Marker
                      position={currentLocation}
                      zIndex={999}
                      icon={{
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: 10,
                        fillColor: "#4285F4",
                        fillOpacity: 1,
                        strokeColor: "white",
                        strokeWeight: 3,
                      }}
                    />
                  )}

                </GoogleMap>

              ) : (
                <div
                  style={{
                    height: 350,
                    background: "#f0f0f0",
                    textAlign: "center",
                    lineHeight: "350px",
                  }}
                >
                  Đang tải bản đồ...
                </div>
              )}
            </div>
            <Button
              type="primary"
              style={{ marginTop: 16 }}
              onClick={() => {
                if (currentLocation && mapLatLng) {
                  const gmapUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation.lat},${currentLocation.lng}&destination=${mapLatLng.lat},${mapLatLng.lng}&travelmode=driving`;
                  window.open(gmapUrl, "_blank");
                }
              }}
            >
              Chỉ đường từ vị trí của bạn
            </Button>

          </Col>
          <Col xs={24} md={8}>
            <Card style={{ width: "100%", height: "400px", marginTop: 20 }}>
              <Title
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: "left",
                  marginBottom: 15,
                }}
              >
                Mục lục
              </Title>
              <Text>
                <ul style={{ padding: 0, margin: 0, textAlign: "left" }}>
                  <li>
                    <a href="/">Trang chủ</a>
                  </li>
                </ul>
              </Text>
              <Divider />
              <Text>
                <ul style={{ padding: 0, margin: 0, textAlign: "left" }}>
                  <li>
                    <a href="/can-ho">Danh sách căn hộ</a>
                  </li>
                </ul>
              </Text>
              <Divider />
              <Text>
                <ul style={{ padding: 0, margin: 0, textAlign: "left" }}>
                  <li>
                    <a href="/news">Tin tức căn hộ</a>
                  </li>
                </ul>
              </Text>
              <Divider />
              <Text>
                <ul style={{ padding: 0, margin: 0, textAlign: "left" }}>
                  <li>
                    <a href="/market-analysis">Phân tích đánh giá</a>
                  </li>
                </ul>
              </Text>
              <Divider />
              <Text>
                <ul style={{ padding: 0, margin: 0, textAlign: "left" }}>
                  <li>
                    <a href="/services">Dịch vụ</a>
                  </li>
                </ul>
              </Text>
              <Divider />
            </Card>
          </Col>
        </Row>

        <Row gutter={24} style={{ marginTop: 24 }}>
          <Col xs={24} md={16}>
            <div
              style={{
                width: "100%",
                height: 450,
                position: "relative",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <Title
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: "left",
                  marginBottom: 10,
                }}
              >
                Trải nghiệm 360° khu vực
              </Title>
              <div
                ref={streetViewRef}
                style={{ width: "100%", height: "100%", borderRadius: 12 }}
              />
            </div>
          </Col>
        </Row>

      </Content>
      {/* Section: Căn hộ tương tự */}
      <div style={{ marginTop: 40, marginBottom: 40 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <span style={{ fontSize: 24, fontWeight: 600 }}>
              Có thể <span style={{ color: "#4a90e2" }}>bạn sẽ thích</span>
            </span>
            <div style={{ color: "#888", fontSize: 15, marginTop: 4 }}>
              Gợi ý các căn hộ phù hợp với bạn
            </div>
          </div>
        </div>
        <div style={{ marginTop: 24 }}>
          <Slider {...sliderSettings}>
            {similarApartments.map((apt) => (
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
                    boxShadow: "0 6px 12px rgba(66, 107, 148, 0.2)",
                    marginBottom: 20,
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
      </div>
    </Layout>
  );
};

export default ApartmentDetail;
