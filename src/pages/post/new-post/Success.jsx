import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import { Rate, Input, Button, message, List, Avatar } from 'antd';
import axios from 'axios';

import successAnimation from '../../auth/success.json';
import { createReview, getReviews } from '../../../services/review.service';

const Success = ({
  title = 'Thanh toán thành công!',
  description = 'Chúc bạn sớm kết nối được với khách hàng phù hợp.',
  buttonText = 'Xem danh sách tin đăng',
  onButtonClick
}) => {
  const navigate = useNavigate();

  // State cho form đánh giá
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // State và loader cho danh sách reviews
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  // Fetch reviews từ server
  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const res = await getReviews({ pageCurrent: 1, pageSize: 100 });
      if (res.success && res.data) {
        // Giả sử API trả về { rowDatas: [...] }
        setReviews(res.data.rowDatas || []);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      message.error('Không thể tải danh sách đánh giá');
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      navigate('/can-ho');
    }
  };

  const handleReviewSubmit = async () => {
    if (rating === 0 || comment.trim() === '') {
      return message.warning('Vui lòng cho điểm và nhập đánh giá.');
    }

    setSubmitting(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const payload = {
        accountId: user.id,
        rating,
        comment
      };
      const response = await createReview(payload);
      if (response.code === 200 && response.success) {
        message.success('Cảm ơn đánh giá của bạn!');
        setRating(0);
        setComment('');
        fetchReviews();
      } else {
        message.error('Gửi đánh giá không thành công');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      message.error('Lỗi khi gửi đánh giá');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='container'>
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ width: 250 }}>
          <Lottie animationData={successAnimation} loop />
        </div>
        <h2 style={{ marginTop: 0 }}>{title}</h2>
        <p>{description}</p>
        <button
          style={{
            marginTop: 22,
            padding: '10px 24px',
            background: '#4a90e2',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontSize: 16,
            cursor: 'pointer'
          }}
          onClick={handleClick}
        >
          {buttonText}
        </button>
      </div>

      <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
        <h2>Đánh giá dịch vụ</h2>
        <Rate
          value={rating}
          onChange={setRating}
          style={{ fontSize: 24, marginBottom: 16 }}
        />
        <Input.TextArea
          rows={4}
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Viết nhận xét của bạn..."
          maxLength={500}
        />
        <Button
          type="primary"
          onClick={handleReviewSubmit}
          loading={submitting}
          disabled={rating === 0 || comment.trim() === ''}
          style={{ marginTop: 16 }}
        >
          Gửi đánh giá
        </Button>

        <h3 style={{ marginTop: 40, textAlign: 'left' }}>Nhận xét trước đây</h3>
        <List
          bordered
          loading={loadingReviews}
          dataSource={reviews}
          locale={{ emptyText: 'Chưa có đánh giá nào.' }}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar>
                    <Rate disabled defaultValue={item.rating} style={{ fontSize: 12 }} />
                  </Avatar>
                }
                title={<Rate disabled defaultValue={item.rating} />}
                description={item.comment}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Success;
