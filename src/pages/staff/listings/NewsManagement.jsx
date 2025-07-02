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
import { getNewsList, addNews, updateNews, deleteNews } from '../../../apis/newsApi';

const { Title, Text } = Typography;
const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;

const primaryColor = '#4a90e2';

const newsCategories = {
  'DỰ_ÁN': 'Dự án',
  'LOẠI_DỰ_ÁN': 'Loại dự án',
  'LOẠI_TÀI_SẢN': 'Loại tài sản',
  'THỊ_TRƯỜNG': 'Thị trường',
};

const newsStatuses = {
  'DRAFT': 'Bản nháp',
  'PUBLISHED': 'Đã xuất bản',
  'ARCHIVED': 'Lưu trữ',
};

const NewsManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  const [form] = Form.useForm();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const [fileList, setFileList] = useState([]);

  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  const [imageUrlInput, setImageUrlInput] = useState('');
  const [imageUploadList, setImageUploadList] = useState([]);

  const [categories, setCategories] = useState([]);

  const filteredDataSource = dataSource.filter(
    (news) =>
      news.title.toLowerCase().includes(searchText.toLowerCase()) ||
      news.id.toLowerCase().includes(searchText.toLowerCase()) ||
      news.author.toLowerCase().includes(searchText.toLowerCase()) ||
      news.category.toLowerCase().includes(searchText.toLowerCase()) ||
      (news.tags && news.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase())))
  );

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNewsList();
        let list = [];
        if (Array.isArray(data)) {
          list = data;
        } else if (Array.isArray(data?.data?.rowDatas)) {
          list = data.data.rowDatas;
        }
        list = list.map(news => ({
          ...news,
          tags: Array.isArray(news.tags)
            ? news.tags.map(tag => typeof tag === 'string' ? tag : tag.tagName)
            : [],
          author: news.account ? `${news.account.firstName} ${news.account.lastName}` : '',
          category: typeof news.category === 'object' && news.category !== null
            ? (news.category.code || news.category.categoryName || '')
            : (news.category || ''),
          status: news.statusNew || '',
          publicationDate: news.publishDate,
        }));
        setDataSource(list);
      } catch (err) {
        message.error('Không thể tải danh sách tin tức.');
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    if (isFormModalVisible) {
      if (editingNews) {
        form.setFieldsValue({
          ...editingNews,
          publicationDate: editingNews.publicationDate ? moment(editingNews.publicationDate) : null,
          tagNames: editingNews.tagNames ? editingNews.tagNames.join(', ') : '',
        });
        setImageUrlInput(editingNews.imageUrl || '');
        setImageUploadList(editingNews.imageUrl ? [{
          uid: '-1',
          name: 'Ảnh hiện tại',
          status: 'done',
          url: editingNews.imageUrl,
        }] : []);
      } else {
        form.resetFields();
        setImageUrlInput('');
        setImageUploadList([]);
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

  const handleImageUploadChange = ({ fileList }) => {
    setImageUploadList(fileList);
  };

  const handleImageUrlInputChange = (e) => {
    setImageUrlInput(e.target.value);
  };

  const handleFormSubmit = async (values) => {
    let finalImageUrl = '';
    if (
      imageUploadList.length > 0 &&
      imageUploadList[0].url &&
      typeof imageUploadList[0].url === 'string' &&
      !imageUploadList[0].url.startsWith('data:')
    ) {
      finalImageUrl = imageUploadList[0].url;
    } else if (imageUrlInput && typeof imageUrlInput === 'string' && imageUrlInput.trim() !== '') {
      finalImageUrl = imageUrlInput;
    } else {
      finalImageUrl = 'https://firebasestorage.googleapis.com/v0/b/fir-app-2f0da.appspot.com/o/avatars%2Fimages%2F2aca88009a83e2d5a5457f02f31c74b1a93f3440.jpg?alt=media&token=202bb0c6-c348-40d3-aec6-00b8cb54548e';
    }
    const processedValues = {
      title: values.title,
      slug: values.slug || '',
      content: values.content,
      imageUrl: finalImageUrl,
      categoryId: values.categoryId,
      tagNames: typeof values.tagNames === 'string'
        ? values.tagNames.split(',').map(tag => tag.trim()).filter(Boolean)
        : Array.isArray(values.tagNames) ? values.tagNames : [],
      statusNew: values.statusNew,
    };

    console.log('Submit data:', processedValues);

    try {
      if (editingNews) {
        await updateNews(editingNews.id, processedValues);
        message.success('Cập nhật bài viết thành công!');
      } else {
        await addNews(processedValues);
        message.success('Thêm bài viết mới thành công!');
      }
      // Sau khi thêm/sửa, reload lại danh sách
      const data = await getNewsList();
      let list = [];
      if (Array.isArray(data)) {
        list = data;
      } else if (Array.isArray(data?.data?.rowDatas)) {
        list = data.data.rowDatas;
      }
      setDataSource(list);
    } catch (err) {
      if (err.response) {
        console.log('API error:', err.response.data);
      }
      message.error('Có lỗi xảy ra khi lưu bài viết!');
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
      async onOk() {
        try {
          await deleteNews(newsId);
          message.success(`Xóa bài viết "${newsTitle}" thành công!`);
          // Sau khi xóa, reload lại danh sách
          const data = await getNewsList();
          let list = [];
          if (Array.isArray(data)) {
            list = data;
          } else if (Array.isArray(data?.data?.rowDatas)) {
            list = data.data.rowDatas;
          }
          setDataSource(list);
        } catch (err) {
          message.error('Có lỗi xảy ra khi xóa bài viết!');
        }
      },
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'DRAFT': return 'orange';
      case 'PUBLISHED': return 'green';
      case 'ARCHIVED': return 'red';
      default: return 'default';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'DỰ_ÁN': return 'purple';
      case 'LOẠI_DỰ_ÁN': return 'cyan';
      case 'LOẠI_TÀI_SẢN': return 'geekblue';
      case 'THỊ_TRƯỜNG': return 'volcano';
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
            <Tag key={tag} size="small" style={{marginBottom: 2}}>{typeof tag === 'string' ? tag : tag.tagName}</Tag>
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

  useEffect(() => {
    const token = localStorage.getItem('token'); // Đổi tên key nếu bạn lưu token bằng tên khác
    fetch('https://bemodernestate.site/api/v1/categories', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log('Categories from API:', data);
        setCategories(data.rowDatas || []);
      })
      .catch(err => {
        console.error('Fetch categories error:', err);
        setCategories([]);
      });
  }, []);

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

          <Form.Item 
            name="slug" 
            label="Slug (không bắt buộc)"
          >
            <Input placeholder="slug-bai-viet"/>
          </Form.Item>

          <Form.Item 
            name="categoryId" 
            label="Danh mục" 
            rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
          >
            <Select placeholder="Chọn danh mục">
              {categories.map(cat => (
                <Option key={cat.id} value={cat.id}>{cat.categoryName}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item 
            name="statusNew" 
            label="Trạng thái" 
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select>
              <Option value="DRAFT">Bản nháp</Option>
              <Option value="PUBLISHED">Đã xuất bản</Option>
              <Option value="ARCHIVED">Lưu trữ</Option>
            </Select>
          </Form.Item>

          <Form.Item 
            name="content" 
            label="Nội dung bài viết" 
            rules={[{ required: true, message: 'Vui lòng nhập nội dung bài viết!' }]}
          >
            <TextArea rows={8} placeholder="Nhập nội dung chi tiết của bài viết..."/>
          </Form.Item>

          <Form.Item 
            name="tagNames" 
            label="Tags (phân cách bằng dấu phẩy)" 
            rules={[{ required: true, message: 'Vui lòng nhập ít nhất một tag!' }]}
          >
            <Input placeholder="VD: căn hộ, TP.HCM, bất động sản, xu hướng"/>
          </Form.Item>

          <Form.Item
            label="Ảnh đại diện (URL hoặc upload)"
            required={false}
          >
            <Input
              placeholder="Dán URL ảnh..."
              value={imageUrlInput}
              onChange={handleImageUrlInputChange}
              style={{ marginBottom: 8 }}
            />
            <Upload
              listType="picture-card"
              fileList={imageUploadList}
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
                return false; // Không upload tự động
              }}
              onChange={handleImageUploadChange}
              onPreview={handlePreview}
              maxCount={1}
            >
              {imageUploadList.length >= 1 ? null : (
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
                <strong><EyeOutlined /> Lượt xem:</strong> {selectedNews.views ? Number(selectedNews.views).toLocaleString() : '0'}
              </Col>
              <Col xs={24} sm={12}>
                <strong><TagsOutlined /> Tags:</strong>
                <div style={{marginTop: 4}}>
                  {selectedNews.tags.map(tag => (
                    <Tag key={tag} style={{marginBottom: 4}}>{typeof tag === 'string' ? tag : tag.tagName}</Tag>
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