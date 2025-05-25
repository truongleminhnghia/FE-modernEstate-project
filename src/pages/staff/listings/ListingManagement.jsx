import React, { useState, useEffect } from "react";
import {
  Table, Button, Input, Space, Tag, Typography, Modal, Tooltip, Row, Col, Form, message, Select,
  InputNumber, DatePicker, Checkbox, Upload, Dropdown, Menu, Image, Tabs // Thêm Tabs
} from "antd";
import {
  PlusOutlined, SearchOutlined, EyeOutlined, EditOutlined, StopOutlined, CheckCircleOutlined, ExclamationCircleFilled,
  SaveOutlined, CloseCircleOutlined, FileTextOutlined, TagOutlined, DollarCircleOutlined, AreaChartOutlined,
  CalendarOutlined, StarOutlined, StarFilled, CheckSquareOutlined, CloseSquareOutlined, UploadOutlined,
  EllipsisOutlined, HomeOutlined, UsergroupAddOutlined, EnvironmentOutlined, PictureOutlined,
  SolutionOutlined, AuditOutlined, SettingOutlined, // Thêm các icons cần thiết
  UserOutlined
} from "@ant-design/icons";
import moment from 'moment'; 

const { Title, Text } = Typography;
const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;

const mockOwnersForSelect = [
  { id: 1, name: "Nguyễn Văn An (Chủ sở hữu)" },
  { id: 2, name: "Trần Thị Bình (Chủ sở hữu)" },
  { id: 3, name: "Lê Minh Cường (Chủ sở hữu)" },
];
const mockBrokersForSelect = [
  { id: 1, name: "Hoàng Thị Kim Dung (Môi giới)" },
  { id: 2, name: "Lê Văn Nam (Môi giới)" },
  { id: 3, name: "Phạm Anh Tuấn (Môi giới)" },
];
const propertyTypes = ["Chung cư", "Nhà riêng", "Biệt thự", "Văn phòng", "Đất nền", "Nhà trọ", "Căn hộ dịch vụ", "Shophouse"];
const furnitureStatuses = [
  { value: "full", label: "Đầy đủ nội thất" },
  { value: "basic", label: "Nội thất cơ bản" },
  { value: "none", label: "Không nội thất" },
];
const directions = ["Đông", "Tây", "Nam", "Bắc", "Đông Bắc", "Đông Nam", "Tây Bắc", "Tây Nam"];
const juridicalStatuses = ["Sổ hồng", "Sổ đỏ", "Hợp đồng mua bán", "Giấy tờ hợp lệ khác", "Đang chờ sổ"];
const amenitiesList = ["Hồ bơi", "Gym", "An ninh 24/7", "Chỗ đậu xe ô tô", "Thang máy", "Gần trường học", "Gần bệnh viện", "Ban công/Logia", "Máy lạnh", "Máy nước nóng", "Internet/Wifi", "Truyền hình cáp", "Cho nuôi thú cưng", "Sân vườn", "Khu vui chơi trẻ em"];


const initialMockListings = [
  {
    id: 1, title: "Cho thuê CHCC The Sun Avenue 2PN full NT giá tốt, view sông", listingType: "for_rent",
    address: "28 Mai Chí Thọ", ward: "An Phú", district: "Quận 2", city: "TP. Hồ Chí Minh",
    propertyType: "Chung cư", price: 15000000, priceUnit: "VND/tháng", area: 75, bedrooms: 2, bathrooms: 2,
    description: "Căn hộ full nội thất cao cấp, view sông SG, tầng cao thoáng mát. Khu dân trí cao, an ninh. Tiện ích nội khu đầy đủ: hồ bơi tràn bờ, gym, BBQ, công viên.\nThuận tiện di chuyển vào trung tâm và các khu vực lân cận.",
    images: ["https://via.placeholder.com/300x200/FFC107/000000?Text=SunAve_1.jpg", "https://via.placeholder.com/300x200/00BCD4/FFFFFF?Text=SunAve_2.jpg", "https://via.placeholder.com/300x200/9C27B0/FFFFFF?Text=SunAve_3.jpg"],
    videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
    amenities: ["Hồ bơi", "Gym", "An ninh 24/7", "Chỗ đậu xe ô tô", "Thang máy", "Máy lạnh"], ownerId: 1, brokerId: 1,
    postedDate: "2025-05-01", expirationDate: "2025-08-01", status: "active", isFeatured: true, viewCount: 1023,
    contactName: "Nguyễn Văn An", contactPhone: "0901234567", contactEmail: "vana@example.com",
    furnitureStatus: "full", direction: "Đông Nam", juridicalStatus: "Sổ hồng", notesForAdmin: "Khách hàng tiềm năng, cần hỗ trợ nhanh."
  },
  {
    id: 2, title: "Bán gấp nhà mặt tiền Quận 1, vị trí KD sầm uất, DT 80m2", listingType: "for_sale",
    address: "112 Nguyễn Huệ", ward: "Bến Nghé", district: "Quận 1", city: "TP. Hồ Chí Minh",
    propertyType: "Nhà riêng", price: 25000000000, priceUnit: "VND", area: 80, bedrooms: 4, bathrooms: 3,
    description: "Nhà mặt tiền đường lớn Nguyễn Huệ, tiện kinh doanh đa ngành nghề. Kết cấu 1 trệt 3 lầu. Pháp lý rõ ràng, công chứng nhanh.",
    images: ["https://via.placeholder.com/300x200/4CAF50/FFFFFF?Text=Q1House_1.jpg"], videos: [],
    amenities: ["Gần trường học", "Gần bệnh viện"], ownerId: 2,
    postedDate: "2025-04-15", expirationDate: null, status: "pending_approval", isFeatured: false, viewCount: 550,
    contactName: "Trần Thị Bình", contactPhone: "0912345678", contactEmail: "thib@example.com",
    furnitureStatus: "basic", direction: "Tây Bắc", juridicalStatus: "Sổ hồng", notesForAdmin: "Cần kiểm tra kỹ thông tin pháp lý."
  },
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
};
const statusTexts = {
  active: 'Đang hoạt động',
  pending_approval: 'Chờ duyệt',
  inactive: 'Ngưng hoạt động',
  rented: 'Đã cho thuê',
  sold: 'Đã bán',
  rejected: 'Bị từ chối',
  expired: 'Hết hạn',
};


const ListingManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState(initialMockListings);
  
  const [selectedListing, setSelectedListing] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [editingListing, setEditingListing] = useState(null); 

  const [form] = Form.useForm();

  const filteredDataSource = dataSource.filter((listing) => {
    const search = searchText.toLowerCase();
    return (
      listing.title.toLowerCase().includes(search) ||
      listing.address.toLowerCase().includes(search) ||
      (listing.id.toString().includes(search)) || // Tìm theo ID
      (listing.district && listing.district.toLowerCase().includes(search)) ||
      (listing.city && listing.city.toLowerCase().includes(search)) ||
      (listing.ownerId && mockOwnersForSelect.find(o => o.id === listing.ownerId)?.name.toLowerCase().includes(search)) ||
      (listing.brokerId && mockBrokersForSelect.find(b => b.id === listing.brokerId)?.name.toLowerCase().includes(search))
    );
  });

  useEffect(() => {
    if (isFormModalVisible) {
      if (editingListing) {
        form.setFieldsValue({
          ...editingListing,
          postedDate: editingListing.postedDate ? moment(editingListing.postedDate, 'YYYY-MM-DD') : null,
          expirationDate: editingListing.expirationDate ? moment(editingListing.expirationDate, 'YYYY-MM-DD') : null,
          images: editingListing.images ? editingListing.images.join(', ') : '',
          videos: editingListing.videos ? editingListing.videos.join(', ') : '',
        });
      } else { 
        form.resetFields();
        form.setFieldsValue({ 
          listingType: "for_rent",
          priceUnit: "VND/tháng",
          status: "pending_approval", 
          postedDate: moment(), 
          viewCount: 0,
          amenities: [], 
          images: '', videos: '', 
        });
      }
    }
  }, [editingListing, form, isFormModalVisible]);


  const handleViewDetails = (listing) => {
    setSelectedListing(listing);
    setIsDetailModalVisible(true);
  };

  const showAddModal = () => {
    setEditingListing(null);
    setIsFormModalVisible(true);
  };

  const showEditModal = (listing) => {
    setEditingListing(listing);
    setIsFormModalVisible(true);
  };

  const handleFormCancel = () => {
    setIsFormModalVisible(false);
    setEditingListing(null);
  };

  const handleFormSubmit = (values) => {
    const processedValues = {
      ...values,
      postedDate: values.postedDate ? values.postedDate.format('YYYY-MM-DD') : null,
      expirationDate: values.expirationDate ? values.expirationDate.format('YYYY-MM-DD') : null,
      images: values.images ? values.images.split(',').map(url => url.trim()).filter(url => url) : [],
      videos: values.videos ? values.videos.split(',').map(url => url.trim()).filter(url => url) : [],
      price: parseFloat(values.price) || 0,
      area: parseFloat(values.area) || 0,
      bedrooms: values.bedrooms ? parseInt(values.bedrooms, 10) : undefined,
      bathrooms: values.bathrooms ? parseInt(values.bathrooms, 10) : undefined,
      viewCount: values.viewCount ? parseInt(values.viewCount, 10) : 0,
    };

    if (editingListing) {
      setDataSource(prevData => 
        prevData.map(listing => 
          listing.id === editingListing.id ? { ...listing, ...processedValues } : listing
        )
      );
      message.success("Cập nhật tin đăng thành công!");
    } else {
      const newId = dataSource.length > 0 ? Math.max(...dataSource.map(o => o.id)) + 1 : 1;
      const newListing = {
        id: newId,
        ...processedValues,
      };
      setDataSource(prevData => [newListing, ...prevData]);
      message.success("Thêm tin đăng mới thành công!");
    }
    setIsFormModalVisible(false);
    setEditingListing(null);
  };
  
  const handleStatusChange = (listingId, newStatus) => {
    confirm({
      title: `Đổi trạng thái tin đăng thành "${statusTexts[newStatus]}"?`,
      icon: <ExclamationCircleFilled />, okText: "Xác nhận", cancelText: "Hủy",
      onOk() {
        setDataSource(prevData => prevData.map(l => l.id === listingId ? { ...l, status: newStatus } : l));
        message.success(`Cập nhật trạng thái thành công!`);
      },
    });
  };

  const handleFeatureToggle = (listingId, currentIsFeatured) => {
    const newFeaturedStatus = !currentIsFeatured;
    confirm({
      title: `Bạn muốn ${newFeaturedStatus ? "đánh dấu nổi bật" : "bỏ nổi bật"} tin này?`,
      icon: <ExclamationCircleFilled />, okText: "Xác nhận", cancelText: "Hủy",
      onOk() {
        setDataSource(prevData => prevData.map(l => l.id === listingId ? { ...l, isFeatured: newFeaturedStatus } : l));
        message.success(`Thay đổi trạng thái nổi bật thành công!`);
      },
    });
  };

  const getActionMenuItems = (record) => {
    const items = [
      { key: 'view', label: 'Xem chi tiết', icon: <EyeOutlined />, onClick: () => handleViewDetails(record) },
      { key: 'edit', label: 'Chỉnh sửa', icon: <EditOutlined />, onClick: () => showEditModal(record) },
    ];
    if (record.status === 'pending_approval') {
      items.push({ key: 'approve', label: 'Duyệt tin', icon: <CheckSquareOutlined />, onClick: () => handleStatusChange(record.id, 'active') });
      items.push({ key: 'reject', label: 'Từ chối', icon: <CloseSquareOutlined />, danger: true, onClick: () => handleStatusChange(record.id, 'rejected') });
    } else if (record.status === 'active') {
      items.push({ key: 'deactivate', label: 'Ngưng hoạt động', icon: <StopOutlined />, danger: true, onClick: () => handleStatusChange(record.id, 'inactive') });
      if(record.listingType === 'for_rent') items.push({ key: 'mark_rented', label: 'Đã cho thuê', onClick: () => handleStatusChange(record.id, 'rented') });
      if(record.listingType === 'for_sale') items.push({ key: 'mark_sold', label: 'Đã bán', onClick: () => handleStatusChange(record.id, 'sold') });
    } else if (['inactive', 'rejected', 'expired', 'rented', 'sold'].includes(record.status)) {
      items.push({ key: 'activate', label: 'Kích hoạt lại', icon: <CheckCircleOutlined />, onClick: () => handleStatusChange(record.id, 'active') });
    }
    // Nút Nổi bật/Bỏ nổi bật luôn có nếu tin không phải đang chờ duyệt hoặc bị từ chối
    if (!['pending_approval', 'rejected'].includes(record.status)) {
        items.push({ 
            key: 'feature', 
            label: record.isFeatured ? 'Bỏ nổi bật' : 'Đánh dấu nổi bật', 
            icon: record.isFeatured ? <StarFilled style={{color: '#fadb14'}} /> : <StarOutlined />, 
            onClick: () => handleFeatureToggle(record.id, record.isFeatured) 
        });
    }
    return <Menu items={items} />;
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 65, sorter: (a,b)=> a.id - b.id, fixed: 'left', align:'center' },
    {
      title: <Space><FileTextOutlined />Tiêu đề</Space>, dataIndex: "title", key: "title", width: 300, fixed: 'left',
      render: (text, record) => (
        <Tooltip title={`${record.address}, ${record.ward}, ${record.district}, ${record.city}`}>
            <Text strong style={{color: primaryColor, cursor: 'pointer'}} onClick={() => handleViewDetails(record)}>{text}</Text>
        </Tooltip>
      )
    },
    { 
      title: <Space><TagOutlined />Loại tin</Space>, dataIndex: "listingType", key: "listingType", width: 110, align: 'center',
      filters: [ {text: 'Cho thuê', value: 'for_rent'}, {text: 'Bán', value: 'for_sale'} ],
      onFilter: (value, record) => record.listingType === value,
      render: type => type === 'for_rent' ? <Tag color="blue">Cho thuê</Tag> : <Tag color="#87d068">Bán</Tag>
    },
    {
      title: <Space><DollarCircleOutlined />Giá</Space>, dataIndex: "price", key: "price", width: 180, align: 'right',
      render: (price, record) => `${Number(price).toLocaleString()} ${record.priceUnit.replace('/m²/tháng', '/m²/th')}`,
      sorter: (a,b) => a.price - b.price
    },
    { title: <Space><AreaChartOutlined />Diện tích</Space>, dataIndex: "area", key: "area", width: 100, align: 'center', render: area => `${area} m²` },
    { 
      title: <Space><UserOutlined />Chủ sở hữu</Space>, dataIndex: "ownerId", key: "ownerId", width: 180,
      render: ownerId => mockOwnersForSelect.find(o => o.id === ownerId)?.name.split('(')[0].trim() || 'N/A'
    },
    { 
      title: <Space><CalendarOutlined />Ngày đăng</Space>, dataIndex: "postedDate", key: "postedDate", width: 120, align: 'center',
      render: date => date ? moment(date).format('DD/MM/YY') : 'N/A',
      sorter: (a,b) => moment(a.postedDate).unix() - moment(b.postedDate).unix()
    },
    {
      title: <Space><SettingOutlined />Trạng thái</Space>, dataIndex: "status", key: "status", width: 150, align: 'center', fixed: 'right',
      filters: Object.entries(statusTexts).map(([value, text]) => ({text, value})),
      onFilter: (value, record) => record.status === value,
      render: (status, record) => (
        <Space direction="vertical" size="small" style={{textAlign: 'center', width: '100%'}}>
            <Tag color={statusColors[status] || 'default'} style={{width: '100%'}}>{statusTexts[status] || status}</Tag>
            {record.isFeatured && <Tag icon={<StarFilled />} color="gold" style={{width: '100%'}}>Nổi bật</Tag>}
        </Space>
      )
    },
    {
      title: "Hành động", key: "action", align: "center", width: 100, fixed: 'right',
      render: (_, record) => <Dropdown overlay={getActionMenuItems(record)} trigger={['click']} placement="bottomRight"><Button type="text" icon={<EllipsisOutlined />} /></Dropdown>
    },
  ];

  const handleSearchInputChange = (e) => setSearchText(e.target.value);
  const handleClearSearch = () => setSearchText("");

  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
      <Title level={3} style={{ marginBottom: "20px", color: primaryColor }}><HomeOutlined /> Quản lý Tin đăng</Title>
      <Row justify="space-between" align="middle" style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={12} md={10} lg={8} xl={6}>
          <Input placeholder="Tìm ID, tiêu đề, địa chỉ, chủ sở hữu..." prefix={<SearchOutlined />} value={searchText} onChange={handleSearchInputChange} allowClear onClear={handleClearSearch} style={{ width: '100%' }}/>
        </Col>
        <Col><Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: primaryColor, borderColor: primaryColor }} onClick={showAddModal}>Thêm Tin đăng</Button></Col>
      </Row>

      <Table columns={columns} dataSource={filteredDataSource} rowKey="id" bordered pagination={{ pageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50'], responsive: true, showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} tin` }} scroll={{ x: 1600 }} style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}/>

      <Modal title={<span style={{color: primaryColor, fontWeight: 'bold'}}><FileTextOutlined /> Chi tiết Tin đăng</span>} visible={isDetailModalVisible} onCancel={() => setIsDetailModalVisible(false)} footer={[ <Button key="close" onClick={() => setIsDetailModalVisible(false)} style={{borderColor: primaryColor, color: primaryColor}}>Đóng</Button> ]} width={800}>
        {selectedListing && (
          <div style={{maxHeight: '70vh', overflowY: 'auto', paddingRight: '10px'}}>
            <Title level={4} style={{color: primaryColor}}>{selectedListing.title}</Title>
            <p><EnvironmentOutlined /> <strong>Địa chỉ:</strong> {`${selectedListing.address}, ${selectedListing.ward}, ${selectedListing.district}, ${selectedListing.city}`}</p>
            <Row gutter={[16,8]}>
              <Col xs={24} sm={12}><strong>Loại tin:</strong> {selectedListing.listingType === 'for_rent' ? <Tag color="blue">Cho thuê</Tag> : <Tag color="#87d068">Bán</Tag>}</Col>
              <Col xs={24} sm={12}><strong>Loại BĐS:</strong> <Tag>{selectedListing.propertyType}</Tag></Col>
              <Col xs={24} sm={12}><strong>Giá:</strong> <Text strong style={{color: 'red'}}>{Number(selectedListing.price).toLocaleString()} {selectedListing.priceUnit}</Text></Col>
              <Col xs={24} sm={12}><strong>Diện tích:</strong> {selectedListing.area} m²</Col>
              <Col xs={24} sm={12}><strong>Phòng ngủ:</strong> {selectedListing.bedrooms || 'N/A'}</Col>
              <Col xs={24} sm={12}><strong>Phòng tắm:</strong> {selectedListing.bathrooms || 'N/A'}</Col>
              <Col xs={24} sm={12}><strong>Hướng:</strong> {selectedListing.direction || 'N/A'}</Col>
              <Col xs={24} sm={12}><strong>Nội thất:</strong> {furnitureStatuses.find(f=>f.value === selectedListing.furnitureStatus)?.label || 'N/A'}</Col>
              <Col xs={24} sm={12}><strong>Pháp lý:</strong> {selectedListing.juridicalStatus || 'N/A'}</Col>
              <Col xs={24} sm={12}><strong>Lượt xem:</strong> {selectedListing.viewCount}</Col>
            </Row>
            <p style={{marginTop: 10}}><strong><SolutionOutlined /> Mô tả:</strong> <div style={{whiteSpace: 'pre-line'}}>{selectedListing.description}</div></p>
            <p><strong><AuditOutlined /> Tiện ích:</strong> {selectedListing.amenities?.join(', ') || 'Chưa cập nhật'}</p>
            <Title level={5} style={{marginTop: 15}}><PictureOutlined /> Hình ảnh & Video</Title>
            <hr style={{margin: '16px 0'}}/>
            <p><strong><UserOutlined /> Chủ sở hữu:</strong> {mockOwnersForSelect.find(o => o.id === selectedListing.ownerId)?.name || 'N/A'}</p>
            <p><strong><UsergroupAddOutlined /> Môi giới:</strong> {mockBrokersForSelect.find(b => b.id === selectedListing.brokerId)?.name || 'Không có'}</p>
            <p><strong>Liên hệ:</strong> {selectedListing.contactName} - {selectedListing.contactPhone} - {selectedListing.contactEmail}</p>
            <Row gutter={16}>
                <Col xs={24} sm={12}><strong>Ngày đăng:</strong> {selectedListing.postedDate ? moment(selectedListing.postedDate).format('DD/MM/YYYY HH:mm') : 'N/A'}</Col>
                <Col xs={24} sm={12}><strong>Ngày hết hạn:</strong> {selectedListing.expirationDate ? moment(selectedListing.expirationDate).format('DD/MM/YYYY') : 'Không xác định'}</Col>
            </Row>
            <p><strong>Trạng thái:</strong> <Tag color={statusColors[selectedListing.status] || 'default'}>{statusTexts[selectedListing.status] || selectedListing.status}</Tag>
                {selectedListing.isFeatured && <Tag icon={<StarFilled />} color="gold" style={{marginLeft: 8}}>Nổi bật</Tag>}
            </p>
            {selectedListing.notesForAdmin && <p style={{background: '#fffbe6', border: '1px solid #ffe58f', padding: '8px', borderRadius: '4px'}}><strong>Ghi chú Admin:</strong> {selectedListing.notesForAdmin}</p>}
          </div>
        )}
      </Modal>

      <Modal title={<span style={{color: primaryColor, fontWeight: 'bold'}}>{editingListing ? <><EditOutlined /> Chỉnh sửa Tin đăng</> : <><PlusOutlined/> Thêm mới Tin đăng</>}</span>} visible={isFormModalVisible} onCancel={handleFormCancel} footer={null} width={900} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={handleFormSubmit} scrollToFirstError>
          <Tabs defaultActiveKey="1"destroyInactiveTabPane>
            <Tabs.TabPane tab={<Space><FileTextOutlined />Thông tin cơ bản</Space>} key="1">
              <Form.Item name="title" label="Tiêu đề tin đăng" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}><Input placeholder="VD: Cho thuê căn hộ 2PN full nội thất Orchard Garden giá tốt"/></Form.Item>
              <Row gutter={16}>
                <Col xs={24} sm={8}><Form.Item name="listingType" label="Loại tin" rules={[{ required: true }]}><Select><Option value="for_rent">Cho thuê</Option><Option value="for_sale">Bán</Option></Select></Form.Item></Col>
                <Col xs={24} sm={8}><Form.Item name="propertyType" label="Loại BĐS" rules={[{ required: true }]}><Select placeholder="Chọn loại BĐS">{propertyTypes.map(type => <Option key={type} value={type}>{type}</Option>)}</Select></Form.Item></Col>
                <Col xs={24} sm={8}><Form.Item name="status" label="Trạng thái" rules={[{ required: true }]}><Select placeholder="Chọn trạng thái">{Object.entries(statusTexts).map(([val,txt]) => <Option key={val} value={val}>{txt}</Option>)}</Select></Form.Item></Col>
              </Row>
              <Form.Item name="description" label="Mô tả chi tiết" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}><TextArea rows={5} placeholder="Mô tả chi tiết về bất động sản..."/></Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab={<Space><EnvironmentOutlined />Địa chỉ & Giá</Space>} key="2">
              <Row gutter={16}>
                <Col xs={24} md={12}><Form.Item name="address" label="Địa chỉ (Số nhà, Đường)" rules={[{ required: true }]}><Input placeholder="VD: 123 Nguyễn Văn Trỗi"/></Form.Item></Col>
                <Col xs={12} md={6}><Form.Item name="ward" label="Phường/Xã" rules={[{ required: true }]}><Input placeholder="VD: Phường 7"/></Form.Item></Col>
                <Col xs={12} md={6}><Form.Item name="district" label="Quận/Huyện" rules={[{ required: true }]}><Input placeholder="VD: Quận Phú Nhuận"/></Form.Item></Col>
              </Row>
              <Form.Item name="city" label="Tỉnh/Thành phố" rules={[{ required: true }]}><Input placeholder="VD: TP. Hồ Chí Minh"/></Form.Item>
              <Row gutter={16}>
                <Col xs={24} sm={12}><Form.Item name="price" label="Giá" rules={[{ required: true }]}><InputNumber style={{width: '100%'}} min={0} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')}/></Form.Item></Col>
                <Col xs={24} sm={12}><Form.Item name="priceUnit" label="Đơn vị giá" rules={[{ required: true }]}><Select><Option value="VND/tháng">VND/tháng</Option><Option value="USD/tháng">USD/tháng</Option><Option value="VND">VND (Cho tin Bán)</Option><Option value="USD">USD (Cho tin Bán)</Option><Option value="Thỏa thuận">Thỏa thuận</Option></Select></Form.Item></Col>
              </Row>
            </Tabs.TabPane>
            <Tabs.TabPane tab={<Space><SettingOutlined />Thông số BĐS</Space>} key="3">
              <Row gutter={16}>
                <Col xs={12} sm={8}><Form.Item name="area" label="Diện tích (m²)" rules={[{ required: true }]}><InputNumber style={{width: '100%'}} min={0}/></Form.Item></Col>
                <Col xs={12} sm={8}><Form.Item name="bedrooms" label="Số phòng ngủ"><InputNumber style={{width: '100%'}} min={0}/></Form.Item></Col>
                <Col xs={12} sm={8}><Form.Item name="bathrooms" label="Số phòng tắm"><InputNumber style={{width: '100%'}} min={0}/></Form.Item></Col>
              </Row>
              <Row gutter={16}>
                <Col xs={12} sm={8}><Form.Item name="direction" label="Hướng"><Select placeholder="Chọn hướng" allowClear>{directions.map(d => <Option key={d} value={d}>{d}</Option>)}</Select></Form.Item></Col>
                <Col xs={12} sm={8}><Form.Item name="furnitureStatus" label="Nội thất"><Select placeholder="Chọn tình trạng nội thất" allowClear>{furnitureStatuses.map(f => <Option key={f.value} value={f.value}>{f.label}</Option>)}</Select></Form.Item></Col>
                <Col xs={24} sm={8}><Form.Item name="juridicalStatus" label="Pháp lý"><Select placeholder="Chọn tình trạng pháp lý" allowClear>{juridicalStatuses.map(j => <Option key={j} value={j}>{j}</Option>)}</Select></Form.Item></Col>
              </Row>
              <Form.Item name="amenities" label="Tiện ích"><Select mode="multiple" allowClear placeholder="Chọn các tiện ích" options={amenitiesList.map(item => ({label: item, value: item}))} /></Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab={<Space><PictureOutlined />Hình ảnh & Liên hệ</Space>} key="4">
              <Form.Item name="images" label="URL Hình ảnh (cách nhau bằng dấu phẩy ',')" extra="Mỗi URL trên một dòng hoặc cách nhau bằng dấu phẩy."><TextArea rows={3} placeholder="VD: https://domain.com/image1.jpg, https://domain.com/image2.jpg"/></Form.Item>
              <Form.Item name="videos" label="URL Video Youtube (cách nhau bằng dấu phẩy ',')" extra="Dán link Youtube vào đây."><TextArea rows={2} placeholder="VD: https://www.youtube.com/watch?v=videoID1, https://youtu.be/videoID2"/></Form.Item>
              {/* <Form.Item label="Upload Hình ảnh (Demo)"> <Upload listType="picture-card" beforeUpload={() => false} maxCount={5}> <div> <PlusOutlined /> <div style={{ marginTop: 8 }}>Upload</div> </div> </Upload> </Form.Item> */}
              <Row gutter={16}>
                <Col xs={24} sm={8}><Form.Item name="contactName" label="Tên người liên hệ" rules={[{ required: true}]}><Input/></Form.Item></Col>
                <Col xs={24} sm={8}><Form.Item name="contactPhone" label="SĐT Liên hệ" rules={[{ required: true}]}><Input/></Form.Item></Col>
                <Col xs={24} sm={8}><Form.Item name="contactEmail" label="Email Liên hệ" rules={[{type: 'email'}]}><Input/></Form.Item></Col>
              </Row>
            </Tabs.TabPane>
            <Tabs.TabPane tab={<Space><AuditOutlined />Quản trị & Khác</Space>} key="5">
              <Row gutter={16}>
                <Col xs={24} sm={12}><Form.Item name="ownerId" label="Chủ sở hữu" rules={[{ required: true}]}><Select placeholder="Chọn chủ sở hữu" showSearch filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}>{mockOwnersForSelect.map(o => <Option key={o.id} value={o.id}>{o.name}</Option>)}</Select></Form.Item></Col>
                <Col xs={24} sm={12}><Form.Item name="brokerId" label="Môi giới (Nếu có)"><Select placeholder="Chọn môi giới" allowClear showSearch filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}>{mockBrokersForSelect.map(b => <Option key={b.id} value={b.id}>{b.name}</Option>)}</Select></Form.Item></Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} sm={12}><Form.Item name="postedDate" label="Ngày đăng" rules={[{ required: true}]}><DatePicker style={{width: '100%'}} format="DD/MM/YYYY" /></Form.Item></Col>
                <Col xs={24} sm={12}><Form.Item name="expirationDate" label="Ngày hết hạn (Nếu có)"><DatePicker style={{width: '100%'}} format="DD/MM/YYYY" /></Form.Item></Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} sm={12}><Form.Item name="isFeatured" valuePropName="checked"><Checkbox>Đánh dấu là tin nổi bật</Checkbox></Form.Item></Col>
                <Col xs={24} sm={12}><Form.Item name="viewCount" label="Lượt xem (ban đầu)"><InputNumber style={{width: '100%'}} min={0} placeholder="Lượt xem ban đầu"/></Form.Item></Col>
              </Row>
              <Form.Item name="notesForAdmin" label="Ghi chú nội bộ cho Admin"><TextArea rows={3} placeholder="Ghi chú riêng cho quản trị viên..."/></Form.Item>
            </Tabs.TabPane>
          </Tabs>
          <Row justify="end" style={{marginTop: 24}}><Space>
            <Button icon={<CloseCircleOutlined/>} onClick={handleFormCancel}>Hủy</Button>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined/>} style={{backgroundColor: primaryColor, borderColor: primaryColor}}>{editingListing ? "Lưu thay đổi" : "Thêm mới"}</Button>
          </Space></Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ListingManagement;