import React, { useState } from 'react';
import { Card, Table, Tag, Space, Button, DatePicker, Select, Input, Row, Col, Typography } from 'antd';
import { SearchOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import '../BrokerProfile.css';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const mockTransactions = [
  {
    id: 'TXN001',
    date: '2024-05-01',
    type: 'Nạp tiền',
    amount: 5000000,
    status: 'Thành công',
    description: 'Nạp tiền vào tài khoản',
    reference: 'REF123456',
  },
  {
    id: 'TXN002',
    date: '2024-05-03',
    type: 'Thanh toán',
    amount: 1200000,
    status: 'Thành công',
    description: 'Thanh toán phí đăng tin',
    reference: 'REF654321',
  },
  {
    id: 'TXN003',
    date: '2024-05-05',
    type: 'Hoàn tiền',
    amount: 500000,
    status: 'Thất bại',
    description: 'Hoàn tiền do tin bị từ chối',
    reference: 'REF789012',
  },
];

const statusColor = {
  'Thành công': 'green',
  'Đang xử lý': 'orange',
  'Thất bại': 'red',
};

const typeColor = {
  'Nạp tiền': 'blue',
  'Thanh toán': 'purple',
  'Hoàn tiền': 'gold',
};

const BrokerTransactionHistory = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(mockTransactions);

  // Tìm kiếm đơn giản
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setFilteredData(
      mockTransactions.filter(
        (item) =>
          item.id.toLowerCase().includes(value.toLowerCase()) ||
          item.description.toLowerCase().includes(value.toLowerCase()) ||
          item.reference.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const columns = [
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: 'Loại giao dịch',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <Tag color={typeColor[type]}>{type}</Tag>,
      filters: [
        { text: 'Nạp tiền', value: 'Nạp tiền' },
        { text: 'Thanh toán', value: 'Thanh toán' },
        { text: 'Hoàn tiền', value: 'Hoàn tiền' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <span style={{ color: amount > 0 ? '#4a90e2' : '#d4380d', fontWeight: 600 }}>
          {amount.toLocaleString()}đ
        </span>
      ),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={statusColor[status]}>{status}</Tag>,
      filters: [
        { text: 'Thành công', value: 'Thành công' },
        { text: 'Đang xử lý', value: 'Đang xử lý' },
        { text: 'Thất bại', value: 'Thất bại' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Mã tham chiếu',
      dataIndex: 'reference',
      key: 'reference',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            type="text" 
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
          >
            Chi tiết
          </Button>
          <Button icon={<DownloadOutlined />} size="small">
            Tải biên lai
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="broker-container">
      <Card className="broker-card" style={{ marginBottom: 32 }}>
        <Row justify="space-between" align="middle" className="transaction-header" style={{ marginBottom: 16 }}>
          <Col>
            <Title level={4} style={{ margin: 0 }}>
              Lịch sử giao dịch
            </Title>
          </Col>
          <Col>
            <Button icon={<DownloadOutlined />} type="primary">
              Tải báo cáo
            </Button>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Tìm kiếm giao dịch..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={handleSearch}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <RangePicker style={{ width: '100%' }} />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select placeholder="Loại giao dịch" style={{ width: '100%' }} allowClear>
              <Option value="Nạp tiền">Nạp tiền</Option>
              <Option value="Thanh toán">Thanh toán</Option>
              <Option value="Hoàn tiền">Hoàn tiền</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select placeholder="Trạng thái" style={{ width: '100%' }} allowClear>
              <Option value="Thành công">Thành công</Option>
              <Option value="Đang xử lý">Đang xử lý</Option>
              <Option value="Thất bại">Thất bại</Option>
            </Select>
          </Col>
        </Row>
        <Table
          className="transaction-table"
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default BrokerTransactionHistory;