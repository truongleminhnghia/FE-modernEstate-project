import React, { useState, useEffect } from "react";
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
  Pagination,
} from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import "./FavoritesList.css";
import { getFavorites } from '../../../apis/apiCustomer.api';

const { Title, Text } = Typography;
const { Option } = Select;

const FavoritesList = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchFavorites();
    // eslint-disable-next-line
  }, [page, pageSize]);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const res = await getFavorites({ page_current: page, page_size: pageSize });
      setFavorites(res.data || []);
      setTotal(res.total || 0);
    } catch (error) {
      message.error("Không thể tải danh sách yêu thích!");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    // Có thể gọi lại API với filter nếu backend hỗ trợ
  };

  const handleFilter = (values) => {
    // Có thể gọi lại API với filter nếu backend hỗ trợ
    console.log("Filter values:", values);
  };

  const handleRemoveFavorite = (id) => {
    // TODO: Gọi API xóa khỏi danh sách yêu thích
    message.success("Đã xóa khỏi danh sách yêu thích");
    // Sau khi xóa, gọi lại fetchFavorites();
  };

  const handleViewDetails = (id) => {
    // Chuyển hướng sang trang chi tiết căn hộ
    window.location.href = `/can-ho/${id}`;
  };

  // Lọc trên client nếu cần
  const filteredFavorites = favorites.filter(item =>
    item.title?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="favorites-container">
      <Card loading={loading}>
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

        {filteredFavorites.length > 0 ? (
          <>
            <Row gutter={[24, 24]} className="favorites-list">
              {filteredFavorites.map((item) => (
                <Col xs={24} sm={12} lg={8} key={item.id}>
                  <Card
                    hoverable
                    className="favorite-card"
                    cover={
                      <div className="favorite-image-container">
                        <img
                          alt={item.title}
                          src={item.image || item.propertyImage || ''}
                          className="favorite-image"
                        />
                        <Tag color="blue" className="property-type">
                          {item.type || item.propertyType}
                        </Tag>
                      </div>
                    }
                    actions={[
                      <Button
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => handleViewDetails(item.id || item.propertyId)}
                      >
                        Xem chi tiết
                      </Button>,
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveFavorite(item.id || item.propertyId)}
                      >
                        Xóa
                      </Button>,
                    ]}
                  >
                    <div className="favorite-content">
                      <Title level={5} className="favorite-title">
                        {item.title || item.propertyTitle}
                      </Title>
                      <Text className="favorite-price">{item.price || item.propertyPrice}</Text>
                      <div className="favorite-details">
                        <Space size="middle">
                          <span>
                            <HomeOutlined /> {item.area || item.propertyArea}
                          </span>
                          <span>
                            {item.bed || item.propertyBed}
                          </span>
                          <span>
                            {item.bath || item.propertyBath}
                          </span>
                        </Space>
                      </div>
                      <div>
                        <EnvironmentOutlined /> {item.location || item.propertyLocation}
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <Pagination
                current={page}
                pageSize={pageSize}
                total={total}
                onChange={(p, ps) => {
                  setPage(p);
                  setPageSize(ps);
                }}
                showSizeChanger
                pageSizeOptions={[5, 10, 20, 50]}
              />
            </div>
          </>
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
