import React, { useState, useEffect } from 'react';
import { Card, Spin, Typography } from 'antd';
import { Line } from '@ant-design/charts'; 
import moment from 'moment';

const { Title } = Typography;
const primaryColor = '#4a90e2';
const mockListingsTrendData = [
  { date: moment().subtract(6, 'days').format('YYYY-MM-DD'), count: 12, type: 'Cho thuê' },
  { date: moment().subtract(6, 'days').format('YYYY-MM-DD'), count: 8, type: 'Bán' },
  { date: moment().subtract(5, 'days').format('YYYY-MM-DD'), count: 15, type: 'Cho thuê' },
  { date: moment().subtract(5, 'days').format('YYYY-MM-DD'), count: 10, type: 'Bán' },
  { date: moment().subtract(4, 'days').format('YYYY-MM-DD'), count: 10, type: 'Cho thuê' },
  { date: moment().subtract(4, 'days').format('YYYY-MM-DD'), count: 7, type: 'Bán' },
  { date: moment().subtract(3, 'days').format('YYYY-MM-DD'), count: 18, type: 'Cho thuê' },
  { date: moment().subtract(3, 'days').format('YYYY-MM-DD'), count: 11, type: 'Bán' },
  { date: moment().subtract(2, 'days').format('YYYY-MM-DD'), count: 13, type: 'Cho thuê' },
  { date: moment().subtract(2, 'days').format('YYYY-MM-DD'), count: 9, type: 'Bán' },
  { date: moment().subtract(1, 'days').format('YYYY-MM-DD'), count: 20, type: 'Cho thuê' },
  { date: moment().subtract(1, 'days').format('YYYY-MM-DD'), count: 13, type: 'Bán' },
  { date: moment().format('YYYY-MM-DD'), count: 16, type: 'Cho thuê' },
  { date: moment().format('YYYY-MM-DD'), count: 10, type: 'Bán' },
];

const ListingsTrendChart = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChartData(mockListingsTrendData);
      setLoading(false);
    }, 500); // Giả lập fetch data
    return () => clearTimeout(timer);
  }, []);

  const config = {
    data: chartData,
    xField: 'date',
    yField: 'count',
    seriesField: 'type',
    xAxis: { type: 'time', title: { text: 'Ngày', style: {fill: '#8c8c8c'} } },
    yAxis: { title: { text: 'Số lượng tin đăng', style: {fill: '#8c8c8c'} }, min: 0 },
    legend: { position: 'top-right' },
    smooth: true,
    tooltip: { shared: true, showMarkers: true, formatter: (d) => ({ name: d.type, value: `${d.count} tin`}) },
    color: [primaryColor, '#FACC14'],
    lineStyle: { lineWidth: 3 },
    point: { size: 4, shape: 'circle' },
  };

  return (
    <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.09)', borderRadius: '8px', height: '100%' }}>
      <Title level={5} style={{ marginBottom: 20, color: '#595959' }}>Xu hướng Tin đăng (7 ngày qua)</Title>
      <Spin spinning={loading}>
        <div style={{ height: 300 }}>
          <Line {...config} />
        </div>
      </Spin>
    </Card>
  );
};

export default ListingsTrendChart;