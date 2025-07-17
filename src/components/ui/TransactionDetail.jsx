import React, { useState } from 'react';
import {
  Modal,
  Card,
  Typography,
  Row,
  Col,
  Tag,
  Space,
  Divider,
  Descriptions,
  Button
} from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DollarOutlined,
  CalendarOutlined,
  IdcardOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import ReviewForm from './ReviewForm';

const { Title, Text } = Typography;

const TransactionDetail = ({ visible, transaction, onClose, onReviewSuccess }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!transaction) return null;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'success':
      case 'completed':
        return 'green';
      case 'pending':
      case 'processing':
        return 'orange';
      case 'failed':
      case 'cancelled':
        return 'red';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'success':
      case 'completed':
        return <CheckCircleOutlined />;
      case 'pending':
      case 'processing':
        return <ClockCircleOutlined />;
      case 'failed':
      case 'cancelled':
        return <CloseCircleOutlined />;
      default:
        return null;
    }
  };

  const formatAmount = (amount, currency = 'VND') => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const handleReviewSuccess = () => {
    setShowReviewForm(false);
    if (onReviewSuccess) {
      onReviewSuccess();
    }
  };

  return (
    <Modal
      title={
        <Space>
          <FileTextOutlined />
          Chi tiết giao dịch
        </Space>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      destroyOnClose
    >
      <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        {/* Thông tin giao dịch */}
        <Card style={{ marginBottom: 16 }}>
          <Title level={4}>Thông tin giao dịch</Title>
          <Descriptions column={2} bordered>
            <Descriptions.Item label="Mã giao dịch" span={2}>
              <Text code>{transaction.reference || transaction.transactionCode}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày giao dịch">
              <Space>
                <CalendarOutlined />
                {new Date(transaction.date).toLocaleDateString('vi-VN')}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Loại giao dịch">
              <Tag color="blue">{transaction.type}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Số tiền" span={2}>
              <Space>
                <DollarOutlined />
                <Text strong style={{ fontSize: '18px', color: '#52c41a' }}>
                  {formatAmount(transaction.amount, transaction.currency)}
                </Text>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái" span={2}>
              <Tag 
                color={getStatusColor(transaction.status)}
                icon={getStatusIcon(transaction.status)}
                style={{ fontSize: '14px', padding: '4px 8px' }}
              >
                {transaction.status?.toUpperCase()}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Mô tả" span={2}>
              {transaction.description || 'Không có mô tả'}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Form đánh giá cho giao dịch thành công */}
        {transaction.status?.toLowerCase() === 'success' && !showReviewForm && (
          <Card style={{ marginBottom: 16 }}>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Title level={4}>Giao dịch thành công!</Title>
              <Text type="secondary">
                Bạn có muốn đánh giá giao dịch này không?
              </Text>
              <br />
              <Button 
                type="primary" 
                style={{ marginTop: 16 }}
                onClick={() => setShowReviewForm(true)}
              >
                Viết đánh giá
              </Button>
            </div>
          </Card>
        )}

        {/* Form đánh giá */}
        {showReviewForm && (
          <ReviewForm
            transactionId={transaction.id}
            onSuccess={handleReviewSuccess}
          />
        )}

        {/* Thông tin bổ sung */}
        <Card>
          <Title level={4}>Thông tin bổ sung</Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text strong>Phương thức thanh toán:</Text>
              <br />
              <Text>{transaction.paymentMethod || 'Không xác định'}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Gateway ID:</Text>
              <br />
              <Text code>{transaction.gatewayTransactionId || 'N/A'}</Text>
            </Col>
          </Row>
        </Card>
      </div>
    </Modal>
  );
};

export default TransactionDetail; 