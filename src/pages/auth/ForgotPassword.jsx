import React, { useState } from "react";
import { Form, Input, Button, Typography, Row, Col, message } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSendEmail = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post("https://be-modernestate.onrender.com/api/v1/auths/forgot-password", {
        email: values.email,
      });
      if (res.data.success) {
        setEmail(values.email);
        setStep(2);
        message.success("Mã OTP đã được gửi tới email của bạn!");
      } else {
        message.error(res.data.message || "Có lỗi xảy ra, vui lòng thử lại!");
      }
    } catch (err) {
      message.error("Không thể gửi yêu cầu. Vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post("https://be-modernestate.onrender.com/api/v1/auths/reset-password", {
        email,
        token: values.otp,
        newPassword: values.newPassword,
      });
      if (res.data.success) {
        setStep(3);
        message.success("Đổi mật khẩu thành công! Bạn có thể đăng nhập lại.");
      } else {
        message.error(res.data.message || "OTP không đúng hoặc đã hết hạn!");
      }
    } catch (err) {
      message.error("Không thể đổi mật khẩu. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row
      style={{
        minHeight: "80vh",
        alignItems: "center",
        justifyContent: "center",
        background: "#f7fafd"
      }}
      gutter={0}
    >
      {/* Left: Form */}
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
          Quên mật khẩu?
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
          {step === 1
            ? "Nhập email bạn đã đăng ký để nhận mã xác thực OTP."
            : step === 2
            ? `Nhập mã OTP đã gửi tới email: ${email} và mật khẩu mới`
            : "Đổi mật khẩu thành công! Bạn có thể đăng nhập lại."}
        </Text>
        {step === 1 && (
          <Form layout="vertical" onFinish={handleSendEmail}>
            <Form.Item
              label={<Text style={{ fontSize: 16 }}>Email</Text>}
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                size="large"
                placeholder="Nhập email của bạn"
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{
                background: "#4a90e2",
                borderColor: "#4a90e2",
                marginTop: 8,
                height: 48,
                fontSize: 16,
                fontWeight: 500,
                borderRadius: 8,
              }}
            >
              Gửi mã OTP
            </Button>
            <Button
              type="link"
              block
              style={{ marginTop: 8 }}
              href="/login"
            >
              Quay về đăng nhập
            </Button>
          </Form>
        )}
        {step === 2 && (
          <Form layout="vertical" onFinish={handleResetPassword}>
            <Form.Item
              label={<Text style={{ fontSize: 16 }}>Mã OTP</Text>}
              name="otp"
              rules={[
                { required: true, message: "Vui lòng nhập mã OTP!" },
                { len: 6, message: "Mã OTP gồm 6 ký tự!" },
              ]}
            >
              <Input
                size="large"
                placeholder="Nhập mã OTP"
                maxLength={6}
              />
            </Form.Item>
            <Form.Item
              label={<Text style={{ fontSize: 16 }}>Mật khẩu mới</Text>}
              name="newPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
              ]}
              hasFeedback
            >
              <Input.Password
                size="large"
                placeholder="Nhập mật khẩu mới"
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{
                background: "#4a90e2",
                borderColor: "#4a90e2",
                marginTop: 8,
                height: 48,
                fontSize: 16,
                fontWeight: 500,
                borderRadius: 8,
              }}
            >
              Đổi mật khẩu
            </Button>
            <Button
              type="link"
              block
              style={{ marginTop: 8 }}
              onClick={() => setStep(1)}
            >
              Nhập lại email
            </Button>
          </Form>
        )}
        {step === 3 && (
          <div>
            <Button
              type="primary"
              block
              style={{
                background: "#4a90e2",
                borderColor: "#4a90e2",
                marginTop: 8,
                height: 48,
                fontSize: 16,
                fontWeight: 500,
                borderRadius: 8,
              }}
              href="/login"
            >
              Đăng nhập lại
            </Button>
          </div>
        )}
      </Col>
      <Col xs={0} md={12} style={{ position: "relative", height: "80vh", overflow: "hidden" }}>
        <img
          src="/images/pages/forgot-password.svg"
          alt="forgot password"
          style={{ width: "90%", height: "95%" }}
        />
      </Col>
    </Row>
  );
};

export default ForgotPassword;