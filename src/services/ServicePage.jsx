import React from 'react';
import { Typography, Row, Col, Card, Button, Avatar } from 'antd';
import {
  CloudUploadOutlined,
  NotificationOutlined,
  SolutionOutlined,
  HomeOutlined,
  SearchOutlined,
  InfoCircleOutlined,
  TeamOutlined,
  DollarCircleOutlined,
  StarOutlined,
  LikeOutlined,
  SafetyCertificateOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import './ServicePage.css'; 

const { Title, Paragraph, Text } = Typography;

const ServicePage = () => {

  const sellerServices = [
    {
      icon: <CloudUploadOutlined style={{ fontSize: 36, color: '#4a90e2' }} />,
      title: 'Đăng Tin Dễ Dàng & Hiệu Quả',
      description: 'Nền tảng trực quan cho phép bạn nhanh chóng đăng tải thông tin chi tiết, hình ảnh chất lượng cao về bất động sản, tiếp cận hàng ngàn khách hàng tiềm năng mỗi ngày.',
      link: '/dang-tin', // Đường dẫn tới trang đăng tin
    },
    {
      icon: <NotificationOutlined style={{ fontSize: 36, color: '#4a90e2' }} />,
      title: 'Tiếp Thị Chuyên Nghiệp & Rộng Khắp',
      description: 'Chúng tôi quảng bá tin đăng của bạn trên đa kênh: website, ứng dụng di động, mạng xã hội và chiến dịch email marketing, tối đa hóa cơ hội giao dịch thành công.',
    },
    {
      icon: <SolutionOutlined style={{ fontSize: 36, color: '#4a90e2' }} />,
      title: 'Tư Vấn Giá & Pháp Lý Tin Cậy',
      description: 'Đội ngũ chuyên viên giàu kinh nghiệm sẵn sàng tư vấn về giá cả thị trường, các thủ tục pháp lý cần thiết, đảm bảo quy trình giao dịch an toàn và minh bạch.',
    },
    {
      icon: <HomeOutlined style={{ fontSize: 36, color: '#4a90e2' }} />,
      title: 'Quản Lý Cho Thuê Thông Minh (Tùy chọn)',
      description: 'Dịch vụ quản lý cho thuê trọn gói: tìm kiếm khách thuê phù hợp, giám sát hợp đồng, thu tiền định kỳ và bảo trì căn hộ, giúp bạn an tâm tận hưởng lợi nhuận.',
    },
  ];

  const buyerServices = [
    {
      icon: <SearchOutlined style={{ fontSize: 36, color: '#52c41a' }} />,
      title: 'Tìm Kiếm Thông Minh & Chính Xác',
      description: 'Công cụ tìm kiếm mạnh mẽ với bộ lọc đa dạng (vị trí, giá, diện tích, tiện ích...) giúp bạn dễ dàng sàng lọc và tìm thấy căn hộ hoàn hảo đáp ứng mọi nhu cầu.',
      link: '/tim-kiem', // Đường dẫn tới trang tìm kiếm
    },
    {
      icon: <InfoCircleOutlined style={{ fontSize: 36, color: '#52c41a' }} />,
      title: 'Thông Tin Minh Bạch & Cập Nhật',
      description: 'Mọi bất động sản đều được cung cấp thông tin đầy đủ, hình ảnh chân thực và đánh giá chi tiết về tiện ích nội khu cũng như khu vực xung quanh.',
    },
    {
      icon: <TeamOutlined style={{ fontSize: 36, color: '#52c41a' }} />,
      title: 'Hỗ Trợ Tham Quan & Đàm Phán',
      description: 'Dễ dàng đặt lịch xem nhà trực tuyến. Chuyên viên của chúng tôi sẽ đồng hành, hỗ trợ bạn trong quá trình tham quan và đàm phán để đạt được thỏa thuận tốt nhất.',
    },
    {
      icon: <DollarCircleOutlined style={{ fontSize: 36, color: '#52c41a' }} />,
      title: 'Tư Vấn Tài Chính & Thủ Tục Mua Bán',
      description: 'Kết nối bạn với các đối tác ngân hàng uy tín, cung cấp thông tin về các gói vay ưu đãi và hỗ trợ hoàn tất mọi thủ tục giấy tờ một cách nhanh chóng, hiệu quả.',
    },
  ];

  const whyChooseUsPoints = [
    {
      icon: <StarOutlined className="why-us-icon" />,
      title: 'Nền Tảng Uy Tín Hàng Đầu',
      description: 'Với nhiều năm kinh nghiệm, Modern Estate tự hào là cầu nối tin cậy cho hàng triệu giao dịch bất động sản thành công.'
    },
    {
      icon: <LikeOutlined className="why-us-icon" />,
      title: 'Dữ Liệu Phong Phú & Chính Xác',
      description: 'Nguồn tin đăng đa dạng, được kiểm duyệt kỹ càng và cập nhật liên tục, mang đến cho bạn bức tranh toàn diện về thị trường.'
    },
    {
      icon: <SafetyCertificateOutlined className="why-us-icon" />,
      title: 'Giao Dịch An Toàn & Bảo Mật',
      description: 'Chúng tôi ưu tiên bảo mật thông tin cá nhân và đảm bảo tính pháp lý cho mọi giao dịch qua nền tảng.'
    },
    {
      icon: <MessageOutlined className="why-us-icon" />,
      title: 'Hỗ Trợ Chuyên Nghiệp 24/7',
      description: 'Đội ngũ chăm sóc khách hàng luôn sẵn sàng giải đáp mọi thắc mắc và hỗ trợ bạn trong suốt quá trình.'
    }
  ];

  return (
    <div className="services-page-container" style={{padding: '40px 0'}}>
      {/* Hero Section */}
      <div className="hero-section" style={{ textAlign: 'center', marginBottom: 60, padding: '0 20px' }}>
        <Title level={1} style={{ color: '#2c3e50', fontWeight: 'bold', marginBottom: 16 }}>
          Dịch Vụ Toàn Diện Từ <span style={{ color: '#4a90e2' }}>Modern Estate</span>
        </Title>
        <Paragraph style={{ fontSize: 18, color: '#555', maxWidth: 700, margin: '0 auto' }}>
          Modern Estate không chỉ là nơi bạn tìm thấy căn hộ mơ ước hay đăng tin bán/cho thuê hiệu quả,
          mà còn là người đồng hành tin cậy, cung cấp các dịch vụ hỗ trợ chuyên nghiệp để mọi giao dịch bất động sản của bạn trở nên dễ dàng và an toàn hơn.
        </Paragraph>
      </div>

      {/* Dịch vụ cho Chủ nhà / Người bán */}
      <div className="service-category" style={{ marginBottom: 60, padding: '0 5%' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 40, color: '#4a90e2' }}>
          Dành Cho Chủ Sở Hữu & Người Cho Thuê
        </Title>
        <Row gutter={[24, 24]} justify="center">
          {sellerServices.map((service, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index} style={{ display: 'flex' }}>
              <Card
                hoverable
                className="service-card seller-service-card"
                style={{ textAlign: 'center', borderRadius: 12, boxShadow: '0 4px 15px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%'}}
                bodyStyle={{padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}
              >
                <div>
                  <div style={{ marginBottom: 16 }}>{service.icon}</div>
                  <Title level={4} style={{color: '#333', marginBottom: 8, fontSize: '1.1rem'}}>{service.title}</Title>
                  <Paragraph style={{color: '#666', fontSize: '0.9rem', minHeight: 80}}>{service.description}</Paragraph>
                </div>
                {service.link && (
                  <Button type="primary" ghost href={service.link} style={{marginTop: 16, borderRadius: 20}}>
                    Tìm hiểu thêm
                  </Button>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Dịch vụ cho Người mua / Người thuê */}
      <div className="service-category" style={{ marginBottom: 60, padding: '0 5%' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 40, color: '#52c41a' }}>
          Dành Cho Người Mua & Người Thuê
        </Title>
        <Row gutter={[24, 24]} justify="center">
          {buyerServices.map((service, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index} style={{ display: 'flex' }}>
              <Card
                hoverable
                className="service-card buyer-service-card"
                style={{ textAlign: 'center', borderRadius: 12, boxShadow: '0 4px 15px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%'}}
                bodyStyle={{padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}
              >
                <div>
                  <div style={{ marginBottom: 16 }}>{service.icon}</div>
                  <Title level={4} style={{color: '#333', marginBottom: 8, fontSize: '1.1rem'}}>{service.title}</Title>
                  <Paragraph style={{color: '#666', fontSize: '0.9rem', minHeight: 80}}>{service.description}</Paragraph>
                </div>
                {service.link && (
                  <Button style={{marginTop: 16, backgroundColor: '#52c41a', borderColor: '#52c41a', color: '#fff', borderRadius: 20}} href={service.link}>
                    Khám phá ngay
                  </Button>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Tại sao chọn Modern Estate? */}
      <div className="why-choose-us" style={{ backgroundColor: '#f8f9fa', padding: '60px 5%', marginBottom: 60 }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 50 }}>
          Vì Sao Modern Estate Là Lựa Chọn Tối Ưu?
        </Title>
        <Row gutter={[32, 32]} justify="center">
          {whyChooseUsPoints.map((point, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <div style={{ textAlign: 'center' }}>
                <Avatar size={64} icon={point.icon} style={{ backgroundColor: 'transparent', color: '#4a90e2', marginBottom: 20, border: '2px solid #4a90e2' }} />
                <Title level={4} style={{fontSize: '1.15rem', marginBottom: 8}}>{point.title}</Title>
                <Paragraph style={{color: '#555', fontSize: '0.95rem'}}>{point.description}</Paragraph>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Call to Action */}
      <div className="cta-section" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <Title level={3} style={{ marginBottom: 12 }}>Sẵn sàng trải nghiệm dịch vụ bất động sản hàng đầu?</Title>
        <Paragraph style={{fontSize: 17, color: '#555', marginBottom: 24}}>
          Dù bạn muốn mua, bán, hay cho thuê, Modern Estate luôn có giải pháp phù hợp cho bạn.
        </Paragraph>
        <Row gutter={16} justify="center">
          <Col>
            <Button type="primary" size="large" href="/dang-tin" style={{borderRadius: 25, padding: '0 30px', height: 48, fontSize: 16}}>
              Đăng Tin Ngay
            </Button>
          </Col>
          <Col>
            <Button size="large" href="/tim-kiem-bat-dong-san" style={{borderRadius: 25, padding: '0 30px', height: 48, fontSize: 16, borderColor: '#4a90e2', color: '#4a90e2'}}>
              Tìm Kiếm Căn Hộ
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ServicePage;