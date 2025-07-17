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

const mockUsersForSelect = [
  { id: 1, name: 'Nguyễn Văn An' },
  { id: 2, name: 'Trần Thị Bình' },
  { id: 101, name: 'Trần Văn Minh (Khách)' },
  { id: 102, name: 'Lê Thị Hoa (Khách)' },
  { id: 201, name: 'Hoàng Thị Kim Dung (Môi giới)' },
]

const mockListingsForSelect = [
  { id: 1, title: 'CHCC The Sun Avenue 2PN' },
  { id: 2, title: 'Nhà mặt tiền Quận 1' },
]

const initialMockTransactions = [
  {
    id: 'TXN001',
    transactionCode: 'PAY20250525001',
    userId: 1,
    listingId: 1,
    transactionType: 'listing_fee',
    amount: 50000,
    currency: 'VND',
    paymentMethod: 'momo',
    transactionDate: '2025-05-25T10:30:00Z',
    status: 'completed',
    description: 'Phí đăng tin VIP cho tin ID 1',
    gatewayTransactionId: 'MOMO123XYZ',
  },
  {
    id: 'TXN002',
    transactionCode: 'SUB20250524001',
    userId: 201,
    transactionType: 'subscription_payment',
    amount: 200000,
    currency: 'VND',
    paymentMethod: 'credit_card',
    transactionDate: '2025-05-24T15:00:00Z',
    status: 'completed',
    description: 'Thanh toán gói Môi giới Pro - 1 tháng',
    gatewayTransactionId: 'VISA456ABC',
  },
  {
    id: 'TXN003',
    transactionCode: 'REF20250523001',
    userId: 101,
    listingId: null,
    transactionType: 'refund',
    amount: 20000,
    currency: 'VND',
    paymentMethod: 'bank_transfer',
    transactionDate: '2025-05-23T09:00:00Z',
    status: 'completed',
    description: 'Hoàn tiền do hủy dịch vụ X',
  },
  {
    id: 'TXN004',
    transactionCode: 'PAY20250522001',
    userId: 102,
    listingId: null,
    transactionType: 'service_fee',
    amount: 100000,
    currency: 'VND',
    paymentMethod: 'zalopay',
    transactionDate: '2025-05-22T11:00:00Z',
    status: 'pending',
    description: 'Phí dịch vụ xem nhà trực tuyến',
    gatewayTransactionId: 'ZLP789DEF',
  },
  {
    id: 'TXN005',
    transactionCode: 'COM20250520001',
    userId: 201,
    listingId: 2,
    transactionType: 'commission_payout',
    amount: 5000000,
    currency: 'VND',
    paymentMethod: 'bank_transfer',
    transactionDate: '2025-05-20T17:00:00Z',
    status: 'processing',
    description: 'Chi trả hoa hồng cho tin ID 2',
  },
  {
    id: 'TXN006',
    transactionCode: 'FAIL20250519001',
    userId: 1,
    transactionType: 'listing_fee',
    amount: 50000,
    currency: 'VND',
    paymentMethod: 'momo',
    transactionDate: '2025-05-19T14:20:00Z',
    status: 'failed',
    description: 'Giao dịch Momo thất bại - Phí tin thường',
    gatewayTransactionId: 'MOMOFAIL123',
  },
]

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

  const [form] = Form.useForm()

  // Fetch transactions from API
  const fetchTransactions = async () => {
    setLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem('token')
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')

      if (!token) {
        throw new Error('No authentication token found')
      }

      const response = await fetch(
        'https://bemodernestate.site/api/v1/transactions',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('API Response:', data) // Debug log

      // Handle the correct response structure
      let transactionsArray = []
      if (data.success && data.data && data.data.rowDatas) {
        transactionsArray = data.data.rowDatas
      } else if (data.success && data.data && Array.isArray(data.data)) {
        transactionsArray = data.data
      } else if (Array.isArray(data)) {
        transactionsArray = data
      }

      if (transactionsArray.length === 0) {
        console.log('No transactions found or empty response')
        setDataSource([])
        return
      }

      // Map API data to match our table structure based on the sample data
      const mappedTransactions = transactionsArray.map((transaction) => ({
        id: transaction.transactionId || transaction.id,
        transactionCode:
          transaction.transactionCode ||
          transaction.code ||
          `TXN${transaction.id}`,
        userId: transaction.accountId || transaction.userId,
        listingId: transaction.propertyId || transaction.listingId,
        transactionType:
          transaction.enumTypeTransaction ||
          transaction.transactionType ||
          transaction.type ||
          'service_fee',
        amount: transaction.amount,
        currency: transaction.currency || 'VND',
        paymentMethod:
          transaction.enumPaymentMethod ||
          transaction.paymentMethod ||
          transaction.method ||
          'bank_transfer',
        transactionDate:
          transaction.createdAt ||
          transaction.transactionDate ||
          transaction.date ||
          new Date().toISOString(),
        status: transaction.status?.toLowerCase() || transaction.status,
        description:
          transaction.description ||
          transaction.note ||
          'Giao dịch bất động sản',
        gatewayTransactionId:
          transaction.gatewayTransactionId || transaction.gatewayId,
        // Add user and property info if available
        user: transaction.account || transaction.user,
        property: transaction.property || transaction.listing,
      }))

      console.log('Mapped transactions:', mappedTransactions) // Debug log
      setDataSource(mappedTransactions)
    } catch (err) {
      console.error('Error fetching transactions:', err)
      setError(err.message)
      message.error('Không thể tải danh sách giao dịch: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

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
          <FileTextOutlined />
          Tin đăng
        </Space>
      ),
      dataIndex: 'property',
      key: 'listingId',
      width: 200,
      render: (property) =>
        property?.title || <Text type="secondary">N/A</Text>,
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
      filters: Object.entries(transactionTypes).map(([value, { text }]) => ({
        text,
        value,
      })),
      onFilter: (value, record) => record.transactionType === value,
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
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50'],
              responsive: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} của ${total} GD`,
            }}
            scroll={{ x: 1800 }}
            style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}
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
