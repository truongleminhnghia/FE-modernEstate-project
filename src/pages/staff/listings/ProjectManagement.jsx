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

const projectTypes = {
  'Chung Cư': 'Chung Cư',
  'Nhà Biệt Thự': 'Nhà Biệt Thự',
  'Nhà Ở': 'Nhà Ở',
  'Nhà Villa': 'Nhà Villa'
};

const projectStatuses = {
  'Sắp Mở Bán': 'Sắp Mở Bán',
  'Đang Mở Bán': 'Đang Mở Bán',
  'Đang Xây Dựng': 'Đang Xây Dựng',
  'Hoàn Thành': 'Hoàn Thành'
};

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
          status: 'Sắp Mở Bán',
          type: 'Chung Cư',
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
      // Map dữ liệu sang format API
      const apiData = {
        title: values.name,
        typeProject: values.type.replace(/ /g, '_'),
        status: values.status.replace(/ /g, '_'),
        projectArea: Number(values.budget) || 0, // Giả sử budget là diện tích dự án
        unitArea: 'm2',
        priceMin: 1000000000, // Có thể lấy từ form nếu có
        priceMax: 2000000000, // Có thể lấy từ form nếu có
        unitCurrency: 'VND',
        description: values.description,
        totalInvestment: Number(values.budget) || 0,
        timeStart: values.startDate ? values.startDate.format('YYYY-MM-DD') : '',
        addressId: 'cf414908-1594-41bd-8c17-5ebf8a498412', // TODO: lấy từ form hoặc chọn
        invetorId: '08dda8dd-9bf4-4382-87dd-cd6c6a60b195', // TODO: lấy từ form hoặc chọn
        images: fileList.map(file => ({ imageUrl: file.url || file.thumbUrl })),
      };
      if (editingProject) {
        await updateProject(editingProject.id, apiData);
        message.success("Cập nhật dự án thành công!");
      } else {
        await createProject(apiData);
        message.success("Thêm dự án mới thành công!");
      }
      await fetchProjects();
      setIsFormModalVisible(false);
      setEditingProject(null);
      setFileList([]);
    } catch (error) {
      // Hiển thị lỗi chi tiết từ API nếu có
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
      width: 100, 
      sorter: (a,b) => a.code?.localeCompare(b.code), 
      render: (code) => <Text strong style={{color: primaryColor}}>{code}</Text>, 
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
      render: type => <Tag color={getTypeColor(type)}>{type}</Tag>
    },
    {
      title: "Trạng thái", 
      dataIndex: "status", 
      key: "status", 
      width: 130, 
      align: 'center',
      filters: Object.entries(projectStatuses).map(([value, text]) => ({text, value})),
      onFilter: (value, record) => record.status === value,
      render: status => <Tag color={getStatusColor(status)}>{status}</Tag>
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
                name="name" 
                label="Tên Dự án" 
                rules={[{ required: true, message: 'Vui lòng nhập tên dự án!' }]}
              >
                <Input placeholder="VD: Khu dân cư Sunrise"/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item 
                name="status" 
                label="Trạng thái" 
                rules={[{ required: true }]}
              >
                <Select>
                  {Object.entries(projectStatuses).map(([key, text]) => 
                    <Option key={key} value={key}>{text}</Option>
                  )}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={16}>
              <Form.Item 
                name="location" 
                label="Địa điểm" 
                rules={[{ required: true, message: 'Vui lòng nhập địa điểm!' }]}
              >
                <Input placeholder="VD: Quận 1, TP. Hồ Chí Minh"/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item 
                name="type" 
                label="Loại hình Dự án" 
                rules={[{ required: true, message: 'Vui lòng chọn loại hình dự án!' }]}
              >
                <Select>
                  {Object.entries(projectTypes).map(([key, text]) => 
                    <Option key={key} value={key}>{text}</Option>
                  )}
                </Select>
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
                rules={[
                  { required: true, message: 'Vui lòng nhập email liên hệ!' },
                  { type: 'email', message: 'Vui lòng nhập email hợp lệ!' }
                ]}
              >
                <Input placeholder="VD: contact@company.com"/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item 
                name="contactPhone" 
                label="Số điện thoại Liên hệ" 
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
              >
                <Input placeholder="VD: 0901 234 567"/>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="images"
            label="Hình ảnh dự án"
            rules={[{ required: true, message: 'Vui lòng tải lên ít nhất một hình ảnh!' }]}
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
                // Allow the file to be added, Ant Design will generate thumbUrl
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
                <strong>Loại hình:</strong> <Tag color={getTypeColor(selectedProject.type)}>{selectedProject.type}</Tag>
              </Col>
              <Col xs={24} sm={12}>
                <strong>Trạng thái:</strong> <Tag color={getStatusColor(selectedProject.status)}>{selectedProject.status}</Tag>
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