import React, { useState, useEffect } from 'react';
import {
  Table, Button, Input, Space, Tag, Typography, Modal, Tooltip, Row, Col, Form, message, Select,
  InputNumber, Checkbox 
} from "antd";
import {
  PlusOutlined, SearchOutlined, EyeOutlined, EditOutlined, StopOutlined, CheckCircleOutlined, ExclamationCircleFilled,
  SaveOutlined, CloseCircleOutlined, AppstoreAddOutlined, TagsOutlined, DollarCircleOutlined, CalendarOutlined,
  ToolOutlined 
} from "@ant-design/icons";
import moment from 'moment'; 

const { Title, Text } = Typography;
const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;

const primaryColor = '#4a90e2';

const initialMockServices = [
  {
    id: 'SVC001',
    name: 'Đăng tin VIP 7 ngày',
    description: 'Tin đăng của bạn sẽ được hiển thị ở vị trí nổi bật trong 7 ngày, tăng khả năng tiếp cận khách hàng.',
    price: 150000, 
    durationDays: 7,
    type: 'listing_boost', 
    applicableTo: ['listings_all'], 
    features: ['Hiển thị TOP đầu trang tìm kiếm', 'Gắn nhãn VIP nổi bật', 'Tiếp cận nhiều khách hàng hơn'],
    status: 'active', 
    dateCreated: '2025-01-10',
    dateUpdated: '2025-03-15',
  },
  {
    id: 'SVC002',
    name: 'Gói Môi giới Chuyên nghiệp - 1 Tháng',
    description: 'Nâng cấp tài khoản Môi giới để đăng nhiều tin hơn, nhận thông báo khách hàng tiềm năng và các công cụ hỗ trợ độc quyền.',
    price: 500000,
    durationDays: 30,
    type: 'user_subscription',
    applicableTo: ['users_broker'],
    features: ['Đăng tối đa 50 tin', 'Huy hiệu "Môi giới Pro"', 'Ưu tiên hiển thị tin', 'Báo cáo hiệu quả tin đăng'],
    status: 'active',
    dateCreated: '2025-02-01',
    dateUpdated: '2025-04-01',
  },
  {
    id: 'SVC003',
    name: 'Dịch vụ Chụp ảnh BĐS Chuyên nghiệp',
    description: 'Đội ngũ nhiếp ảnh gia chuyên nghiệp sẽ đến tận nơi chụp ảnh căn hộ/nhà của bạn với chất lượng cao nhất.',
    price: 1200000,
    durationDays: null, 
    type: 'one_time_service',
    applicableTo: ['users_owner', 'users_broker'],
    features: ['Bộ ảnh chất lượng cao (15-20 ảnh)', 'Chỉnh sửa hậu kỳ chuyên nghiệp', 'Flycam (tùy chọn gói)'],
    status: 'inactive', 
    dateCreated: '2025-03-20',
    dateUpdated: '2025-05-01',
  },
];

const serviceTypes = {
  listing_boost: "Nâng cấp tin đăng",
  user_subscription: "Gói tài khoản người dùng",
  one_time_service: "Dịch vụ một lần",
};
const applicableTargets = {
  listings_all: "Tất cả tin đăng",
  users_owner: "Chủ sở hữu",
  users_broker: "Môi giới",
  users_customer: "Khách hàng (Thuê/Mua)",
};


const ServiceManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState(initialMockServices);
  
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [editingService, setEditingService] = useState(null); 

  const [form] = Form.useForm();

  const filteredDataSource = dataSource.filter(
    (service) =>
      service.name.toLowerCase().includes(searchText.toLowerCase()) ||
      service.id.toLowerCase().includes(searchText.toLowerCase()) ||
      (service.type && (serviceTypes[service.type] || service.type).toLowerCase().includes(searchText.toLowerCase()))
  );

  useEffect(() => {
    if (isFormModalVisible) {
      if (editingService) {
        form.setFieldsValue({
          ...editingService,
          features: editingService.features ? editingService.features.join('\n') : '',
        });
      } else {
        form.resetFields();
        form.setFieldsValue({ 
          status: 'active',
          price: 0,
          applicableTo: [],
          features: '',
        });
      }
    }
  }, [editingService, form, isFormModalVisible]);
  
  const showAddModal = () => {
    setEditingService(null);
    setIsFormModalVisible(true);
  };

  const showEditModal = (service) => {
    setEditingService(service);
    setIsFormModalVisible(true);
  };

  const handleFormCancel = () => {
    setIsFormModalVisible(false);
    setEditingService(null);
  };

  const handleFormSubmit = (values) => {
    const processedValues = {
      ...values,
      price: parseFloat(values.price) || 0,
      durationDays: values.durationDays ? parseInt(values.durationDays, 10) : null,
      features: values.features ? values.features.split('\n').map(f => f.trim()).filter(f => f) : [], 
      dateUpdated: moment().format('YYYY-MM-DD'),
    };

    if (editingService) {
      setDataSource(prevData => 
        prevData.map(service => 
          service.id === editingService.id ? { ...service, ...processedValues } : service
        )
      );
      message.success("Cập nhật dịch vụ thành công!");
    } else {
      const newId = `SVC${String(dataSource.length > 0 ? (parseInt(dataSource[dataSource.length-1].id.replace('SVC','')) + 1) : 1).padStart(3,'0')}`;
      const newService = {
        id: newId,
        ...processedValues,
        dateCreated: moment().format('YYYY-MM-DD'),
      };
      setDataSource(prevData => [...prevData, newService]);
      message.success("Thêm dịch vụ mới thành công!");
    }
    setIsFormModalVisible(false);
    setEditingService(null);
  };

  const handleToggleStatus = (serviceId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const actionText = newStatus === 'active' ? 'Kích hoạt' : 'Ngưng kích hoạt';
     confirm({
      title: `Bạn có chắc muốn ${actionText.toLowerCase()} dịch vụ này?`,
      icon: <ExclamationCircleFilled />, okText: "Xác nhận", cancelText: "Hủy",
      onOk() {
        setDataSource(prevData => prevData.map(s => s.id === serviceId ? { ...s, status: newStatus, dateUpdated: moment().format('YYYY-MM-DD') } : s));
        message.success(`${actionText} dịch vụ thành công!`);
      },
    });
  };


  const columns = [
    { title: "Mã DV", dataIndex: "id", key: "id", width: 100, sorter: (a,b) => a.id.localeCompare(b.id), render: (id) => <Text strong style={{color: primaryColor}}>{id}</Text> },
    { title: "Tên Dịch vụ", dataIndex: "name", key: "name", width: 270, sorter: (a,b) => a.name.localeCompare(b.name)},
    { 
      title: "Giá (VND)", 
      dataIndex: "price", key: "price", width: 100, align: 'right',
      render: price => Number(price).toLocaleString(),
      sorter: (a,b) => a.price - b.price,
    },
    { 
      title: <Space><CalendarOutlined />Thời hạn</Space>, 
      dataIndex: "durationDays", key: "durationDays", width: 120, align: 'center',
      render: days => days ? `${days} ngày` : <Text type="secondary">N/A</Text>,
      sorter: (a,b) => (a.durationDays || 0) - (b.durationDays || 0),
    },
    { 
      title: <Space><TagsOutlined />Loại DV</Space>, 
      dataIndex: "type", key: "type", width: 180,
      filters: Object.entries(serviceTypes).map(([value, text]) => ({text, value})),
      onFilter: (value, record) => record.type === value,
      render: type => <Tag color="cyan">{serviceTypes[type] || type}</Tag>
    },
    {
      title: "Trạng thái", dataIndex: "status", key: "status", width: 150, align: 'center',
      filters: [ {text: 'Đang hoạt động', value: 'active'}, {text: 'Ngưng hoạt động', value: 'inactive'} ],
      onFilter: (value, record) => record.status === value,
      render: status => <Tag color={status === 'active' ? 'green' : 'red'}>{status === 'active' ? 'Hoạt động' : 'Ngưng hoạt động'}</Tag>
    },
    {
      title: "Hành động", key: "action", align: "center", width: 120, 
      // Bỏ fixed: 'right' nếu không dùng scroll.x
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Chỉnh sửa"><Button type="text" icon={<EditOutlined style={{ color: '#faad14' }}/>} onClick={() => showEditModal(record)}/></Tooltip>
          {record.status === "active" ? (
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
      <Title level={3} style={{ marginBottom: "20px", color: primaryColor }}><ToolOutlined /> Quản lý Dịch vụ</Title>
      <Row justify="space-between" align="middle" style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={12} md={10} lg={8} xl={6}>
          <Input placeholder="Tìm Mã DV, Tên DV, Loại DV..." prefix={<SearchOutlined />} value={searchText} onChange={handleSearchInputChange} allowClear onClear={handleClearSearch} style={{ width: '100%' }}/>
        </Col>
        <Col><Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: primaryColor, borderColor: primaryColor }} onClick={showAddModal}>Thêm Dịch vụ</Button></Col>
      </Row>

      <Table 
        columns={columns} 
        dataSource={filteredDataSource} 
        rowKey="id" 
        bordered 
        pagination={{ pageSize: 10, responsive: true }} 
        // Bỏ scroll={{ x: 1200 }} 
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}
      />
      
      <Modal
        title={<span style={{color: primaryColor, fontWeight: 'bold'}}>{editingService ? <><EditOutlined /> Chỉnh sửa Dịch vụ</> : <><PlusOutlined/> Thêm mới Dịch vụ</>}</span>}
        visible={isFormModalVisible}
        onCancel={handleFormCancel}
        footer={null}
        width={700}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit} scrollToFirstError>
            <Row gutter={16}>
                <Col span={16}>
                    <Form.Item name="name" label="Tên Dịch vụ" rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ!' }]}>
                        <Input placeholder="VD: Gói tin đăng VIP 1 tháng"/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="status" label="Trạng thái" rules={[{ required: true }]}>
                        <Select>
                            <Option value="active">Đang hoạt động</Option>
                            <Option value="inactive">Ngưng hoạt động</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
             <Form.Item name="description" label="Mô tả chi tiết dịch vụ" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
                <TextArea rows={3} placeholder="Mô tả lợi ích, cách thức hoạt động của dịch vụ..."/>
            </Form.Item>
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item name="price" label="Giá (VND)" rules={[{ required: true, message: 'Vui lòng nhập giá dịch vụ!'}]}>
                        <InputNumber style={{width: '100%'}} min={0} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} placeholder="Nhập giá bằng số"/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item name="durationDays" label="Thời hạn (Số ngày, nếu có)">
                        <InputNumber style={{width: '100%'}} min={0} placeholder="VD: 7, 30. Bỏ trống nếu không có thời hạn."/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item name="type" label="Loại Dịch vụ" rules={[{ required: true, message: 'Vui lòng chọn loại dịch vụ!'}]}>
                        <Select placeholder="Chọn loại dịch vụ">
                            {Object.entries(serviceTypes).map(([key, text]) => <Option key={key} value={key}>{text}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item name="applicableTo" label="Áp dụng cho">
                        <Select mode="multiple" allowClear placeholder="Chọn đối tượng áp dụng">
                            {Object.entries(applicableTargets).map(([key, text]) => <Option key={key} value={key}>{text}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item name="features" label="Các tính năng của Dịch vụ (Mỗi tính năng một dòng)">
                <TextArea rows={4} placeholder="VD: Hiển thị nổi bật&#10;Gửi email thông báo cho người theo dõi&#10;..."/>
            </Form.Item>
          <Row justify="end" style={{marginTop: 24}}><Space>
            <Button icon={<CloseCircleOutlined/>} onClick={handleFormCancel}>Hủy</Button>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined/>} style={{backgroundColor: primaryColor, borderColor: primaryColor}}>{editingService ? "Lưu thay đổi" : "Thêm mới"}</Button>
          </Space></Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceManagement;