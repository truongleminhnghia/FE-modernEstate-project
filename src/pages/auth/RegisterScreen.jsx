import React from "react";
import { Input, Button, Row, Col, Typography, Form, Space, Select, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title, Text, Link } = Typography;
const { Option } = Select;

const RegisterScreen = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await axios.post("https://be-modernestate.onrender.com/api/v1/auths/register", {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        confirmPassword: values.confirmPassword,
        gender: values.gender,
      });

      message.success("Đăng ký thành công!");
      form.resetFields();
    } catch (error) {
      console.error("Registration failed:", error.response || error);
      const errorMsg = error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.";
      message.error(errorMsg);
    }
  };


  return (
    <Row
      style={{
        background: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 30,
        marginRight: 50,
      }}
      gutter={0}
    >
      <Col
        xs={0}
        md={12}
        style={{
          position: "relative",
          height: "75vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/images/pages/At the office-amico.svg"
          alt="apartment"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Col>

      {/* Right Side - Form */}
      <Col
        xs={24}
        md={12}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 0 20px 6vw",
          maxWidth: 1000,
        }}
      >
        <Title
          level={2}
          style={{ color: "#4a90e2", marginBottom: 8, fontWeight: "bold" }}
        >
          Chào mừng bạn đến với MODERN ESTATE!
        </Title>
        <Text
          style={{
            color: "#444",
            fontSize: 16,
            marginBottom: 15,
            display: "block",
          }}
        >
          Chỉ mất 1 phút để tham gia và bắt đầu hành trình tìm kiếm ngôi nhà mơ
          ước.
        </Text>

        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 13 }}
        >
          <span style={{ fontWeight: 500, marginRight: 16, fontSize: 16 }}>
            HOẶC ĐĂNG KÝ BẰNG
          </span>
          <Space>
            <Button
              shape="circle"
              icon={
                <span
                  style={{
                    display: "inline-block",
                    transform: "translateY(3px)",
                  }}
                >
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
                outline: "none",
                boxShadow: "none",
                background: "transparent",
                border: "none",
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
            />
          </Space>
        </div>

        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                label="Tên"
                name="firstName"
                style={{ marginBottom: 8 }}
                rules={[{ required: true, message: "Vui lòng nhập tên" }]}
              >
                <Input size="large" placeholder="Nhập tên" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Họ"
                name="lastName"
                style={{ marginBottom: 8 }}
                rules={[{ required: true, message: "Vui lòng nhập họ" }]}
              >
                <Input size="large" placeholder="Nhập họ" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={14}>
              <Form.Item
                label="Email"
                name="email"
                style={{ marginBottom: 8 }}
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input
                  size="large"
                  prefix={<MailOutlined style={{ marginRight: 8 }} />}
                  placeholder="Nhập email"
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label="Giới tính"
                name="gender"
                style={{ marginBottom: 10 }}
                rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
              >
                <Select size="large" placeholder="Chọn giới tính">
                  <Option value="MALE">Nam</Option>
                  <Option value="FEMALE">Nữ</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Mật khẩu"
            name="password"
            style={{ marginBottom: 8 }}
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined style={{ marginRight: 8 }} />}
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            style={{ marginBottom: 8 }}
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Mật khẩu xác nhận không khớp");
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined style={{ marginRight: 8 }} />}
              placeholder="Xác nhận mật khẩu"
            />
          </Form.Item>

          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: 8 }}
          >
            <Col>
              <Text>
                Bạn đã có tài khoản? <Link href="/login">Đăng nhập</Link>
              </Text>
            </Col>
          </Row>

          <Button
            type="primary"
            size="large"
            block
            htmlType="submit"
            style={{ marginTop: 8, borderRadius: 8, background: "#4a90e2" }}
          >
            ĐĂNG KÝ
          </Button>
        </Form>

        <div style={{ marginTop: 16, fontSize: 13, color: "#888" }}>
          Bằng việc đăng ký, bạn đã đồng ý với Modern Estate về{" "}
          <a href="#">Điều khoản dịch vụ</a> và{" "}
          <a href="#">Chính sách bảo mật</a>
        </div>
      </Col>
    </Row>
  );
};

export default RegisterScreen;
