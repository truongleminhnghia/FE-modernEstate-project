import React, { useState, useEffect } from 'react'
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
  Typography,
  message,
  Spin,
} from 'antd'
import {
  SearchOutlined,
  DownloadOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import './TransactionHistory.css'

const { Title } = Typography
const { RangePicker } = DatePicker
const { Option } = Select

const TransactionHistory = () => {
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [transactions, setTransactions] = useState([])
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({})

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
        setTransactions([])
        return
      }

      // Map API data to match our table structure based on the sample data
      const mappedTransactions = transactionsArray.map((transaction) => ({
        id: transaction.transactionId || transaction.id,
        date:
          transaction.createdAt ||
          transaction.transactionDate ||
          transaction.date ||
          new Date().toISOString(),
        type: getTransactionType(
          transaction.enumTypeTransaction ||
            transaction.transactionType ||
            transaction.type
        ),
        amount: transaction.amount,
        status: transaction.status?.toLowerCase() || transaction.status,
        description:
          transaction.description ||
          transaction.note ||
          'Giao dịch bất động sản',
        reference:
          transaction.transactionCode ||
          transaction.code ||
          `TXN${transaction.id}`,
        currency: transaction.currency || 'VND',
        paymentMethod:
          transaction.enumPaymentMethod ||
          transaction.paymentMethod ||
          transaction.method,
        gatewayTransactionId:
          transaction.gatewayTransactionId || transaction.gatewayId,
      }))

      console.log('Mapped transactions:', mappedTransactions) // Debug log
      setTransactions(mappedTransactions)
    } catch (err) {
      console.error('Error fetching transactions:', err)
      setError(err.message)
      message.error('Không thể tải lịch sử giao dịch: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  // Helper function to map transaction types
  const getTransactionType = (type) => {
    const typeMap = {
      listing_fee: 'Thanh toán',
      subscription_payment: 'Thanh toán',
      commission_payout: 'Chi hoa hồng',
      service_fee: 'Phí dịch vụ',
      refund: 'Hoàn tiền',
      top_up: 'Nạp tiền',
      payment: 'Thanh toán',
      deposit: 'Nạp tiền',
      withdrawal: 'Rút tiền',
    }
    return typeMap[type] || type || 'Giao dịch'
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const filteredTransactions = transactions.filter((transaction) => {
    const search = searchText.toLowerCase()
    const searchMatch =
      transaction.reference.toLowerCase().includes(search) ||
      transaction.description.toLowerCase().includes(search) ||
      transaction.type.toLowerCase().includes(search)

    const filterMatch = Object.entries(filters).every(([key, value]) => {
      if (!value) return true
      if (key === 'dates' && value.length === 2) {
        const transactionDate = moment(transaction.date)
        return transactionDate.isBetween(value[0], value[1], '[]')
      }
      if (key === 'type') {
        return transaction.type === value
      }
      if (key === 'status') {
        return transaction.status === value
      }
      return true
    })

    return searchMatch && filterMatch
  })

  const columns = [
    {
      title: 'Ngày giao dịch',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) => moment(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Loại giao dịch',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        let color = 'blue'
        if (type === 'Thanh toán') color = 'red'
        if (type === 'Hoàn tiền') color = 'green'
        if (type === 'Nạp tiền') color = 'blue'
        if (type === 'Phí dịch vụ') color = 'orange'
        return <Tag color={color}>{type}</Tag>
      },
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount, record) => {
        const formattedAmount = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: record.currency || 'VND',
        }).format(amount)
        return (
          <span style={{ color: amount >= 0 ? '#52c41a' : '#ff4d4f' }}>
            {formattedAmount}
          </span>
        )
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
          failed: { color: 'error', text: 'Thất bại' },
          cancelled: { color: 'default', text: 'Đã hủy' },
          processing: { color: 'processing', text: 'Đang xử lý' },
        }
        const config = statusConfig[status] || {
          color: 'default',
          text: status,
        }
        return <Tag color={config.color}>{config.text}</Tag>
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
  ]

  const handleViewDetails = (record) => {
    // Implement view details logic
    console.log('View details:', record)
    message.info('Tính năng xem chi tiết đang được phát triển')
  }

  const handleDownloadReceipt = (record) => {
    // Implement download receipt logic
    console.log('Download receipt:', record)
    message.info('Tính năng tải hóa đơn đang được phát triển')
  }

  const handleSearch = (value) => {
    setSearchText(value)
  }

  const handleFilter = (values) => {
    setFilters((prev) => ({ ...prev, ...values }))
  }

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
                <Option value="Phí dịch vụ">Phí dịch vụ</Option>
                <Option value="Chi hoa hồng">Chi hoa hồng</Option>
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
                <Option value="cancelled">Đã hủy</Option>
                <Option value="processing">Đang xử lý</Option>
              </Select>
            </Col>
          </Row>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
            <div style={{ marginTop: 16 }}>Đang tải lịch sử giao dịch...</div>
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
            dataSource={filteredTransactions}
            rowKey="id"
            loading={loading}
            pagination={{
              total: filteredTransactions.length,
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Tổng số ${total} giao dịch`,
            }}
            className="transaction-table"
          />
        )}
      </Card>
    </div>
  )
}

export default TransactionHistory
