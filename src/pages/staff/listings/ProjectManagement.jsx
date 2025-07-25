import React, { useState, useEffect } from 'react';
import {
  Table, Button, Input, Space, Tag, Typography, Modal, Tooltip, Row, Col, Form, message, Select,
  InputNumber, DatePicker, Upload, Image
} from "antd";
import {
  PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, ExclamationCircleFilled,
  SaveOutlined, CloseCircleOutlined, BuildOutlined, CalendarOutlined,
  DollarCircleOutlined, UserOutlined, EnvironmentOutlined, UploadOutlined,
  PictureOutlined, EyeOutlined, FileTextOutlined

} from "@ant-design/icons";
import moment from 'moment';
import { getProjects, createProject, updateProject, deleteProject, transformProjectsList } from '../../../apis/projectApi';

const { Title, Text } = Typography;
const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;


const primaryColor = '#4a90e2';

const projectTypes = [
  'Nhà_Đất',
  'Chung_Cư',
  'Đất_Nền',
  'Nhà_Ở',
  'Nhà_Mặt_Phố',
  'Nhà_Tập_Thể',
  'Nhà_Villa',
  'Nhà_Biệt_Thự',
  'Nhà_Cấp_4',
  'Nhà_Cấp_3',
  'Nhà_Cấp_2',
  'Nhà_Cấp_1',
  'Nhà_Cấp_0',
];

const projectStatuses = [
  'Đang_Bàn_Giao',
  'Đang_Giao_Dịch',
  'Đang_Xây_Dựng',
  'Đang_Mở_Bán',
  'Hoàn_Tất_Giấy_Phép',
  'Sắp_Mở_Bán',
];

const ProjectManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [form] = Form.useForm();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const [fileList, setFileList] = useState([]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await getProjects();
      const projects = response.data?.rowDatas || [];
      const transformedProjects = transformProjectsList(projects);
      setDataSource(transformedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      message.error('Không thể tải danh sách dự án');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredDataSource = dataSource.filter(
    (project) =>
      project.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      project.id?.toLowerCase().includes(searchText.toLowerCase()) ||
      project.location?.toLowerCase().includes(searchText.toLowerCase()) ||
      project.projectManager?.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    if (isFormModalVisible) {
      if (editingProject) {
        form.setFieldsValue({
          ...editingProject,
          startDate: editingProject.startDate ? moment(editingProject.startDate) : null,
          expectedCompletion: editingProject.expectedCompletion ? moment(editingProject.expectedCompletion) : null,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({ 
          status: 'Sắp_Mở_Bán',
          typeProject: 'Chung_Cư',
          budget: 0,
        });
      }
    }
  }, [editingProject, form, isFormModalVisible]);
  
  const showAddModal = () => {
    setEditingProject(null);
    setFileList([]);
    setIsFormModalVisible(true);
  };

  const showEditModal = (project) => {
    setEditingProject(project);
    setFileList(project.images || []);
    setIsFormModalVisible(true);
  };

  const handleFormCancel = () => {
    setIsFormModalVisible(false);
    setEditingProject(null);
    setFileList([]);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.thumbUrl || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url || file.thumbUrl || 'Xem trước ảnh');
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleCancel = () => setPreviewVisible(false);

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleFormSubmit = async (values) => {
    try {
      const apiData = {
        title: values.title || '',
        typeProject: values.typeProject || '',
        totalBlock: values.totalBlock ?? 0,
        blockName: values.blockName ? values.blockName.split(',').map(s => s.trim()).filter(Boolean) : [],
        totalFloor: values.totalFloor ?? 0,
        projectArea: values.projectArea ?? 0,
        attribute: values.attribute ? values.attribute.split(',').map(s => s.trim()).filter(Boolean) : [],
        timeStart: values.startDate ? values.startDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]') : new Date().toISOString(),
        priceMin: values.priceMin ?? 0,
        priceMax: values.priceMax ?? 0,
        unitArea: values.unitArea || 'm2',
        unitCurrency: values.unitCurrency || 'VND',
        description: values.description || '',
        totalInvestment: values.budget ?? 0,
        status: values.status || '',
        addressRequest: {
          houseNumber: values.addressRequest?.houseNumber || '',
          street: values.addressRequest?.street || '',
          ward: values.addressRequest?.ward || '',
          district: values.addressRequest?.district || '',
          city: values.addressRequest?.city || '',
          country: values.addressRequest?.country || '',
          addressDetail: values.addressRequest?.addressDetail || ''
        },
        invetorRequest: {
          name: values.invetorRequest?.name || '',
          companyName: values.invetorRequest?.companyName || '',
          taxCode: values.invetorRequest?.taxCode || '',
          phoneNumber: values.invetorRequest?.phoneNumber || '',
          email: values.invetorRequest?.email || '',
          avatar: values.invetorRequest?.avatar || '',
          invetorType: values.invetorRequest?.invetorType || 'INDIVIDUAL',
        },
        imageRequests: fileList.length > 0 ? fileList.map(file => ({ imageUrl: file.url || file.thumbUrl || '' })) : [{ imageUrl: 'https://via.placeholder.com/300x200.png?text=No+Image' }]
      };
      console.log('Dữ liệu gửi lên API:', apiData);
      console.log('Status gửi lên API:', apiData.status);
      await createProject(apiData);
      message.success('Thêm dự án mới thành công!');
      await fetchProjects();
      setIsFormModalVisible(false);
      setEditingProject(null);
      setFileList([]);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        message.error('API: ' + error.response.data.message);
      } else {
        message.error('Có lỗi xảy ra khi lưu dự án');
      }
      console.error('Error saving project:', error);
    }
  };

  const handleDeleteProject = (projectId, projectName) => {
    confirm({
      title: `Bạn có chắc muốn xóa dự án "${projectName}"?`,
      icon: <ExclamationCircleFilled />,
      content: 'Hành động này không thể hoàn tác. Tất cả dữ liệu dự án sẽ bị xóa vĩnh viễn.',
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      async onOk() {
        try {
          await deleteProject(projectId);
          message.success(`Xóa dự án "${projectName}" thành công!`);
          await fetchProjects(); // Refresh the list
        } catch (error) {
          console.error('Error deleting project:', error);
          message.error('Có lỗi xảy ra khi xóa dự án');
        }
      },
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Sắp Mở Bán': return 'orange';
      case 'Đang Mở Bán': return 'blue';
      case 'Đang Xây Dựng': return 'processing';
      case 'Hoàn Thành': return 'green';
      default: return 'default';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Chung Cư': return 'cyan';
      case 'Nhà Biệt Thự': return 'purple';
      case 'Nhà Ở': return 'geekblue';
      case 'Nhà Villa': return 'volcano';
      default: return 'default';
    }
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsDetailModalVisible(true);
  };

  const handleDetailModalCancel = () => {
    setIsDetailModalVisible(false);
    setSelectedProject(null);
  };

  const columns = [
    { 
      title: "Mã Dự án", 
      dataIndex: "code", 
      key: "code", 
      width: 220, 
      sorter: (a,b) => a.code?.localeCompare(b.code), 
      render: (code) => <Text strong style={{color: primaryColor, whiteSpace: 'nowrap', overflow: 'visible'}}>{code}</Text>, 
      fixed: 'left',
    },
    { 
      title: "Tên Dự án", 
      dataIndex: "name", 
      key: "name", 
      width: 250, 
      sorter: (a,b) => a.name?.localeCompare(b.name),
      fixed: 'left',
    },
    {
      title: <Space><EnvironmentOutlined />Địa điểm</Space>, 
      dataIndex: "location", 
      key: "location", 
      width: 200,
      ellipsis: true
    },
    {
      title: "Loại hình", 
      dataIndex: "type", 
      key: "type", 
      width: 120,
      filters: Object.entries(projectTypes).map(([value, text]) => ({text, value})),
      onFilter: (value, record) => record.type === value,
      render: type => <Tag color={getTypeColor(type)}>{type.replace(/_/g, ' ')}</Tag>
    },
    {
      title: "Trạng thái", 
      dataIndex: "status", 
      key: "status", 
      width: 130, 
      align: 'center',
      filters: Object.entries(projectStatuses).map(([value, text]) => ({text, value})),
      onFilter: (value, record) => record.status === value,
      render: status => <Tag color={getStatusColor(status)}>{status.replace(/_/g, ' ')}</Tag>
    },
    { 
      title: <Space><DollarCircleOutlined />Ngân sách</Space>, 
      dataIndex: "budget", 
      key: "budget", 
      width: 150, 
      align: 'right',
      render: budget => `${Number(budget).toLocaleString()} VND`,
      sorter: (a,b) => a.budget - b.budget,
    },
    { 
      title: <Space><CalendarOutlined />Ngày bắt đầu</Space>, 
      dataIndex: "startDate", 
      key: "startDate", 
      width: 120, 
      align: 'center',
      render: date => date ? moment(date).format('DD/MM/YYYY') : 'N/A',
      sorter: (a,b) => moment(a.startDate || 0).unix() - moment(b.startDate || 0).unix(),
    },
    { 
      title: <Space><UserOutlined />Quản lý</Space>, 
      dataIndex: "projectManager", 
      key: "projectManager", 
      width: 150,
      ellipsis: true
    },
    {
      title: "Hình ảnh",
      dataIndex: "images",
      key: "images",
      width: 100,
      render: (images) => {
        const imageUrl = images && images.length > 0 ? (images[0].imageUrl || images[0].url || images[0].thumbUrl) : null;
        return (
          <Space>
           {imageUrl ? (
             <img
               src={imageUrl}
               alt="Project thumbnail"
               style={{ width: 50, height: 50, objectFit: 'cover' }}
             />
            ) : (
              <PictureOutlined style={{ fontSize: 24, color: '#ccc' }} />
            )}
          </Space>
        );
      },
    },
    { 
      title: "Hành động", 
      key: "action", 
      align: "center", 
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button 
              type="text" 
              icon={<EyeOutlined style={{ color: '#1890ff' }}/>} 
              onClick={() => handleViewDetails(record)}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button 
              type="text" 
              icon={<EditOutlined style={{ color: '#faad14' }}/>} 
              onClick={() => showEditModal(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button 
              type="text" 
              icon={<DeleteOutlined />} 
              danger 
              onClick={() => handleDeleteProject(record.id, record.name)}
            />
          </Tooltip>
        </Space>
      ),
      fixed: 'right',
    },
  ];

  const handleSearchInputChange = (e) => setSearchText(e.target.value);
  const handleClearSearch = () => setSearchText("");

  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
      <Title level={3} style={{ marginBottom: "20px", color: primaryColor }}>
        <BuildOutlined /> Quản lý Dự án
      </Title>
      
      <Row justify="space-between" align="middle" style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={12} md={10} lg={8} xl={6}>
          <Input 
            placeholder="Tìm kiếm dự án, địa điểm, quản lý..." 
            prefix={<SearchOutlined />} 
            value={searchText} 
            onChange={handleSearchInputChange} 
            allowClear 
            onClear={handleClearSearch} 
            style={{ width: '100%' }} 
          />
        </Col>
        <Col>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            style={{ backgroundColor: primaryColor, borderColor: primaryColor }} 
            onClick={showAddModal}
          >
            Thêm Dự án
          </Button>
        </Col>
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
        sticky
      />
      
      <Modal
        title={
          <span style={{color: primaryColor, fontWeight: 'bold'}}>
            {editingProject ? <><EditOutlined /> Chỉnh sửa Dự án</> : <><PlusOutlined/> Thêm mới Dự án</>}
          </span>
        }
        visible={isFormModalVisible}
        onCancel={handleFormCancel}
        footer={null}
        width={800}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit} scrollToFirstError>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item 
                name="title" 
                label="Tên dự án" 
                rules={[{ required: true, message: 'Vui lòng nhập tên dự án!' }]}
              >
                <Input placeholder="VD: Khu dân cư Sunrise"/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item 
                name="status" 
                label="Trạng thái dự án" 
                rules={[{ required: true, message: 'Vui lòng chọn trạng thái dự án!' }]}
              >
                <Select placeholder="Chọn trạng thái dự án">
                  {projectStatuses.map(status => (
                    <Option key={status} value={status}>{status.replace(/_/g, ' ')}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name={['addressRequest', 'houseNumber']} label="Số nhà">
                <Input placeholder="VD: 123" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={['addressRequest', 'street']} label="Đường">
                <Input placeholder="VD: Nguyễn Huệ" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={['addressRequest', 'ward']} label="Phường/Xã">
                <Input placeholder="VD: Bến Nghé" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name={['addressRequest', 'district']} label="Quận/Huyện">
                <Input placeholder="VD: Quận 1" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={['addressRequest', 'city']} label="Thành phố">
                <Input placeholder="VD: Hồ Chí Minh" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={['addressRequest', 'country']} label="Quốc gia">
                <Input placeholder="VD: Việt Nam" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={['addressRequest', 'addressDetail']} label="Chi tiết địa chỉ">
                <Input placeholder="VD: Căn hộ 12A, Tòa nhà Landmark 81" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item 
            name="description" 
            label="Mô tả chi tiết dự án" 
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <TextArea rows={3} placeholder="Mô tả chi tiết về dự án, quy mô, tiện ích..."/>
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item 
                name="budget" 
                label="Ngân sách (VND)" 
                rules={[{ required: true, message: 'Vui lòng nhập ngân sách dự án!'}]}
              >
                <InputNumber 
                  style={{width: '100%'}} 
                  min={0} 
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
                  parser={value => value.replace(/\$\s?|(,*)/g, '')} 
                  placeholder="Nhập ngân sách bằng số"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item 
                name="projectManager" 
                label="Quản lý Dự án" 
                rules={[{ required: true, message: 'Vui lòng nhập tên quản lý dự án!' }]}
              >
                <Input placeholder="VD: Nguyễn Văn A"/>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item 
                name="startDate" 
                label="Ngày bắt đầu" 
                rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
              >
                <DatePicker style={{width: '100%'}} format="DD/MM/YYYY" placeholder="Chọn ngày bắt đầu"/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item 
                name="expectedCompletion" 
                label="Dự kiến hoàn thành" 
                rules={[{ required: true, message: 'Vui lòng chọn ngày hoàn thành dự kiến!' }]}
              >
                <DatePicker style={{width: '100%'}} format="DD/MM/YYYY" placeholder="Chọn ngày hoàn thành"/>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item 
                name="contactEmail" 
                label="Email Liên hệ" 
                rules={[{ type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}
              >
                <Input placeholder="VD: contact@company.com"/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item 
                name="contactPhone" 
                label="Số điện thoại Liên hệ" 
                rules={[]}
              >
                <Input placeholder="VD: 0901 234 567"/>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="typeProject" 
            label="Loại hình dự án" 
            rules={[{ required: true, message: 'Vui lòng chọn loại hình dự án!' }]}
          >
            <Select placeholder="Chọn loại hình dự án">
              {projectTypes.map(type => (
                <Option key={type} value={type}>{type.replace(/_/g, ' ')}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="images"
            label="Hình ảnh dự án"
            rules={[]}
          >
            <Upload
              listType="picture-card"
              multiple
              maxCount={5}
              fileList={fileList}
              beforeUpload={(file) => {
                const isImage = file.type.startsWith('image/');
                if (!isImage) {
                  message.error('Bạn chỉ có thể tải lên file hình ảnh!');
                  return Upload.LIST_IGNORE;
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                  message.error('Hình ảnh phải nhỏ hơn 2MB!');
                  return Upload.LIST_IGNORE;
                }
                // Allow the file to be added, Ant Design sẽ generate thumbUrl
                return true;
              }}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 5 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Tải lên</div>
                </div>
              )}
            </Upload>
            <Input
              placeholder="Hoặc dán URL ảnh vào đây"
              style={{ marginTop: 8 }}
              onPressEnter={e => {
                const url = e.target.value.trim();
                if (!url) return;
                if (!/^https?:\/\//.test(url)) {
                  message.error('URL không hợp lệ!');
                  return;
                }
                setFileList(prev => ([...prev, { uid: Date.now() + '', url, name: url, status: 'done' }]));
                e.target.value = '';
              }}
              onBlur={e => {
                const url = e.target.value.trim();
                if (!url) return;
                if (!/^https?:\/\//.test(url)) {
                  message.error('URL không hợp lệ!');
                  return;
                }
                setFileList(prev => ([...prev, { uid: Date.now() + '', url, name: url, status: 'done' }]));
                e.target.value = '';
              }}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item 
                name="totalBlock" 
                label="Tổng số Block" 
                rules={[{ required: true, message: 'Vui lòng nhập tổng số Block!' }]}
              >
                <InputNumber min={1} style={{width: '100%'}} placeholder="VD: 5" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item 
                name="totalFloor" 
                label="Tổng số tầng" 
                rules={[{ required: true, message: 'Vui lòng nhập tổng số tầng!' }]}
              >
                <InputNumber min={1} style={{width: '100%'}} placeholder="VD: 3" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item 
                name="projectArea" 
                label="Diện tích dự án (m2)" 
                rules={[{ required: true, message: 'Vui lòng nhập diện tích dự án!' }]}
              >
                <InputNumber min={1} style={{width: '100%'}} placeholder="VD: 15000" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item 
                name="unitArea" 
                label="Đơn vị diện tích" 
                rules={[{ required: true, message: 'Vui lòng nhập đơn vị diện tích!' }]}
              >
                <Input placeholder="VD: m2" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item 
                name="unitCurrency" 
                label="Đơn vị tiền tệ" 
                rules={[{ required: true, message: 'Vui lòng nhập đơn vị tiền tệ!' }]}
              >
                <Input placeholder="VD: VND" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item 
                name="priceMin" 
                label="Giá thấp nhất" 
                rules={[{ required: true, message: 'Vui lòng nhập giá thấp nhất!' }]}
              >
                <InputNumber min={0} style={{width: '100%'}} placeholder="VD: 15000000000" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item 
                name="priceMax" 
                label="Giá cao nhất" 
                rules={[{ required: true, message: 'Vui lòng nhập giá cao nhất!' }]}
              >
                <InputNumber min={0} style={{width: '100%'}} placeholder="VD: 35000000000" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item 
                name="blockName" 
                label="Tên các Block (cách nhau bởi dấu phẩy)" 
                rules={[{ required: true, message: 'Vui lòng nhập tên các Block!' }]}
              >
                <Input placeholder="VD: Block A, Block B, Block C" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item 
            name="attribute" 
            label="Thuộc tính dự án (cách nhau bởi dấu phẩy)" 
            rules={[{ required: true, message: 'Vui lòng nhập thuộc tính dự án!' }]}
          >
            <Input placeholder="VD: Biệt thự song lập, Biệt thự đơn lập, Shophouse" />
          </Form.Item>
          <Form.Item label="Thông tin Chủ đầu tư" style={{marginBottom: 0}}>
            <Row gutter={16}>
              <Col xs={24} sm={8}>
                <Form.Item name={["invetorRequest", "name"]} label="Tên chủ đầu tư" rules={[{ required: true, message: 'Nhập tên chủ đầu tư!' }]}>
                  <Input placeholder="VD: Nguyễn Văn A" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item name={["invetorRequest", "companyName"]} label="Tên công ty" rules={[{ required: true, message: 'Nhập tên công ty!' }]}>
                  <Input placeholder="VD: Tập đoàn Sunshine Group" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item name={["invetorRequest", "taxCode"]} label="Mã số thuế" rules={[{ required: true, message: 'Nhập mã số thuế!' }]}>
                  <Input placeholder="VD: 0108888888" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={8}>
                <Form.Item name={["invetorRequest", "phoneNumber"]} label="Số điện thoại" rules={[{ required: true, message: 'Nhập số điện thoại!' }]}>
                  <Input placeholder="VD: 0912345678" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item name={["invetorRequest", "email"]} label="Email" rules={[{ required: true, type: 'email', message: 'Nhập email hợp lệ!' }]}>
                  <Input placeholder="VD: nguyenvana@sunshinegroup.com.vn" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item name={["invetorRequest", "avatar"]} label="Avatar (URL)" rules={[]}> 
                  <Input placeholder="URL ảnh đại diện" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={8}>
                <Form.Item name={["invetorRequest", "invetorType"]} label="Loại chủ đầu tư" rules={[{ required: true, message: 'Chọn loại chủ đầu tư!' }]}> 
                  <Select placeholder="Chọn loại">
                    <Option value="INDIVIDUAL">Cá nhân</Option>
                    <Option value="COMPANY">Công ty</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Row justify="end" style={{marginTop: 24}}>
            <Space>
              <Button icon={<CloseCircleOutlined/>} onClick={handleFormCancel}>
                Hủy
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                icon={<SaveOutlined/>} 
                style={{backgroundColor: primaryColor, borderColor: primaryColor}}
              >
                {editingProject ? "Lưu thay đổi" : "Thêm mới"}
              </Button>
            </Space>
          </Row>
        </Form>
      </Modal>

      <Modal
        title={
          <span style={{color: primaryColor, fontWeight: 'bold'}}>
            <BuildOutlined /> Chi tiết dự án
          </span>
        }
        visible={isDetailModalVisible}
        onCancel={handleDetailModalCancel}
        footer={[
          <Button 
            key="close" 
            onClick={handleDetailModalCancel}
            style={{borderColor: primaryColor, color: primaryColor}}
          >
            Đóng
          </Button>
        ]}
        width={800}
      >
        {selectedProject && (
          <div style={{maxHeight: '70vh', overflowY: 'auto', paddingRight: '10px'}}>
            <Title level={4} style={{color: primaryColor}}>{selectedProject.name}</Title>
            
            <Row gutter={[16,8]}>
              <Col xs={24} sm={12}>
                <strong><EnvironmentOutlined /> Địa điểm:</strong> {selectedProject.location}
              </Col>
              <Col xs={24} sm={12}>
                <strong>Loại hình:</strong> <Tag color={getTypeColor(selectedProject.type)}>{selectedProject.type.replace(/_/g, ' ')}</Tag>
              </Col>
              <Col xs={24} sm={12}>
                <strong>Trạng thái:</strong> <Tag color={getStatusColor(selectedProject.status)}>{selectedProject.status.replace(/_/g, ' ')}</Tag>
              </Col>
              <Col xs={24} sm={12}>
                <strong><DollarCircleOutlined /> Ngân sách:</strong> {Number(selectedProject.budget).toLocaleString()} VND
              </Col>
              <Col xs={24} sm={12}>
                <strong><CalendarOutlined /> Ngày bắt đầu:</strong> {selectedProject.startDate ? moment(selectedProject.startDate).format('DD/MM/YYYY') : 'N/A'}
              </Col>
              <Col xs={24} sm={12}>
                <strong><CalendarOutlined /> Dự kiến hoàn thành:</strong> {selectedProject.expectedCompletion ? moment(selectedProject.expectedCompletion).format('DD/MM/YYYY') : 'N/A'}
              </Col>
              <Col xs={24} sm={12}>
                <strong><UserOutlined /> Quản lý dự án:</strong> {selectedProject.projectManager}
              </Col>
              <Col xs={24} sm={12}>
                <strong>Liên hệ:</strong> {selectedProject.contactPhone} - {selectedProject.contactEmail}
              </Col>
            </Row>

            <Title level={5} style={{marginTop: 15}}><FileTextOutlined /> Mô tả dự án</Title>
            <hr style={{margin: '16px 0'}}/>
            <div style={{whiteSpace: 'pre-line'}}>{selectedProject.description}</div>

            {selectedProject.images && selectedProject.images.length > 0 && (
              <>
                <Title level={5} style={{marginTop: 15}}><PictureOutlined /> Hình ảnh</Title>
                <hr style={{margin: '16px 0'}}/>
                <Row gutter={[16, 16]}>
                  {selectedProject.images.map((image, index) => (
                    <Col xs={24} sm={8} key={index}>
                      <img 
                        src={image.imageUrl || image.url} 
                        alt={`Project image ${index + 1}`}
                        style={{ 
                          width: '100%', 
                          height: '200px', 
                          objectFit: 'cover',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          setPreviewImage(image.imageUrl || image.url);
                          setPreviewTitle(`Hình ảnh ${index + 1}`);
                          setPreviewVisible(true);
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              </>
            )}

            <Row gutter={16} style={{marginTop: 16}}>
              <Col xs={24} sm={12}>
                <strong>Ngày tạo:</strong> {selectedProject.dateCreated ? moment(selectedProject.dateCreated).format('DD/MM/YYYY HH:mm') : 'N/A'}
              </Col>
              <Col xs={24} sm={12}>
                <strong>Ngày cập nhật:</strong> {selectedProject.dateUpdated ? moment(selectedProject.dateUpdated).format('DD/MM/YYYY HH:mm') : 'N/A'}
              </Col>
            </Row>
          </div>
        )}
      </Modal>

      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default ProjectManagement;