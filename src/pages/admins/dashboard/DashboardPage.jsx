import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Spin } from 'antd';
import {
  UserOutlined, ContainerOutlined, CheckSquareOutlined, ClockCircleOutlined, DollarCircleOutlined, LineChartOutlined
} from '@ant-design/icons';

import StatCard from './StatCard';
import ListingsTrendChart from './ListingsTrendChart';
import UserRolesPieChart from './UserRolesPieChart';
import RecentListingsTable from './RecentListingsTable';
import RecentUsersTable from './RecentUsersTable';
import { account, post, getRevenue, getReview } from '../../../services/dashboard.service';
import ReviewTable from './ReviewTable';

const { Title } = Typography;
const primaryColor = '#4a90e2';

const initialSummaryStats = {
  totalUsers: 1250,
  totalListings: 850,
  activeListings: 620,
  pendingListings: 35,
  revenue: 120000000, // doanh thu mẫu
};

const DashboardPage = () => {
  const [loadingStats, setLoadingStats] = useState(true);
  const [summaryStats, setSummaryStats] = useState({});
  const [accountData, setAccountData] = useState({ totalAccounts: 0 });
  const [postData, setPostData] = useState({});
  const [reviewData, setReviewData] = useState({});
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const loadAccount = async () => {
      setLoadingStats(true);
      try {
        const res = await account();
        if (res) {
          setAccountData(res.data);
        }
      } catch (error) {
        console.error('Error loading account data:', error);
      } finally {
        setLoadingStats(false);
      }
    };
    loadAccount();
  }, []);

  useEffect(() => {
    const loadReview = async () => {
      setLoadingStats(true);
      try {
        const res = await getReview();
        if (res) {
          setReviewData(res.data);
        }
      }
      catch (error) {
        console.error('Error loading review data:', error);
      }
      finally {
        setLoadingStats(false);
      }
    };
    loadReview();
  }, []);

  useEffect(() => {
    const loadPost = async () => {
      setLoadingStats(true);
      try {
        const res = await post();
        if (res) {
          setPostData(res.data);
        }
      } catch (error) {
        console.error('Error loading post data:', error);
      } finally {
        setLoadingStats(false);
      }
    };
    loadPost();
  }, []);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await getRevenue();
        if (res && res.data && typeof res.data.totalRevenue === 'number') {
          setRevenue(res.data.totalRevenue);
        }
      } catch (error) {
        console.error('Error loading revenue:', error);
      }
    };
    fetchRevenue();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSummaryStats(initialSummaryStats);
      setLoadingStats(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ padding: '20px', background: '#f0f2f5' }}>
      <Title level={2} style={{ marginBottom: '24px', color: primaryColor }}>
        <LineChartOutlined /> Bảng điều khiển chung
      </Title>

      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={12} lg={6}>
          <StatCard title="Tổng Người dùng" value={accountData.totalAccounts} icon={<UserOutlined />} color={primaryColor} loading={loadingStats} />
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <StatCard title="Tổng Tin đăng" value={postData.totalCount} icon={<ContainerOutlined />} color="#FAAD14" loading={loadingStats} />
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <StatCard title="Doanh thu" value={revenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} icon={<DollarCircleOutlined />} color="#13C2C2" loading={loadingStats} />
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <StatCard title="Đánh giá" value={reviewData.totalReviews} icon={<ClockCircleOutlined />} color="#FF4D4F" loading={loadingStats} />
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}><ListingsTrendChart /></Col>
        <Col xs={24} lg={12}><ReviewTable listReview={reviewData.reviews} /></Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}><RecentListingsTable listPost={postData.posts} /></Col>
        <Col xs={24} lg={12}><RecentUsersTable listUser={accountData.accounts} /></Col>
      </Row>
    </div>
  );
};

export default DashboardPage;