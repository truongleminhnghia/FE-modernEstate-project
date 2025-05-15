import React from "react";
import { Row, Col, Typography, Space } from "antd";
import {
  YoutubeFilled,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { SiTiktok } from "react-icons/si";

const { Text, Link, Title } = Typography;

const iconStyle = { width: 24, height: 24 };

const Footer = () => {
  return (
    <div style={{ background: "#f8fbff", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Row gutter={[32, 32]} justify="space-between">
          <Col xs={24} sm={12} md={6}>
            <img
              src="/images/logos/logo-estate.png"
              alt="Modern Estate"
              style={{ width: 80, marginBottom: 12 }}
            />
            <Space direction="vertical" size={4}>
              <Link href="#">Giới thiệu</Link>
              <Link href="#">Blogs</Link>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5}>Nền tảng kết nối</Title>
            <Space direction="vertical" size={8}>
              <Space>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  style={iconStyle}
                >
                  <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z" />
                  <path
                    fill="#fff"
                    d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236
                    c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                  />
                </svg>
                <Text>Facebook</Text>
              </Space>

              <Space>
              <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<radialGradient id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd5"></stop><stop offset=".328" stop-color="#ff543f"></stop><stop offset=".348" stop-color="#fc5245"></stop><stop offset=".504" stop-color="#e64771"></stop><stop offset=".643" stop-color="#d53e91"></stop><stop offset=".761" stop-color="#cc39a4"></stop><stop offset=".841" stop-color="#c837ab"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><radialGradient id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4168c9"></stop><stop offset=".999" stop-color="#4168c9" stop-opacity="0"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"></path><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"></path>
</svg>
                <Text>Instagram</Text>
              </Space>

              <Space>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  style={iconStyle}
                >
                  <path
                    fill="#000"
                    d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323
                    c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527
                    s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053
                    c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016
                    c0.378,3.591,3.277,6.425,6.901,6.685V22.323z"
                  />
                </svg>
                <Text>TikTok</Text>
              </Space>

              <Space>
                <YoutubeFilled style={{ color: "#ff0000", fontSize: 24 }} />
                <Text>Youtube</Text>
              </Space>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5}>Dịch vụ</Title>
            <Space direction="vertical" size={8}>
              <Text>Mua bán căn hộ</Text>
              <Text>Cho thuê căn hộ</Text>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5}>Hotline</Title>
            <Space direction="vertical" size={8}>
              <Space>
                <MailOutlined style={{ color: "#4a90e2", fontSize: 20 }} />
                <Link href="mailto:modernestatefptu@gmail.com">
                  modernestatefptu@gmail.com
                </Link>
              </Space>
              <Space>
                <PhoneOutlined style={{ color: "#4a90e2", fontSize: 20 }} />
                <Text>0918 270 903</Text>
              </Space>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
