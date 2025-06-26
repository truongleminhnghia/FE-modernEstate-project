import React, { useState, useEffect } from "react";
import {
  Table, Button, Input, Space, Tag, Typography, Modal, Tooltip, Row, Col, Form, message, Select,
  InputNumber, DatePicker, Checkbox, Upload, Dropdown, Menu, Image, Tabs, Card, Statistic, Badge,
  Divider, Avatar, Rate, Progress, Alert, Empty, Skeleton, List, Descriptions, Drawer
} from "antd";
import {
  PlusOutlined, SearchOutlined, EyeOutlined, EditOutlined, StopOutlined, CheckCircleOutlined, ExclamationCircleFilled,
  SaveOutlined, CloseCircleOutlined, FileTextOutlined, TagOutlined, DollarCircleOutlined, AreaChartOutlined,
  CalendarOutlined, StarOutlined, StarFilled, CheckSquareOutlined, CloseSquareOutlined, UploadOutlined,
  EllipsisOutlined, HomeOutlined, UsergroupAddOutlined, EnvironmentOutlined, PictureOutlined,
  SolutionOutlined, AuditOutlined, SettingOutlined, UserOutlined, ClockCircleOutlined, 
  CheckOutlined, CloseOutlined, WarningOutlined, InfoCircleOutlined, FilterOutlined,
  ReloadOutlined, ExportOutlined, ImportOutlined, DownloadOutlined, PrinterOutlined
} from "@ant-design/icons";
import moment from 'moment'; 

const { Title, Text, Paragraph } = Typography;
const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;

// Mock data cho chủ sở hữu và môi giới (có thể thay thế bằng API call sau)
const mockOwnersForSelect = [
  { id: 1, name: "Nguyễn Văn An (Chủ sở hữu)", phone: "0901234567", email: "vana@example.com" },
  { id: 2, name: "Trần Thị Bình (Chủ sở hữu)", phone: "0912345678", email: "thib@example.com" },
  { id: 3, name: "Lê Minh Cường (Chủ sở hữu)", phone: "0923456789", email: "minhc@example.com" },
];
const mockBrokersForSelect = [
  { id: 1, name: "Hoàng Thị Kim Dung (Môi giới)", phone: "0934567890", email: "kimdung@example.com" },
  { id: 2, name: "Lê Văn Nam (Môi giới)", phone: "0945678901", email: "vannam@example.com" },
  { id: 3, name: "Phạm Anh Tuấn (Môi giới)", phone: "0956789012", email: "anhtuan@example.com" },
];

const primaryColor = '#4a90e2';
const statusColors = {
  active: 'green',
  pending_approval: 'blue',
  inactive: 'grey',
  rented: 'purple',
  sold: 'purple',
  rejected: 'red',
  expired: 'orange',
  WAIT_APPROVE: 'blue',
  INACTIVE: 'grey',
  ACTIVE: 'green',
  REJECTED: 'red',
};
const statusTexts = {
  active: 'Đang hoạt động',
  pending_approval: 'Chờ duyệt',
  inactive: 'Ngưng hoạt động',
  rented: 'Đã cho thuê',
  sold: 'Đã bán',
  rejected: 'Bị từ chối',
  expired: 'Hết hạn',
  WAIT_APPROVE: 'Chờ duyệt',
  INACTIVE: 'Ngưng hoạt động',
  ACTIVE: 'Đang hoạt động',
  REJECTED: 'Bị từ chối',
};

const priorityColors = {
  high: 'red',
  medium: 'orange', 
  low: 'green'
};

const priorityTexts = {
  high: 'Cao',
  medium: 'Trung bình',
  low: 'Thấp'
};

const demandTexts = {
  MUA_BÁN: 'Bán',
  CHO_THUÊ: 'Cho thuê'
};

const demandColors = {
  MUA_BÁN: '#87d068',
  CHO_THUÊ: 'blue'
};

const PendingApproval = () => {
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isDetailDrawerVisible, setIsDetailDrawerVisible] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [loading, setLoading] = useState(false);
  const [batchSelected, setBatchSelected] = useState([]);
  const [isBatchModalVisible, setIsBatchModalVisible] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  const [form] = Form.useForm();

  // Hàm gọi API để lấy danh sách tin đăng chờ duyệt
  const fetchPendingListings = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      // Lấy token từ localStorage hoặc từ context
      const token = localStorage.getItem('token');
      
      const response = await fetch(
        `https://bemodernestate.site/api/v1/staffs/post-wait-approve?page_current=${page}&page_size=${pageSize}`,
        {
          method: 'GET',
          headers: {
            'accept': '*/*',
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        // Transform API data to match our component structure
        const transformedData = result.data.rowDatas.map(item => ({
          id: item.id,
          code: item.code,
          title: item.property?.title || 'Không có tiêu đề',
          listingType: item.demand === 'MUA_BÁN' ? 'for_sale' : 'for_rent',
          demand: item.demand,
          address: item.property?.address?.houseNumber || '',
          street: item.property?.address?.street || '',
          ward: item.property?.address?.ward || '',
          district: item.property?.address?.district || '',
          city: item.property?.address?.city || '',
          propertyType: item.property?.type || 'Không xác định',
          price: item.property?.price || 0,
          priceUnit: item.property?.priceUnit || 'VND',
          area: item.property?.area || 0,
          bedrooms: item.property?.numberOfBedrooms || 0,
          bathrooms: item.property?.numberOfBathrooms || 0,
          description: item.property?.description || 'Không có mô tả',
          images: item.property?.propertyImages || [],
          videos: item.property?.videoUrl || [],
          amenities: item.property?.attribute || [],
          ownerId: item.postBy,
          brokerId: null, // API không có thông tin này
          postedDate: item.createAt !== "0001-01-01T00:00:00" ? item.createAt : null,
          expirationDate: item.postPackages?.[0]?.endDate !== "0001-01-01T00:00:00" ? item.postPackages?.[0]?.endDate : null,
          status: item.sourceStatus,
          isFeatured: false,
          viewCount: 0,
          contactName: item.contact?.contactName || 'Không có',
          contactPhone: item.contact?.contactPhone || 'Không có',
          contactEmail: item.contact?.contactEmail || 'Không có',
          furnitureStatus: item.property?.interior || 'Không có',
          direction: item.property?.houseDirection || 'Không có',
          juridicalStatus: 'Không có',
          notesForAdmin: item.rejectionReason || 'Không có ghi chú',
          pendingReason: item.rejectionReason || 'Chờ duyệt',
          priority: 'medium', // API không có thông tin này
          appRovedBy: item.appRovedBy,
          updateAt: item.updateAt,
          packageName: item.property?.packageName || 'NORMAL'
        }));

        setDataSource(transformedData);
        setPagination({
          current: result.data.pageCurrent,
          pageSize: result.data.pageSize,
          total: result.data.total
        });
      } else {
        message.error(result.message || 'Có lỗi xảy ra khi tải dữ liệu');
      }
    } catch (error) {
      console.error('Error fetching pending listings:', error);
      message.error('Danh sách trống');
    } finally {
      setLoading(false);
    }
  };

  // Load data khi component mount
  useEffect(() => {
    fetchPendingListings();
  }, []);

  // Thống kê
  const stats = {
    total: pagination.total,
    high: dataSource.filter(item => item.priority === 'high').length,
    medium: dataSource.filter(item => item.priority === 'medium').length,
    low: dataSource.filter(item => item.priority === 'low').length,
    forRent: dataSource.filter(item => item.listingType === 'for_rent').length,
    forSale: dataSource.filter(item => item.listingType === 'for_sale').length,
  };

  const filteredDataSource = dataSource.filter((listing) => {
    const search = searchText.toLowerCase();
    const matchesSearch = (
      listing.title.toLowerCase().includes(search) ||
      listing.address.toLowerCase().includes(search) ||
      (listing.code && listing.code.toLowerCase().includes(search)) ||
      (listing.district && listing.district.toLowerCase().includes(search)) ||
      (listing.city && listing.city.toLowerCase().includes(search)) ||
      (listing.contactName && listing.contactName.toLowerCase().includes(search))
    );
    
    const matchesPriority = selectedPriority === "all" || listing.priority === selectedPriority;
    const matchesType = selectedType === "all" || listing.listingType === selectedType;
    
    return matchesSearch && matchesPriority && matchesType;
  });

  const handleViewDetails = (listing) => {
    setSelectedListing(listing);
    setIsDetailModalVisible(true);
  };

  const handleViewDetailsDrawer = (listing) => {
    setSelectedListing(listing);
    setIsDetailDrawerVisible(true);
  };

  const handleApprove = async (listingId) => {
    confirm({
      title: 'Duyệt tin đăng này?',
      content: 'Tin đăng sẽ được hiển thị công khai sau khi duyệt.',
      icon: <ExclamationCircleFilled />,
      okText: "Duyệt",
      cancelText: "Hủy",
      async onOk() {
        setLoading(true);
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}staffs/approve-post/${listingId}`,
            {
              method: 'PUT',
              headers: {
                'accept': '*/*',
                'Authorization': token,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                sourceStatus: "APPROVE",
                rejectionReason: ""
              })
            }
          );
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const result = await response.json();
          if (result.success) {
            message.success("Đã duyệt tin đăng thành công!");
            setDataSource(prevData => prevData.filter(item => item.id !== listingId));
            fetchPendingListings(pagination.current, pagination.pageSize);
          } else {
            message.error(result.message || "Có lỗi xảy ra khi duyệt tin!");
          }
        } catch (error) {
          console.error('Approve error:', error);
          message.error("Không thể kết nối đến server!");
        } finally {
          setLoading(false);
        }
      },
    });
  };
  
  const handleReject = (listingId) => {
    confirm({
      title: 'Từ chối tin đăng này?',
      content: 'Tin đăng sẽ bị từ chối và không được hiển thị.',
      icon: <ExclamationCircleFilled />,
      okText: "Từ chối",
      cancelText: "Hủy",
      onOk() {
        setLoading(true);
        // TODO: Gọi API reject
        setTimeout(() => {
          setDataSource(prevData => prevData.filter(item => item.id !== listingId));
          message.success("Đã từ chối tin đăng!");
          setLoading(false);
          // Refresh data
          fetchPendingListings(pagination.current, pagination.pageSize);
        }, 1000);
      },
    });
  };

  const handleBatchApprove = () => {
    if (batchSelected.length === 0) {
      message.warning("Vui lòng chọn ít nhất một tin đăng!");
      return;
    }
    
    confirm({
      title: `Duyệt ${batchSelected.length} tin đăng đã chọn?`,
      content: 'Tất cả tin đăng được chọn sẽ được duyệt cùng lúc.',
      icon: <ExclamationCircleFilled />,
      okText: "Duyệt tất cả",
      cancelText: "Hủy",
      onOk() {
        setLoading(true);
        // TODO: Gọi API batch approve
        setTimeout(() => {
          setDataSource(prevData => prevData.filter(item => !batchSelected.includes(item.id)));
          setBatchSelected([]);
          setIsBatchModalVisible(false);
          message.success(`Đã duyệt ${batchSelected.length} tin đăng thành công!`);
          setLoading(false);
          // Refresh data
          fetchPendingListings(pagination.current, pagination.pageSize);
        }, 1000);
      },
    });
  };

  const handleBatchReject = () => {
    if (batchSelected.length === 0) {
      message.warning("Vui lòng chọn ít nhất một tin đăng!");
      return;
    }
    
    confirm({
      title: `Từ chối ${batchSelected.length} tin đăng đã chọn?`,
      content: 'Tất cả tin đăng được chọn sẽ bị từ chối.',
      icon: <ExclamationCircleFilled />,
      okText: "Từ chối tất cả",
      cancelText: "Hủy",
      onOk() {
        setLoading(true);
        // TODO: Gọi API batch reject
        setTimeout(() => {
          setDataSource(prevData => prevData.filter(item => !batchSelected.includes(item.id)));
          setBatchSelected([]);
          setIsBatchModalVisible(false);
          message.success(`Đã từ chối ${batchSelected.length} tin đăng!`);
          setLoading(false);
          // Refresh data
          fetchPendingListings(pagination.current, pagination.pageSize);
        }, 1000);
      },
    });
  };

  const rowSelection = {
    selectedRowKeys: batchSelected,
    onChange: (selectedRowKeys, selectedRows) => {
      setBatchSelected(selectedRowKeys);
    },
  };

  const handleTableChange = (paginationInfo) => {
    fetchPendingListings(paginationInfo.current, paginationInfo.pageSize);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "code",
      key: "code",
      width: 120,
      fixed: 'left',
      align: 'center',
      render: (code) => <Badge count={code} style={{ backgroundColor: primaryColor }} />
    },
    {
      title: <Space><FileTextOutlined />Tiêu đề</Space>,
      dataIndex: "title",
      key: "title",
      width: 300,
      fixed: 'left',
      render: (text, record) => (
        <div>
          <Tooltip title={`${record.address} ${record.street}, ${record.ward}, ${record.district}, ${record.city}`}>
            <Text strong style={{ color: primaryColor, cursor: 'pointer' }} onClick={() => handleViewDetailsDrawer(record)}>
              {text}
            </Text>
          </Tooltip>
          <div style={{ marginTop: 4 }}>
            <Tag color={priorityColors[record.priority]} size="small">
              {priorityTexts[record.priority]}
            </Tag>
            <Tag color={demandColors[record.demand]} size="small">
              {demandTexts[record.demand]}
            </Tag>
          </div>
        </div>
      )
    },
    {
      title: <Space><DollarCircleOutlined />Giá</Space>,
      dataIndex: "price",
      key: "price",
      width: 150,
      align: 'right',
      render: (price, record) => (
        <div>
          <Text strong style={{ color: 'red' }}>
            {Number(price).toLocaleString()} {record.priceUnit}
          </Text>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {record.area} m²
          </div>
        </div>
      ),
      sorter: (a, b) => a.price - b.price
    },
    {
      title: <Space><UserOutlined />Liên hệ</Space>,
      dataIndex: "contactName",
      key: "contactName",
      width: 180,
      render: (contactName, record) => (
        <div>
          <div>{contactName}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {record.contactPhone}
          </div>
        </div>
      )
    },
    {
      title: <Space><CalendarOutlined />Ngày đăng</Space>,
      dataIndex: "postedDate",
      key: "postedDate",
      width: 120,
      align: 'center',
      render: date => (
        <div>
          <div>{date && date !== "0001-01-01T00:00:00" ? moment(date).format('DD/MM/YY') : 'N/A'}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {date && date !== "0001-01-01T00:00:00" ? moment(date).fromNow() : ''}
          </div>
        </div>
      ),
      sorter: (a, b) => moment(a.postedDate).unix() - moment(b.postedDate).unix()
    },
    {
      title: <Space><WarningOutlined />Lý do chờ duyệt</Space>,
      dataIndex: "pendingReason",
      key: "pendingReason",
      width: 200,
      render: reason => (
        <Tag color="orange" icon={<ClockCircleOutlined />}>
          {reason}
        </Tag>
      )
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      width: 200,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<CheckOutlined />}
            onClick={() => handleApprove(record.id)}
            style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
          >
            Duyệt
          </Button>
          <Button
            danger
            size="small"
            icon={<CloseOutlined />}
            onClick={() => handleReject(record.id)}
          >
            Từ chối
          </Button>
          <Button
            type="text"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetailsDrawer(record)}
          />
        </Space>
      )
    },
  ];

  const handleSearchInputChange = (e) => setSearchText(e.target.value);
  const handleClearSearch = () => setSearchText("");

  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
      <Title level={3} style={{ marginBottom: "20px", color: primaryColor }}>
        <ClockCircleOutlined /> Duyệt Tin Đăng Chờ Phê Duyệt
      </Title>

      {/* Thống kê */}
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng số tin chờ duyệt"
              value={stats.total}
              valueStyle={{ color: primaryColor }}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Độ ưu tiên cao"
              value={stats.high}
              valueStyle={{ color: '#ff4d4f' }}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Cho thuê"
              value={stats.forRent}
              valueStyle={{ color: '#1890ff' }}
              prefix={<HomeOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Bán"
              value={stats.forSale}
              valueStyle={{ color: '#52c41a' }}
              prefix={<DollarCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Thanh tìm kiếm và lọc */}
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Tìm mã tin, tiêu đề, địa chỉ, liên hệ..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={handleSearchInputChange}
            allowClear
            onClear={handleClearSearch}
          />
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Select
            placeholder="Độ ưu tiên"
            value={selectedPriority}
            onChange={setSelectedPriority}
            style={{ width: '100%' }}
          >
            <Option value="all">Tất cả</Option>
            <Option value="high">Cao</Option>
            <Option value="medium">Trung bình</Option>
            <Option value="low">Thấp</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Select
            placeholder="Loại tin"
            value={selectedType}
            onChange={setSelectedType}
            style={{ width: '100%' }}
          >
            <Option value="all">Tất cả</Option>
            <Option value="for_rent">Cho thuê</Option>
            <Option value="for_sale">Bán</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => {
              setSearchText("");
              setSelectedPriority("all");
              setSelectedType("all");
              fetchPendingListings(1, pagination.pageSize);
            }}
            style={{ width: '100%' }}
          >
            Làm mới
          </Button>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={() => setIsBatchModalVisible(true)}
            disabled={batchSelected.length === 0}
            style={{ width: '100%', backgroundColor: primaryColor, borderColor: primaryColor }}
          >
            Duyệt hàng loạt ({batchSelected.length})
          </Button>
        </Col>
      </Row>

      {/* Bảng dữ liệu */}
      <Table
        columns={columns}
        dataSource={filteredDataSource}
        rowKey="id"
        bordered
        loading={loading}
        rowSelection={rowSelection}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50'],
          responsive: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} tin`,
          showQuickJumper: true
        }}
        onChange={handleTableChange}
        scroll={{ x: 1400 }}
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Không có tin đăng nào chờ duyệt"
            />
          )
        }}
      />

      {/* Modal chi tiết */}
      <Modal
        title={
          <span style={{ color: primaryColor, fontWeight: 'bold' }}>
            <FileTextOutlined /> Chi tiết Tin đăng Chờ Duyệt
          </span>
        }
        visible={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={[
          <Button key="reject" danger icon={<CloseOutlined />} onClick={() => {
            handleReject(selectedListing?.id);
            setIsDetailModalVisible(false);
          }}>
            Từ chối
          </Button>,
          <Button key="approve" type="primary" icon={<CheckOutlined />} onClick={() => {
            handleApprove(selectedListing?.id);
            setIsDetailModalVisible(false);
          }} style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}>
            Duyệt
          </Button>,
          <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
            Đóng
          </Button>
        ]}
        width={800}
      >
        {selectedListing && (
          <div style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: '10px' }}>
            <Alert
              message="Tin đăng chờ duyệt"
              description={selectedListing.pendingReason}
              type="warning"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <Title level={4} style={{ color: primaryColor }}>{selectedListing.title}</Title>
            <p><EnvironmentOutlined /> <strong>Địa chỉ:</strong> {`${selectedListing.address} ${selectedListing.street}, ${selectedListing.ward}, ${selectedListing.district}, ${selectedListing.city}`}</p>
            <Row gutter={[16, 8]}>
              <Col xs={24} sm={12}>
                <strong>Loại tin:</strong> <Tag color={demandColors[selectedListing.demand]}>{demandTexts[selectedListing.demand]}</Tag>
              </Col>
              <Col xs={24} sm={12}>
                <strong>Loại BĐS:</strong> <Tag>{selectedListing.propertyType}</Tag>
              </Col>
              <Col xs={24} sm={12}>
                <strong>Giá:</strong> <Text strong style={{ color: 'red' }}>{Number(selectedListing.price).toLocaleString()} {selectedListing.priceUnit}</Text>
              </Col>
              <Col xs={24} sm={12}>
                <strong>Diện tích:</strong> {selectedListing.area} m²
              </Col>
              <Col xs={24} sm={12}>
                <strong>Phòng ngủ:</strong> {selectedListing.bedrooms || 'N/A'}
              </Col>
              <Col xs={24} sm={12}>
                <strong>Phòng tắm:</strong> {selectedListing.bathrooms || 'N/A'}
              </Col>
            </Row>
            <p style={{ marginTop: 10 }}>
              <strong><SolutionOutlined /> Mô tả:</strong>
              <div style={{ whiteSpace: 'pre-line' }}>{selectedListing.description}</div>
            </p>
            <p><strong><AuditOutlined /> Tiện ích:</strong> {selectedListing.amenities?.join(', ') || 'Chưa cập nhật'}</p>
            <p><strong><UserOutlined /> Liên hệ:</strong> {selectedListing.contactName} - {selectedListing.contactPhone} - {selectedListing.contactEmail}</p>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <strong>Ngày đăng:</strong> {selectedListing.postedDate && selectedListing.postedDate !== "0001-01-01T00:00:00" ? moment(selectedListing.postedDate).format('DD/MM/YYYY HH:mm') : 'N/A'}
              </Col>
              <Col xs={24} sm={12}>
                <strong>Ngày hết hạn:</strong> {selectedListing.expirationDate && selectedListing.expirationDate !== "0001-01-01T00:00:00" ? moment(selectedListing.expirationDate).format('DD/MM/YYYY') : 'Không xác định'}
              </Col>
            </Row>
            <p>
              <strong>Độ ưu tiên:</strong> <Tag color={priorityColors[selectedListing.priority]}>{priorityTexts[selectedListing.priority]}</Tag>
            </p>
            {selectedListing.notesForAdmin && (
              <p style={{ background: '#fffbe6', border: '1px solid #ffe58f', padding: '8px', borderRadius: '4px' }}>
                <strong>Ghi chú Admin:</strong> {selectedListing.notesForAdmin}
              </p>
            )}
          </div>
        )}
      </Modal>

      {/* Drawer chi tiết */}
      <Drawer
        title={
          <span style={{ color: primaryColor, fontWeight: 'bold' }}>
            <FileTextOutlined /> Chi tiết Tin đăng
          </span>
        }
        placement="right"
        onClose={() => setIsDetailDrawerVisible(false)}
        visible={isDetailDrawerVisible}
        width={600}
        extra={
          <Space>
            <Button
              danger
              icon={<CloseOutlined />}
              onClick={() => {
                handleReject(selectedListing?.id);
                setIsDetailDrawerVisible(false);
              }}
            >
              Từ chối
            </Button>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={() => {
                handleApprove(selectedListing?.id);
                setIsDetailDrawerVisible(false);
              }}
              style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
            >
              Duyệt
            </Button>
          </Space>
        }
      >
        {selectedListing && (
          <div>
            <Alert
              message="Tin đăng chờ duyệt"
              description={selectedListing.pendingReason}
              type="warning"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <Title level={4} style={{ color: primaryColor }}>{selectedListing.title}</Title>
            <Descriptions column={1} bordered size="small" style={{ marginBottom: 16 }}>
              <Descriptions.Item label="Mã tin">
                {selectedListing.code}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                {`${selectedListing.address} ${selectedListing.street}, ${selectedListing.ward}, ${selectedListing.district}, ${selectedListing.city}`}
              </Descriptions.Item>
              <Descriptions.Item label="Loại tin">
                <Tag color={demandColors[selectedListing.demand]}>{demandTexts[selectedListing.demand]}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Loại BĐS">
                <Tag>{selectedListing.propertyType}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Giá">
                <Text strong style={{ color: 'red' }}>
                  {Number(selectedListing.price).toLocaleString()} {selectedListing.priceUnit}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Diện tích">
                {selectedListing.area} m²
              </Descriptions.Item>
              <Descriptions.Item label="Phòng ngủ">
                {selectedListing.bedrooms || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Phòng tắm">
                {selectedListing.bathrooms || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Liên hệ">
                {selectedListing.contactName} - {selectedListing.contactPhone}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedListing.contactEmail}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày đăng">
                {selectedListing.postedDate && selectedListing.postedDate !== "0001-01-01T00:00:00" ? moment(selectedListing.postedDate).format('DD/MM/YYYY HH:mm') : 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Độ ưu tiên">
                <Tag color={priorityColors[selectedListing.priority]}>{priorityTexts[selectedListing.priority]}</Tag>
              </Descriptions.Item>
            </Descriptions>
            
            <Divider orientation="left">Mô tả</Divider>
            <Paragraph>{selectedListing.description}</Paragraph>
            
            <Divider orientation="left">Tiện ích</Divider>
            <div>
              {selectedListing.amenities?.map((amenity, index) => (
                <Tag key={index} style={{ marginBottom: 4 }}>{amenity}</Tag>
              ))}
            </div>
            
            {selectedListing.notesForAdmin && (
              <>
                <Divider orientation="left">Ghi chú Admin</Divider>
                <Alert
                  message={selectedListing.notesForAdmin}
                  type="info"
                  showIcon
                />
              </>
            )}
          </div>
        )}
      </Drawer>

      {/* Modal duyệt hàng loạt */}
      <Modal
        title="Duyệt hàng loạt"
        visible={isBatchModalVisible}
        onCancel={() => setIsBatchModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsBatchModalVisible(false)}>
            Hủy
          </Button>,
          <Button
            key="reject"
            danger
            icon={<CloseOutlined />}
            onClick={handleBatchReject}
          >
            Từ chối tất cả ({batchSelected.length})
          </Button>,
          <Button
            key="approve"
            type="primary"
            icon={<CheckOutlined />}
            onClick={handleBatchApprove}
            style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
          >
            Duyệt tất cả ({batchSelected.length})
          </Button>
        ]}
      >
        <p>Bạn đã chọn <strong>{batchSelected.length}</strong> tin đăng để xử lý hàng loạt.</p>
        <List
          size="small"
          dataSource={filteredDataSource.filter(item => batchSelected.includes(item.id))}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={`${item.address} ${item.street}, ${item.district}`}
              />
              <Tag color={priorityColors[item.priority]}>{priorityTexts[item.priority]}</Tag>
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default PendingApproval; 