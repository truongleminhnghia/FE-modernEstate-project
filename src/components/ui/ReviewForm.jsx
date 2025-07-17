import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Rate,
  Card,
  Typography,
  message,
  Space
} from 'antd';
import {
  StarOutlined,
  SendOutlined
} from '@ant-design/icons';
import { createReview } from '../../services/review.service'

const { Title, Text } = Typography;
const { TextArea } = Input;

const ReviewForm = ({ transactionId, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      const reviewData = {
        accountId: user.id,
        rating: values.rating,
        comment: values.comment
      };

      await createReview(reviewData);
      
      message.success('Đánh giá đã được gửi thành công!');
      form.resetFields();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Lỗi gửi đánh giá:', error);
      const errorMsg = error.response?.data?.message || 'Có lỗi xảy ra khi gửi đánh giá!';
      message.error(errorMsg);
    }
    setLoading(false);
  };

  return (
    <Card>
      <Title level={4}>
        <StarOutlined style={{ marginRight: 8 }} />
        Đánh giá giao dịch
      </Title>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          rating: 5,
          comment: ''
        }}
      >
        <Form.Item
          name="rating"
          label="Đánh giá"
          rules={[{ required: true, message: 'Vui lòng chọn số sao đánh giá' }]}
        >
          <Rate />
        </Form.Item>

        <Form.Item
          name="comment"
          label="Nhận xét"
          rules={[{ required: true, message: 'Vui lòng nhập nhận xét' }]}
        >
          <TextArea
            rows={4}
            placeholder="Chia sẻ trải nghiệm của bạn về giao dịch này..."
            maxLength={500}
            showCount
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<SendOutlined />}
            >
              Gửi đánh giá
            </Button>
            <Button onClick={() => form.resetFields()}>
              Làm lại
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ReviewForm; 