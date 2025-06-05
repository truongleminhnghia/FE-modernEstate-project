import React, { useState } from 'react';
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

const { Title, Text } = Typography;
const { Option } = Select;

export default function OwnerFavorites() {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Mock data - replace with actual API call
  const favorites = [
    {
      id: '1',
      title: 'CĂN HỘ CAO CẤP VINHOMES CENTRAL PARK, TẦNG CAO',
      price: '30 triệu/tháng',
      area: '70 m²',
      bed: '3 PN',
      bath: '2 WC',
      location: 'Bình Thạnh, TP Hồ Chí Minh',
      image: 'https://www.nitco.in/nitcoassets/blog/main/scale-down.jpg',
      type: 'Cho thuê',
      savedDate: '2024-03-15',
      isHot: true,
    },
    {
      id: '2',
      title: 'BÁN GẤP CĂN HỘ CAO CẤP CHUNG CƯ MASTERI AN PHÚ',
      price: '25 triệu/tháng',
      area: '50 m²',
      bed: '2 PN',
      bath: '2 WC',
      location: 'Q7, TP Hồ Chí Minh',
      image: 'https://www.nitco.in/nitcoassets/blog/main/scale-down.jpg',
      type: 'Bán',
      savedDate: '2024-03-14',
      isHot: false,
    },
    {
      id: '3',
      title: 'CĂN HỘ THE SUN AVENUE VIEW SÔNG, FULL NỘI THẤT',
      price: '22 triệu/tháng',
      area: '60 m²',
      bed: '2 PN',
      bath: '2 WC',
      location: 'Q2, TP Hồ Chí Minh',
      image: 'https://www.nitco.in/nitcoassets/blog/main/scale-down.jpg',
      type: 'Cho thuê',
      savedDate: '2024-03-13',
      isHot: true,
    },
  ];

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

  const handleRemoveFavorite = (id) => {
    // Implement remove favorite logic
    message.success('Đã xóa khỏi danh sách yêu thích');
  };

  const filteredList = favorites.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchText.toLowerCase());
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

      <Row gutter={[24, 24]}>
        {filteredList.length === 0 ? (
          <Col span={24}>
            <Empty description="Không có căn hộ nào trong danh sách yêu thích." />
          </Col>
        ) : (
          filteredList.map((item) => (
            <Col xs={24} sm={12} lg={8} key={item.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={item.title}
                    src={item.image}
                    style={{
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16,
                      height: 180,
                      width: '100%',
                      objectFit: 'cover',
                    }}
                  />
                }
                style={{
                  borderRadius: 16,
                  boxShadow: '0 2px 12px #e0e7ef33',
                  marginBottom: 16,
                }}
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
          ))
        )}
      </Row>
    </div>
  );
}
