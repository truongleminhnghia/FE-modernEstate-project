import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Tag,
  Space,
  Button,
  Input,
  Row,
  Col,
  Typography,
  Spin,
  message,
  Rate,
  Avatar,
  Tooltip,
  Modal,
  Descriptions
} from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  DeleteOutlined,
  StarOutlined,
  UserOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { getReviews } from '../../../services/review.service';
import moment from 'moment';

const { Title, Text } = Typography;
const { Search } = Input;

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [selectedReview, setSelectedReview] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  // Fetch reviews from API
  const fetchReviews = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await getReviews({ pageCurrent: page, pageSize });
      
      if (response.success && response.data) {
        setReviews(response.data.rowDatas || []);
        setPagination({
          current: response.data.pageCurrent,
          pageSize: response.data.pageSize,
          total: response.data.total,
        });
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      message.error('Không thể tải danh sách đánh giá');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleTableChange = (pagination) => {
    fetchReviews(pagination.current, pagination.pageSize);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleViewDetails = (record) => {
    setSelectedReview(record);
    setDetailModalVisible(true);
  };

  const handleDetailClose = () => {
    setDetailModalVisible(false);
    setSelectedReview(null);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc chắn muốn xóa đánh giá của ${record.account?.firstName} ${record.account?.lastName}?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => {
        message.success('Đã xóa đánh giá');
        // TODO: Implement delete API call
      },
    });
  };

  const filteredReviews = reviews.filter(review => {
    if (!searchText) return true;
    
    const searchLower = searchText.toLowerCase();
    const userName = `${review.account?.firstName} ${review.account?.lastName}`.toLowerCase();
    const userEmail = review.account?.email?.toLowerCase() || '';
    const comment = review.comment?.toLowerCase() || '';
    
    return userName.includes(searchLower) || 
           userEmail.includes(searchLower) || 
           comment.includes(searchLower);
  });

  const columns = [
    {
      title: 'Người đánh giá',
      key: 'user',
      render: (_, record) => (
        <Space>
          <Avatar 
            icon={<UserOutlined />} 
            src={record.account?.avatar}
            size="small"
          />
          <div>
            <div style={{ fontWeight: 500 }}>
              {record.account?.firstName} {record.account?.lastName}
            </div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.account?.email}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <Space>
          <Rate disabled defaultValue={rating} style={{ fontSize: '14px' }} />
          <Text strong>{rating}/5</Text>
        </Space>
      ),
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: 'Nhận xét',
      dataIndex: 'comment',
      key: 'comment',
      render: (comment) => (
        <Tooltip title={comment}>
          <Text ellipsis style={{ maxWidth: 200 }}>
            {comment}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: 'Ngày đánh giá',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => (
        <Space>
          <CalendarOutlined />
          {moment(date).format('DD/MM/YYYY HH:mm')}
        </Space>
      ),
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
      defaultSortOrder: 'descend',
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
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ marginBottom: 24 }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={3} style={{ margin: 0 }}>
                <StarOutlined style={{ marginRight: 8 }} />
                Quản lý đánh giá
              </Title>
            </Col>
            <Col>
              <Text type="secondary">
                Tổng cộng: {pagination.total} đánh giá
              </Text>
            </Col>
          </Row>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Search
            placeholder="Tìm kiếm theo tên, email hoặc nội dung đánh giá..."
            allowClear
            enterButton
            size="large"
            onSearch={handleSearch}
            style={{ maxWidth: 400 }}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredReviews}
          rowKey="id"
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} của ${total} đánh giá`,
          }}
          onChange={handleTableChange}
        />
      </Card>

      {/* Modal chi tiết đánh giá */}
      <Modal
        title={
          <Space>
            <StarOutlined />
            Chi tiết đánh giá
          </Space>
        }
        open={detailModalVisible}
        onCancel={handleDetailClose}
        footer={[
          <Button key="close" onClick={handleDetailClose}>
            Đóng
          </Button>,
          <Button 
            key="delete" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => {
              handleDelete(selectedReview);
              handleDetailClose();
            }}
          >
            Xóa đánh giá
          </Button>
        ]}
        width={600}
      >
        {selectedReview && (
          <div>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Người đánh giá">
                <Space>
                  <Avatar 
                    icon={<UserOutlined />} 
                    src={selectedReview.account?.avatar}
                  />
                  <div>
                    <div style={{ fontWeight: 500 }}>
                      {selectedReview.account?.firstName} {selectedReview.account?.lastName}
                    </div>
                    <Text type="secondary">
                      {selectedReview.account?.email}
                    </Text>
                  </div>
                </Space>
              </Descriptions.Item>
              
              <Descriptions.Item label="Đánh giá">
                <Space>
                  <Rate disabled defaultValue={selectedReview.rating} />
                  <Text strong>{selectedReview.rating}/5</Text>
                </Space>
              </Descriptions.Item>
              
              <Descriptions.Item label="Nhận xét">
                <Text>{selectedReview.comment}</Text>
              </Descriptions.Item>
              
              <Descriptions.Item label="Ngày đánh giá">
                {moment(selectedReview.createdAt).format('DD/MM/YYYY HH:mm:ss')}
              </Descriptions.Item>
              
              <Descriptions.Item label="Cập nhật lần cuối">
                {moment(selectedReview.updatedAt).format('DD/MM/YYYY HH:mm:ss')}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ReviewManagement; 