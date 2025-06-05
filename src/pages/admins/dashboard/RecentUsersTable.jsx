// src/pages/admins/DashboardPage/RecentUsersTable.js
import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Typography, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title, Text } = Typography;
const primaryColor = '#4a90e2';

// Dữ liệu mẫu fix cứng
const mockRecentUsersData = [
  { id: 1250, name: 'Nguyễn Thị Mai', role: 'Người thuê/mua', date: moment().toISOString() },
  { id: 1249, name: 'Trần Hùng Anh', role: 'Chủ sở hữu', date: moment().subtract(2, 'hours').toISOString() },
  { id: 1248, name: 'Lê Văn Đức', role: 'Môi giới', date: moment().subtract(4, 'hours').toISOString() },
  { id: 1247, name: 'Phạm Thu Hà', role: 'Người thuê/mua', date: moment().subtract(6, 'hours').toISOString() },
  { id: 1246, name: 'Võ Minh Khang', role: 'Người thuê/mua', date: moment().subtract(1, 'days').toISOString() },
];


const RecentUsersTable = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockRecentUsersData);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { title: 'Tên người dùng', dataIndex: 'name', key: 'name', render: (text) => <Text style={{color: primaryColor}} strong>{text}</Text> },
    { title: 'Vai trò', dataIndex: 'role', key: 'role', align: 'center', render: role => <Tag>{role}</Tag> },
    { title: 'Ngày đăng ký', dataIndex: 'date', key: 'date', align: 'center', render: date => <Tooltip title={moment(date).format('DD/MM/YYYY HH:mm:ss')}>{moment(date).fromNow()}</Tooltip> },
  ];

  return (
    <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.09)', borderRadius: '8px', height: '100%' }}>
      <Title level={5} style={{ marginBottom: 20, color: '#595959' }}><UserOutlined style={{color: primaryColor}}/> Người dùng mới gần đây</Title>
      <Table columns={columns} dataSource={data} loading={loading} rowKey="id" pagination={false} size="small" scroll={{ y: 240 }} />
    </Card>
  );
};

export default RecentUsersTable;