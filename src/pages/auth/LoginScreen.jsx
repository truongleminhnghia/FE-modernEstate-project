import React, { useEffect } from "react";
import {
  Input,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Space,
  message,
} from "antd";
import {
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
// import { verifyEmail } from '../../apis/auth';
const { Title, Text, Link } = Typography;

const LoginScreen = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const token = params.get('token');
  //   if (token) {
  //     verifyEmail(token)
  //       .then(() => {
  //         message.success('Xác thực email thành công! Bạn có thể đăng nhập.');
  //         navigate('/login', { replace: true });
  //       })
  //       .catch(() => {
  //         message.error('Xác thực email thất bại hoặc token không hợp lệ!');
  //         navigate('/login', { replace: true });
  //       });
  //   }
  // }, [location, navigate]);

  const handleLogin = async (values) => {
    try {
      const response = await axios.post("https://be-modernestate.onrender.com/api/v1/auths/login", {
        email: values.email,
        password: values.password,
      });
  
      if (response.data.success) {
        console.log(response.data);
        message.success("Đăng nhập thành công!");
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.accountCurrent));
        window.location.href = "/";
      } else {
        message.error("Email hoặc mật khẩu không chính xác!");
      }
    } catch (error) {
      console.error(error);
      message.error("Tài khoản không tồn tại!");
    }
  };
  
  return (
    <Row
      style={{
        minHeight: "80vh",
        alignItems: "center",
        justifyContent: "center",
      }}
      gutter={0}
    >
      <Col
        xs={24}
        md={12}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px 0 80px",
          maxWidth: 1000,
        }}
      >
        <Title
          level={2}
          style={{
            color: "#4a90e2",
            marginBottom: 15,
            fontWeight: "bold",
            fontSize: "2.5rem",
          }}
        >
          Chào mừng bạn quay trở lại!
        </Title>
        <Text
          style={{
            color: "#666",
            fontSize: 16,
            marginBottom: 15,
            display: "block",
            lineHeight: 1.6,
          }}
        >
          Đăng nhập ngay để tiếp tục hành trình tìm kiếm căn hộ lý tưởng của
          bạn!
        </Text>
        <div style={{ marginBottom: 17, display: "flex", alignItems: "center" }}>
          <Text strong style={{ marginRight: 16, fontSize: 16, fontWeight: '500', color: '#333' }}>
            ĐĂNG NHẬP BẰNG
          </Text>
          <Space size="middle">
            <Button
              shape="circle"
              icon={
                <span style={{display: 'inline-block', transform: 'translateY(3px)'}}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#ffc107"
                      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                    />
                    <path
                      fill="#ff3d00"
                      d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                    />
                    <path
                      fill="#4caf50"
                      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                    />
                    <path
                      fill="#1976d2"
                      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                    />
                  </svg>
                </span>
              }
              size="large"
              style={{
                outline: 'none',
                boxShadow: 'none',
                background: 'transparent',
                border: 'none',
                transition: 'transform 0.2s',
                ':hover': {
                  transform: 'scale(1.1)'
                }
              }}
            />
            <Button
              shape="circle"
              icon={
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="41"
                    height="41"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="#1877f2"
                      d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
                    />
                    <path
                      fill="#fff"
                      d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"
                    />
                  </svg>
                </span>
              }
              size="large"
              style={{
                outline: 'none',
                boxShadow: 'none',
                background: 'transparent',
                border: 'none',
                transition: 'transform 0.2s',
                ':hover': {
                  transform: 'scale(1.1)'
                }
              }}
            />
          </Space>
        </div>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleLogin}
        >
          <Form.Item
            label={<Text style={{ fontSize: 16 }}>Email</Text>}
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined style={{ marginRight: 8, color: "#4a90e2" }} />}
              placeholder="Nhập email"
            />
          </Form.Item>

          <Form.Item
            label={<Text style={{ fontSize: 16 }}>Mật khẩu</Text>}
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined style={{ marginRight: 8, color: "#4a90e2" }} />}
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>

          <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
            <Col>
              <Text style={{ fontSize: 15 }}>
                Bạn chưa có tài khoản? <Link href="/register" style={{ color: "#4a90e2" }}>Đăng ký</Link>
              </Text>
            </Col>
            <Col>
              <Link href="#" style={{ color: "#4a90e2" }}>Quên mật khẩu?</Link>
            </Col>
          </Row>

          <Button
            type="primary"
            size="large"
            block
            htmlType="submit"
            style={{
              marginTop: 8,
              borderRadius: 8,
              background: "#4a90e2",
              height: 48,
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            ĐĂNG NHẬP
          </Button>
        </Form>
      </Col>

      {/* Right Side */}
      <Col xs={0} md={12} style={{ position: "relative", height: "80vh", overflow: "hidden" }}>
        <img
          src="/images/pages/Life in a city-bro.svg"
          alt="apartment"
          style={{ width: "90%", height: "95%" }}
        />
      </Col>
    </Row>
  );
};

export default LoginScreen;