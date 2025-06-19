import React, { useState, useEffect } from 'react';
import {
  Table, Button, Input, Space, Tag, Typography, Modal, Tooltip, Row, Col, Form, message, Select,
  InputNumber, Checkbox, Upload, DatePicker
} from "antd";
import {
  PlusOutlined, SearchOutlined, EyeOutlined, EditOutlined, StopOutlined, CheckCircleOutlined, ExclamationCircleFilled,
  SaveOutlined, CloseCircleOutlined, AppstoreAddOutlined, TagsOutlined, DollarCircleOutlined, CalendarOutlined,
  ToolOutlined, UploadOutlined
} from "@ant-design/icons";
import moment from 'moment';
import axios from 'axios';

const { Title, Text } = Typography;
const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const primaryColor = '#4a90e2';

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://bemodernestate.site/api/v1/';

// Property types mapping
const propertyTypes = {
  'Căn_hộ_Chung_cư': 'Căn hộ/Chung cư',
  'Nhà_riêng': 'Nhà riêng',
  'Biệt_thự': 'Biệt thự',
  'Nhà_mặt_phố': 'Nhà mặt phố',
  'Đất_nền': 'Đất nền',
  'Văn_phòng': 'Văn phòng',
  'Cửa_hàng': 'Cửa hàng',
  'Kho_xưởng': 'Kho xưởng'
};

// Demand types
const demandTypes = {
  'MUA_BÁN': 'Mua bán',
  'CHO_THUÊ': 'Cho thuê'
};

// House directions
const houseDirections = {
  'Đông': 'Đông',
  'Tây': 'Tây',
  'Nam': 'Nam',
  'Bắc': 'Bắc',
  'Đông_Bắc': 'Đông Bắc',
  'Đông_Nam': 'Đông Nam',
  'Tây_Bắc': 'Tây Bắc',
  'Tây_Nam': 'Tây Nam'
};

// Interior types
const interiorTypes = {
  'CĂN_HỘ_TRỐNG': 'Căn hộ trống',
  'CĂN_HỘ_CƠ_BẢN': 'Căn hộ cơ bản',
  'CĂN_HỘ_CAO_CẤP': 'Căn hộ cao cấp',
  'CĂN_HỘ_SANG_TRỌNG': 'Căn hộ sang trọng'
};

const ServiceManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [editingService, setEditingService] = useState(null); 
  const [fileList, setFileList] = useState([]);

  const [form] = Form.useForm();

  // Fetch posts from API
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}posts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        const posts = response.data.data.rowDatas || [];
        const mappedPosts = posts.map(post => ({
          id: post.id,
          title: post.newProperty?.title || 'N/A',
          description: post.newProperty?.description || 'N/A',
          demand: post.demand,
          type: post.newProperty?.type,
          area: post.newProperty?.area,
          price: post.newProperty?.price,
          priceUnit: post.newProperty?.priceUnit,
          numberOfBedrooms: post.newProperty?.numberOfBedrooms,
          numberOfBathrooms: post.newProperty?.numberOfBathrooms,
          houseDirection: post.newProperty?.houseDirection,
          interior: post.newProperty?.interior,
          address: post.newProperty?.address,
          contactName: post.contact?.contactName,
          contactEmail: post.contact?.contactEmail,
          contactPhone: post.contact?.contactPhone,
          status: post.status || 'ACTIVE',
          dateCreated: post.createdAt ? moment(post.createdAt).format('YYYY-MM-DD') : 'N/A',
          dateUpdated: post.updatedAt ? moment(post.updatedAt).format('YYYY-MM-DD') : 'N/A',
        }));
        setDataSource(mappedPosts);
      } else {
        message.error("Lỗi khi tải dữ liệu bài đăng.");
      }
    } catch (error) {
      console.error("Lỗi gọi API:", error);
      message.error("Không thể kết nối đến máy chủ hoặc lỗi khi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredDataSource = dataSource.filter(
    (post) =>
      post.title.toLowerCase().includes(searchText.toLowerCase()) ||
      post.id.toLowerCase().includes(searchText.toLowerCase()) ||
      (post.type && propertyTypes[post.type]?.toLowerCase().includes(searchText.toLowerCase())) ||
      (post.demand && demandTypes[post.demand]?.toLowerCase().includes(searchText.toLowerCase()))
  );

  useEffect(() => {
    if (isFormModalVisible) {
      if (editingService) {
        form.setFieldsValue({
          ...editingService,
          address: editingService.address ? {
            houseNumber: editingService.address.houseNumber,
            street: editingService.address.street,
            ward: editingService.address.ward,
            district: editingService.address.district,
            city: editingService.address.city,
            country: editingService.address.country,
            addressDetail: editingService.address.addressDetail,
          } : {},
        });
      } else {
        form.resetFields();
        form.setFieldsValue({ 
          demand: 'MUA_BÁN',
          priceUnit: 'VND',
          areaUnit: 'm2',
          country: 'Việt Nam',
        });
      }
    }
  }, [editingService, form, isFormModalVisible]);
  
  const showAddModal = () => {
    setEditingService(null);
    setFileList([]);
    setIsFormModalVisible(true);
  };

  const showEditModal = (post) => {
    setEditingService(post);
    setFileList([]);
    setIsFormModalVisible(true);
  };

  const handleFormCancel = () => {
    setIsFormModalVisible(false);
    setEditingService(null);
    setFileList([]);
  };

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const postData = {
        postBy: localStorage.getItem("userId") || "string",
        demand: values.demand,
        newProperty: {
          title: values.title,
          description: values.description,
          attribute: values.attribute || [],
          type: values.type,
          area: parseFloat(values.area) || 0,
          areaUnit: values.areaUnit,
          price: parseFloat(values.price) || 0,
          priceUnit: values.priceUnit,
          document: values.document || [],
          interior: values.interior,
          numberOfBedrooms: parseInt(values.numberOfBedrooms) || 0,
          numberOfBathrooms: parseInt(values.numberOfBathrooms) || 0,
          houseDirection: values.houseDirection,
          videoUrl: values.videoUrl || [],
          address: {
            houseNumber: values.address?.houseNumber || "",
            street: values.address?.street || "",
            ward: values.address?.ward || "",
            district: values.address?.district || "",
            city: values.address?.city || "",
            country: values.address?.country || "Việt Nam",
            addressDetail: values.address?.addressDetail || "",
          },
          projectId: values.projectId || null,
          images: fileList.map(file => ({
            imageUrl: file.url || file.response?.url || file.thumbUrl
          }))
        },
        contact: {
          contactName: values.contactName,
          contactEmail: values.contactEmail,
          contactPhone: values.contactPhone,
        },
        postPackagesRequest: {
          startDate: moment().format('YYYY-MM-DD'),
          endDate: moment().add(30, 'days').format('YYYY-MM-DD'),
          totalAmout: parseFloat(values.price) || 0,
          currency: values.priceUnit || 'VND',
          accountId: localStorage.getItem("userId") || "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          packageId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }
      };

      if (editingService) {
        await axios.put(
          `${API_BASE_URL}posts/${editingService.id}`,
          postData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        message.success("Cập nhật bài đăng thành công!");
      } else {
        await axios.post(
          `${API_BASE_URL}posts`,
          postData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        message.success("Thêm bài đăng mới thành công!");
      }
      setIsFormModalVisible(false);
      setEditingService(null);
      setFileList([]);
      fetchPosts();
    } catch (error) {
      console.error("Lỗi khi gửi form:", error.response || error);
      message.error(
        `Đã có lỗi xảy ra: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = (postId, currentStatus) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    const actionText = newStatus === 'ACTIVE' ? 'Kích hoạt' : 'Ngưng kích hoạt';
     confirm({
      title: `Bạn có chắc muốn ${actionText.toLowerCase()} bài đăng này?`,
      icon: <ExclamationCircleFilled />, okText: "Xác nhận", cancelText: "Hủy",
      onOk() {
        // In a real implementation, you would call the API to update status
        setDataSource(prevData => prevData.map(p => p.id === postId ? { ...p, status: newStatus, dateUpdated: moment().format('YYYY-MM-DD') } : p));
        message.success(`${actionText} bài đăng thành công!`);
      },
    });
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const columns = [
    { title: "Mã bài đăng", dataIndex: "id", key: "id", width: 120, sorter: (a,b) => a.id.localeCompare(b.id), render: (id) => <Text strong style={{color: primaryColor}}>{id}</Text> },
    { title: "Tiêu đề", dataIndex: "title", key: "title", width: 250, sorter: (a,b) => a.title.localeCompare(b.title)},
    { 
      title: "Loại giao dịch", 
      dataIndex: "demand", key: "demand", width: 120, align: 'center',
      filters: Object.entries(demandTypes).map(([value, text]) => ({text, value})),
      onFilter: (value, record) => record.demand === value,
      render: demand => <Tag color="blue">{demandTypes[demand] || demand}</Tag>
    },
    { 
      title: "Loại BĐS", 
      dataIndex: "type", key: "type", width: 150,
      filters: Object.entries(propertyTypes).map(([value, text]) => ({text, value})),
      onFilter: (value, record) => record.type === value,
      render: type => <Tag color="cyan">{propertyTypes[type] || type}</Tag>
    },
    { 
      title: "Diện tích", 
      dataIndex: "area", key: "area", width: 100, align: 'right',
      render: (area, record) => area ? `${area} m²` : <Text type="secondary">N/A</Text>,
      sorter: (a,b) => (a.area || 0) - (b.area || 0),
    },
    { 
      title: "Giá", 
      dataIndex: "price", key: "price", width: 120, align: 'right',
      render: (price, record) => price ? `${Number(price).toLocaleString()} ${record.priceUnit || 'VND'}` : <Text type="secondary">N/A</Text>,
      sorter: (a,b) => (a.price || 0) - (b.price || 0),
    },
    {
      title: "Trạng thái", dataIndex: "status", key: "status", width: 120, align: 'center',
      filters: [ {text: 'Đang hoạt động', value: 'ACTIVE'}, {text: 'Ngưng hoạt động', value: 'INACTIVE'} ],
      onFilter: (value, record) => record.status === value,
      render: status => <Tag color={status === 'ACTIVE' ? 'green' : 'red'}>{status === 'ACTIVE' ? 'Hoạt động' : 'Ngưng hoạt động'}</Tag>
    },
    {
      title: "Hành động", key: "action", align: "center", width: 120, 
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Chỉnh sửa"><Button type="text" icon={<EditOutlined style={{ color: '#faad14' }}/>} onClick={() => showEditModal(record)}/></Tooltip>
          {record.status === "ACTIVE" ? (
            <Tooltip title="Ngưng kích hoạt"><Button type="text" icon={<StopOutlined />} danger onClick={() => handleToggleStatus(record.id, record.status)}/></Tooltip>
          ) : (
            <Tooltip title="Kích hoạt"><Button type="text" icon={<CheckCircleOutlined style={{ color: 'green' }}/>} onClick={() => handleToggleStatus(record.id, record.status)}/></Tooltip>
          )}
        </Space>
      ),
    },
  ];

  const handleSearchInputChange = (e) => setSearchText(e.target.value);
  const handleClearSearch = () => setSearchText("");

  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
      <Title level={3} style={{ marginBottom: "20px", color: primaryColor }}><ToolOutlined /> Quản lý Bài đăng Bất động sản</Title>
      <Row justify="space-between" align="middle" style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={12} md={10} lg={8} xl={6}>
          <Input placeholder="Tìm Mã bài đăng, Tiêu đề, Loại BĐS..." prefix={<SearchOutlined />} value={searchText} onChange={handleSearchInputChange} allowClear onClear={handleClearSearch} style={{ width: '100%' }}/>
        </Col>
        <Col><Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: primaryColor, borderColor: primaryColor }} onClick={showAddModal}>Thêm Bài đăng</Button></Col>
      </Row>

      <Table 
        columns={columns} 
        dataSource={filteredDataSource} 
        rowKey="id" 
        bordered 
        loading={loading}
        pagination={{ pageSize: 10, responsive: true }} 
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}
      />
      
      <Modal
        title={<span style={{color: primaryColor, fontWeight: 'bold'}}>{editingService ? <><EditOutlined /> Chỉnh sửa Bài đăng</> : <><PlusOutlined/> Thêm mới Bài đăng</>}</span>}
        visible={isFormModalVisible}
        onCancel={handleFormCancel}
        footer={null}
        width={800}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit} scrollToFirstError>
            <Row gutter={16}>
                <Col span={16}>
                    <Form.Item name="title" label="Tiêu đề bài đăng" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}>
                        <Input placeholder="VD: Căn hộ 2 phòng ngủ tại Quận 1"/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="demand" label="Loại giao dịch" rules={[{ required: true }]}>
                        <Select>
                            {Object.entries(demandTypes).map(([key, text]) => <Option key={key} value={key}>{text}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
             <Form.Item name="description" label="Mô tả chi tiết" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
                <TextArea rows={3} placeholder="Mô tả chi tiết về bất động sản..."/>
            </Form.Item>
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item name="type" label="Loại BĐS" rules={[{ required: true, message: 'Vui lòng chọn loại BĐS!'}]}>
                        <Select placeholder="Chọn loại bất động sản">
                            {Object.entries(propertyTypes).map(([key, text]) => <Option key={key} value={key}>{text}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item name="interior" label="Tình trạng nội thất">
                        <Select placeholder="Chọn tình trạng nội thất">
                            {Object.entries(interiorTypes).map(([key, text]) => <Option key={key} value={key}>{text}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={8}>
                    <Form.Item name="area" label="Diện tích" rules={[{ required: true, message: 'Vui lòng nhập diện tích!'}]}>
                        <InputNumber style={{width: '100%'}} min={0} placeholder="Nhập diện tích"/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                    <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Vui lòng nhập giá!'}]}>
                        <InputNumber style={{width: '100%'}} min={0} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} placeholder="Nhập giá"/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                    <Form.Item name="priceUnit" label="Đơn vị giá">
                        <Select>
                            <Option value="VND">VND</Option>
                            <Option value="USD">USD</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={8}>
                    <Form.Item name="numberOfBedrooms" label="Số phòng ngủ">
                        <InputNumber style={{width: '100%'}} min={0} placeholder="Số phòng ngủ"/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                    <Form.Item name="numberOfBathrooms" label="Số phòng tắm">
                        <InputNumber style={{width: '100%'}} min={0} placeholder="Số phòng tắm"/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                    <Form.Item name="houseDirection" label="Hướng nhà">
                        <Select placeholder="Chọn hướng">
                            {Object.entries(houseDirections).map(([key, text]) => <Option key={key} value={key}>{text}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            
            <Title level={4}>Thông tin địa chỉ</Title>
            <Row gutter={16}>
                <Col xs={24} sm={8}>
                    <Form.Item name={['address', 'houseNumber']} label="Số nhà">
                        <Input placeholder="Số nhà"/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                    <Form.Item name={['address', 'street']} label="Đường">
                        <Input placeholder="Tên đường"/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                    <Form.Item name={['address', 'ward']} label="Phường/Xã">
                        <Input placeholder="Phường/Xã"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={8}>
                    <Form.Item name={['address', 'district']} label="Quận/Huyện">
                        <Input placeholder="Quận/Huyện"/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                    <Form.Item name={['address', 'city']} label="Tỉnh/Thành phố">
                        <Input placeholder="Tỉnh/Thành phố"/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                    <Form.Item name={['address', 'country']} label="Quốc gia">
                        <Input placeholder="Quốc gia"/>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item name={['address', 'addressDetail']} label="Địa chỉ chi tiết">
                <TextArea rows={2} placeholder="Địa chỉ chi tiết"/>
            </Form.Item>

            <Title level={4}>Thông tin liên hệ</Title>
            <Row gutter={16}>
                <Col xs={24} sm={8}>
                    <Form.Item name="contactName" label="Tên liên hệ" rules={[{ required: true, message: 'Vui lòng nhập tên liên hệ!' }]}>
                        <Input placeholder="Tên người liên hệ"/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                    <Form.Item name="contactEmail" label="Email liên hệ" rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}>
                        <Input placeholder="Email liên hệ"/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                    <Form.Item name="contactPhone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                        <Input placeholder="Số điện thoại"/>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item name="images" label="Hình ảnh">
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleFileChange}
                    beforeUpload={() => false}
                    multiple
                >
                    {fileList.length >= 8 ? null : (
                        <div>
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Tải ảnh</div>
                        </div>
                    )}
                </Upload>
            </Form.Item>

          <Row justify="end" style={{marginTop: 24}}><Space>
            <Button icon={<CloseCircleOutlined/>} onClick={handleFormCancel}>Hủy</Button>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined/>} style={{backgroundColor: primaryColor, borderColor: primaryColor}} loading={loading}>{editingService ? "Lưu thay đổi" : "Thêm mới"}</Button>
          </Space></Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceManagement;