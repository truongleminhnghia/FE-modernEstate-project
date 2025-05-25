// src/pages/admins/DashboardPage/StatCard.js
import React from 'react';
import { Card, Statistic, Typography, Spin } from 'antd';
import CountUp from 'react-countup'; // npm install react-countup

const { Text } = Typography;

const formatter = (value) => <CountUp end={value} separator="," />;

const StatCard = ({ title, value, icon, color, loading, prefix, suffix, precision = 0 }) => {
  return (
    <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.09)', borderRadius: '8px', height: '100%' }}>
      <Spin spinning={loading}>
        <Statistic
          title={<Text style={{ color: '#8c8c8c', fontSize: '0.9em' }}>{title}</Text>}
          value={value}
          precision={precision}
          formatter={!loading && typeof value === 'number' ? formatter : undefined}
          prefix={React.cloneElement(icon, { style: { color, marginRight: 10, fontSize: 24 } })}
          suffix={suffix}
          valueStyle={{ color, fontWeight: 'bold', fontSize: '1.8em', lineHeight: '1.2' }}
        />
      </Spin>
    </Card>
  );
};

export default StatCard;