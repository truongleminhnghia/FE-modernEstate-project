import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Select, Input, Tag, Space, Empty, message, Spin } from 'antd';
import { SearchOutlined, EyeOutlined, DeleteOutlined, HomeOutlined, EnvironmentOutlined, StarFilled } from '@ant-design/icons';
import '../BrokerProfile.css';
import favoriteApi from '../../../apis/favoriteApi';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { Title, Text } = Typography;

const BrokerWatchedApartments = () => {
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState(undefined);
  const [watchedList, setWatchedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const response = await favoriteApi.getFavorites();
      if (response && response.data) {
        const favorites = response.data.map(fav => {
          // Map fields as needed for display
          return {
            id: fav.id,
            propertyId: fav.propertyId,
            title: fav.title,
            price: fav.price,
            area: fav.area,
            bed: fav.numberOfBedrooms,
            bath: fav.numberOfBathrooms,
            location: fav.location,
            image: fav.image || 'https://via.placeholder.com/400x250?text=No+Image',
            type: fav.type || 'Căn hộ',
            watchedDate: fav.createdAt,
            isHot: fav.isHot,
          };
        });
        setWatchedList(favorites);
      }
    } catch (error) {
      message.error('Không thể tải danh sách yêu thích.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleTypeFilter = (value) => {
    setTypeFilter(value);
  };

  const handleUnwatch = async (propertyId) => {
    try {
      await favoriteApi.removeFavorite(propertyId);
      setWatchedList((prev) => prev.filter((item) => item.propertyId !== propertyId));
    message.success('Đã bỏ theo dõi căn hộ!');
    } catch (error) {
      message.error("Bỏ theo dõi thất bại!");
    }
  };

  const filteredList = watchedList.filter(
    (item) =>
      (!typeFilter || item.type === typeFilter) &&
      (item.title?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchText.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="broker-container" style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="broker-container">
      <Card className="broker-card" style={{ marginBottom: 32 }}>
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <Title level={4} style={{ margin: 0 }}>
              Căn hộ đang theo dõi
            </Title>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Tìm kiếm theo tên, vị trí..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={handleSearch}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Select
              placeholder="Loại căn hộ"
              style={{ width: '100%' }}
              allowClear
              value={typeFilter}
              onChange={handleTypeFilter}
            >
              <Option value="Căn hộ">Căn hộ</Option>
              <Option value="Nhà riêng">Nhà riêng</Option>
              <Option value="Đất nền">Đất nền</Option>
            </Select>
          </Col>
        </Row>
        <Row gutter={[24, 24]} className="favorites-list">
          {filteredList.length === 0 ? (
            <Col span={24}>
              <Empty description="Không có căn hộ nào đang theo dõi." />
            </Col>
          ) : (
            filteredList.map((item) => (
              <Col xs={24} sm={12} md={8} key={item.id}>
                <Card
                  cover={
                    <div className="listing-image-container">
                      <img src={item.image} alt={item.title} className="listing-image" />
                      {item.isHot && (
                        <Tag color="red" style={{ position: 'absolute', top: 12, left: 12 }}>
                          <StarFilled /> Hot
                        </Tag>
                      )}
                      <Tag color="blue" className="property-type">
                        {item.type}
                      </Tag>
                    </div>
                  }
                  actions={[
                    <Button
                      type="link"
                      icon={<EyeOutlined />}
                      onClick={() => navigate(`/apartment/${item.propertyId}`)}
                      key="view"
                    >
                      Xem chi tiết
                    </Button>,
                    <Button
                      type="link"
                      icon={<DeleteOutlined />}
                      danger
                      onClick={() => handleUnwatch(item.propertyId)}
                      key="unwatch"
                    >
                      Bỏ theo dõi
                    </Button>,
                  ]}
                >
                  <div className="favorite-content">
                    <Title level={5}>
                      {item.title}
                    </Title>
                    <Text className="favorite-price">{item.price?.toLocaleString()}đ</Text>
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
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="32"
                              d="M384 240H96V136a40.12 40.12 0 0 1 40-40h240a40.12 40.12 0 0 1 40 40v104ZM48 416V304a64.19 64.19 0 0 1 64-64h288a64.19 64.19 0 0 1 64 64v112"
                            />
                            <path
                              fill="none"
                              stroke="#666666"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="32"
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
                                strokeWidth="1.5"
                                d="M3 13.083c0-.077 0-.116.002-.148a1 1 0 0 1 .933-.933c.033-.002.07-.002.148-.002h15.834c.077 0 .115 0 .148.002a1 1 0 0 1 .933.933c.002.032.002.07.002.148c0 .395 0 .593-.014.815c-.209 3.287-3.003 6.189-6.28 6.52c-.221.023-.35.028-.608.038A57 57 0 0 1 12 20.5c-.65 0-1.364-.017-2.098-.044c-.258-.01-.387-.015-.607-.037c-3.278-.332-6.072-3.234-6.28-6.521C3 13.676 3 13.478 3 13.083Z"
                              />
                              <path
                                stroke="#666666"
                                strokeLinecap="round"
                                strokeWidth="1.5"
                                d="m6 20l-1 2m13-2l1 2M2 12h20"
                              />
                              <path
                                fill="#666666"
                                d="M2.25 13a.75.75 0 0 0 1.5 0zM7.6 3.5l.696-.28zm.379.947l.328.674zM6.362 6.192l.695.283zm4.215-1.814l-.295.69zM6.346 8.742l-.698.275a.75.75 0 0 0 .994.413zm5.96-2.567l.297.69a.75.75 0 0 0 .401-.964zM3.75 13V4.385h-1.5V13zM5.385 2.75c.669 0 1.27.407 1.518 1.028l1.393-.557a3.135 3.135 0 0 0-2.91-1.971zM3.75 4.385c0-.903.732-1.635 1.635-1.635v-1.5A3.135 3.135 0 0 0 2.25 4.385zm3.153-.607l.38.948l1.392-.557l-.379-.948zm.14 4.689a2.68 2.68 0 0 1 .014-1.992l-1.39-.565a4.18 4.18 0 0 0-.02 3.107zm4.967-2.98L6.049 8.053l.593 1.377l5.96-2.566zm-1.728-.42c.622.266 1.085.77 1.327 1.383l1.395-.55a3.97 3.97 0 0 0-2.132-2.212zM7.057 6.476a2.57 2.57 0 0 1 1.25-1.354l-.656-1.348A4.07 4.07 0 0 0 5.667 5.91zm1.25-1.354a2.36 2.36 0 0 1 1.975-.053l.59-1.38a3.86 3.86 0 0 0-3.221.085z"
                              />
                            </g>
                          </svg>{' '}
                          {item.bath}
                        </span>
                      </Space>
                    </div>
                    <div>
                      <EnvironmentOutlined /> {item.location}
                    </div>
                  </div>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Card>
    </div>
  );
};

export default BrokerWatchedApartments;