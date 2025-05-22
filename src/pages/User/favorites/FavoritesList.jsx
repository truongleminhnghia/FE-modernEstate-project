import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Select,
  Input,
  Tag,
  Space,
  Empty,
  message,
} from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import "./FavoritesList.css";

const { Title, Text } = Typography;
const { Option } = Select;

const FavoritesList = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Mock data - replace with actual API data
  const favorites = [
    {
      id: "1",
      title: "CĂN HỘ CAO CẤP VINHOMES CENTRAL PARK, TẦNG CAO",
      price: "30 triệu/tháng",
      area: "70 m²",
      bed: "3 PN",
      bath: "2 WC",
      location: "Bình Thạnh, TP Hồ Chí Minh",
      image: "https://www.nitco.in/nitcoassets/blog/main/scale-down.jpg",
      type: "Cho thuê",
      savedDate: "2024-03-15",
    },
    {
      id: "2",
      title: "BÁN GẤP CĂN HỘ CAO CẤP CHUNG CƯ MASTERI AN PHÚ",
      price: "25 triệu/tháng",
      area: "50 m²",
      bed: "2 PN",
      bath: "2 WC",
      location: "Q7, TP Hồ Chí Minh",
      image: "https://www.nitco.in/nitcoassets/blog/main/scale-down.jpg",
      type: "Cho thuê",
      savedDate: "2024-03-14",
    },
    {
      id: "3",
      title: "CĂN HỘ THE SUN AVENUE VIEW SÔNG, FULL NỘI THẤT",
      price: "22 triệu/tháng",
      area: "60 m²",
      bed: "2 PN",
      bath: "2 WC",
      location: "Q2, TP Hồ Chí Minh",
      image: "https://www.nitco.in/nitcoassets/blog/main/scale-down.jpg",
      type: "Cho thuê",
      savedDate: "2024-03-13",
    },
  ];

  const handleSearch = (value) => {
    setSearchText(value);
    // Implement search logic
  };

  const handleFilter = (values) => {
    // Implement filter logic
    console.log("Filter values:", values);
  };

  const handleRemoveFavorite = (id) => {
    // Implement remove favorite logic
    message.success("Đã xóa khỏi danh sách yêu thích");
  };

  const handleViewDetails = (id) => {
    // Implement view details logic
    console.log("View details:", id);
  };

  return (
    <div className="favorites-container">
      <Card>
        <div className="favorites-header">
          <Title level={4}>Danh sách yêu thích</Title>
          <div className="favorites-filters">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8}>
                <Input
                  placeholder="Tìm kiếm bất động sản"
                  prefix={<SearchOutlined />}
                  onChange={(e) => handleSearch(e.target.value)}
                  allowClear
                />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Select
                  placeholder="Loại căn hộ"
                  style={{ width: "100%" }}
                  onChange={(value) => handleFilter({ type: value })}
                  allowClear
                >
                  <Option value="rent">Cho thuê</Option>
                  <Option value="buy-sell">Mua bán</Option>
                  <Option value="all">Tất cả</Option>
                </Select>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Select
                  placeholder="Sắp xếp theo"
                  style={{ width: "100%" }}
                  onChange={(value) => handleFilter({ sort: value })}
                  defaultValue="newest"
                >
                  <Option value="newest">Mới nhất</Option>
                  <Option value="oldest">Cũ nhất</Option>
                  <Option value="price_asc">Giá tăng dần</Option>
                  <Option value="price_desc">Giá giảm dần</Option>
                </Select>
              </Col>
            </Row>
          </div>
        </div>

        {favorites.length > 0 ? (
          <Row gutter={[24, 24]} className="favorites-list">
            {favorites.map((item) => (
              <Col xs={24} sm={12} lg={8} key={item.id}>
                <Card
                  hoverable
                  className="favorite-card"
                  cover={
                    <div className="favorite-image-container">
                      <img
                        alt={item.title}
                        src={item.image}
                        className="favorite-image"
                      />
                      <Tag color="blue" className="property-type">
                        {item.type}
                      </Tag>
                    </div>
                  }
                  actions={[
                    <Button
                      type="text"
                      icon={<EyeOutlined />}
                      onClick={() => handleViewDetails(item.id)}
                    >
                      Xem chi tiết
                    </Button>,
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveFavorite(item.id)}
                    >
                      Xóa
                    </Button>,
                  ]}
                >
                  <div className="favorite-content">
                    <Title level={5} className="favorite-title">
                      {item.title}
                    </Title>
                    <Text className="favorite-price">{item.price}</Text>
                    <div className="favorite-details">
                      <Space size="middle">
                        <span>
                          <HomeOutlined /> {item.area}
                        </span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="17"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="none"
                              stroke="#666666"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="32"
                              d="M384 240H96V136a40.12 40.12 0 0 1 40-40h240a40.12 40.12 0 0 1 40 40v104ZM48 416V304a64.19 64.19 0 0 1 64-64h288a64.19 64.19 0 0 1 64 64v112"
                            />
                            <path
                              fill="none"
                              stroke="#666666"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="32"
                              d="M48 416v-8a24.07 24.07 0 0 1 24-24h368a24.07 24.07 0 0 1 24 24v8M112 240v-16a32.09 32.09 0 0 1 32-32h80a32.09 32.09 0 0 1 32 32v16m0 0v-16a32.09 32.09 0 0 1 32-32h80a32.09 32.09 0 0 1 32 32v16"
                            />
                          </svg>
                          {item.bed}
                        </span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                          >
                            <g fill="none">
                              <path
                                stroke="#666666"
                                stroke-width="1.5"
                                d="M3 13.083c0-.077 0-.116.002-.148a1 1 0 0 1 .933-.933c.033-.002.07-.002.148-.002h15.834c.077 0 .115 0 .148.002a1 1 0 0 1 .933.933c.002.032.002.07.002.148c0 .395 0 .593-.014.815c-.209 3.287-3.003 6.189-6.28 6.52c-.221.023-.35.028-.608.038A57 57 0 0 1 12 20.5c-.65 0-1.364-.017-2.098-.044c-.258-.01-.387-.015-.607-.037c-3.278-.332-6.072-3.234-6.28-6.521C3 13.676 3 13.478 3 13.083Z"
                              />
                              <path
                                stroke="#666666"
                                stroke-linecap="round"
                                stroke-width="1.5"
                                d="m6 20l-1 2m13-2l1 2M2 12h20"
                              />
                              <path
                                fill="#666666"
                                d="M2.25 13a.75.75 0 0 0 1.5 0zM7.6 3.5l.696-.28zm.379.947l.328.674zM6.362 6.192l.695.283zm4.215-1.814l-.295.69zM6.346 8.742l-.698.275a.75.75 0 0 0 .994.413zm5.96-2.567l.297.69a.75.75 0 0 0 .401-.964zM3.75 13V4.385h-1.5V13zM5.385 2.75c.669 0 1.27.407 1.518 1.028l1.393-.557a3.135 3.135 0 0 0-2.91-1.971zM3.75 4.385c0-.903.732-1.635 1.635-1.635v-1.5A3.135 3.135 0 0 0 2.25 4.385zm3.153-.607l.38.948l1.392-.557l-.379-.948zm.14 4.689a2.68 2.68 0 0 1 .014-1.992l-1.39-.565a4.18 4.18 0 0 0-.02 3.107zm4.967-2.98L6.049 8.053l.593 1.377l5.96-2.566zm-1.728-.42c.622.266 1.085.77 1.327 1.383l1.395-.55a3.97 3.97 0 0 0-2.132-2.212zM7.057 6.476a2.57 2.57 0 0 1 1.25-1.354l-.656-1.348A4.07 4.07 0 0 0 5.667 5.91zm1.25-1.354a2.36 2.36 0 0 1 1.975-.053l.59-1.38a3.86 3.86 0 0 0-3.221.085z"
                              />
                            </g>
                          </svg>{" "}
                          {item.bath}
                        </span>
                      </Space>
                    </div>
                    <div className="favorite-location">
                      <EnvironmentOutlined /> {item.location}
                    </div>
                    <div className="favorite-date">
                      Đã lưu: {item.savedDate}
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Chưa có bất động sản nào trong danh sách yêu thích"
          />
        )}
      </Card>
    </div>
  );
};

export default FavoritesList;
