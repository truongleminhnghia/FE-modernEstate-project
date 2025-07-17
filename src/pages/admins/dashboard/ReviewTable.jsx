import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Typography, Tooltip, Spin } from 'antd';
import { FileTextOutlined, UserOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title, Text } = Typography;
const primaryColor = '#4a90e2';

const ReviewTable = ({ listReview }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(listReview || []);
        setLoading(false);
    }, [listReview]);

    const columns = [
        {
            title: 'Tên người dùng',
            key: 'name',
            render: (_, record) => (
                <Text style={{ color: primaryColor }} strong>
                    {record.account.lastName} {record.account.firstName}
                </Text>
            ),
        },
        {
            title: 'Bình luận',
            key: 'role',
            align: 'center',
            render: (_, record) => (
                <Text style={{ color: primaryColor }}>
                    {record.comment}
                </Text>
            ),
        },
        {
            title: 'Đánh giá',
            key: 'role',
            align: 'center',
            render: (_, record) => (
                <Text style={{ color: primaryColor }}>
                    {record.rating}
                </Text>
            ),
        },
        {
            title: 'Ngày đăng ký',
            dataIndex: 'createdAt',
            key: 'date',
            align: 'center',
            render: date => (
                <Tooltip title={moment(date).format('DD/MM/YYYY HH:mm:ss')}>
                    {moment(date).fromNow()}
                </Tooltip>
            ),
        },
    ];

    return (
    <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.09)', borderRadius: '8px', height: '100%' }}>
      <Title level={5} style={{ marginBottom: 20, color: '#595959' }}>
        <UserOutlined style={{ color: primaryColor }} /> Đánh giá gần đây
      </Title>
      {loading ? (
        <Spin />
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey="id"
          pagination={false}
          size="small"
          scroll={{ y: 240 }}
        />
      )}
    </Card>
  );
}

export default ReviewTable
