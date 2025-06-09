import React, { useState, useEffect } from 'react';
import {
  Table, Button, Input, Space, Tag, Typography, Modal, Tooltip, Row, Col, Form, message, Select,
  DatePicker, Upload, Image
} from "antd";
import {
  PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, ExclamationCircleFilled,
  SaveOutlined, CloseCircleOutlined, ReadOutlined, CalendarOutlined,
  UserOutlined, TagsOutlined, UploadOutlined, PictureOutlined, EyeOutlined, FileTextOutlined, TagOutlined
} from "@ant-design/icons";
import moment from 'moment';

const { Title, Text } = Typography;
const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;

const primaryColor = '#4a90e2';

// Dữ liệu mẫu từ NewsDetail.jsx mở rộng
const initialMockNews = [
  {
    id: 'NEWS001',
    title: 'Thị trường căn hộ TP.HCM Quý 2/2025: Nguồn cung mới và xu hướng giá',
    publicationDate: '2025-05-20',
    author: 'Ban biên tập RealHome',
    category: 'Phân tích thị trường',
    status: 'Đã xuất bản',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50JTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    content: `Quý 2 năm 2025 chứng kiến nhiều biến động đáng chú ý trên thị trường căn hộ TP.HCM. Theo báo cáo mới nhất từ Savills Việt Nam, nguồn cung căn hộ mới có sự cải thiện nhẹ so với quý trước, tập trung chủ yếu ở khu Đông và khu Nam thành phố.

Các dự án mới ra mắt chủ yếu thuộc phân khúc trung và cao cấp, đáp ứng nhu cầu ở thực của một bộ phận lớn người dân cũng như giới đầu tư. Phân khúc căn hộ bình dân vẫn khan hiếm, tạo ra áp lực không nhỏ lên giá nhà ở các khu vực ven trung tâm.

Ông Troy Griffiths, Phó Tổng Giám đốc Savills Việt Nam, nhận định: "Thị trường đang dần tìm thấy điểm cân bằng mới. Tuy nhiên, các yếu tố như chính sách tín dụng, lãi suất và tiến độ pháp lý dự án vẫn sẽ là những yếu tố then chốt ảnh hưởng đến sức mua trong các quý tới."`,
    tags: ['căn hộ', 'TP.HCM', 'bất động sản', 'nguồn cung', 'xu hướng giá'],
    views: 15420,
    dateCreated: '2025-05-18',
    dateUpdated: '2025-05-20',
    images: [
      {
        uid: '1',
        name: 'news-1.jpg',
        status: 'done',
        url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50JTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      }
    ]
  },
  {
    id: 'NEWS002',
    title: '5 Lưu ý vàng khi đầu tư bất động sản cho người mới bắt đầu',
    publicationDate: '2025-05-15',
    author: 'Chuyên gia John Doe',
    category: 'Kinh nghiệm đầu tư',
    status: 'Đã xuất bản',
    imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    content: `Đầu tư bất động sản là một trong những hình thức đầu tư phổ biến và hiệu quả nhất hiện nay. Tuy nhiên, với những người mới bắt đầu, việc tham gia thị trường này có thể gặp nhiều khó khăn và rủi ro nếu không có đủ kiến thức và kinh nghiệm.

Dưới đây là 5 lưu ý quan trọng mà bất kỳ nhà đầu tư bất động sản mới nào cũng cần nắm vững:

1. Nghiên cứu kỹ thị trường và vị trí
2. Kiểm tra pháp lý cẩn thận
3. Tính toán tài chính hợp lý
4. Đánh giá tiềm năng phát triển
5. Xây dựng mạng lưới quan hệ

Việc đầu tư bất động sản không chỉ đơn thuần là mua bán mà còn là một nghệ thuật đòi hỏi sự kiên nhẫn, tính toán và chiến lược dài hạn.`,
    tags: ['đầu tư', 'bất động sản', 'kinh nghiệm', 'người mới'],
    views: 8750,
    dateCreated: '2025-05-12',
    dateUpdated: '2025-05-15'
  },
  {
    id: 'NEWS003',
    title: 'Xu hướng thiết kế nội thất căn hộ hiện đại 2025',
    publicationDate: '2025-05-10',
    author: 'KTS Nguyễn Văn A',
    category: 'Thiết kế - Trang trí',
    status: 'Bản nháp',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    content: `Năm 2025 đánh dấu sự trở lại mạnh mẽ của các xu hướng thiết kế nội thất tối giản nhưng không kém phần tinh tế. Các nhà thiết kế hàng đầu đang hướng tới việc tạo ra những không gian sống hài hòa, thân thiện với môi trường và tối ưu hóa công năng sử dụng.`,
    tags: ['thiết kế', 'nội thất', 'xu hướng 2025', 'căn hộ'],
    views: 6200,
    dateCreated: '2025-05-08',
    dateUpdated: '2025-05-10'
  }
];

const newsCategories = {
  'Phân tích thị trường': 'Phân tích thị trường',
  'Kinh nghiệm đầu tư': 'Kinh nghiệm đầu tư',
  'Thiết kế - Trang trí': 'Thiết kế - Trang trí',
  'Pháp lý BĐS': 'Pháp lý BĐS',
  'Tin tức dự án': 'Tin tức dự án'
};

const newsStatuses = {
  'Bản nháp': 'Bản nháp',
  'Đã xuất bản': 'Đã xuất bản',
  'Tạm ẩn': 'Tạm ẩn',
  'Chờ duyệt': 'Chờ duyệt'
};

const NewsManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState(initialMockNews);
  
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  const [form] = Form.useForm();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const [fileList, setFileList] = useState([]);

  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  const filteredDataSource = dataSource.filter(
    (news) =>
      news.title.toLowerCase().includes(searchText.toLowerCase()) ||
      news.id.toLowerCase().includes(searchText.toLowerCase()) ||
      news.author.toLowerCase().includes(searchText.toLowerCase()) ||
      news.category.toLowerCase().includes(searchText.toLowerCase()) ||
      (news.tags && news.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase())))
  );

  useEffect(() => {
    if (isFormModalVisible) {
      if (editingNews) {
        form.setFieldsValue({
          ...editingNews,
          publicationDate: editingNews.publicationDate ? moment(editingNews.publicationDate) : null,
          tags: editingNews.tags ? editingNews.tags.join(', ') : '',
        });
      } else {
        form.resetFields();
        form.setFieldsValue({ 
          status: 'Bản nháp',
          category: 'Phân tích thị trường',
          author: 'Ban biên tập RealHome',
          publicationDate: moment(),
        });
      }
    }
  }, [editingNews, form, isFormModalVisible]);
  
  const showAddModal = () => {
    setEditingNews(null);
    setFileList([]);
    setIsFormModalVisible(true);
  };

  const showEditModal = (news) => {
    setEditingNews(news);
    setFileList(news.images || []);
    setIsFormModalVisible(true);
  };

  const handleFormCancel = () => {
    setIsFormModalVisible(false);
    setEditingNews(null);
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

  const handleFormSubmit = (values) => {
    const processedValues = {
      ...values,
      publicationDate: values.publicationDate ? values.publicationDate.format('YYYY-MM-DD') : '',
      dateUpdated: moment().format('YYYY-MM-DD'),
      tags: values.tags ? values.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
      views: editingNews ? editingNews.views : 0,
      images: fileList.map(file => ({
        uid: file.uid,
        name: file.name,
        status: file.status || 'done',
        url: file.url || file.thumbUrl,
      })),
      imageUrl: fileList.length > 0 ? (fileList[0].url || fileList[0].thumbUrl) : '',
    };

    if (editingNews) {
      setDataSource(prevData => 
        prevData.map(news => 
          news.id === editingNews.id ? { ...news, ...processedValues } : news
        )
      );
      message.success("Cập nhật bài viết thành công!");
    } else {
      const newId = `NEWS${String(dataSource.length > 0 ? (parseInt(dataSource[dataSource.length-1].id.replace('NEWS','')) + 1) : 1).padStart(3,'0')}`;
      const newNews = {
        id: newId,
        ...processedValues,
        dateCreated: moment().format('YYYY-MM-DD'),
      };
      setDataSource(prevData => [...prevData, newNews]);
      message.success("Thêm bài viết mới thành công!");
    }
    setIsFormModalVisible(false);
    setEditingNews(null);
    setFileList([]);
  };

  const handleDeleteNews = (newsId, newsTitle) => {
    confirm({
      title: `Bạn có chắc muốn xóa bài viết "${newsTitle}"?`,
      icon: <ExclamationCircleFilled />,
      content: 'Hành động này không thể hoàn tác. Tất cả dữ liệu bài viết sẽ bị xóa vĩnh viễn.',
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        setDataSource(prevData => prevData.filter(n => n.id !== newsId));
        message.success(`Xóa bài viết "${newsTitle}" thành công!`);
      },
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Bản nháp': return 'orange';
      case 'Đã xuất bản': return 'green';
      case 'Tạm ẩn': return 'red';
      case 'Chờ duyệt': return 'blue';
      default: return 'default';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Phân tích thị trường': return 'purple';
      case 'Kinh nghiệm đầu tư': return 'cyan';
      case 'Thiết kế - Trang trí': return 'geekblue';
      case 'Pháp lý BĐS': return 'volcano';
      case 'Tin tức dự án': return 'magenta';
      default: return 'default';
    }
  };

  const columns = [
    { 
      title: "Mã Bài viết", 
      dataIndex: "id", 
      key: "id", 
      width: 120, 
      sorter: (a,b) => a.id.localeCompare(b.id), 
      render: (id) => <Text strong style={{color: primaryColor}}>{id}</Text>, 
      fixed: 'left',
    },
    { 
      title: "Tiêu đề", 
      dataIndex: "title", 
      key: "title", 
      width: 200, 
      sorter: (a,b) => a.title.localeCompare(b.title),
      fixed: 'left',
      render: (text) => (
        <Typography.Paragraph ellipsis={{ rows: 2, expandable: false, tooltip: text }} style={{marginBottom: 0}}>
          {text}
        </Typography.Paragraph>
      ),
    },
    {
      title: <Space><UserOutlined />Tác giả</Space>, 
      dataIndex: "author", 
      key: "author", 
      width: 150,
      ellipsis: true
    },
    {
      title: "Danh mục", 
      dataIndex: "category", 
      key: "category", 
      width: 150,
      filters: Object.entries(newsCategories).map(([value, text]) => ({text, value})),
      onFilter: (value, record) => record.category === value,
      render: category => <Tag color={getCategoryColor(category)}>{category}</Tag>
    },
    {
      title: "Trạng thái", 
      dataIndex: "status", 
      key: "status", 
      width: 120, 
      align: 'center',
      filters: Object.entries(newsStatuses).map(([value, text]) => ({text, value})),
      onFilter: (value, record) => record.status === value,
      render: status => <Tag color={getStatusColor(status)}>{status}</Tag>
    },
    { 
      title: <Space><CalendarOutlined />Ngày xuất bản</Space>, 
      dataIndex: "publicationDate", 
      key: "publicationDate", 
      width: 130, 
      align: 'center',
      render: date => date ? moment(date).format('DD/MM/YYYY') : '-',
      sorter: (a,b) => moment(a.publicationDate).unix() - moment(b.publicationDate).unix(),
    },
    { 
      title: <Space><EyeOutlined />Lượt xem</Space>, 
      dataIndex: "views", 
      key: "views", 
      width: 100, 
      align: 'right',
      render: views => views ? Number(views).toLocaleString() : '0',
      sorter: (a,b) => (a.views || 0) - (b.views || 0),
    },
    {
      title: <Space><TagsOutlined />Tags</Space>,
      dataIndex: "tags",
      key: "tags",
      width: 200,
      render: (tags) => (
        <div>
          {tags && tags.slice(0, 2).map(tag => (
            <Tag key={tag} size="small" style={{marginBottom: 2}}>{tag}</Tag>
          ))}
          {tags && tags.length > 2 && <Tag size="small">+{tags.length - 2}</Tag>}
        </div>
      ),
    },
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      width: 100,
      render: (imageUrl) => {
        return (
          <Space>
           {imageUrl ? (
             <img
               src={imageUrl}
               alt="News thumbnail"
               style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
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
              onClick={() => showDetailModal(record)}
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
              onClick={() => handleDeleteNews(record.id, record.title)}
            />
          </Tooltip>
        </Space>
      ),
      fixed: 'right',
    },
  ];

  const handleSearchInputChange = (e) => setSearchText(e.target.value);
  const handleClearSearch = () => setSearchText("");

  const showDetailModal = (news) => {
    setSelectedNews(news);
    setIsDetailModalVisible(true);
  };

  const handleDetailModalCancel = () => {
    setIsDetailModalVisible(false);
    setSelectedNews(null);
  };

  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
      <Title level={3} style={{ marginBottom: "20px", color: primaryColor }}>
        <ReadOutlined /> Quản lý Tin tức
      </Title>
      
      <Row justify="space-between" align="middle" style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={12} md={10} lg={8} xl={6}>
          <Input 
            placeholder="Tìm kiếm bài viết, tác giả, danh mục, tags..." 
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
            Thêm Bài viết
          </Button>
        </Col>
      </Row>

      <Table 
        columns={columns} 
        dataSource={filteredDataSource} 
        rowKey="id" 
        bordered 
        pagination={{ pageSize: 10, responsive: true }} 
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }} 
        scroll={{ x: 'max-content' }} 
        sticky
      />
      
      <Modal
        title={
          <span style={{color: primaryColor, fontWeight: 'bold'}}>
            {editingNews ? <><EditOutlined /> Chỉnh sửa Bài viết</> : <><PlusOutlined/> Thêm mới Bài viết</>}
          </span>
        }
        visible={isFormModalVisible}
        onCancel={handleFormCancel}
        footer={null}
        width={900}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit} scrollToFirstError>
          <Form.Item 
            name="title" 
            label="Tiêu đề bài viết" 
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề bài viết!' }]}
          >
            <Input placeholder="VD: Thị trường căn hộ TP.HCM Quý 2/2025"/>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
                name="author" 
                label="Tác giả" 
                rules={[{ required: true, message: 'Vui lòng nhập tên tác giả!' }]}
              >
                <Input placeholder="VD: Ban biên tập RealHome"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                name="category" 
                label="Danh mục" 
                rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
              >
                <Select>
                  {Object.entries(newsCategories).map(([key, text]) => 
                    <Option key={key} value={key}>{text}</Option>
                  )}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
                name="status" 
                label="Trạng thái" 
                rules={[{ required: true }]}
              >
                <Select>
                  {Object.entries(newsStatuses).map(([key, text]) => 
                    <Option key={key} value={key}>{text}</Option>
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                name="publicationDate" 
                label="Ngày xuất bản" 
                rules={[{ required: true, message: 'Vui lòng chọn ngày xuất bản!' }]}
              >
                <DatePicker style={{width: '100%'}} format="DD/MM/YYYY" placeholder="Chọn ngày xuất bản"/>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item 
            name="content" 
            label="Nội dung bài viết" 
            rules={[{ required: true, message: 'Vui lòng nhập nội dung bài viết!' }]}
          >
            <TextArea rows={8} placeholder="Nhập nội dung chi tiết của bài viết..."/>
          </Form.Item>

          <Form.Item 
            name="tags" 
            label="Tags (phân cách bằng dấu phẩy)" 
            rules={[{ required: true, message: 'Vui lòng nhập ít nhất một tag!' }]}
          >
            <Input placeholder="VD: căn hộ, TP.HCM, bất động sản, xu hướng"/>
          </Form.Item>

          <Form.Item
            name="images"
            label="Hình ảnh bài viết"
            rules={[{ required: true, message: 'Vui lòng tải lên ít nhất một hình ảnh!' }]}
          >
            <Upload
              listType="picture-card"
              multiple
              maxCount={3}
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
                return true;
              }}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 3 ? null : (
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
                {editingNews ? "Lưu thay đổi" : "Thêm mới"}
              </Button>
            </Space>
          </Row>
        </Form>
      </Modal>

      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>

      <Modal
        title={
          <span style={{color: primaryColor, fontWeight: 'bold'}}>
            <ReadOutlined /> Chi tiết bài viết
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
        {selectedNews && (
          <div style={{maxHeight: '70vh', overflowY: 'auto', paddingRight: '10px'}}>
            <Title level={4} style={{color: primaryColor}}>{selectedNews.title}</Title>
            
            <Row gutter={[16,8]}>
              <Col xs={24} sm={12}>
                <strong><UserOutlined /> Tác giả:</strong> {selectedNews.author}
              </Col>
              <Col xs={24} sm={12}>
                <strong><TagOutlined /> Danh mục:</strong> <Tag color={getCategoryColor(selectedNews.category)}>{selectedNews.category}</Tag>
              </Col>
              <Col xs={24} sm={12}>
                <strong><CalendarOutlined /> Ngày xuất bản:</strong> {moment(selectedNews.publicationDate).format('DD/MM/YYYY')}
              </Col>
              <Col xs={24} sm={12}>
                <strong><EyeOutlined /> Lượt xem:</strong> {selectedNews.views.toLocaleString()}
              </Col>
              <Col xs={24} sm={12}>
                <strong><TagsOutlined /> Tags:</strong>
                <div style={{marginTop: 4}}>
                  {selectedNews.tags.map(tag => (
                    <Tag key={tag} style={{marginBottom: 4}}>{tag}</Tag>
                  ))}
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <strong>Trạng thái:</strong> <Tag color={getStatusColor(selectedNews.status)}>{selectedNews.status}</Tag>
              </Col>
            </Row>

            <Title level={5} style={{marginTop: 15}}><FileTextOutlined /> Nội dung bài viết</Title>
            <hr style={{margin: '16px 0'}}/>
            <div style={{whiteSpace: 'pre-line'}}>{selectedNews.content}</div>

            {selectedNews.images && selectedNews.images.length > 0 && (
              <>
                <Title level={5} style={{marginTop: 15}}><PictureOutlined /> Hình ảnh</Title>
                <hr style={{margin: '16px 0'}}/>
                <Row gutter={[16, 16]}>
                  {selectedNews.images.map((image, index) => (
                    <Col xs={24} sm={8} key={index}>
                      <img 
                        src={image.url} 
                        alt={`News image ${index + 1}`}
                        style={{ 
                          width: '100%', 
                          height: '200px', 
                          objectFit: 'cover',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          setPreviewImage(image.url);
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
                <strong>Ngày tạo:</strong> {moment(selectedNews.dateCreated).format('DD/MM/YYYY HH:mm')}
              </Col>
              <Col xs={24} sm={12}>
                <strong>Ngày cập nhật:</strong> {moment(selectedNews.dateUpdated).format('DD/MM/YYYY HH:mm')}
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NewsManagement;