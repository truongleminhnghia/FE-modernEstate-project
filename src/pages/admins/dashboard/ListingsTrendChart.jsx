import React, { useState, useEffect } from 'react';
import { Card, Spin, Typography } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDemandTrends } from '../../../apis/trendApi';

const { Title } = Typography;
const primaryColor = '#6590e2';

const ListingsTrendChart = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setLoading(true);
    getDemandTrends()
      .then((data) => {
        const merged = (data.rentTrends || []).map((item, idx) => ({
          date: item.date,
          rent: item.rentPercentage ?? 0,
          sell: (data.sellTrends?.[idx]?.sellPercentage) ?? 0,
        }));
        setChartData(merged);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.09)', borderRadius: '8px', height: '100%' }}>
      <Title level={5} style={{ marginBottom: 20, color: '#595959' }}>Xu hướng đăng tin (7 ngày qua)</Title>
      <Spin spinning={loading}>
        <div style={{ height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} tickFormatter={v => `${v}%`} />
              <Tooltip formatter={v => `${v}%`} />
              <Legend />
              <Line type="monotone" dataKey="rent" name="Cho thuê" stroke={primaryColor} strokeWidth={3} dot />
              <Line type="monotone" dataKey="sell" name="Bán" stroke="#FACC14" strokeWidth={3} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Spin>
    </Card>
  );
};

export default ListingsTrendChart;