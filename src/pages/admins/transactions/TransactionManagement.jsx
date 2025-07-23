import React, { useState, useEffect } from 'react'
import {
  Table,
  Button,
  Input,
  Space,
  Tag,
  Typography,
  Modal,
  Tooltip,
  Row,
  Col,
  Form,
  message,
  Select,
  DatePicker,
  Dropdown,
  Menu,
  Spin,
} from 'antd'
import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  DollarCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  EllipsisOutlined,
  TagsOutlined,
  CreditCardOutlined,
  StopOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import TextArea from 'antd/es/input/TextArea'

const { Title, Text } = Typography
const { confirm } = Modal
const { Option } = Select
const { RangePicker } = DatePicker

const primaryColor = '#4a90e2'

const transactionTypes = {
  listing_fee: { text: 'Phí đăng tin', color: 'blue' },
  subscription_payment: { text: 'Gói tài khoản', color: 'purple' },
  commission_payout: { text: 'Chi hoa hồng', color: 'magenta' },
  service_fee: { text: 'Phí dịch vụ', color: 'orange' },
  refund: { text: 'Hoàn tiền', color: 'gold' },
  top_up: { text: 'Nạp tiền ví', color: 'lime' },
}

const transactionStatuses = {
  pending: { text: 'Chờ xử lý', color: 'gold', icon: <SyncOutlined spin /> },
  processing: {
    text: 'Đang xử lý',
    color: 'blue',
    icon: <SyncOutlined spin />,
  },
  completed: {
    text: 'Hoàn thành',
    color: 'green',
    icon: <CheckCircleOutlined />,
  },
  success: {
    text: 'Hoàn thành',
    color: 'green',
    icon: <CheckCircleOutlined />,
  },
  failed: { text: 'Thất bại', color: 'red', icon: <CloseCircleOutlined /> },
  cancelled: { text: 'Đã hủy', color: 'grey', icon: <StopOutlined /> },
  refunded: { text: 'Đã hoàn tiền', color: 'volcano' },
}

const paymentMethods = {
  credit_card: 'Thẻ tín dụng',
  bank_transfer: 'Chuyển khoản NH',
  momo: 'MoMo',
  zalopay: 'ZaloPay',
  paypal: 'Paypal',
  cod: 'COD',
  wallet: 'Ví điện tử nội bộ',
}

const TransactionManagement = () => {
  const [searchText, setSearchText] = useState('')
  const [filters, setFilters] = useState({})
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)

  const [isUpdateStatusModalVisible, setIsUpdateStatusModalVisible] =
    useState(false)
  const [transactionToUpdateStatus, setTransactionToUpdateStatus] =
    useState(null)

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [form] = Form.useForm()

  // Fetch transactions from API
  const fetchTransactions = async (page = 1, pageSize = 10) => {
    setLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No authentication token found')

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}transactions?page_current=${page}&page_size=${pageSize}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const data = await response.json()
      let transactionsArray = []
      let total = 0;
      if (data.success && data.data && data.data.rowDatas) {
        transactionsArray = data.data.rowDatas
        total = data.data.totalCount || data.data.total || 0;
      }

      // Map API data to match our table structure
      const mappedTransactions = transactionsArray.map((transaction) => ({
        id: transaction.transactionId || transaction.id,
        transactionCode: transaction.transactionCode || `TXN${transaction.transactionId?.slice(-6) || ''}`,
        userId: transaction.account?.id,
        user: transaction.account
          ? {
              fullName: `${transaction.account.lastName || ''} ${transaction.account.firstName || ''}`.trim(),
              email: transaction.account.email,
            }
          : undefined,
        amount: transaction.amount,
        currency: transaction.currency || 'VND',
        transactionType: transaction.enumTypeTransaction || 'service_fee',
        paymentMethod: transaction.enumPaymentMethod || 'bank_transfer',
        transactionDate: transaction.createdAt,
        status: transaction.status?.toLowerCase() || transaction.status,
        description: '', // API không trả về, bạn có thể bổ sung nếu có
        gatewayTransactionId: transaction.transactionCode, // Nếu có trường riêng thì sửa lại
      }))

      setDataSource(mappedTransactions)
      setPagination((prev) => ({
        ...prev,
        current: page,
        pageSize,
        total,
      }))
    } catch (err) {
      setError(err.message)
      message.error('Không thể tải danh sách giao dịch: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions(pagination.current, pagination.pageSize);
    // eslint-disable-next-line
  }, []);

  const filteredDataSource = dataSource.filter((transaction) => {
    const search = searchText.toLowerCase()
    const searchMatch =
      transaction.id.toString().toLowerCase().includes(search) ||
      transaction.transactionCode.toLowerCase().includes(search) ||
      (transaction.user?.fullName &&
        transaction.user.fullName.toLowerCase().includes(search)) ||
      (transaction.property?.title &&
        transaction.property.title.toLowerCase().includes(search)) ||
      (transaction.gatewayTransactionId &&
        transaction.gatewayTransactionId.toLowerCase().includes(search))

    const filterMatch = Object.entries(filters).every(([key, value]) => {
      if (!value) return true
      if (key === 'dateRange' && value.length === 2) {
        const transactionDate = moment(transaction.transactionDate)
        return transactionDate.isBetween(value[0], value[1], undefined, '[]')
      }
      return transaction[key] === value
    })
    return searchMatch && filterMatch
  })

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction)
    setIsDetailModalVisible(true)
  }

  const showUpdateStatusModal = (transaction) => {
    setTransactionToUpdateStatus(transaction)
    form.setFieldsValue({ newStatus: transaction.status })
    setIsUpdateStatusModalVisible(true)
  }

  const handleUpdateStatusCancel = () => {
    setIsUpdateStatusModalVisible(false)
    setTransactionToUpdateStatus(null)
    form.resetFields()
  }

  const handleUpdateStatusSubmit = (values) => {
    if (!transactionToUpdateStatus) return
    const { newStatus } = values
    confirm({
      title: `Bạn có chắc muốn cập nhật trạng thái giao dịch #${transactionToUpdateStatus.transactionCode} thành "${transactionStatuses[newStatus]?.text}"?`,
      icon: <ExclamationCircleFilled />,
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk() {
        setDataSource((prevData) =>
          prevData.map((txn) =>
            txn.id === transactionToUpdateStatus.id
              ? { ...txn, status: newStatus }
              : txn
          )
        )
        message.success('Cập nhật trạng thái giao dịch thành công!')
        handleUpdateStatusCancel()
      },
    })
  }

  const handleTableChange = (pagination) => {
    fetchTransactions(pagination.current, pagination.pageSize);
  };

  const columns = [
    {
      title: 'Mã GD',
      dataIndex: 'transactionCode',
      key: 'transactionCode',
      width: 160,
      fixed: 'left',
      sorter: (a, b) => a.transactionCode.localeCompare(b.transactionCode),
      render: (text, record) => (
        <Text
          strong
          copyable={{ text: record.transactionCode }}
          style={{ color: primaryColor }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: (
        <Space>
          <UserOutlined />
          Người dùng
        </Space>
      ),
      dataIndex: 'user',
      key: 'userId',
      width: 180,
      render: (user, record) => user?.fullName || `User ID: ${record.userId}`,
    },
    {
      title: (
        <Space>
          <TagsOutlined />
          Loại GD
        </Space>
      ),
      dataIndex: 'transactionType',
      key: 'transactionType',
      width: 150,
      align: 'center',
      render: (type) => (
        <Tag color={transactionTypes[type]?.color || 'default'}>
          {transactionTypes[type]?.text || type}
        </Tag>
      ),
    },
    {
      title: (
        <Space>
          <DollarCircleOutlined />
          Số tiền
        </Space>
      ),
      dataIndex: 'amount',
      key: 'amount',
      width: 150,
      align: 'right',
      sorter: (a, b) => a.amount - b.amount,
      render: (amount, record) => (
        <Text
          strong
          style={{
            color:
              record.transactionType === 'refund' || record.status === 'failed'
                ? 'red'
                : 'inherit',
          }}
        >
          {Number(amount).toLocaleString()} {record.currency}
        </Text>
      ),
    },
    {
      title: (
        <Space>
          <CreditCardOutlined />
          Phương thức TT
        </Space>
      ),
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      width: 150,
      align: 'center',
      filters: Object.entries(paymentMethods).map(([value, text]) => ({
        text,
        value,
      })),
      onFilter: (value, record) => record.paymentMethod === value,
      render: (method) => <Tag>{paymentMethods[method] || method}</Tag>,
    },
    {
      title: (
        <Space>
          <CalendarOutlined />
          Ngày GD
        </Space>
      ),
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      width: 160,
      align: 'center',
      sorter: (a, b) =>
        moment(a.transactionDate).unix() - moment(b.transactionDate).unix(),
      render: (date) => moment(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      align: 'center',
      fixed: 'right',
      filters: Object.entries(transactionStatuses).map(([value, { text }]) => ({
        text,
        value,
      })),
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Tag
          icon={transactionStatuses[status]?.icon}
          color={transactionStatuses[status]?.color || 'default'}
        >
          {transactionStatuses[status]?.text || status}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="view"
                icon={<EyeOutlined />}
                onClick={() => handleViewDetails(record)}
              >
                Xem chi tiết
              </Menu.Item>
              {!['completed', 'failed', 'cancelled', 'refunded'].includes(
                record.status
              ) && (
                <Menu.Item
                  key="update_status"
                  icon={<EditOutlined />}
                  onClick={() => showUpdateStatusModal(record)}
                >
                  Cập nhật trạng thái
                </Menu.Item>
              )}
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ]

  const handleSearchInputChange = (e) => setSearchText(e.target.value)
  const handleClearSearch = () => setSearchText('')
  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }))
  }

  return (
    <div
      style={{
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      <Title level={3} style={{ marginBottom: '20px', color: primaryColor }}>
        <DollarCircleOutlined /> Quản lý Giao dịch
      </Title>

      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Row gutter={[16, 16]} align="bottom">
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Tìm Mã GD, User, Tin, Gateway ID..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={handleSearchInputChange}
              allowClear
              onClear={handleClearSearch}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <RangePicker
              style={{ width: '100%' }}
              onChange={(dates) => handleFilterChange('dateRange', dates)}
              placeholder={['Từ ngày', 'Đến ngày']}
              format="DD/MM/YYYY"
            />
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Select
              style={{ width: '100%' }}
              placeholder="Loại GD"
              onChange={(value) => handleFilterChange('transactionType', value)}
              allowClear
            >
              {Object.entries(transactionTypes).map(([key, { text }]) => (
                <Option key={key} value={key}>
                  {text}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Select
              style={{ width: '100%' }}
              placeholder="Trạng thái GD"
              onChange={(value) => handleFilterChange('status', value)}
              allowClear
            >
              {Object.entries(transactionStatuses).map(([key, { text }]) => (
                <Option key={key} value={key}>
                  {text}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
            <div style={{ marginTop: '16px' }}>
              Đang tải danh sách giao dịch...
            </div>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
            <div>Lỗi: {error}</div>
            <Button
              type="primary"
              onClick={fetchTransactions}
              style={{ marginTop: '16px' }}
            >
              Thử lại
            </Button>
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={filteredDataSource}
            rowKey="id"
            bordered
            scroll={{ x: 1800 }}
            style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50', '100'],
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} GD`,
            }}
            onChange={handleTableChange}
          />
        )}
      </Space>

      <Modal
        title={
          <span style={{ color: primaryColor, fontWeight: 'bold' }}>
            <FileTextOutlined /> Chi tiết Giao dịch #
            {selectedTransaction?.transactionCode}
          </span>
        }
        visible={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={[
          <Button
            key="close"
            onClick={() => setIsDetailModalVisible(false)}
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            Đóng
          </Button>,
        ]}
        width={700}
      >
        {selectedTransaction && (
          <div
            style={{
              maxHeight: '70vh',
              overflowY: 'auto',
              paddingRight: '10px',
            }}
          >
            <p>
              <strong>ID Giao dịch:</strong> {selectedTransaction.id}
            </p>
            <p>
              <strong>Mã GD hệ thống:</strong>{' '}
              {selectedTransaction.transactionCode}
            </p>
            <p>
              <strong>ID GD Cổng TT:</strong>{' '}
              {selectedTransaction.gatewayTransactionId || 'N/A'}
            </p>
            <p>
              <strong>Người dùng:</strong>{' '}
              {selectedTransaction.user?.fullName ||
                `User ID: ${selectedTransaction.userId}`}
            </p>
            <p>
              <strong>Tin đăng liên quan:</strong>{' '}
              {selectedTransaction.property?.title || 'Không có'}
            </p>
            <p>
              <strong>Loại giao dịch:</strong>{' '}
              <Tag
                color={
                  transactionTypes[selectedTransaction.transactionType]?.color
                }
              >
                {transactionTypes[selectedTransaction.transactionType]?.text}
              </Tag>
            </p>
            <p>
              <strong>Số tiền:</strong>{' '}
              <Text strong>
                {Number(selectedTransaction.amount).toLocaleString()}{' '}
                {selectedTransaction.currency}
              </Text>
            </p>
            <p>
              <strong>Phương thức thanh toán:</strong>{' '}
              <Tag>
                {paymentMethods[selectedTransaction.paymentMethod] ||
                  selectedTransaction.paymentMethod}
              </Tag>
            </p>
            <p>
              <strong>Ngày giao dịch:</strong>{' '}
              {moment(selectedTransaction.transactionDate).format(
                'DD/MM/YYYY HH:mm:ss'
              )}
            </p>
            <p>
              <strong>Trạng thái:</strong>{' '}
              <Tag
                icon={transactionStatuses[selectedTransaction.status]?.icon}
                color={transactionStatuses[selectedTransaction.status]?.color}
              >
                {transactionStatuses[selectedTransaction.status]?.text}
              </Tag>
            </p>
            <p>
              <strong>Mô tả:</strong> {selectedTransaction.description}
            </p>
            {selectedTransaction.notesForAdmin && (
              <p
                style={{
                  background: '#fffbe6',
                  border: '1px solid #ffe58f',
                  padding: '8px',
                  borderRadius: '4px',
                }}
              >
                <strong>Ghi chú Admin:</strong>{' '}
                {selectedTransaction.notesForAdmin}
              </p>
            )}
          </div>
        )}
      </Modal>

      <Modal
        title={
          <span style={{ color: primaryColor, fontWeight: 'bold' }}>
            <EditOutlined /> Cập nhật Trạng thái Giao dịch
          </span>
        }
        visible={isUpdateStatusModalVisible}
        onCancel={handleUpdateStatusCancel}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateStatusSubmit}>
          <p>
            Giao dịch:{' '}
            <strong>#{transactionToUpdateStatus?.transactionCode}</strong>
          </p>
          <p>
            Trạng thái hiện tại:{' '}
            <Tag
              color={
                transactionStatuses[transactionToUpdateStatus?.status || '']
                  ?.color
              }
            >
              {
                transactionStatuses[transactionToUpdateStatus?.status || '']
                  ?.text
              }
            </Tag>
          </p>
          <Form.Item
            name="newStatus"
            label="Chọn trạng thái mới"
            rules={[
              { required: true, message: 'Vui lòng chọn trạng thái mới!' },
            ]}
          >
            <Select placeholder="Chọn trạng thái">
              {Object.entries(transactionStatuses)
                // Ví dụ: không cho chuyển từ completed/failed về pending
                .filter(([key, _]) => {
                  if (
                    transactionToUpdateStatus?.status === 'completed' ||
                    transactionToUpdateStatus?.status === 'failed' ||
                    transactionToUpdateStatus?.status === 'cancelled'
                  )
                    return key === transactionToUpdateStatus?.status // Chỉ cho phép giữ nguyên nếu đã là trạng thái cuối
                  return true
                })
                .map(([key, { text }]) => (
                  <Option key={key} value={key}>
                    {text}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name="adminNote" label="Ghi chú của Admin (nếu có)">
            <TextArea
              rows={3}
              placeholder="Lý do thay đổi, thông tin bổ sung..."
            />
          </Form.Item>
          <Row justify="end">
            <Space>
              <Button onClick={handleUpdateStatusCancel}>Hủy</Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: primaryColor,
                  borderColor: primaryColor,
                }}
              >
                Lưu thay đổi
              </Button>
            </Space>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default TransactionManagement
