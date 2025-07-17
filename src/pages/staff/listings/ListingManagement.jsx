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
import { getPosts, createPost, createProperty } from '../../../apis/projectApi';
import axios from 'axios';
import BaseForm from '../../post/new-post/BaseForm';
import PropertyForm from '../../post/new-post/PropertyForm';
import AddressForm from '../../post/new-post/AddressForm';
import PackageForm from '../../post/new-post/PackageForm';

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

const propertyTypeEnumMap = {
  "Chung cư": "CAN_HO_CHUNG_CU",
  "Nhà riêng": "NHA_RIENG",
  "Biệt thự": "BIET_THU",
  "Văn phòng": "VAN_PHONG",
  "Đất nền": "DAT_NEN",
  "Nhà trọ": "NHA_TRO",
  "Căn hộ dịch vụ": "CAN_HO_DICH_VU",
  "Shophouse": "SHOPHOUSE"
};

const ListingManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({ pageCurrent: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  
  const [selectedListing, setSelectedListing] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [editingListing, setEditingListing] = useState(null); 

  const [form] = Form.useForm();

  const [currentStep, setCurrentStep] = useState(0);
  const [baseData, setBaseData] = useState({});
  const [propertyData, setPropertyData] = useState({});
  const [addressData, setAddressData] = useState({});

  const filteredDataSource = dataSource.filter((listing) => {
    const search = searchText.toLowerCase();
    // Lấy dữ liệu từ property/contact nếu có
    const title = listing.property?.title || '';
    const address = listing.property?.address?.addressDetail || '';
    const district = listing.property?.address?.district || '';
    const city = listing.property?.address?.city || '';
    const contactName = listing.contact?.contactName || '';
    const id = listing.id ? listing.id.toString() : '';

    return (
      title.toLowerCase().includes(search) ||
      address.toLowerCase().includes(search) ||
      id.includes(search) ||
      district.toLowerCase().includes(search) ||
      city.toLowerCase().includes(search) ||
      contactName.toLowerCase().includes(search)
    );
  });

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await getPosts(pagination.pageCurrent, pagination.pageSize);
        setDataSource(res.data.rowDatas || []);
        setPagination({
          pageCurrent: res.data.pageCurrent,
          pageSize: res.data.pageSize,
          total: res.data.total,
        });
      } catch (err) {
        console.error('Lỗi lấy danh sách tin đăng:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [pagination.pageCurrent, pagination.pageSize]);

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

  const handleStep1 = (data) => { setBaseData(data); setCurrentStep(1); };
  const handleStep2 = (data) => { setPropertyData(data); setCurrentStep(2); };
  const handleStep3 = (data) => { setAddressData(data); setCurrentStep(3); };

  const handleSubmitAll = async () => {
    let userId = "08dda40b-e895-4779-8e2a-85cc7c729403";
    let contactName = baseData.contactName || "Nguyễn Văn A";
    let contactEmail = baseData.contactEmail || "vana@example.com";
    let contactPhone = baseData.contactPhone || "0901234567";
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user && user.id) userId = user.id;
      if (user && user.firstName) contactName = user.firstName + (user.lastName ? ' ' + user.lastName : '');
      if (user && user.email) contactEmail = user.email;
      if (user && user.phone) contactPhone = user.phone;
    } catch (e) { /* ignore */ }

    const payload = {
      PostBy: userId,
      Demand: baseData.demand || 'MUA_BAN',
      NewProperty: {
        Title: propertyData.title,
        Description: propertyData.description,
        Attribute: propertyData.attribute || [],
        Type: propertyTypeEnumMap[propertyData.type] || "CAN_HO_CHUNG_CU",
        Area: propertyData.area,
        AreaUnit: propertyData.areaUnit || "m2",
        Price: propertyData.price,
        PriceUnit: propertyData.priceUnit || "VND",
        Document: propertyData.document || ["Sổ đỏ"],
        Interior: propertyData.interior || "Full",
        NumberOfBedrooms: propertyData.numberOfBedrooms,
        NumberOfBathrooms: propertyData.numberOfBathrooms,
        HouseDirection: propertyData.houseDirection,
        VideoUrl: propertyData.videoUrl || [],
        Address: {
          HouseNumber: addressData.houseNumber || "123",
          Street: addressData.street || "Nguyễn Huệ",
          Ward: addressData.ward || "Phường 1",
          District: addressData.district || "Quận 1",
          City: addressData.city || "TP. Hồ Chí Minh",
          Country: addressData.country || "Việt Nam",
          AddressDetail: addressData.addressDetail || "123 Nguyễn Huệ"
        },
        ProjectId: propertyData.projectId || null,
        Images: propertyData.images
          ? propertyData.images.map(f => f.url ? { imageUrl: f.url } : (f.imageUrl ? { imageUrl: f.imageUrl } : null)).filter(Boolean)
          : [{ imageUrl: "https://firebasestorage.googleapis.com/v0/b/fir-app-2f0da.appspot.com/o/property-images%2F1751467100945_film_roll.png?alt=media&token=2cf6c111-811c-46b0-ab02-21ba286e1535" }]
      },
      Contact: {
        ContactName: contactName,
        ContactEmail: contactEmail,
        ContactPhone: contactPhone
      }
    };
    try {
      const wrappedPayload = { request: payload };
      console.log('Payload gửi lên API /posts:', wrappedPayload);
      await createPost(wrappedPayload);
      message.success("Tạo tin đăng thành công!");
    setIsFormModalVisible(false);
    setEditingListing(null);
      setPagination(prev => ({ ...prev }));
      setCurrentStep(0);
    } catch (err) {
      message.error("Tạo tin đăng thất bại!");
      console.error('API error:', err);
      if (err.response) {
        console.error('API response data:', err.response.data);
        alert(JSON.stringify(err.response.data, null, 2));
      }
    }
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
    { title: "ID", dataIndex: "id", key: "id", width: 65, sorter: (a,b)=> a.id.localeCompare(b.id), fixed: 'left', align:'center' },
    {
      title: <Space><FileTextOutlined />Tiêu đề</Space>,
      dataIndex: "property",
      key: "title",
      width: 300,
      fixed: 'left',
      render: (property, record) => (
        <Tooltip title={property?.address?.addressDetail || ''}>
          <Text strong style={{color: primaryColor, cursor: 'pointer'}}>{property?.title || 'N/A'}</Text>
        </Tooltip>
      )
    },
    { 
      title: <Space><TagOutlined />Loại tin</Space>,
      dataIndex: "demand",
      key: "demand",
      width: 110,
      align: 'center',
      filters: [ {text: 'Cho thuê', value: 'CHO_THUÊ'}, {text: 'Bán', value: 'MUA_BÁN'} ],
      onFilter: (value, record) => record.demand === value,
      render: demand => demand === 'CHO_THUÊ' ? <Tag color="blue">Cho thuê</Tag> : <Tag color="#87d068">Bán</Tag>
    },
    {
      title: <Space><DollarCircleOutlined />Giá</Space>,
      dataIndex: "property",
      key: "price",
      width: 180,
      align: 'right',
      render: property => property?.price ? `${Number(property.price).toLocaleString()} ${property.priceUnit || ''}` : 'N/A',
      sorter: (a,b) => (a.property?.price || 0) - (b.property?.price || 0)
    },
    { 
      title: <Space><AreaChartOutlined />Diện tích</Space>,
      dataIndex: "property",
      key: "area",
      width: 100,
      align: 'center',
      render: property => property?.area ? `${property.area} ${property.areaUnit || 'm²'}` : 'N/A'
    },
    { 
      title: <Space><UserOutlined />Chủ sở hữu</Space>,
      dataIndex: "contact",
      key: "contactName",
      width: 180,
      render: contact => contact?.contactName || 'N/A'
    },
    { 
      title: <Space><CalendarOutlined />Ngày đăng</Space>,
      dataIndex: "createAt",
      key: "createAt",
      width: 120,
      align: 'center',
      render: date => date && date !== '0001-01-01T00:00:00' ? moment(date).format('DD/MM/YY') : 'N/A',
      sorter: (a,b) => moment(a.createAt).unix() - moment(b.createAt).unix()
    },
    {
      title: <Space><SettingOutlined />Trạng thái</Space>,
      dataIndex: "status",
      key: "status",
      width: 150,
      align: 'center',
      fixed: 'right',
      filters: [
        {text: 'Chờ thanh toán', value: 'WAIT_PAYMENT'},
        {text: 'Đang hoạt động', value: 'ACTIVE'},
        {text: 'Ngưng hoạt động', value: 'INACTIVE'},
      ],
      onFilter: (value, record) => record.status === value,
      render: status => <Tag color={status === 'ACTIVE' ? 'green' : status === 'INACTIVE' ? 'red' : 'orange'}>{status || 'N/A'}</Tag>
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
        <Col>
          <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: primaryColor, borderColor: primaryColor, marginRight: 8 }} onClick={showAddModal}>Thêm Tin đăng</Button>
          <Button type="default" onClick={async () => {
            try {
              // Test GET request trước
              console.log('Testing GET /posts endpoint...');
              const testGet = await getPosts(1, 5);
              console.log('GET /posts success:', testGet);
              
              // Test các endpoint khác có thể tồn tại
              console.log('Testing other possible endpoints...');
              try {
                const testPost = await axios.post('https://bemodernestate.site/api/v1/post', { test: 'data' });
                console.log('POST /post (singular) success:', testPost);
              } catch (e) {
                console.log('POST /post failed:', e.response?.status);
              }
              
              try {
                const testProperty = await axios.post('https://bemodernestate.site/api/v1/properties', { test: 'data' });
                console.log('POST /properties success:', testProperty);
              } catch (e) {
                console.log('POST /properties failed:', e.response?.status);
              }
              
              // Test với authentication header
              const token = localStorage.getItem('token');
              if (token) {
                console.log('Testing with auth token...');
                try {
                  const authTest = await axios.post('https://bemodernestate.site/api/v1/posts', 
                    { test: 'data' },
                    { headers: { Authorization: `Bearer ${token}` } }
                  );
                  console.log('POST with auth success:', authTest);
                } catch (e) {
                  console.log('POST with auth failed:', e.response?.status);
                }
              }
              
              const data = {
                postBy: "08dda40b-e895-4779-8e2a-85cc7c729403",
                demand: "MUA_BÁN",
                newProperty: {
                  title: "string",
                  description: "string",
                  attribute: ["string"],
                  type: "Căn_hộ_Chung_cư",
                  area: 0,
                  areaUnit: "m2",
                  price: 0,
                  priceUnit: "VND",
                  document: ["string"],
                  interior: "string",
                  numberOfBedrooms: 0,
                  numberOfBathrooms: 0,
                  houseDirection: "Đông",
                  videoUrl: ["string"],
                  address: {
                    ward: "string",
                    district: "string",
                    city: "string",
                    country: "string",
                    addressDetail: "string"
                  },
                  projectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  images: [
                    { imageUrl: "string" }
                  ]
                },
                contact: {
                  contactName: "string",
                  contactEmail: "string",
                  contactPhone: "string"
                },
                postPackagesRequest: {
                  startDate: "2025-07-03",
                  endDate: "2025-07-03",
                  totalAmout: 0,
                  currency: "VND",
                  accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  packageId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                }
              };
              console.log('Testing POST /posts with data:', data);
              const res = await createPost(data);
              message.success('Tạo tin đăng mẫu thành công!');
              // Sau khi tạo, reload lại danh sách
              setPagination(prev => ({ ...prev }));
            } catch (err) {
              console.error('API Error details:', {
                status: err.response?.status,
                statusText: err.response?.statusText,
                url: err.config?.url,
                method: err.config?.method,
                data: err.response?.data
              });
              message.error(`API Error: ${err.response?.status} - ${err.response?.statusText || err.message}`);
            }
          }}>Test API</Button>
          <Button type="default" onClick={async () => {
            try {
              const propertyData = {
                title: "Test Property",
                description: "Test description",
                type: "Căn_hộ_Chung_cư",
                area: 80,
                price: 2500000000,
                address: {
                  ward: "001",
                  district: "001", 
                  city: "01",
                  country: "Việt Nam",
                  addressDetail: "123 Test Street"
                }
              };
              console.log('Testing POST /properties with data:', propertyData);
              const res = await createPost(propertyData);
              message.success('Tạo property thành công!');
              console.log('Property created:', res);
            } catch (err) {
              console.error('Property API Error:', err);
              message.error(`Property API Error: ${err.response?.status} - ${err.response?.statusText || err.message}`);
            }
          }}>Test Properties API</Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredDataSource}
        rowKey={record => record.id}
        bordered
        loading={loading}
        pagination={{
          current: pagination.pageCurrent,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50'],
          responsive: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} tin`,
          onChange: (page, pageSize) => setPagination(prev => ({ ...prev, pageCurrent: page, pageSize })),
        }}
        scroll={{ x: 1600 }}
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}
      />

      <Modal title={<span style={{color: primaryColor, fontWeight: 'bold'}}><FileTextOutlined /> Chi tiết Tin đăng</span>} visible={isDetailModalVisible} onCancel={() => setIsDetailModalVisible(false)} footer={[ <Button key="close" onClick={() => setIsDetailModalVisible(false)} style={{borderColor: primaryColor, color: primaryColor}}>Đóng</Button> ]} width={800}>
        {selectedListing && (
          <div style={{maxHeight: '70vh', overflowY: 'auto', paddingRight: '10px'}}>
            <Title level={4} style={{color: primaryColor}}>{selectedListing.property?.title || 'N/A'}</Title>
            <p><EnvironmentOutlined /> <strong>Địa chỉ:</strong> {[
              selectedListing.property?.address?.addressDetail,
              selectedListing.property?.address?.ward,
              selectedListing.property?.address?.district,
              selectedListing.property?.address?.city
            ].filter(Boolean).join(', ') || 'N/A'}</p>
            <Row gutter={[16,8]}>
              <Col xs={24} sm={12}><strong>Loại tin:</strong> {selectedListing.demand === 'CHO_THUÊ' ? <Tag color="blue">Cho thuê</Tag> : <Tag color="#87d068">Bán</Tag>}</Col>
              <Col xs={24} sm={12}><strong>Loại BĐS:</strong> <Tag>{selectedListing.property?.type?.replace(/_/g, ' ') || 'N/A'}</Tag></Col>
              <Col xs={24} sm={12}><strong>Giá:</strong> <Text strong style={{color: 'red'}}>{selectedListing.property?.price ? `${Number(selectedListing.property.price).toLocaleString()} ${selectedListing.property?.priceUnit || ''}` : 'N/A'}</Text></Col>
              <Col xs={24} sm={12}><strong>Diện tích:</strong> {selectedListing.property?.area ? `${selectedListing.property.area} ${selectedListing.property?.areaUnit || 'm²'}` : 'N/A'}</Col>
              <Col xs={24} sm={12}><strong>Phòng ngủ:</strong> {selectedListing.property?.numberOfBedrooms ?? 'N/A'}</Col>
              <Col xs={24} sm={12}><strong>Phòng tắm:</strong> {selectedListing.property?.numberOfBathrooms ?? 'N/A'}</Col>
              <Col xs={24} sm={12}><strong>Hướng:</strong> {selectedListing.property?.houseDirection || 'N/A'}</Col>
              <Col xs={24} sm={12}><strong>Nội thất:</strong> {selectedListing.property?.interior || 'N/A'}</Col>
              <Col xs={24} sm={12}><strong>Pháp lý:</strong> {selectedListing.property?.document?.join(', ') || 'N/A'}</Col>
              <Col xs={24} sm={12}><strong>Lượt xem:</strong> {selectedListing.viewCount ?? 'N/A'}</Col>
            </Row>
            <p style={{marginTop: 10}}><strong><SolutionOutlined /> Mô tả:</strong> <div style={{whiteSpace: 'pre-line'}}>{selectedListing.property?.description || 'N/A'}</div></p>
            <p><strong><AuditOutlined /> Tiện ích:</strong> {selectedListing.property?.attribute?.join(', ') || 'Chưa cập nhật'}</p>
            <Title level={5} style={{marginTop: 15}}><PictureOutlined /> Hình ảnh & Video</Title>
            <hr style={{margin: '16px 0'}}/>
            <Row gutter={[8,8]}>
              {selectedListing.property?.propertyImages?.length > 0 ? selectedListing.property.propertyImages.map((img, idx) => (
                <Col xs={24} sm={8} key={idx}>
                  <Image src={img.imageUrl} alt={`img${idx}`} style={{width: '100%', height: 120, objectFit: 'cover'}} />
                </Col>
              )) : <Col><span>Không có hình ảnh</span></Col>}
            </Row>
            <p><strong><UserOutlined /> Chủ sở hữu:</strong> {selectedListing.contact?.contactName || 'N/A'}</p>
            <p><strong><UsergroupAddOutlined /> Môi giới:</strong> {selectedListing.brokerId || 'Không có'}</p>
            <p><strong>Liên hệ:</strong> {selectedListing.contact?.contactName || '-'} - {selectedListing.contact?.contactPhone || '-'} - {selectedListing.contact?.contactEmail || '-'}</p>
            <Row gutter={16}>
                <Col xs={24} sm={12}><strong>Ngày đăng:</strong> {selectedListing.createAt && selectedListing.createAt !== '0001-01-01T00:00:00' ? moment(selectedListing.createAt).format('DD/MM/YYYY HH:mm') : 'N/A'}</Col>
                <Col xs={24} sm={12}><strong>Ngày hết hạn:</strong> {selectedListing.postPackages?.[0]?.endDate ? moment(selectedListing.postPackages[0].endDate).format('DD/MM/YYYY') : 'Không xác định'}</Col>
            </Row>
            <p><strong>Trạng thái:</strong> <Tag color={selectedListing.status === 'ACTIVE' ? 'green' : selectedListing.status === 'INACTIVE' ? 'red' : 'orange'}>{selectedListing.status || 'N/A'}</Tag></p>
            {selectedListing.rejectionReason && <p style={{background: '#fffbe6', border: '1px solid #ffe58f', padding: '8px', borderRadius: '4px'}}><strong>Lý do từ chối:</strong> {selectedListing.rejectionReason}</p>}
          </div>
        )}
      </Modal>

      <Modal title={<span style={{color: primaryColor, fontWeight: 'bold'}}>{editingListing ? <><EditOutlined /> Chỉnh sửa Tin đăng</> : <><PlusOutlined/> Thêm mới Tin đăng</>}</span>} visible={isFormModalVisible} onCancel={handleFormCancel} footer={null} width={900} destroyOnClose>
        {currentStep === 0 && <BaseForm onFinish={handleStep1} initialValues={baseData} />}
        {currentStep === 1 && <PropertyForm onFinish={handleStep2} initialValues={propertyData} />}
        {currentStep === 2 && <AddressForm onFinish={handleStep3} initialValues={addressData} />}
        {currentStep === 3 && (
          <div style={{padding: 24}}>
            <h3>Xác nhận thông tin và đăng tin</h3>
            <Button type="primary" onClick={handleSubmitAll}>Xác nhận & Đăng tin</Button>
            <Button style={{marginLeft: 8}} onClick={()=>setCurrentStep(0)}>Quay lại</Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ListingManagement;