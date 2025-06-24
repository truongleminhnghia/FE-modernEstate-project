import React, { useState, useEffect } from 'react';
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
} from 'antd';
import {
  SearchOutlined,
  DeleteOutlined,
  EyeOutlined,
  StarFilled,
} from '@ant-design/icons';
import favoriteApi from '../../apis/favoriteApi';

const { Title, Text } = Typography;
const { Option } = Select;

export default function OwnerFavorites() {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const res = await favoriteApi.getFavorites();
      setFavorites(res.data || []);
    } catch (error) {
      message.error('Không thể tải danh sách yêu thích!');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    // Implement search logic
  };

  const handleFilter = (value) => {
    setFilterType(value);
    // Implement filter logic
  };

  const handleViewDetails = (id) => {
    // Implement view details logic
    message.info('Xem chi tiết căn hộ');
  };

  const handleRemoveFavorite = async (propertyId) => {
    try {
      await favoriteApi.removeFavorite(propertyId);
      message.success('Đã xóa khỏi danh sách yêu thích');
      fetchFavorites();
    } catch (error) {
      message.error('Xóa khỏi danh sách yêu thích thất bại!');
    }
  };

  const filteredList = favorites.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchText.toLowerCase()) ||
                         item.location?.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>
          <StarFilled style={{ color: '#faad14', marginRight: 8 }} />
          Danh sách yêu thích
        </Title>
        <div style={{ marginTop: '16px' }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Input
                placeholder="Tìm kiếm theo tên hoặc địa điểm"
                prefix={<SearchOutlined />}
                onChange={(e) => handleSearch(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Select
                style={{ width: '100%' }}
                defaultValue="all"
                onChange={handleFilter}
              >
                <Option value="all">Tất cả</Option>
                <Option value="Cho thuê">Cho thuê</Option>
                <Option value="Bán">Bán</Option>
              </Select>
            </Col>
          </Row>
        </div>
      </div>
      <Card loading={loading}>
        {filteredList.length > 0 ? (
          <Row gutter={[24, 24]} className="favorites-list">
            {filteredList.map((item) => (
              <Col xs={24} sm={12} lg={8} key={item.id}>
                <Card
                  hoverable
                  className="favorite-card"
                  cover={
                    <div className="favorite-image-container">
                      <img
                        alt={item.title}
                        src={item.image || ''}
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
                  <div style={{ fontWeight: 600, fontSize: 15, minHeight: 48 }}>
                    {item.title}
                  </div>
                  <div
                    style={{
                      color: '#4a90e2',
                      fontWeight: 500,
                      margin: '8px 0 4px 0',
                    }}
                  >
                    {item.price}
                  </div>
                  <div style={{ color: '#888', fontSize: 14 }}>
                    {item.area} &nbsp; • &nbsp; {item.bed} &nbsp; • &nbsp; {item.bath}
                  </div>
                  <div style={{ color: '#888', fontSize: 14 }}>
                    {item.location}
                  </div>
                  <div style={{ color: '#999', fontSize: 12, marginTop: 8 }}>
                    Đã lưu: {item.savedDate}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty description="Không có bất động sản nào trong danh sách yêu thích." />
        )}
      </Card>
    </div>
  );
}
