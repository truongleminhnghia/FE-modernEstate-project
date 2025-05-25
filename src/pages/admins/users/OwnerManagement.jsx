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
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { confirm } = Modal;
const { Option } = Select; 

const initialMockOwners = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    email: "vana@example.com",
    phone: "0901234567",
    status: "active", 
    properties: 5,
    address: "123 Đường ABC, Quận 1, TP. HCM",
    registrationDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    email: "thib@example.com",
    phone: "0912345678",
    status: "blocked",
    properties: 2,
    address: "456 Đường XYZ, Quận 2, TP. HCM",
    registrationDate: "2023-03-22",
  },
  {
    id: 3,
    name: "Lê Minh Cường",
    email: "minhcuong@example.com",
    phone: "0987654321",
    status: "active",
    properties: 8,
    address: "789 Đường KLM, Quận 3, TP. HCM",
    registrationDate: "2022-11-10",
  },
];

const primaryColor = '#4a90e2';

const OwnerManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState(initialMockOwners);
  
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [editingOwner, setEditingOwner] = useState(null);
  const [form] = Form.useForm(); 

  const filteredDataSource = dataSource.filter(
    (owner) =>
      owner.name.toLowerCase().includes(searchText.toLowerCase()) ||
      owner.email.toLowerCase().includes(searchText.toLowerCase()) ||
      owner.phone.includes(searchText)
  );

  useEffect(() => {
    if (editingOwner) {
      form.setFieldsValue(editingOwner);
    } else {
      form.resetFields();
    }
  }, [editingOwner, form, isFormModalVisible]); 

  const handleToggleBlockStatus = (ownerId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    const actionText = newStatus === "blocked" ? "Chặn" : "Bỏ chặn";

    confirm({
      title: `Bạn có chắc muốn ${actionText.toLowerCase()} chủ sở hữu này?`,
      icon: <ExclamationCircleFilled />,
      okText: "Xác nhận",
      okType: newStatus === "blocked" ? "danger" : "primary",
      cancelText: "Hủy",
      onOk() {
        setDataSource((prevData) =>
          prevData.map((owner) =>
            owner.id === ownerId ? { ...owner, status: newStatus } : owner
          )
        );
        message.success(`${actionText} chủ sở hữu thành công!`);
      },
      okButtonProps: newStatus === 'blocked' ? {} : { style: { backgroundColor: primaryColor, borderColor: primaryColor } },
    });
  };

  const handleViewDetails = (owner) => {
    setSelectedOwner(owner);
    setIsDetailModalVisible(true);
  };

  const showAddModal = () => {
    setEditingOwner(null); 
    form.resetFields(); 
    setIsFormModalVisible(true);
  };

  const showEditModal = (owner) => {
    setEditingOwner(owner);
    form.setFieldsValue({ 
      ...owner,
    });
    setIsFormModalVisible(true);
  };

  const handleFormCancel = () => {
    setIsFormModalVisible(false);
    form.resetFields();
    setEditingOwner(null);
  };

  const handleFormSubmit = (values) => {
    if (editingOwner) {
      setDataSource(prevData => 
        prevData.map(owner => 
          owner.id === editingOwner.id ? { ...owner, ...values } : owner
        )
      );
      message.success("Cập nhật thông tin chủ sở hữu thành công!");
    } else { 
      const newId = dataSource.length > 0 ? Math.max(...dataSource.map(o => o.id)) + 1 : 1;
      const newOwner = {
        id: newId,
        ...values,
        status: 'active', 
        registrationDate: new Date().toISOString().split('T')[0], 
      };
      setDataSource(prevData => [...prevData, newOwner]);
      message.success("Thêm chủ sở hữu mới thành công!");
    }
    setIsFormModalVisible(false);
    form.resetFields();
    setEditingOwner(null);
  };

  const columns = [
    {
      title: "STT",
      key: "stt",
      width: 60,
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên chủ sở hữu",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name) => <Text style={{ color: primaryColor, fontWeight: '500' }}>{name}</Text>,
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    { title: "Số tài sản", dataIndex: "properties", key: "properties", align: "center", sorter: (a, b) => a.properties - b.properties, },
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
      <Title level={3} style={{ marginBottom: "20px", color: primaryColor }}>Quản lý Chủ sở hữu</Title>
      <Row justify="space-between" align="middle" style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={12} md={10} lg={8} xl={6}>
          <Input
            placeholder="Tìm kiếm theo tên, email, SĐT..."
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
            Thêm Chủ sở hữu
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
        title={<span style={{color: primaryColor, fontWeight: 'bold'}}>Thông tin chi tiết Chủ sở hữu</span>}
        visible={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={[ <Button key="close" onClick={() => setIsDetailModalVisible(false)} style={{borderColor: primaryColor, color: primaryColor}}>Đóng</Button> ]}
        width={600}
      >
        {selectedOwner && (
          <Space direction="vertical" style={{width: '100%'}}>
            <p><strong>ID:</strong> {selectedOwner.id}</p>
            <p><strong>Tên:</strong> {selectedOwner.name}</p>
            <p><strong>Email:</strong> {selectedOwner.email}</p>
            <p><strong>Số điện thoại:</strong> {selectedOwner.phone}</p>
            <p><strong>Địa chỉ:</strong> {selectedOwner.address || 'Chưa cập nhật'}</p>
            <p><strong>Số BĐS sở hữu:</strong> {selectedOwner.properties}</p>
            <p><strong>Ngày đăng ký:</strong> {selectedOwner.registrationDate || 'Chưa cập nhật'}</p>
            <p><strong>Trạng thái:</strong> {selectedOwner.status === "active" ? <Tag color="green">Đang hoạt động</Tag> : <Tag color="volcano">Bị chặn</Tag>}</p>
          </Space>
        )}
      </Modal>

      <Modal
        title={
          <span style={{color: primaryColor, fontWeight: 'bold'}}>
            {editingOwner ? "Chỉnh sửa thông tin Chủ sở hữu" : "Thêm mới Chủ sở hữu"}
          </span>
        }
        visible={isFormModalVisible}
        onCancel={handleFormCancel}
        footer={null} 
        width={600}
        destroyOnClose 
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={editingOwner || { properties: 0, status: 'active' }} 
        >
          <Form.Item name="name" label="Tên chủ sở hữu" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
            <Input placeholder="Nhập tên chủ sở hữu"/>
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}>
            <Input placeholder="Nhập email"/>
          </Form.Item>
          <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }, { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!'}]}>
            <Input placeholder="Nhập số điện thoại"/>
          </Form.Item>
          <Form.Item name="address" label="Địa chỉ">
            <Input.TextArea placeholder="Nhập địa chỉ" rows={3}/>
          </Form.Item>
          <Form.Item name="properties" label="Số lượng BĐS" rules={[{ required: true, message: 'Vui lòng nhập số lượng BĐS!' },{ type: 'number', min: 0, message: 'Số lượng không hợp lệ!'}]}>
            <Input type="number" placeholder="Nhập số lượng bất động sản" style={{width: '100%'}}/>
          </Form.Item>
          
          <Row justify="end" style={{marginTop: 20}}>
            <Space>
              <Button icon={<CloseCircleOutlined/>} onClick={handleFormCancel}>Hủy</Button>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined/>} style={{backgroundColor: primaryColor, borderColor: primaryColor}}>
                {editingOwner ? "Lưu thay đổi" : "Thêm mới"}
              </Button>
            </Space>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default OwnerManagement;