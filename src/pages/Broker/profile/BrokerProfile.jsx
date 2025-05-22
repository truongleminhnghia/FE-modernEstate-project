import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Button, 
  Avatar,
  Tag,
  Statistic,
  Tabs,
  List,
  Rate,
  Space,
  Divider,
  message
} from 'antd';
import { 
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  StarOutlined,
  UserOutlined,
  HomeOutlined,
  CheckCircleOutlined,
  MessageOutlined
} from '@ant-design/icons';
import '../BrokerProfile.css';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const BrokerProfile = () => {
  const [loading, setLoading] = useState(false);

  const broker = {
    id: '1',
    name: 'Nguyễn Văn A',
    avatar: null,
    phone: '0123456789',
    email: 'nguyenvana@example.com',
    address: 'Quận 1, TP. Hồ Chí Minh',
    rating: 4.8,
    totalReviews: 156,
    joinDate: '2023-01-15',
    verified: true,
    description: 'Chuyên gia tư vấn bất động sản với hơn 5 năm kinh nghiệm. Tôi cam kết mang đến cho khách hàng những giải pháp tốt nhất về bất động sản.',
    stats: {
      totalListings: 45,
      activeListings: 28,
      totalSales: 156,
      responseRate: '98%'
    }
  };

  const listings = [
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
      postedDate: '2024-03-15'
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
      type: 'Cho thuê',
      postedDate: '2024-03-14'
    }
  ];

  const reviews = [
    {
      id: '1',
      user: 'Trần Thị B',
      rating: 5,
      comment: 'Môi giới rất nhiệt tình và chuyên nghiệp. Tôi đã tìm được căn hộ ưng ý nhờ sự tư vấn của anh.',
      date: '2024-03-10'
    },
    {
      id: '2',
      user: 'Lê Văn C',
      rating: 4,
      comment: 'Tư vấn chi tiết, hiểu rõ nhu cầu khách hàng. Rất hài lòng với dịch vụ.',
      date: '2024-03-05'
    }
  ];

  const handleContact = () => {
    message.success('Yêu cầu liên hệ đã được gửi!');
  };

  return (
    <div className="broker-container">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card className="broker-card">
            <div className="broker-header">
              <Avatar 
                size={120} 
                icon={<UserOutlined />} 
                src={broker.avatar}
                className="broker-avatar"
              />
              {broker.verified && (
                <Tag color="green" className="verified-tag">
                  <CheckCircleOutlined /> Đã xác minh
                </Tag>
              )}
            </div>
            <Title level={4} className="broker-name">
              {broker.name}
            </Title>
            <div className="broker-rating">
              <Rate disabled defaultValue={broker.rating} allowHalf />
              <Text type="secondary">({broker.totalReviews} đánh giá)</Text>
            </div>
            <Paragraph className="broker-description">
              {broker.description}
            </Paragraph>
            <Divider />
            <div className="broker-contact">
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Button 
                  type="primary" 
                  icon={<PhoneOutlined />}
                  block
                  onClick={handleContact}
                >
                  Liên hệ ngay
                </Button>
                <Button 
                  icon={<MessageOutlined />}
                  block
                  onClick={handleContact}
                >
                  Nhắn tin
                </Button>
              </Space>
            </div>
            <div className="broker-info">
              <div className="info-item">
                <PhoneOutlined /> {broker.phone}
              </div>
              <div className="info-item">
                <MailOutlined /> {broker.email}
              </div>
              <div className="info-item">
                <EnvironmentOutlined /> {broker.address}
              </div>
            </div>
            <Card className="broker-stats">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic 
                  title="Tin đăng" 
                  value={broker.stats.totalListings}
                  prefix={<HomeOutlined />}
                />
              </Col>
              <Col span={12}>
                <Statistic 
                  title="Đang hiển thị" 
                  value={broker.stats.activeListings}
                  prefix={<CheckCircleOutlined />}
                />
              </Col>
              <Col span={12}>
                <Statistic 
                  title="Giao dịch" 
                  value={broker.stats.totalSales}
                  prefix={<StarOutlined />}
                />
              </Col>
              <Col span={12}>
                <Statistic 
                  title="Phản hồi" 
                  value={broker.stats.responseRate}
                  suffix="%"
                />
              </Col>
            </Row>
            </Card>
          </Card>

        </Col>
        <Col xs={24} md={16}>
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane 
                tab={
                  <span>
                    <HomeOutlined /> Tin đăng
                  </span>
                } 
                key="1"
              >
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 2,
                    xl: 2,
                    xxl: 2,
                  }}
                  dataSource={listings}
                  renderItem={item => (
                    <List.Item>
                      <Card
                        hoverable
                        className="listing-card"
                        cover={
                          <div className="listing-image-container">
                            <img
                              alt={item.title}
                              src={item.image}
                              className="listing-image"
                            />
                            <Tag color="blue" className="property-type">
                              {item.type}
                            </Tag>
                          </div>
                        }
                      >
                        <div className="listing-content">
                          <Title level={5} className="listing-title">
                            {item.title}
                          </Title>
                          <Text className="listing-price">{item.price}</Text>
                          <div className="listing-details">
                            <Space size="middle">
                              <span>{item.area}</span>
                              <span>{item.bed}</span>
                              <span>{item.bath}</span>
                            </Space>
                          </div>
                          <div className="listing-location">
                            <EnvironmentOutlined /> {item.location}
                          </div>
                          <div className="listing-date">
                            Đăng ngày: {item.postedDate}
                          </div>
                        </div>
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>

              <TabPane 
                tab={
                  <span>
                    <StarOutlined /> Đánh giá
                  </span>
                } 
                key="2"
              >
                <List
                  className="review-list"
                  itemLayout="horizontal"
                  dataSource={reviews}
                  renderItem={item => (
                    <List.Item>
                      <div className="review-item">
                        <div className="review-header">
                          <Text strong>{item.user}</Text>
                          <Rate disabled defaultValue={item.rating} />
                        </div>
                        <Paragraph className="review-comment">
                          {item.comment}
                        </Paragraph>
                        <Text type="secondary" className="review-date">
                          {item.date}
                        </Text>
                      </div>
                    </List.Item>
                  )}
                />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BrokerProfile;