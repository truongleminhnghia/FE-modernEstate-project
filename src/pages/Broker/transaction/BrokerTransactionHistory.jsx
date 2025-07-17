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
  Spin,
  message,
} from 'antd'
import {
  SearchOutlined,
  DownloadOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import '../BrokerProfile.css'
import axios from 'axios'

const { Title } = Typography
const { RangePicker } = DatePicker
const { Option } = Select

const statusColor = {
  SUCCESS: 'green',
  PENDING: 'orange',
  CANCELLED: 'red',
  FAILED: 'red',
}

const typeColor = {
  DEPOSIT: 'blue',
  PAYMENT: 'purple',
  REFUND: 'gold',
  WITHDRAWAL: 'red',
}

const BrokerTransactionHistory = () => {
  const [searchText, setSearchText] = useState('')
  const [transactions, setTransactions] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch transactions from API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true)
        const user = JSON.parse(localStorage.getItem('user'))
        const token = localStorage.getItem('token')

        if (!user?.id || !token) {
          message.error('Không tìm thấy thông tin người dùng hoặc token')
          return
        }

        const response = await axios.get(
          `https://bemodernestate.site/api/v1/transactions?accountId=${user.id}&page_current=1&page_size=100`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        if (response.data?.success && response.data?.data?.rowDatas) {
          const mappedTransactions = response.data.data.rowDatas.map(
            (transaction) => ({
              id: transaction.transactionId,
              date: new Date(
                parseInt(transaction.transactionCode)
              ).toLocaleDateString('vi-VN'),
              type: transaction.enumTypeTransaction || 'Giao dịch',
              amount: transaction.amount,
              currency: transaction.currency,
              status: transaction.status,
              description: `Giao dịch ${transaction.transactionCode}`,
              reference: transaction.transactionCode,
              transactionCode: transaction.transactionCode,
            })
          )
          setTransactions(mappedTransactions)
          setFilteredData(mappedTransactions)
        }
      } catch (error) {
        console.error('Error fetching transactions:', error)
        message.error('Không thể tải lịch sử giao dịch')
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  // Tìm kiếm đơn giản
  const handleSearch = (e) => {
    const value = e.target.value
    setSearchText(value)
    setFilteredData(
      transactions.filter(
        (item) =>
          item.id.toLowerCase().includes(value.toLowerCase()) ||
          item.description.toLowerCase().includes(value.toLowerCase()) ||
          item.reference.toLowerCase().includes(value.toLowerCase())
      )
    )
  }

  const handleViewDetails = (record) => {
    message.info(`Xem chi tiết giao dịch: ${record.reference}`)
  }

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
      render: (type) => <Tag color={typeColor[type] || 'blue'}>{type}</Tag>,
      filters: [
        { text: 'DEPOSIT', value: 'DEPOSIT' },
        { text: 'PAYMENT', value: 'PAYMENT' },
        { text: 'REFUND', value: 'REFUND' },
        { text: 'WITHDRAWAL', value: 'WITHDRAWAL' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount, record) => (
        <span
          style={{ color: amount > 0 ? '#4a90e2' : '#d4380d', fontWeight: 600 }}
        >
          {amount.toLocaleString()} {record.currency}
        </span>
      ),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusColor[status] || 'default'}>{status}</Tag>
      ),
      filters: [
        { text: 'SUCCESS', value: 'SUCCESS' },
        { text: 'PENDING', value: 'PENDING' },
        { text: 'CANCELLED', value: 'CANCELLED' },
        { text: 'FAILED', value: 'FAILED' },
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
  ]

  return (
    <div className="broker-container">
      <Card className="broker-card" style={{ marginBottom: 32 }}>
        <Row
          justify="space-between"
          align="middle"
          className="transaction-header"
          style={{ marginBottom: 16 }}
        >
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
            <Select
              placeholder="Loại giao dịch"
              style={{ width: '100%' }}
              allowClear
            >
              <Option value="DEPOSIT">Nạp tiền</Option>
              <Option value="PAYMENT">Thanh toán</Option>
              <Option value="REFUND">Hoàn tiền</Option>
              <Option value="WITHDRAWAL">Rút tiền</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Trạng thái"
              style={{ width: '100%' }}
              allowClear
            >
              <Option value="SUCCESS">Thành công</Option>
              <Option value="PENDING">Đang xử lý</Option>
              <Option value="CANCELLED">Đã hủy</Option>
              <Option value="FAILED">Thất bại</Option>
            </Select>
          </Col>
        </Row>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <Spin tip="Đang tải lịch sử giao dịch..." />
          </div>
        ) : filteredData.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            Không tìm thấy giao dịch nào.
          </div>
        ) : (
          <Table
            className="transaction-table"
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        )}
      </Card>
    </div>
  )
}

export default BrokerTransactionHistory
