import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Typography, Tooltip, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title, Text } = Typography;
const primaryColor = '#4a90e2';

const RecentUsersTable = ({ listUser }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(listUser || []);
    setLoading(false);
  }, [listUser]);

  const roleConfig = {
    ROLE_CUSTOMER: {
      label: 'Người dùng',
      color: 'blue',
    },
    ROLE_BROKER: {
      label: 'Môi giới',
      color: 'green',
    },
    ROLE_OWNER: {
      label: 'Chủ sở hữu',
      color: 'volcano',
    },
    ROLE_EMPLOYEE: {
      label: 'Nhân viên',
      color: 'geekblue',
    },
  };

  const columns = [
    {
      title: 'Tên người dùng',
      key: 'name',
      render: (_, record) => (
        <Text style={{ color: primaryColor }} strong>
          {record.lastName} {record.firstName}
        </Text>
      ),
    },
    {
      title: 'Vai trò',
      key: 'role',
      align: 'center',
      render: (_, record) => {
        const rn = record.role?.roleName;
        const cfg = roleConfig[rn] || { label: rn, color: 'default' };
        return <Tag color={cfg.color}>{cfg.label}</Tag>;
      },
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
        <UserOutlined style={{ color: primaryColor }} /> Người dùng mới gần đây
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
};

export default RecentUsersTable;
