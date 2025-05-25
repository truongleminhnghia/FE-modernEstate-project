import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Row, 
  Col, 
  Statistic, 
  List, 
  Tag, 
  Button,
  Space,
  Divider
} from 'antd';
import { 
  HomeOutlined, 
  BankOutlined,
  TagsOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  EditOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const OwnerInfo = () => {
  const navigate = useNavigate();
  const [ownerData, setOwnerData] = useState(null);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch owner data and properties from API
    const fetchData = async () => {
      try {
        // Replace with actual API calls
        const userData = JSON.parse(localStorage.getItem('user'));
        setOwnerData(userData);
        // Mock properties data
        setProperties([
          {
            id: 1,
            title: 'Căn hộ cao cấp Quận 1',
            type: 'apartment',
            status: 'available',
            price: '2.5 tỷ',
            area: '80m²',
            address: '123 Nguyễn Huệ, Quận 1, TP.HCM'
          },
          // Add more mock data as needed
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!ownerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="owner-info-container">
      <Row gutter={[24, 24]}>
        {/* Owner Overview */}
        <Col xs={24} md={8}>
          <Card>
            <div className="text-center mb-6">
              <Title level={4}>
                <BankOutlined style={{ marginRight: 8 }} />
                Thông tin chủ sở hữu
              </Title>
            </div>
            
            <div className="space-y-4">
              <div>
                <Text type="secondary">Loại chủ sở hữu</Text>
                <div className="mt-1">
                  <BankOutlined style={{ marginRight: 8 }} />
                  {ownerData.ownerType === 'individual' ? 'Cá nhân' : 'Tổ chức'}
                </div>
              </div>

              {ownerData.ownerType === 'organization' && (
                <div>
                  <Text type="secondary">Tên tổ chức</Text>
                  <div className="mt-1">
                    <BankOutlined style={{ marginRight: 8 }} />
                    {ownerData.organizationName}
                  </div>
                </div>
              )}

              <div>
                <Text type="secondary">Loại tài sản sở hữu</Text>
                <div className="mt-2">
                  <Space wrap>
                    {ownerData.propertyTypes?.map((type, index) => (
                      <Tag key={index} color="green">
                        <TagsOutlined style={{ marginRight: 4 }} />
                        {type}
                      </Tag>
                    ))}
                  </Space>
                </div>
              </div>

              <Divider />

              <div>
                <Text type="secondary">Thông tin liên hệ</Text>
                <div className="mt-2 space-y-2">
                  <div>
                    <PhoneOutlined style={{ marginRight: 8 }} />
                    {ownerData.contactInfo?.phone}
                  </div>
                  <div>
                    <MailOutlined style={{ marginRight: 8 }} />
                    {ownerData.contactInfo?.email}
                  </div>
                  <div>
                    <EnvironmentOutlined style={{ marginRight: 8 }} />
                    {ownerData.contactInfo?.address}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Properties List */}
        <Col xs={24} md={16}>
          <Card>
            <div className="flex justify-between items-center mb-6">
              <Title level={4}>
                <HomeOutlined style={{ marginRight: 8 }} />
                Danh sách tài sản
              </Title>
              <Button 
                type="primary"
                icon={<EditOutlined />}
                onClick={() => navigate('/owner/properties/new')}
              >
                Thêm tài sản mới
              </Button>
            </div>

            <List
              itemLayout="vertical"
              dataSource={properties}
              renderItem={property => (
                <List.Item
                  key={property.id}
                  actions={[
                    <Button type="link" onClick={() => navigate(`/owner/properties/${property.id}`)}>
                      Xem chi tiết
                    </Button>,
                    <Button type="link" onClick={() => navigate(`/owner/properties/${property.id}/edit`)}>
                      Chỉnh sửa
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    title={property.title}
                    description={
                      <Space>
                        <Tag color="blue">{property.type}</Tag>
                        <Tag color={property.status === 'available' ? 'green' : 'red'}>
                          {property.status === 'available' ? 'Đang cho thuê/bán' : 'Đã cho thuê/bán'}
                        </Tag>
                      </Space>
                    }
                  />
                  <div className="space-y-2">
                    <div>
                      <Text strong>Giá: </Text>
                      {property.price}
                    </div>
                    <div>
                      <Text strong>Diện tích: </Text>
                      {property.area}
                    </div>
                    <div>
                      <Text strong>Địa chỉ: </Text>
                      {property.address}
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OwnerInfo; 