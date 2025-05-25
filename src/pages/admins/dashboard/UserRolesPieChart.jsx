// src/pages/admins/DashboardPage/UserRolesPieChart.js
import React, { useState, useEffect } from 'react';
import { Card, Spin, Typography } from 'antd';
import { Pie } from '@ant-design/charts';

const { Title } = Typography;
const primaryColor = '#4a90e2';

// Dữ liệu mẫu fix cứng
const mockUserRolesData = [
  { role: 'Chủ sở hữu', count: 450 },
  { role: 'Môi giới', count: 150 },
  { role: 'Người thuê/mua', count: 630 },
  { role: 'Admin', count: 20 },
];

const UserRolesPieChart = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
     const timer = setTimeout(() => {
      setChartData(mockUserRolesData);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const config = {
    appendPadding: 10,
    data: chartData,
    angleField: 'count',
    colorField: 'role',
    radius: 0.8,
    innerRadius: 0.6,
    label: { type: 'inner', offset: '-50%', content: ({ p }) => `${(p * 100).toFixed(0)}%`, style: { textAlign: 'center', fontSize: 12, fill: '#fff' } },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    statistic: {
      title: { offsetY: -4, style: { fontSize: 16, color: '#8c8c8c'}, formatter: () => 'Tổng cộng' },
      content: { offsetY: 4, style: { fontSize: 24, color: '#262626', fontWeight: 'bold' }, formatter: (d, data) => data?.reduce((s, i) => s + i.count, 0).toLocaleString() },
    },
    legend: { position: 'right', offsetX: -20 },
    tooltip: { formatter: (d) => ({ name: d.role, value: `${d.count.toLocaleString()} người` }) },
    color: [primaryColor, '#FACC14', '#4CAF50', '#FF6B6B'],
  };

  return (
    <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.09)', borderRadius: '8px', height: '100%' }}>
      <Title level={5} style={{ marginBottom: 20, color: '#595959' }}>Phân bổ Vai trò Người dùng</Title>
      <Spin spinning={loading}>
        <div style={{ height: 300 }}>
          <Pie {...config} />
        </div>
      </Spin>
    </Card>
  );
};

export default UserRolesPieChart;