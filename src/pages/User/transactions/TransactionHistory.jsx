import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Tag, 
  Space, 
  Button, 
  DatePicker, 
  Select,
  Input,
  Row,
  Col,
  Typography
} from 'antd';
import { 
  SearchOutlined,
  DownloadOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import './TransactionHistory.css';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const TransactionHistory = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const transactions = [
    {
      id: '1',
      date: '2024-03-15',
      type: 'Nạp tiền',
      amount: 1000000,
      status: 'success',
      description: 'Nạp tiền qua VNPay',
      reference: 'VNPAY123456'
    },
    {
      id: '2',
      date: '2024-03-14',
      type: 'Thanh toán',
      amount: -500000,
      status: 'success',
      description: 'Thanh toán phí đăng tin',
      reference: 'PAY789012'
    },
    {
      id: '3',
      date: '2024-03-13',
      type: 'Hoàn tiền',
      amount: 200000,
      status: 'pending',
      description: 'Hoàn tiền từ tin đã hết hạn',
      reference: 'REF345678'
    },
    {
      id: '4',
      date: '2024-03-12',
      type: 'Nạp tiền',
      amount: 2000000,
      status: 'failed',
      description: 'Nạp tiền qua VNPay',
      reference: 'VNPAY901234'
    }
  ];

  const columns = [
    {
      title: 'Ngày giao dịch',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: 'Loại giao dịch',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        let color = 'blue';
        if (type === 'Thanh toán') color = 'red';
        if (type === 'Hoàn tiền') color = 'green';
        return <Tag color={color}>{type}</Tag>;
      },
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => {
        const formattedAmount = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(amount);
        return (
          <span style={{ color: amount >= 0 ? '#52c41a' : '#ff4d4f' }}>
            {formattedAmount}
          </span>
        );
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          success: { color: 'success', text: 'Thành công' },
          pending: { color: 'warning', text: 'Đang xử lý' },
          failed: { color: 'error', text: 'Thất bại' }
        };
        const config = statusConfig[status];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Mã giao dịch',
      dataIndex: 'reference',
      key: 'reference',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
          >
            Chi tiết
          </Button>
          <Button 
            type="text" 
            icon={<DownloadOutlined />}
            onClick={() => handleDownloadReceipt(record)}
          >
            Tải hóa đơn
          </Button>
        </Space>
      ),
    },
  ];

  const handleViewDetails = (record) => {
    // Implement view details logic
    console.log('View details:', record);
  };

  const handleDownloadReceipt = (record) => {
    // Implement download receipt logic
    console.log('Download receipt:', record);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    // Implement search logic
  };

  const handleFilter = (values) => {
    // Implement filter logic
    console.log('Filter values:', values);
  };

  return (
    <div className="transaction-container">
      <Card>
        <div className="transaction-header">
          <Title level={4}>Lịch sử giao dịch</Title>
          <Button 
            type="primary" 
            icon={<DownloadOutlined />}
            onClick={() => handleDownloadReceipt({ type: 'all' })}
          >
            Tải báo cáo
          </Button>
        </div>

        <div className="transaction-filters">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Input
                placeholder="Tìm kiếm giao dịch"
                prefix={<SearchOutlined />}
                onChange={(e) => handleSearch(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <RangePicker 
                style={{ width: '100%' }}
                placeholder={['Từ ngày', 'Đến ngày']}
                onChange={(dates) => handleFilter({ dates })}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Select
                placeholder="Loại giao dịch"
                style={{ width: '100%' }}
                onChange={(value) => handleFilter({ type: value })}
                allowClear
              >
                <Option value="Nạp tiền">Nạp tiền</Option>
                <Option value="Thanh toán">Thanh toán</Option>
                <Option value="Hoàn tiền">Hoàn tiền</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Select
                placeholder="Trạng thái"
                style={{ width: '100%' }}
                onChange={(value) => handleFilter({ status: value })}
                allowClear
              >
                <Option value="success">Thành công</Option>
                <Option value="pending">Đang xử lý</Option>
                <Option value="failed">Thất bại</Option>
              </Select>
            </Col>
          </Row>
        </div>

        <Table
          columns={columns}
          dataSource={transactions}
          rowKey="id"
          loading={loading}
          pagination={{
            total: transactions.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} giao dịch`
          }}
          className="transaction-table"
        />
      </Card>
    </div>
  );
};

export default TransactionHistory;