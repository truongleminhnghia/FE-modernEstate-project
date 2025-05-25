import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Tag,
  Typography,
  Modal,
  Tooltip,
  Row,
  Col,
  Form,
  message,
  Select, 
  DatePicker, 
  InputNumber
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  StopOutlined,
  CheckCircleOutlined,
  ExclamationCircleFilled,
  SaveOutlined,
  CloseCircleOutlined,
  UserOutlined, 
  HeartOutlined,
  ShoppingCartOutlined, 
  ProfileOutlined,
} from "@ant-design/icons";

const { Title, Text} = Typography;
const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;

const initialMockCustomers = [
  {
    id: 1,
    name: "Trần Văn Minh",
    email: "minhtran@example.com",
    phone: "0912345670",
    status: "active", 
    customerType: "buyer",
    preferences: "Tìm mua căn hộ 2PN, quận Bình Thạnh, giá < 5 tỷ, hướng Đông.",
    favoritesCount: 5,
    transactionsCount: 1, 
    registrationDate: "2023-02-10",
    lastLogin: "2025-05-24",
  },
  {
    id: 2,
    name: "Lê Thị Hoa",
    email: "hoale@example.com",
    phone: "0987654320",
    status: "active",
    customerType: "renter",
    preferences: "Thuê nhà nguyên căn, 3 phòng ngủ, gần trường học, Q.3, ngân sách 15-20tr/tháng.",
    favoritesCount: 12,
    transactionsCount: 0,
    registrationDate: "2023-04-01",
    lastLogin: "2025-05-20",
  },
  {
    id: 3,
    name: "Phạm Hùng Dũng",
    email: "dungpham@example.com",
    phone: "0905555888",
    status: "blocked",
    customerType: "both",
    preferences: "Đang xem xét cả thuê và mua căn hộ dịch vụ tại khu trung tâm.",
    favoritesCount: 2,
    transactionsCount: 0,
    registrationDate: "2022-12-05",
    lastLogin: "2025-04-10",
  },
];

const primaryColor = '#4a90e2';

const CustomerManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState(initialMockCustomers);
  
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null); 

  const [form] = Form.useForm();

  const filteredDataSource = dataSource.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.phone.includes(searchText)
  );

  useEffect(() => {
    if (isFormModalVisible) {
      if (editingCustomer) {
        form.setFieldsValue({
          ...editingCustomer,
          
        });
      } else {
        form.resetFields();
        form.setFieldsValue({ customerType: 'renter', favoritesCount: 0, transactionsCount: 0 });
      }
    }
  }, [editingCustomer, form, isFormModalVisible]);

  const handleToggleBlockStatus = (customerId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    const actionText = newStatus === "blocked" ? "Chặn" : "Bỏ chặn";

    confirm({
      title: `Bạn có chắc muốn ${actionText.toLowerCase()} khách hàng này?`,
      icon: <ExclamationCircleFilled />,
      okText: "Xác nhận",
      okType: newStatus === "blocked" ? "danger" : "primary",
      cancelText: "Hủy",
      onOk() {
        setDataSource((prevData) =>
          prevData.map((customer) =>
            customer.id === customerId ? { ...customer, status: newStatus } : customer
          )
        );
        message.success(`${actionText} khách hàng thành công!`);
      },
      okButtonProps: newStatus === 'blocked' ? {} : { style: { backgroundColor: primaryColor, borderColor: primaryColor } },
    });
  };

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setIsDetailModalVisible(true);
  };

  const showAddModal = () => {
    setEditingCustomer(null);
    form.resetFields(); 
    setIsFormModalVisible(true);
  };

  const showEditModal = (customer) => {
    setEditingCustomer(customer);
    form.setFieldsValue(customer); 
    setIsFormModalVisible(true);
  };

  const handleFormCancel = () => {
    setIsFormModalVisible(false);
    form.resetFields();
    setEditingCustomer(null);
  };

  const handleFormSubmit = (values) => {
    if (editingCustomer) {
      setDataSource(prevData => 
        prevData.map(customer => 
          customer.id === editingCustomer.id ? { ...customer, ...values } : customer
        )
      );
      message.success("Cập nhật thông tin khách hàng thành công!");
    } else {
      const newId = dataSource.length > 0 ? Math.max(...dataSource.map(o => o.id)) + 1 : 1;
      const newCustomer = {
        id: newId,
        ...values, 
        status: 'active', 
        registrationDate: new Date().toISOString().split('T')[0], 
        lastLogin: new Date().toISOString().split('T')[0], 
      };
      setDataSource(prevData => [...prevData, newCustomer]);
      message.success("Thêm khách hàng mới thành công!");
    }
    setIsFormModalVisible(false);
    form.resetFields();
    setEditingCustomer(null);
  };

  const columns = [
    {
      title: "STT", key: "stt", width: 60, align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên Khách hàng", dataIndex: "name", key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name) => <Text style={{ color: primaryColor, fontWeight: '500' }}>{name}</Text>,
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    { 
      title: "Loại KH", 
      dataIndex: "customerType", 
      key: "customerType",
      align: "center",
      filters: [
        { text: 'Người mua', value: 'buyer' },
        { text: 'Người thuê', value: 'renter' },
        { text: 'Cả hai', value: 'both' },
      ],
      onFilter: (value, record) => record.customerType.indexOf(value) === 0,
      render: (type) => {
        let color = 'default';
        let text = 'Chưa rõ';
        if (type === 'buyer') { color = 'purple'; text = 'Mua'; }
        else if (type === 'renter') { color = 'geekblue'; text = 'Thuê'; }
        else if (type === 'both') { color = 'cyan'; text = 'Mua & Thuê'; }
        return <Tag color={color}>{text}</Tag>;
      }
    },
    { 
      title: "Yêu thích",
      dataIndex: "favoritesCount", 
      key: "favoritesCount", 
      align: "center",
      sorter: (a, b) => a.favoritesCount - b.favoritesCount,
    },
    { 
      title: "Giao dịch", 
      dataIndex: "transactionsCount", 
      key: "transactionsCount", 
      align: "center",
      sorter: (a, b) => a.transactionsCount - b.transactionsCount,
    },
    {
      title: "Trạng thái", dataIndex: "status", key: "status", align: "center",
      filters: [ { text: 'Đang hoạt động', value: 'active' }, { text: 'Bị chặn', value: 'blocked' }, ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (status) => status === "active" ? <Tag color="green">Đang hoạt động</Tag> : <Tag color="volcano">Bị chặn</Tag>,
    },
    {
      title: "Hành động", key: "action", align: "center", width: 150,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết"><Button type="text" icon={<EyeOutlined style={{ color: primaryColor }} />} onClick={() => handleViewDetails(record)}/></Tooltip>
          <Tooltip title="Chỉnh sửa"><Button type="text" icon={<EditOutlined style={{ color: '#faad14' }}/>} onClick={() => showEditModal(record)}/></Tooltip>
          {record.status === "active" ? (
            <Tooltip title="Chặn"><Button type="text" icon={<StopOutlined />} danger onClick={() => handleToggleBlockStatus(record.id, record.status)}/></Tooltip>
          ) : (
            <Tooltip title="Bỏ chặn"><Button type="text" icon={<CheckCircleOutlined style={{ color: 'green' }}/>} onClick={() => handleToggleBlockStatus(record.id, record.status)}/></Tooltip>
          )}
        </Space>
      ),
    },
  ];

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };
  
  const handleClearSearch = () => {
    setSearchText("");
  };

  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
      <Title level={3} style={{ marginBottom: "20px", color: primaryColor }}>Quản lý Khách hàng (Người thuê/mua)</Title>
      <Row justify="space-between" align="middle" style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={12} md={10} lg={8} xl={6}>
          <Input
            placeholder="Tìm kiếm khách hàng..."
            prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={searchText}
            onChange={handleSearchInputChange}
            allowClear
            onClear={handleClearSearch}
            style={{ width: '100%' }}
          />
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: primaryColor, borderColor: primaryColor }} onClick={showAddModal}>
            Thêm Khách hàng
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredDataSource}
        rowKey="id"
        bordered
        pagination={{ pageSize: 8, showSizeChanger: true, pageSizeOptions: ['8', '15', '30'], responsive: true }}
        scroll={{ x: 'max-content' }}
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}
      />

      <Modal
        title={<span style={{color: primaryColor, fontWeight: 'bold'}}>Thông tin chi tiết Khách hàng</span>}
        visible={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={[ <Button key="close" onClick={() => setIsDetailModalVisible(false)} style={{borderColor: primaryColor, color: primaryColor}}>Đóng</Button> ]}
        width={600}
      >
        {selectedCustomer && (
          <Space direction="vertical" style={{width: '100%'}}>
            <p><strong>ID:</strong> {selectedCustomer.id}</p>
            <p><strong>Tên:</strong> {selectedCustomer.name}</p>
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
            <p><strong>Số điện thoại:</strong> {selectedCustomer.phone}</p>
            <p><strong>Loại khách hàng:</strong> 
              {selectedCustomer.customerType === 'buyer' ? <Tag color="purple">Mua</Tag> : 
               selectedCustomer.customerType === 'renter' ? <Tag color="geekblue">Thuê</Tag> :
               selectedCustomer.customerType === 'both' ? <Tag color="cyan">Mua & Thuê</Tag> : 'Chưa rõ'}
            </p>
            <p><strong><ProfileOutlined /> Nhu cầu/Sở thích:</strong> {selectedCustomer.preferences || 'Chưa cập nhật'}</p>
            <p><strong><HeartOutlined /> Số tin yêu thích:</strong> {selectedCustomer.favoritesCount}</p>
            <p><strong><ShoppingCartOutlined /> Số giao dịch:</strong> {selectedCustomer.transactionsCount}</p>
            <p><strong>Ngày đăng ký:</strong> {selectedCustomer.registrationDate || 'Chưa cập nhật'}</p>
            <p><strong>Đăng nhập cuối:</strong> {selectedCustomer.lastLogin || 'Chưa cập nhật'}</p>
            <p><strong>Trạng thái:</strong> {selectedCustomer.status === "active" ? <Tag color="green">Đang hoạt động</Tag> : <Tag color="volcano">Bị chặn</Tag>}</p>
          </Space>
        )}
      </Modal>

      <Modal
        title={
          <span style={{color: primaryColor, fontWeight: 'bold'}}>
            {editingCustomer ? "Chỉnh sửa thông tin Khách hàng" : "Thêm mới Khách hàng"}
          </span>
        }
        visible={isFormModalVisible}
        onCancel={handleFormCancel}
        footer={null}
        width={700}
        destroyOnClose 
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Tên Khách hàng" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                <Input placeholder="Nhập tên khách hàng"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}>
                <Input placeholder="Nhập email"/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }, { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!'}]}>
                <Input placeholder="Nhập số điện thoại"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="customerType" label="Loại khách hàng" rules={[{ required: true, message: 'Vui lòng chọn loại khách hàng!' }]}>
                <Select placeholder="Chọn loại khách hàng">
                  <Option value="renter">Người thuê</Option>
                  <Option value="buyer">Người mua</Option>
                  <Option value="both">Cả hai (Thuê & Mua)</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
           <Form.Item name="preferences" label="Nhu cầu / Sở thích bất động sản">
            <TextArea placeholder="Mô tả nhu cầu, ví dụ: Căn hộ 2PN, Q.1, gần công viên, giá < 20tr/tháng..." rows={3}/>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
                <Form.Item name="favoritesCount" label="Số tin đã yêu thích (ban đầu)" rules={[{ type: 'number', min: 0, message: 'Số lượng không hợp lệ!'}]}>
                    <InputNumber placeholder="Nhập số tin yêu thích" style={{width: '100%'}} />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item name="transactionsCount" label="Số giao dịch đã có (ban đầu)" rules={[{ type: 'number', min: 0, message: 'Số lượng không hợp lệ!'}]}>
                    <InputNumber placeholder="Nhập số giao dịch" style={{width: '100%'}} />
                </Form.Item>
            </Col>
          </Row>
          
          <Row justify="end" style={{marginTop: 20}}>
            <Space>
              <Button icon={<CloseCircleOutlined/>} onClick={handleFormCancel}>Hủy</Button>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined/>} style={{backgroundColor: primaryColor, borderColor: primaryColor}}>
                {editingCustomer ? "Lưu thay đổi" : "Thêm mới"}
              </Button>
            </Space>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerManagement;