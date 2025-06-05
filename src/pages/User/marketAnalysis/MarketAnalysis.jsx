import React from "react";
import { Row, Col, Card, Typography } from "antd";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar
} from "recharts";

const { Title, Text } = Typography;

// Dữ liệu mẫu cho biểu đồ
const priceTrends = [
  { month: "01/2024", price: 32 },
  { month: "02/2024", price: 34 },
  { month: "03/2024", price: 36 },
  { month: "04/2024", price: 38 },
  { month: "05/2024", price: 37 },
  { month: "06/2024", price: 39 },
  { month: "07/2024", price: 41 },
];

const demandData = [
  { type: "Mua", value: 120 },
  { type: "Thuê", value: 80 },
  { type: "Bán", value: 60 },
];

const MarketAnalysis = () => {
  return (
    <div style={{ background: "#f7fafd", minHeight: "100vh", padding: "32px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <Title level={2} style={{ color: "#4a90e2", fontWeight: "bold" }}>
          Phân tích & Đánh giá Thị trường
        </Title>
        <Text style={{ fontSize: 18, color: "#555" }}>
          Cập nhật xu hướng giá, nhu cầu và các chỉ số nổi bật của thị trường bất động sản.
        </Text>

        <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
          <Col xs={24} md={8}>
            <Card bordered={false} style={{ borderRadius: 12, boxShadow: "0 2px 8px #e6e6e6" }}>
              <Text style={{ color: "#888" }}>Giá trung bình (triệu/m²)</Text>
              <div style={{ fontSize: 32, fontWeight: 700, color: "#4a90e2", margin: "8px 0" }}>39</div>
              <Text>Tăng 5% so với tháng trước</Text>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card bordered={false} style={{ borderRadius: 12, boxShadow: "0 2px 8px #e6e6e6" }}>
              <Text style={{ color: "#888" }}>Lượng giao dịch</Text>
              <div style={{ fontSize: 32, fontWeight: 700, color: "#4a90e2", margin: "8px 0" }}>1,250</div>
              <Text>Tăng 12% so với tháng trước</Text>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card bordered={false} style={{ borderRadius: 12, boxShadow: "0 2px 8px #e6e6e6" }}>
              <Text style={{ color: "#888" }}>Nhu cầu tìm kiếm</Text>
              <div style={{ fontSize: 32, fontWeight: 700, color: "#4a90e2", margin: "8px 0" }}>2,800</div>
              <Text>Ổn định</Text>
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
          <Col xs={24} md={16}>
            <Card
              title="Biểu đồ xu hướng giá trung bình"
              bordered={false}
              style={{ borderRadius: 12, boxShadow: "0 2px 8px #e6e6e6" }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={priceTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis unit=" triệu" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="price" name="Giá trung bình" stroke="#4a90e2" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              title="Nhu cầu thị trường"
              bordered={false}
              style={{ borderRadius: 12, boxShadow: "0 2px 8px #e6e6e6" }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={demandData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4a90e2" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MarketAnalysis;