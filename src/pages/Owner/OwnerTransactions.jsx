import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Typography, Spin, Alert, Input, Row, Col, Select, DatePicker, Tooltip, message } from 'antd';
import moment from 'moment';
import 'moment/locale/vi'; 
import TransactionDetail from '../../components/ui/TransactionDetail';

moment.locale('vi');

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const mockTransactions = [
  {
    id: 'txn001',
    date: '2024-11-15T10:30:00Z',
    type: 'cho_thue',
    property: {
      id: 'apt001',
      name: 'Căn hộ Vinhomes Grand Park S1.01 - 2PN',
      address: 'Nguyễn Xiển, Long Thạnh Mỹ, Quận 9, TP.HCM',
    },
    counterparty: {
      name: 'Nguyễn Văn A',
      contact: '090xxxxxxx',
    },
    amount: 12000000, // VND
    status: 'hoan_thanh', // 'hoan_thanh', 'dang_xu_ly', 'da_huy', 'cho_thanh_toan'
    notes: 'Hợp đồng thuê 1 năm, thanh toán 3 tháng/lần.',
  },
  {
    id: 'txn002',
    date: '2024-10-20T14:00:00Z',
    type: 'ban_ra',
    property: {
      id: 'apt002',
      name: 'Căn hộ Masteri Thảo Điền T2 - 3PN',
      address: 'Xa lộ Hà Nội, Thảo Điền, Quận 2, TP.HCM',
    },
    counterparty: {
      name: 'Trần Thị B',
      contact: '091xxxxxxx',
    },
    amount: 5500000000, // VND
    status: 'hoan_thanh',
    notes: 'Đã công chứng và bàn giao nhà.',
  },
  {
    id: 'txn003',
    date: '2025-01-05T09:15:00Z',
    type: 'dat_coc_cho_thue',
    property: {
      id: 'apt003',
      name: 'Căn hộ The Sun Avenue SAV2 - 1PN',
      address: 'Mai Chí Thọ, An Phú, Quận 2, TP.HCM',
    },
    counterparty: {
      name: 'Lê Văn C',
      contact: '098xxxxxxx',
    },
    amount: 10000000, // VND
    status: 'dang_xu_ly',
    notes: 'Dự kiến ký hợp đồng chính thức vào 10/01/2025.',
  },
  {
    id: 'txn004',
    date: '2025-03-01T16:00:00Z',
    type: 'cho_thue',
    property: {
      id: 'apt001', // Căn hộ này được cho thuê lại sau khi người cũ hết hợp đồng
      name: 'Căn hộ Vinhomes Grand Park S1.01 - 2PN',
      address: 'Nguyễn Xiển, Long Thạnh Mỹ, Quận 9, TP.HCM',
    },
    counterparty: {
      name: 'Phạm Thị D',
      contact: '097xxxxxxx',
    },
    amount: 12500000,
    status: 'cho_thanh_toan',
    notes: 'Đã ký hợp đồng, chờ thanh toán đợt 1.',
  },
  {
    id: 'txn005',
    date: '2023-07-10T11:00:00Z',
    type: 'mua_vao',
    property: {
      id: 'apt001',
      name: 'Căn hộ Vinhomes Grand Park S1.01 - 2PN',
      address: 'Nguyễn Xiển, Long Thạnh Mỹ, Quận 9, TP.HCM',
    },
    counterparty: {
      name: 'Công ty CP Đầu tư Xây dựng ABC',
      contact: 'sales@abc-corp.vn',
    },
    amount: 2800000000,
    status: 'hoan_thanh',
    notes: 'Mua từ chủ đầu tư.',
  },
];

// Hàm để lấy text và màu sắc cho Tag trạng thái
const getStatusTag = (status) => {
  switch (status) {
    case 'hoan_thanh':
      return <Tag color="green">HOÀN THÀNH</Tag>;
    case 'dang_xu_ly':
      return <Tag color="blue">ĐANG XỬ LÝ</Tag>;
    case 'da_huy':
      return <Tag color="red">ĐÃ HỦY</Tag>;
    case 'cho_thanh_toan':
      return <Tag color="orange">CHỜ THANH TOÁN</Tag>;
    default:
      return <Tag>{status.toUpperCase()}</Tag>;
  }
};

// Hàm để lấy text cho loại giao dịch
const getTransactionTypeText = (type) => {
  switch (type) {
    case 'mua_vao':
      return 'Mua vào';
    case 'ban_ra':
      return 'Bán ra';
    case 'cho_thue':
      return 'Cho thuê';
    case 'dat_coc_cho_thue':
      return 'Đặt cọc (Cho thuê)';
    case 'dat_coc_mua_ban':
      return 'Đặt cọc (Mua/Bán)';
    default:
      return type;
  }
};

const OwnerTransactions = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);
  const [filterDateRange, setFilterDateRange] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  // Giả lập fetch dữ liệu
  useEffect(() => {
    setLoading(true);
    setError(null);
    // Trong thực tế, bạn sẽ gọi API ở đây
    setTimeout(() => {
      try {
        // Giả sử ownerId được truyền vào hoặc lấy từ context/redux
        // const ownerId = 'owner123';
        // Lọc giao dịch theo owner (ví dụ, chủ sở hữu của 'apt001' và 'apt002' và 'apt003')
        // Trong ví dụ này, chúng ta lấy hết mockTransactions
        setTransactions(mockTransactions);
        setLoading(false);
      } catch (e) {
        setError('Không thể tải dữ liệu giao dịch.');
        setLoading(false);
        console.error(e);
      }
    }, 1000);
  }, []);

  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
  };

  const handleTypeFilterChange = (value) => {
    setFilterType(value);
  };

  const handleStatusFilterChange = (value) => {
    setFilterStatus(value);
  };

  const handleDateRangeFilterChange = (dates) => {
    setFilterDateRange(dates);
  };

  const handleViewDetails = (record) => {
    setSelectedTransaction(record);
    setDetailModalVisible(true);
  };

  const handleDetailClose = () => {
    setDetailModalVisible(false);
    setSelectedTransaction(null);
  };

  const handleReviewSuccess = () => {
    message.success('Đánh giá đã được gửi thành công!');
  };


  const filteredTransactions = transactions.filter(item => {
    const searchTextMatch = searchText ?
      item.property.name.toLowerCase().includes(searchText) ||
      item.property.address.toLowerCase().includes(searchText) ||
      item.counterparty.name.toLowerCase().includes(searchText) ||
      item.id.toLowerCase().includes(searchText) : true;

    const typeMatch = filterType ? item.type === filterType : true;
    const statusMatch = filterStatus ? item.status === filterStatus : true;
    const dateMatch = filterDateRange ?
      moment(item.date).isBetween(filterDateRange[0], filterDateRange[1], 'days', '[]') : true;

    return searchTextMatch && typeMatch && statusMatch && dateMatch;
  });


  const columns = [
    {
      title: 'Ngày Giao Dịch',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      render: (text) => moment(text).format('DD/MM/YYYY HH:mm'),
      defaultSortOrder: 'descend',
    },
    {
      title: 'Loại Giao Dịch',
      dataIndex: 'type',
      key: 'type',
      render: (type) => getTransactionTypeText(type),
      filters: [
        { text: 'Mua vào', value: 'mua_vao' },
        { text: 'Bán ra', value: 'ban_ra' },
        { text: 'Cho thuê', value: 'cho_thue' },
        { text: 'Đặt cọc (Cho thuê)', value: 'dat_coc_cho_thue' },
        { text: 'Đặt cọc (Mua/Bán)', value: 'dat_coc_mua_ban' },
      ],
      onFilter: (value, record) => record.type.indexOf(value) === 0,
    },
    {
      title: 'Căn hộ',
      dataIndex: 'property',
      key: 'property',
      render: (property) => (
        <Tooltip title={property.address}>
          <span>{property.name}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Bên Liên Quan',
      dataIndex: 'counterparty',
      key: 'counterparty',
      render: (counterparty) => (
        <Tooltip title={`Liên hệ: ${counterparty.contact}`}>
          <span>{counterparty.name}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Số Tiền (VNĐ)',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      sorter: (a, b) => a.amount - b.amount,
      render: (amount) => new Intl.NumberFormat('vi-VN').format(amount),
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
      filters: [
        { text: 'Hoàn thành', value: 'hoan_thanh' },
        { text: 'Đang xử lý', value: 'dang_xu_ly' },
        { text: 'Đã hủy', value: 'da_huy' },
        { text: 'Chờ thanh toán', value: 'cho_thanh_toan' },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleViewDetails(record)}>Xem Chi Tiết</a>
          {/* Bạn có thể thêm các hành động khác ở đây, ví dụ: Sửa, Hủy (nếu có quyền) */}
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message="Lỗi" description={error} type="error" showIcon />;
  }

  return (
    <div style={{ padding: '20px' }} className='container'>
      <Title level={2} style={{ marginBottom: '20px' }}>Lịch Sử Giao Dịch</Title>

      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Search
            placeholder="Tìm kiếm theo BĐS, bên liên quan, mã GD..."
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            allowClear
            style={{ width: '100%' }}
          />
        </Col>
        <Col xs={24} sm={12} md={6} lg={4}>
          <Select
            placeholder="Lọc theo loại GD"
            onChange={handleTypeFilterChange}
            allowClear
            style={{ width: '100%' }}
          >
            <Option value="mua_vao">Mua vào</Option>
            <Option value="ban_ra">Bán ra</Option>
            <Option value="cho_thue">Cho thuê</Option>
            <Option value="dat_coc_cho_thue">Đặt cọc (Cho thuê)</Option>
            <Option value="dat_coc_mua_ban">Đặt cọc (Mua/Bán)</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6} lg={4}>
          <Select
            placeholder="Lọc theo trạng thái"
            onChange={handleStatusFilterChange}
            allowClear
            style={{ width: '100%' }}
          >
            <Option value="hoan_thanh">Hoàn thành</Option>
            <Option value="dang_xu_ly">Đang xử lý</Option>
            <Option value="da_huy">Đã hủy</Option>
            <Option value="cho_thanh_toan">Chờ thanh toán</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <RangePicker
            onChange={handleDateRangeFilterChange}
            style={{ width: '100%' }}
            placeholder={['Từ ngày', 'Đến ngày']}
          />
        </Col>
      </Row>


      <Table
        columns={columns}
        dataSource={filteredTransactions}
        rowKey="id"
        bordered
        scroll={{ x: 'max-content' }} // Cho phép cuộn ngang trên màn hình nhỏ
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}><b>Ghi chú:</b> {record.notes || 'Không có ghi chú'}</p>,
          // rowExpandable: record => record.notes && record.notes.length > 0, // Chỉ cho phép mở rộng nếu có ghi chú
        }}
      />

      {/* Modal chi tiết giao dịch */}
      <TransactionDetail
        visible={detailModalVisible}
        transaction={selectedTransaction}
        onClose={handleDetailClose}
        onReviewSuccess={handleReviewSuccess}
      />
    </div>
  );
};

export default OwnerTransactions;