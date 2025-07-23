import React, { useState, useEffect } from 'react';
import {
  Table, Button, Input, Space, Tag, Typography, Modal, Tooltip, Row, Col, Form, message, Select, InputNumber
} from "antd";
import {
  PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleOutlined, ToolOutlined
} from "@ant-design/icons";
import axios from 'axios';

const { Title, Text } = Typography;
const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;

const primaryColor = '#4a90e2';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://bemodernestate.site/api/v1/';

const typePackageOptions = [
  { value: 'NORMAL', label: 'NORMAL' },
  { value: 'VIP', label: 'VIP' },
  { value: 'PREMIUM', label: 'PREMIUM' },
];
const priorityStatusOptions = [
  'VIP1','VIP2','VIP3','VIP4','VIP5','VIP6','VIP7','VIP8','VIP9','VIP10'
];

const PackageManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [form] = Form.useForm();

  // Fetch packages
  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}packages`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data.success) {
        setDataSource(response.data.data.rowDatas || []);
      } else {
        message.error("Lỗi khi tải dữ liệu gói tin đăng.");
      }
    } catch (error) {
      message.error("Không thể kết nối đến máy chủ hoặc lỗi khi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPackages(); }, []);

  const filteredDataSource = dataSource.filter(pkg =>
    (pkg.packageCode || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (pkg.packageName || '').toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    if (isFormModalVisible) {
      if (editingPackage) {
        form.setFieldsValue(editingPackage);
      } else {
        form.resetFields();
      }
    }
  }, [editingPackage, form, isFormModalVisible]);

  const showAddModal = () => {
    setEditingPackage(null);
    setIsFormModalVisible(true);
    form.resetFields();
  };

  const showEditModal = (pkg) => {
    setEditingPackage(pkg);
    setIsFormModalVisible(true);
  };

  const handleFormCancel = () => {
    setIsFormModalVisible(false);
    setEditingPackage(null);
  };

  const handleDelete = (id) => {
    confirm({
      title: "Bạn có chắc muốn xoá gói tin đăng này?",
      icon: <DeleteOutlined style={{color: 'red'}}/>,
      okText: "Xoá", cancelText: "Hủy", okType: "danger",
      onOk: async () => {
        setLoading(true);
        try {
          await axios.delete(`${API_BASE_URL}packages/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          message.success("Xoá gói tin đăng thành công!");
          fetchPackages();
        } catch (error) {
          message.error("Lỗi khi xoá gói tin đăng!");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleFormSubmit = async (values) => {
    console.log('Form values:', values);
    setLoading(true);
    try {
      if (editingPackage) {
        await axios.put(
          `${API_BASE_URL}packages/${editingPackage.id}`,
          values,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        message.success("Cập nhật gói tin đăng thành công!");
      } else {
        await axios.post(
          `${API_BASE_URL}packages`,
          values,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        message.success("Thêm gói tin đăng mới thành công!");
      }
      setIsFormModalVisible(false);
      setEditingPackage(null);
      fetchPackages();
    } catch (error) {
      message.error(`Đã có lỗi xảy ra: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Mã gói", dataIndex: "packageCode", key: "packageCode", width: 160, render: code => <Text strong style={{color: primaryColor}}>{code}</Text> },
    { title: "Tên gói", dataIndex: "packageName", key: "packageName", width: 180 },
    { title: "Giá", dataIndex: "price", key: "price", width: 120, align: 'right', render: price => price ? `${Number(price).toLocaleString()} VND` : <Text type="secondary">N/A</Text> },
    { title: "Loại gói", dataIndex: "typePackage", key: "typePackage", width: 120, render: type => <Tag color={type === 'VIP' ? 'gold' : type === 'PREMIUM' ? 'purple' : 'blue'}>{type}</Tag> },
    { title: "Ưu tiên", dataIndex: "priorityStatus", key: "priorityStatus", width: 100, render: p => <Tag color="magenta">{p}</Tag> },
    { title: "Mô tả", dataIndex: "description", key: "description", width: 220, ellipsis: true },
    {
      title: "Hành động", key: "action", align: "center", width: 120,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Chỉnh sửa"><Button type="text" icon={<EditOutlined style={{ color: '#faad14' }}/>} onClick={() => showEditModal(record)}/></Tooltip>
          <Tooltip title="Xoá"><Button type="text" icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}/></Tooltip>
        </Space>
      ),
    },
  ];

  const handleSearchInputChange = (e) => setSearchText(e.target.value);
  const handleClearSearch = () => setSearchText("");

  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
      <Title level={3} style={{ marginBottom: "20px", color: primaryColor }}><ToolOutlined /> Quản lý Gói đăng tin</Title>
      <Row justify="space-between" align="middle" style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={12} md={10} lg={8} xl={6}>
          <Input placeholder="Tìm mã gói, tên gói..." prefix={<SearchOutlined />} value={searchText} onChange={handleSearchInputChange} allowClear onClear={handleClearSearch} style={{ width: '100%' }}/>
        </Col>
        <Col><Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: primaryColor, borderColor: primaryColor }} onClick={showAddModal}>Thêm Gói đăng tin</Button></Col>
      </Row>

      <Table 
        columns={columns} 
        dataSource={filteredDataSource} 
        rowKey="id" 
        bordered 
        loading={loading}
        pagination={{ pageSize: 10, responsive: true }} 
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}
        scroll={{ x: 'max-content' }}
      />
      
      <Modal
        title={<span style={{color: primaryColor, fontWeight: 'bold'}}>{editingPackage ? <><EditOutlined /> Chỉnh sửa Gói đăng tin</> : <><PlusOutlined/> Thêm mới Gói đăng tin</>}</span>}
        open={isFormModalVisible}
        onCancel={handleFormCancel}
        footer={null}
        width={600}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          scrollToFirstError
        >
          <Form.Item
            name="packageName"
            label="Tên gói"
            rules={[
              { required: true, message: 'Vui lòng nhập tên gói!' },
              { validator: (_, value) => value && value.trim() !== '' ? Promise.resolve() : Promise.reject('Không được để trống!') }
            ]}
          >
            <Input placeholder="Tên gói" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[
              { required: true, message: 'Vui lòng nhập giá!' },
              { validator: (_, value) => value !== undefined && value !== null && value !== '' ? Promise.resolve() : Promise.reject('Không được để trống!') }
            ]}
          >
            <InputNumber style={{width: '100%'}} min={0} placeholder="Nhập giá" />
          </Form.Item>
          <Form.Item
            name="typePackage"
            label="Loại gói"
            rules={[
              { required: true, message: 'Vui lòng chọn loại gói!' },
              { validator: (_, value) => value ? Promise.resolve() : Promise.reject('Không được để trống!') }
            ]}
          >
            <Select placeholder="Chọn loại gói">{typePackageOptions.map(opt => <Option key={opt.value} value={opt.value}>{opt.label}</Option>)}</Select>
          </Form.Item>
          <Form.Item
            name="priorityStatus"
            label="Ưu tiên"
            rules={[
              { required: true, message: 'Vui lòng chọn mức ưu tiên!' },
              { validator: (_, value) => value ? Promise.resolve() : Promise.reject('Không được để trống!') }
            ]}
          >
            <Select placeholder="Chọn mức ưu tiên">{priorityStatusOptions.map(opt => <Option key={opt} value={opt}>{opt}</Option>)}</Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[
              { required: true, message: 'Vui lòng nhập mô tả!' },
              { validator: (_, value) => value && value.trim() !== '' ? Promise.resolve() : Promise.reject('Không được để trống!') }
            ]}
          >
            <TextArea rows={3} placeholder="Mô tả về gói tin đăng..." />
          </Form.Item>
          <Form.Item>
            <Row justify="end" style={{marginTop: 24}}><Space>
              <Button icon={<CloseCircleOutlined/>} onClick={handleFormCancel}>Hủy</Button>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined/>} style={{backgroundColor: primaryColor, borderColor: primaryColor}} loading={loading}>
                {editingPackage ? "Lưu thay đổi" : "Thêm mới"}
              </Button>
            </Space></Row>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PackageManagement;