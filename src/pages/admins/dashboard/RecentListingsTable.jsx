
import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Typography, Tooltip } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title, Text } = Typography;
const primaryColor = '#4a90e2';

const RecentListingsTable = ({ listPost }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(listPost || []);
    setLoading(false);
  }, [listPost]);

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => (
        <Text style={{ color: primaryColor }} strong>
          {record.property.title}
        </Text>
      ),
    },
    {
      title: 'Nhu cầu',
      dataIndex: 'demand',
      key: 'demand',
      align: 'center',
      render: type => {
        const isRent = type === 'CHO_THUÊ';
        return (
          <Tag color={isRent ? 'cyan' : 'green'}>
            {isRent ? 'Cho thuê' : 'Mua bán'}
          </Tag>
        );
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'sourceStatus',
      key: 'sourceStatus',
      align: 'center',
      render: status => {
        let color, text;
        switch (status) {
          case 'WAIT_APPROVE':
            color = 'orange';
            text = 'Chờ duyệt';
            break;
          case 'APPROVE':
            color = 'green';
            text = 'Hoạt động';
            break;
          case 'REJECT':
            color = 'red';
            text = 'Từ chối';
            break;
          default:
            color = 'default';
            text = status;
        }
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: date => <Tooltip title={moment(date).format('DD/MM/YYYY HH:mm:ss')}>{moment(date).fromNow()}</Tooltip>
    },
  ];

  return (
    <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.09)', borderRadius: '8px', height: '100%' }}>
      <Title level={5} style={{ marginBottom: 20, color: '#595959' }}><FileTextOutlined style={{ color: primaryColor }} /> Tin đăng gần đây</Title>
      <Table columns={columns} dataSource={data} loading={loading} rowKey="id" pagination={false} size="small" scroll={{ y: 240 }} />
    </Card>
  );
};

export default RecentListingsTable;