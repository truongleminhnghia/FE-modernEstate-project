// src/pages/admins/DashboardPage/RecentListingsTable.js
import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Typography, Tooltip } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title, Text } = Typography;
const primaryColor = '#4a90e2';

// Dữ liệu mẫu fix cứng
const mockRecentListingsData = [
  { id: 850, title: 'Cần bán gấp CH Celadon City 3PN view công viên', status: 'pending_approval', type: 'Bán', date: moment().toISOString() },
  { id: 849, title: 'Cho thuê nhà nguyên căn Q.Tân Bình, hẻm xe hơi', status: 'active', type: 'Cho thuê', date: moment().subtract(1, 'hours').toISOString() },
  { id: 848, title: 'Văn phòng hạng A cho thuê tại Landmark 81', status: 'active', type: 'Cho thuê', date: moment().subtract(3, 'hours').toISOString() },
  { id: 847, title: 'Bán đất nền dự án ABC, sổ hồng riêng', status: 'pending_approval', type: 'Bán', date: moment().subtract(5, 'hours').toISOString() },
  { id: 846, title: 'Cho thuê Shophouse Masteri Thảo Điền', status: 'active', type: 'Cho thuê', date: moment().subtract(1, 'days').toISOString() },
];

const RecentListingsTable = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockRecentListingsData);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title', render: (text) => <Text style={{color: primaryColor}} strong>{text}</Text> },
    { title: 'Loại tin', dataIndex: 'type', key: 'type', align: 'center', render: type => type === 'Cho thuê' ? <Tag color="blue">Cho thuê</Tag> : <Tag color="green">Bán</Tag> },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', align: 'center', render: status => <Tag color={status === 'active' ? 'success' : 'processing'}>{status === 'pending_approval' ? 'Chờ duyệt' : 'Hoạt động'}</Tag> },
    { title: 'Ngày đăng', dataIndex: 'date', key: 'date', align: 'center', render: date => <Tooltip title={moment(date).format('DD/MM/YYYY HH:mm:ss')}>{moment(date).fromNow()}</Tooltip> },
  ];

  return (
    <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.09)', borderRadius: '8px', height: '100%' }}>
      <Title level={5} style={{ marginBottom: 20, color: '#595959' }}><FileTextOutlined style={{color: primaryColor}} /> Tin đăng gần đây</Title>
      <Table columns={columns} dataSource={data} loading={loading} rowKey="id" pagination={false} size="small" scroll={{ y: 240 }} />
    </Card>
  );
};

export default RecentListingsTable;