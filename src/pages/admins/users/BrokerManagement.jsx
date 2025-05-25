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
  IdcardOutlined, 
  TeamOutlined, 
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { confirm } = Modal;
const { Option } = Select;

const initialMockBrokers = [
  {
    id: 1,
    name: "Hoàng Thị Kim Dung",
    email: "kimdung.broker@example.com",
    phone: "0909112233",
    status: "active",
    licenseNumber: "MG123456",
    agencyName: "Sàn BĐS An Cư",
    experienceYears: 5,
    listingsManaged: 15,
    specialization: "Căn hộ cao cấp, Biệt thự",
    registrationDate: "2022-08-10",
  },
  {
    id: 2,
    name: "Lê Văn Nam",
    email: "namle.broker@example.com",
    phone: "0988776655",
    status: "blocked",
    licenseNumber: "MG654321",
    agencyName: "Công ty Môi giới Đại Phát",
    experienceYears: 3,
    listingsManaged: 8,
    specialization: "Nhà phố, Đất nền",
    registrationDate: "2023-01-20",
  },
  {
    id: 3,
    name: "Phạm Anh Tuấn",
    email: "tuanpham.broker@example.com",
    phone: "0918234567",
    status: "active",
    licenseNumber: "MG007008",
    agencyName: "", 
    experienceYears: 7,
    listingsManaged: 22,
    specialization: "Cho thuê văn phòng, Mặt bằng kinh doanh",
    registrationDate: "2021-05-15",
  },
];

const primaryColor = '#4a90e2';

const BrokerManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState(initialMockBrokers);
  
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [editingBroker, setEditingBroker] = useState(null); 

  const [form] = Form.useForm();

  const filteredDataSource = dataSource.filter(
    (broker) =>
      broker.name.toLowerCase().includes(searchText.toLowerCase()) ||
      broker.email.toLowerCase().includes(searchText.toLowerCase()) ||
      broker.phone.includes(searchText) ||
      (broker.licenseNumber && broker.licenseNumber.toLowerCase().includes(searchText.toLowerCase())) ||
      (broker.agencyName && broker.agencyName.toLowerCase().includes(searchText.toLowerCase()))
  );

  useEffect(() => {
    if (editingBroker) {
      form.setFieldsValue(editingBroker);
    } else {
      form.resetFields();
    }
  }, [editingBroker, form, isFormModalVisible]);

  const handleToggleBlockStatus = (brokerId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    const actionText = newStatus === "blocked" ? "Chặn" : "Bỏ chặn";

    confirm({
      title: `Bạn có chắc muốn ${actionText.toLowerCase()} môi giới này?`,
      icon: <ExclamationCircleFilled />,
      okText: "Xác nhận",
      okType: newStatus === "blocked" ? "danger" : "primary",
      cancelText: "Hủy",
      onOk() {
        setDataSource((prevData) =>
          prevData.map((broker) =>
            broker.id === brokerId ? { ...broker, status: newStatus } : broker
          )
        );
        message.success(`${actionText} môi giới thành công!`);
      },
      okButtonProps: newStatus === 'blocked' ? {} : { style: { backgroundColor: primaryColor, borderColor: primaryColor } },
    });
  };

  const handleViewDetails = (broker) => {
    setSelectedBroker(broker);
    setIsDetailModalVisible(true);
  };

  const showAddModal = () => {
    setEditingBroker(null);
    form.resetFields();
    setIsFormModalVisible(true);
  };

  const showEditModal = (broker) => {
    setEditingBroker(broker);
    form.setFieldsValue(broker);
    setIsFormModalVisible(true);
  };

  const handleFormCancel = () => {
    setIsFormModalVisible(false);
    form.resetFields();
    setEditingBroker(null);
  };

  const handleFormSubmit = (values) => {
    if (editingBroker) {
      setDataSource(prevData => 
        prevData.map(broker => 
          broker.id === editingBroker.id ? { ...broker, ...values } : broker
        )
      );
      message.success("Cập nhật thông tin môi giới thành công!");
    } else {
      const newId = dataSource.length > 0 ? Math.max(...dataSource.map(o => o.id)) + 1 : 1;
      const newBroker = {
        id: newId,
        ...values,
        status: 'active', 
        registrationDate: new Date().toISOString().split('T')[0],
      };
      setDataSource(prevData => [...prevData, newBroker]);
      message.success("Thêm môi giới mới thành công!");
    }
    setIsFormModalVisible(false);
    form.resetFields();
    setEditingBroker(null);
  };

  const columns = [
    {
      title: "STT", key: "stt", width: 60, align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên Môi giới", dataIndex: "name", key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name) => <Text style={{ color: primaryColor, fontWeight: '500' }}>{name}</Text>,
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    { 
      title: "Số giấy phép", 
      dataIndex: "licenseNumber", 
      key: "licenseNumber" 
    },
    { 
      title:"Sàn giao dịch", 
      dataIndex: "agencyName", 
      key: "agencyName",
      render: (agency) => agency || <Tag>Cá nhân</Tag>
    },
    { 
      title: "Số tin quản lý", 
      dataIndex: "listingsManaged", 
      key: "listingsManaged", 
      align: "center",
      sorter: (a, b) => a.listingsManaged - b.listingsManaged,
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
      <Title level={3} style={{ marginBottom: "20px", color: primaryColor }}>Quản lý Môi giới</Title>
      <Row justify="space-between" align="middle" style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={12} md={10} lg={8} xl={6}>
          <Input
            placeholder="Tìm kiếm môi giới..."
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
            Thêm Môi giới
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
        title={<span style={{color: primaryColor, fontWeight: 'bold'}}>Thông tin chi tiết Môi giới</span>}
        visible={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={[ <Button key="close" onClick={() => setIsDetailModalVisible(false)} style={{borderColor: primaryColor, color: primaryColor}}>Đóng</Button> ]}
        width={600}
      >
        {selectedBroker && (
          <Space direction="vertical" style={{width: '100%'}}>
            <p><strong>ID:</strong> {selectedBroker.id}</p>
            <p><strong>Tên:</strong> {selectedBroker.name}</p>
            <p><strong>Email:</strong> {selectedBroker.email}</p>
            <p><strong>Số điện thoại:</strong> {selectedBroker.phone}</p>
            <p><strong>Số giấy phép:</strong> <Tag color="blue">{selectedBroker.licenseNumber}</Tag></p>
            <p><strong>Sàn giao dịch:</strong> {selectedBroker.agencyName || 'Cá nhân'}</p>
            <p><strong>Số năm kinh nghiệm:</strong> {selectedBroker.experienceYears !== undefined ? `${selectedBroker.experienceYears} năm` : 'Chưa cập nhật'}</p>
            <p><strong>Số tin đang quản lý:</strong> {selectedBroker.listingsManaged}</p>
            <p><strong>Chuyên môn:</strong> {selectedBroker.specialization || 'Chưa cập nhật'}</p>
            <p><strong>Ngày đăng ký:</strong> {selectedBroker.registrationDate || 'Chưa cập nhật'}</p>
            <p><strong>Trạng thái:</strong> {selectedBroker.status === "active" ? <Tag color="green">Đang hoạt động</Tag> : <Tag color="volcano">Bị chặn</Tag>}</p>
          </Space>
        )}
      </Modal>

      <Modal
        title={
          <span style={{color: primaryColor, fontWeight: 'bold'}}>
            {editingBroker ? "Chỉnh sửa thông tin Môi giới" : "Thêm mới Môi giới"}
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
          initialValues={editingBroker || { experienceYears: 0, listingsManaged: 0, status: 'active' }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Tên Môi giới" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                <Input placeholder="Nhập tên môi giới"/>
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
              <Form.Item name="licenseNumber" label="Số giấy phép hành nghề" rules={[{ required: true, message: 'Vui lòng nhập số giấy phép!' }]}>
                <Input placeholder="VD: MG123456"/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="agencyName" label="Tên công ty/Sàn giao dịch (Nếu có)">
                <Input placeholder="Nhập tên công ty hoặc sàn"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="experienceYears" label="Số năm kinh nghiệm" rules={[{ type: 'number', min: 0, message: 'Số năm không hợp lệ!'}]}>
                <InputNumber placeholder="Nhập số năm" style={{width: '100%'}}/>
              </Form.Item>
            </Col>
          </Row>
           <Form.Item name="specialization" label="Chuyên môn (VD: Căn hộ cao cấp, Nhà phố)">
            <Input.TextArea placeholder="Liệt kê các chuyên môn, cách nhau bằng dấu phẩy" rows={2}/>
          </Form.Item>
          <Form.Item name="listingsManaged" label="Số tin đang quản lý (Ước tính ban đầu)" rules={[{ type: 'number', min: 0, message: 'Số lượng không hợp lệ!'}]}>
            <InputNumber placeholder="Nhập số lượng tin" style={{width: '100%'}}/>
          </Form.Item>
          
          <Row justify="end" style={{marginTop: 20}}>
            <Space>
              <Button icon={<CloseCircleOutlined/>} onClick={handleFormCancel}>Hủy</Button>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined/>} style={{backgroundColor: primaryColor, borderColor: primaryColor}}>
                {editingBroker ? "Lưu thay đổi" : "Thêm mới"}
              </Button>
            </Space>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default BrokerManagement;