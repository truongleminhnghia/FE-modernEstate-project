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
import axios from "axios";

const { Title, Text } = Typography;
const { confirm } = Modal;
const { Option } = Select;

const primaryColor = "#4a90e2";

const STATUS_MAP = {
  ACTIVE: { color: "green", text: "Đang hoạt động" },
  WAIT_CONFIRM: { color: "gold", text: "Chờ kích hoạt" },
  IN_ACTIVE: { color: "volcano", text: "Bị chặn" },
};

const UserManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const [form] = Form.useForm();

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://be-modernestate.onrender.com/api/v1/accounts",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        const allAccounts = response.data.data.rowDatas.map((account) => ({
          id: account.id,
          name: `${account.firstName || ""} ${account.lastName || ""}`.trim(),
          email: account.email,
          phone: account.phone || "N/A",
          status: account.enumAccountStatus,
          roleName: account.role?.roleName || "N/A",
          firstName: account.firstName,
          lastName: account.lastName,
          address: account.address,
          avatar: account.avatar,
          gender: account.gender,
        }));
        setDataSource(allAccounts);
      } else {
        message.error("Lỗi khi tải dữ liệu tài khoản.");
      }
    } catch (error) {
      console.error("Lỗi gọi API:", error);
      message.error(
        "Không thể kết nối đến máy chủ hoặc lỗi khi tải dữ liệu."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredDataSource = dataSource.filter(
    (account) =>
      account.name.toLowerCase().includes(searchText.toLowerCase()) ||
      account.email.toLowerCase().includes(searchText.toLowerCase()) ||
      (account.phone && account.phone.includes(searchText)) ||
      account.roleName.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    if (isFormModalVisible) {
      if (editingCustomer) {
        form.setFieldsValue({
          ...editingCustomer, // This will set email, name, phone, address, avatar, gender if available
        });
      } else {
        form.resetFields();
      }
    }
  }, [editingCustomer, form, isFormModalVisible]);

  const handleToggleBlockStatus = async (accountId, currentStatus) => {
    const nextStatus = currentStatus === "ACTIVE" ? "IN_ACTIVE" : "ACTIVE";
    const actionText = nextStatus === "IN_ACTIVE" ? "Chặn" : "Bỏ chặn";

    confirm({
      title: `Bạn có chắc muốn ${actionText.toLowerCase()} tài khoản này?`,
      icon: <ExclamationCircleFilled />,
      okText: "Xác nhận",
      okType: nextStatus === "IN_ACTIVE" ? "danger" : "primary",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const accountToUpdate = dataSource.find(acc => acc.id === accountId);
          if (!accountToUpdate) {
            message.error("Không tìm thấy thông tin tài khoản để cập nhật.");
            return;
          }
          // API PUT might require all fields, refer to your API docs for PUT /accounts/{id}
          const updatePayload = {
            email: accountToUpdate.email,
            firstName: accountToUpdate.firstName,
            lastName: accountToUpdate.lastName,
            phone: accountToUpdate.phone,
            address: accountToUpdate.address,
            avatar: accountToUpdate.avatar,
            roleName: accountToUpdate.roleName,
            gender: accountToUpdate.gender, // Send gender if your API expects it for PUT
            enumAccountStatus: nextStatus,
            // password field is usually not sent in status updates unless specifically required
          };

          await axios.put(
            `https://be-modernestate.onrender.com/api/v1/accounts/${accountId}`,
            updatePayload,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          message.success(`${actionText} tài khoản thành công!`);
          fetchCustomers();
        } catch (error) {
          console.error(`Lỗi khi ${actionText.toLowerCase()} tài khoản:`, error.response || error);
          message.error(`Không thể ${actionText.toLowerCase()} tài khoản. ${error.response?.data?.message || ''}`);
        }
      },
      okButtonProps:
        nextStatus === "IN_ACTIVE"
          ? {}
          : { style: { backgroundColor: primaryColor, borderColor: primaryColor } },
    });
  };

  const handleViewDetails = (account) => {
    setSelectedCustomer(account);
    setIsDetailModalVisible(true);
  };

  const showAddModal = () => {
    setEditingCustomer(null);
    // form.resetFields(); // destroyOnClose on Modal handles this
    setIsFormModalVisible(true);
  };

  const showEditModal = (account) => {
    setEditingCustomer(account);
    // useEffect handles form.setFieldsValue
    setIsFormModalVisible(true);
  };

  const handleFormCancel = () => {
    setIsFormModalVisible(false);
    // form.resetFields(); // destroyOnClose on Modal handles this
    setEditingCustomer(null); // Clear editing state
  };

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const nameParts = values.name?.split(" ") || [""];
      const lastName = nameParts.pop() || "";
      const firstName = nameParts.join(" ");

      // Common payload fields from the form
      const basePayload = {
        email: values.email, // Will come from form values, even if disabled
        firstName: firstName,
        lastName: lastName,
        phone: values.phone,
        address: values.address || "",
        avatar: values.avatar || "",
        gender: values.gender, // 'gender' field from form
      };

      if (editingCustomer) {
        const updatePayload = {
          ...basePayload,
          roleName: editingCustomer.roleName, // Role is usually not editable in this form or is handled by admin
          enumAccountStatus: editingCustomer.status === "ACTIVE" ? "ACTIVE" : "WAIT_CONFIRM",
        };

        await axios.put(
          `https://be-modernestate.onrender.com/api/v1/accounts/${editingCustomer.id}`,
          updatePayload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        message.success("Cập nhật thông tin tài khoản thành công!");
      } else {
        const createPayload = {
          ...basePayload,
          password: values.password,
          roleName: values.role, 
          enumAccountStatus: "ACTIVE", 
        };

        await axios.post(
          "https://be-modernestate.onrender.com/api/v1/accounts",
          createPayload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        message.success("Thêm tài khoản mới thành công!");
      }
      setIsFormModalVisible(false);
      // form.resetFields(); // destroyOnClose on Modal handles this
      setEditingCustomer(null); // Clear editing state
      fetchCustomers();
    } catch (error) {
      console.error("Lỗi khi gửi form:", error.response || error);
      message.error(
        `Đã có lỗi xảy ra: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "STT", key: "stt", width: 60, align: "center", render: (text, record, index) => index + 1 },
    { title: "Tên", dataIndex: "name", key: "name", sorter: (a, b) => a.name.localeCompare(b.name), render: (name) => <Text style={{ color: primaryColor, fontWeight: "500" }}>{name}</Text> },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    {
      title: "Vai trò", dataIndex: "roleName", key: "roleName", align: "center",
      filters: [
        { text: "Khách hàng", value: "ROLE_CUSTOMER" }, { text: "Nhân viên", value: "ROLE_STAFF" },
        { text: "Chủ sở hữu", value: "ROLE_OWNER" }, { text: "Môi giới", value: "ROLE_BROKER" },
        { text: "Quản trị viên", value: "ROLE_ADMIN" },
      ],
      onFilter: (value, record) => record.roleName.indexOf(value) === 0,
      render: (roleName) => {
        let color = "default", text = roleName || "Không rõ";
        switch (roleName) {
          case "ROLE_CUSTOMER": color = "blue"; text = "Khách hàng"; break;
          case "ROLE_STAFF": color = "orange"; text = "Nhân viên"; break;
          case "ROLE_OWNER": color = "purple"; text = "Chủ sở hữu"; break;
          case "ROLE_BROKER": color = "geekblue"; text = "Môi giới"; break;
          case "ROLE_ADMIN": color = "red"; text = "Quản trị viên"; break;
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Trạng thái", dataIndex: "status", key: "status", align: "center",
      filters: [
        { text: "Đang hoạt động", value: "ACTIVE" },
        { text: "Chờ kích hoạt", value: "WAIT_CONFIRM" },
        { text: "Bị chặn", value: "IN_ACTIVE" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        const s = STATUS_MAP[status] || { color: "default", text: status };
        return <Tag color={s.color}>{s.text}</Tag>;
      },
    },
    {
      title: "Hành động", key: "action", align: "center", width: 150,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết"><Button type="text" icon={<EyeOutlined style={{ color: primaryColor }} />} onClick={() => handleViewDetails(record)} /></Tooltip>
          <Tooltip title="Chỉnh sửa"><Button type="text" icon={<EditOutlined style={{ color: "#faad14" }} />} onClick={() => showEditModal(record)} /></Tooltip>
          {record.status === "ACTIVE" ? (
            <Tooltip title="Chặn"><Button type="text" icon={<StopOutlined />} danger onClick={() => handleToggleBlockStatus(record.id, record.status)} /></Tooltip>
          ) : (
            <Tooltip title="Bỏ chặn"><Button type="text" icon={<CheckCircleOutlined style={{ color: "green" }} />} onClick={() => handleToggleBlockStatus(record.id, record.status)} /></Tooltip>
          )}
        </Space>
      ),
    },
  ];

  const handleSearchInputChange = (e) => setSearchText(e.target.value);

  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
      <Title level={3} style={{ marginBottom: "20px", color: primaryColor }}>Quản lý Tài khoản người dùng</Title>
      <Row justify="space-between" align="middle" style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={12} md={10} lg={8} xl={6}>
          <Input placeholder="Tìm kiếm tài khoản..." prefix={<SearchOutlined style={{ color: "rgba(0,0,0,.25)" }} />} value={searchText} onChange={handleSearchInputChange} allowClear style={{ width: "100%" }} />
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: primaryColor, borderColor: primaryColor }} onClick={showAddModal}>Thêm Tài khoản</Button>
        </Col>
      </Row>

      <Table columns={columns} dataSource={filteredDataSource} rowKey="id" bordered loading={loading} scroll={{ x: "max-content" }} style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }} />

      <Modal title={<span style={{ color: primaryColor, fontWeight: "bold" }}>Thông tin chi tiết Tài khoản</span>} open={isDetailModalVisible} onCancel={() => setIsDetailModalVisible(false)} footer={[<Button key="close" onClick={() => setIsDetailModalVisible(false)} style={{ borderColor: primaryColor, color: primaryColor }}>Đóng</Button>,]} width={600}>
        {selectedCustomer && (
          <Space direction="vertical" style={{ width: "100%" }}>
            <p><strong>ID:</strong> {selectedCustomer.id}</p>
            <p><strong>Tên:</strong> {selectedCustomer.name}</p>
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
            <p><strong>Số điện thoại:</strong> {selectedCustomer.phone}</p>
            <p><strong>Địa chỉ:</strong> {selectedCustomer.address || "N/A"}</p>
            <p><strong>Avatar:</strong> {selectedCustomer.avatar ? <a href={selectedCustomer.avatar} target="_blank" rel="noopener noreferrer">Xem ảnh</a> : "N/A"}</p>
            <p><strong>Giới tính:</strong> {selectedCustomer.gender || "N/A"}</p>
            <p><strong>Vai trò:</strong> {(() => { let text = selectedCustomer.roleName || "Không rõ", color = "default"; switch (selectedCustomer.roleName) { case "ROLE_CUSTOMER": text = "Khách hàng"; color = "blue"; break; case "ROLE_STAFF": text = "Nhân viên"; color = "orange"; break; case "ROLE_OWNER": text = "Chủ sở hữu"; color = "purple"; break; case "ROLE_BROKER": text = "Môi giới"; color = "geekblue"; break; case "ROLE_ADMIN": text = "Quản trị viên"; color = "red"; break; } return <Tag color={color}>{text}</Tag>; })()}</p>
            <p><strong>Trạng thái:</strong> {(() => { const s = STATUS_MAP[selectedCustomer.status]; return <Tag color={s?.color}>{s?.text || selectedCustomer.status}</Tag>; })()}</p>
          </Space>
        )}
      </Modal>

      <Modal
        title={<span style={{ color: primaryColor, fontWeight: "bold" }}>{editingCustomer ? "Chỉnh sửa thông tin Tài khoản" : "Thêm mới Tài khoản"}</span>}
        open={isFormModalVisible}
        onCancel={handleFormCancel}
        footer={null}
        width={700}
        destroyOnClose // This will reset form state when modal is closed
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit} initialValues={{ address: "", avatar: "" /* Set default for non-required fields */}}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Tên" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}>
                <Input placeholder="Nhập họ và tên (Ví dụ: Nguyễn Văn A)" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  // Conditionally required: only for new users on the frontend.
                  // Backend should always validate email.
                  { required: !editingCustomer, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input placeholder="Nhập email" disabled={!!editingCustomer} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }, { pattern: /^[0-9]{10,11}$/, message: "Số điện thoại không hợp lệ!" }]}>
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
            <Col span={12}>
              {!editingCustomer && (
                <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
                  <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>
              )}
              {editingCustomer && (
                <Form.Item label="Vai trò">
                  <Input value={
                      editingCustomer.roleName === "ROLE_CUSTOMER" ? "Khách hàng" :
                      editingCustomer.roleName === "ROLE_STAFF" ? "Nhân viên" :
                      editingCustomer.roleName === "ROLE_OWNER" ? "Chủ sở hữu" :
                      editingCustomer.roleName === "ROLE_BROKER" ? "Môi giới" :
                      editingCustomer.roleName === "ROLE_ADMIN" ? "Quản trị viên" : (editingCustomer.roleName || "Không rõ")
                    } disabled />
                </Form.Item>
              )}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="address" label="Địa chỉ">
                <Input placeholder="Nhập địa chỉ" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="avatar" label="URL Avatar">
                <Input placeholder="Nhập URL avatar (ảnh đại diện)" />
              </Form.Item>
            </Col>
          </Row>
          
          {/* Gender field - available for both add and edit if desired */}
          {/* If gender is not editable, only show for !editingCustomer or prefill and disable for editingCustomer */}
          <Row gutter={16}>
            <Col span={12}>
                <Form.Item
                    name="gender"
                    label="Giới tính"
                    rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
                >
                    <Select placeholder="Chọn giới tính">
                        <Option value="MALE">Nam</Option>
                        <Option value="FEMALE">Nữ</Option>
                        <Option value="OTHER">Khác</Option>
                    </Select>
                </Form.Item>
            </Col>
            {!editingCustomer && (
                 <Col span={12}>
                    <Form.Item name="role" label="Vai trò tài khoản" rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}>
                        <Select placeholder="Chọn vai trò cho tài khoản mới">
                        <Option value="ROLE_CUSTOMER">Khách hàng</Option>
                        <Option value="ROLE_STAFF">Nhân viên</Option>
                        {/* <Option value="ROLE_OWNER">Chủ sở hữu</Option>
                        <Option value="ROLE_BROKER">Môi giới</Option> */}
                        <Option value="ROLE_ADMIN">Quản trị viên</Option>
                        </Select>
                    </Form.Item>
                </Col>
            )}
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="status" label="Trạng thái">
                <Select placeholder="Chọn trạng thái">
                  <Option value="ACTIVE">Đang hoạt động</Option>
                  <Option value="WAIT_CONFIRM">Chờ kích hoạt</Option>
                  <Option value="IN_ACTIVE">Bị chặn</Option>
                </Select>
              </Form.Item>
              </Col>
          </Row>


          <Row justify="end" style={{ marginTop: 20 }}>
            <Space>
              <Button icon={<CloseCircleOutlined />} onClick={handleFormCancel}>Hủy</Button>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading} style={{ backgroundColor: primaryColor, borderColor: primaryColor }}>
                {editingCustomer ? "Lưu thay đổi" : "Thêm mới"}
              </Button>
            </Space>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;