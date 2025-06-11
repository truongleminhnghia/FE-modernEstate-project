import React from 'react';
import { Typography, Row, Col, Button, Image } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const AboutModernEstate = () => {
  return (
    <div style={{backgroundColor: '#f7f9fc', paddingTop: '10px' }}>
      <Title level={2} style={{ marginTop: 0, marginBottom: 24, fontWeight: '700', display: 'flex', justifyContent: 'left', color: '#4a90e2'}}>Về chúng tôi</Title>
      <Row justify="center" align="middle" gutter={[48, 48]}>
        <Col xs={24} md={12}>
          <Image
            src="https://vietnamstory.in/wp-content/uploads/2024/07/2-3.jpg" // <-- THAY BẰNG HÌNH ẢNH ĐẸP CỦA BẠN
            alt="Modern apartment building"
            preview={false}
            style={{ borderRadius: '16px', objectFit: 'cover', width: '100%', height: '450px' }}
          />
        </Col>

        <Col xs={24} md={12}>
          <Title level={2} style={{ marginTop: 0, marginBottom: 24, fontWeight: '700' }}>
            Kiến tạo không gian sống hiện đại cùng <br />
            <span style={{
              background: 'linear-gradient(90deg, #4a90e2, #50e3c2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Modern Estate
            </span>
          </Title>

          <Paragraph style={{ fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
            <strong>Modern Estate</strong> là giải pháp công nghệ tiên phong trong lĩnh vực cho thuê & mua bán căn hộ. Chúng tôi phá vỡ lối mòn truyền thống bằng cách kết nối trực tiếp khách hàng với môi giới và nhà đầu tư một cách nhanh chóng, minh bạch và hiệu quả.
          </Paragraph>

          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              <CheckCircleOutlined style={{ color: '#50e3c2', fontSize: 20, marginRight: 12 }} />
              <Text style={{ fontSize: 16 }}>Nền tảng ứng dụng công nghệ AI và dữ liệu lớn.</Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              <CheckCircleOutlined style={{ color: '#50e3c2', fontSize: 20, marginRight: 12 }} />
              <Text style={{ fontSize: 16 }}>Tối ưu hóa trải nghiệm tìm kiếm và giao dịch.</Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleOutlined style={{ color: '#50e3c2', fontSize: 20, marginRight: 12 }} />
              <Text style={{ fontSize: 16 }}>Đảm bảo an toàn, minh bạch cho mọi khách hàng.</Text>
            </div>
          </div>

          <Button type="primary" size="large" shape="round" style={{ background: '#4a90e2' }}>
            Khám phá ngay
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AboutModernEstate;