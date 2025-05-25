import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Typography,
  Space,
  Tag,
  message,
  Row,
  Col,
  DatePicker,
  Upload, // Thêm Upload
  Divider // Thêm Divider để phân tách các mục
} from 'antd';
import {
  ShopOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  TagsOutlined,
  InfoCircleOutlined,
  EnvironmentOutlined,
  IdcardOutlined,
  CalendarOutlined,
  UploadOutlined, // Icon cho Upload
  BankOutlined, // Icon cho Ngân hàng
  SolutionOutlined, // Icon cho Mã số thuế
  TeamOutlined, // Icon cho Công ty
  LinkOutlined, // Icon cho Liên kết
  LinkedinFilled,
  GlobalOutlined,
  UserOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;

// Hàm helper để xử lý fileList cho Upload component
const mapUrlToFileList = (url, uid = '-1', name = 'image.png') => {
  if (url) {
    return [{
      uid,
      name,
      status: 'done',
      url,
    }];
  }
  return [];
};

const BrokerRegistration = ({ userData, onUpdate }) => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // State cho file upload (để quản lý fileList)
  const [nationalIdFrontFileList, setNationalIdFrontFileList] = useState([]);
  const [nationalIdBackFileList, setNationalIdBackFileList] = useState([]);


  const prepareInitialValues = (data) => {
    const defaults = {
      isBroker: false,
      brokerLicense: '',
      experience: '',
      specialties: [],
      introduction: '',
      contactInfo: { address: '' },
      identityInfo: {
        nationalIdNumber: '',
        nationalIdIssueDate: null,
        nationalIdIssuePlace: '',
        nationalIdFrontImage: null, // Sẽ là URL hoặc File object
        nationalIdBackImage: null,  // Sẽ là URL hoặc File object
      },
      taxInfo: { personalTaxId: '' },
      bankingInfo: {
        accountHolderName: '',
        accountNumber: '',
        bankName: '',
        bankBranch: '',
      },
      companyInfo: { companyName: '' },
      socialLinks: { linkedIn: '', website: '' },
    };

    const mergedData = {
      ...defaults,
      ...data,
      contactInfo: { ...defaults.contactInfo, ...data?.contactInfo },
      identityInfo: { ...defaults.identityInfo, ...data?.identityInfo },
      taxInfo: { ...defaults.taxInfo, ...data?.taxInfo },
      bankingInfo: { ...defaults.bankingInfo, ...data?.bankingInfo },
      companyInfo: { ...defaults.companyInfo, ...data?.companyInfo },
      socialLinks: { ...defaults.socialLinks, ...data?.socialLinks },
      specialties: data?.specialties || [],
    };

    if (mergedData.identityInfo.nationalIdIssueDate && typeof mergedData.identityInfo.nationalIdIssueDate === 'string') {
      mergedData.identityInfo.nationalIdIssueDate = dayjs(mergedData.identityInfo.nationalIdIssueDate);
    }
    
    // Khởi tạo fileList cho Upload từ URL nếu có
    setNationalIdFrontFileList(mapUrlToFileList(mergedData.identityInfo.nationalIdFrontImageUrl, 'front'));
    setNationalIdBackFileList(mapUrlToFileList(mergedData.identityInfo.nationalIdBackImageUrl, 'back'));
    // Xóa URL image khỏi initial values của form, vì Upload component sẽ quản lý file/URL
    // mergedData.identityInfo.nationalIdFrontImageUrl = undefined; 
    // mergedData.identityInfo.nationalIdBackImageUrl = undefined;

    return mergedData;
  };


  useEffect(() => {
    if (userData) { // Luôn chuẩn bị initial values khi userData thay đổi
        const initialValues = prepareInitialValues(userData);
        if (!isEditing) { // Chỉ setFieldsValue nếu không ở chế độ edit để không ghi đè khi đang nhập liệu
            form.setFieldsValue(initialValues);
        }
    }
  }, [userData, form]); // Bỏ isEditing ra khỏi dependency để đảm bảo form được cập nhật khi userData thay đổi từ MyProfile


  const openEditForm = () => {
    const initialValues = prepareInitialValues(userData);
    if (!userData?.isBroker) {
      initialValues.isBroker = true;
    }
    form.setFieldsValue(initialValues);
    // Đảm bảo fileList cũng được cập nhật khi mở form
    setNationalIdFrontFileList(mapUrlToFileList(initialValues.identityInfo.nationalIdFrontImageUrl, 'front'));
    setNationalIdBackFileList(mapUrlToFileList(initialValues.identityInfo.nationalIdBackImageUrl, 'back'));
    setIsEditing(true);
  };

  const handleCancel = () => {
    const initialValues = prepareInitialValues(userData); // Lấy lại giá trị gốc
    form.setFieldsValue(initialValues);
    setNationalIdFrontFileList(mapUrlToFileList(initialValues.identityInfo.nationalIdFrontImageUrl, 'front'));
    setNationalIdBackFileList(mapUrlToFileList(initialValues.identityInfo.nationalIdBackImageUrl, 'back'));
    setIsEditing(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const dataToUpdate = { ...values };

    if (dataToUpdate.identityInfo?.nationalIdIssueDate) {
      dataToUpdate.identityInfo.nationalIdIssueDate = dayjs(dataToUpdate.identityInfo.nationalIdIssueDate).format('YYYY-MM-DD');
    }

    // Xử lý file upload: Nếu có file mới trong fileList, lấy file object, nếu không giữ URL cũ (nếu có)
    // nationalIdFrontFileList và nationalIdBackFileList chứa thông tin file hiện tại
    if (nationalIdFrontFileList.length > 0 && nationalIdFrontFileList[0].originFileObj) {
        dataToUpdate.identityInfo.nationalIdFrontImage = nationalIdFrontFileList[0].originFileObj;
    } else if (nationalIdFrontFileList.length === 0) { // User đã xóa ảnh
        dataToUpdate.identityInfo.nationalIdFrontImage = null; // Hoặc gửi tín hiệu để xóa URL trên server
        dataToUpdate.identityInfo.nationalIdFrontImageUrl = null; 
    } else { // Giữ nguyên URL cũ nếu không có thay đổi và fileList không rỗng
        dataToUpdate.identityInfo.nationalIdFrontImage = userData?.identityInfo?.nationalIdFrontImageUrl;
    }


    if (nationalIdBackFileList.length > 0 && nationalIdBackFileList[0].originFileObj) {
        dataToUpdate.identityInfo.nationalIdBackImage = nationalIdBackFileList[0].originFileObj;
    } else if (nationalIdBackFileList.length === 0) {
        dataToUpdate.identityInfo.nationalIdBackImage = null;
        dataToUpdate.identityInfo.nationalIdBackImageUrl = null;
    } else {
        dataToUpdate.identityInfo.nationalIdBackImage = userData?.identityInfo?.nationalIdBackImageUrl;
    }

    try {
      await onUpdate(dataToUpdate); // onUpdate (handleBrokerUpdate) sẽ nhận File objects nếu có
      setIsEditing(false);
      // Sau khi submit thành công, userData sẽ được cập nhật từ MyProfile, useEffect sẽ chạy lại prepareInitialValues
      message.success(dataToUpdate.isBroker ? 'Cập nhật thông tin môi giới thành công!' : 'Hủy đăng ký môi giới thành công!');
    } catch (error) {
      console.error('Lỗi cập nhật thông tin môi giới:', error);
      message.error('Có lỗi xảy ra khi cập nhật thông tin!');
    }
    setLoading(false);
  };

  const commonUploadProps = (fileList, setFileList) => ({
    listType: "picture-card",
    fileList: fileList,
    maxCount: 1,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Hình ảnh phải nhỏ hơn 2MB!');
      }
      if (isJpgOrPng && isLt2M) {
         setFileList([{ ...file, uid: file.uid || '-1', name: file.name, originFileObj: file }]);
      }
      return false;
    },
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList);
    },
    onRemove: () => {
        setFileList([]); 
    },
  });


  if (!isEditing) {
    return (
      <Card>
        <div className="flex justify-between items-center mb-6">
          <Title level={4} style={{ margin: 0 }}><ShopOutlined style={{ marginRight: 8 }} />Thông tin môi giới</Title>
          <Button type="primary" onClick={openEditForm} icon={<ShopOutlined />}>
            {userData?.isBroker ? 'Cập nhật thông tin' : 'Đăng ký làm môi giới'}
          </Button>
        </div>
        {userData?.isBroker ? (
          <div className="space-y-6">
             <Row gutter={[24, 24]}>
              <Col xs={24} sm={12}>
                <div><Text strong>Giấy phép môi giới:</Text><div className="mt-1"><FileTextOutlined style={{ marginRight: 8 }} />{userData.brokerLicense || <Text type="secondary">Chưa cập nhật</Text>}</div></div>
              </Col>
              <Col xs={24} sm={12}>
                <div><Text strong>Kinh nghiệm:</Text><div className="mt-1"><ClockCircleOutlined style={{ marginRight: 8 }} />{userData.experience || <Text type="secondary">Chưa cập nhật</Text>}</div></div>
              </Col>
            </Row>
            <div><Text strong>Chuyên môn:</Text><div className="mt-2">{userData.specialties && userData.specialties.length > 0 ? (<Space wrap>{userData.specialties.map((s, i) => (<Tag key={i} color="blue"><TagsOutlined style={{ marginRight: 4 }} />{s}</Tag>))}</Space>) : (<div className="mt-1"><Text type="secondary">Chưa cập nhật</Text></div>)}</div></div>
            <div><Text strong>Giới thiệu:</Text><div className="mt-1"><InfoCircleOutlined style={{ marginRight: 8 }} />{userData.introduction || <Text type="secondary">Chưa cập nhật</Text>}</div></div>
            
            <Divider>Thông tin định danh (CCCD)</Divider>
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={8}><div><Text strong>Số CCCD:</Text><div className="mt-1"><IdcardOutlined style={{ marginRight: 8 }} />{userData.identityInfo?.nationalIdNumber || <Text type="secondary">Chưa cập nhật</Text>}</div></div></Col>
              <Col xs={24} sm={8}><div><Text strong>Ngày cấp:</Text><div className="mt-1"><CalendarOutlined style={{ marginRight: 8 }} />{userData.identityInfo?.nationalIdIssueDate ? dayjs(userData.identityInfo.nationalIdIssueDate).format('DD/MM/YYYY') : <Text type="secondary">Chưa cập nhật</Text>}</div></div></Col>
              <Col xs={24} sm={8}><div><Text strong>Nơi cấp:</Text><div className="mt-1"><EnvironmentOutlined style={{ marginRight: 8 }} />{userData.identityInfo?.nationalIdIssuePlace || <Text type="secondary">Chưa cập nhật</Text>}</div></div></Col>
            </Row>
            <Row gutter={[24, 24]}>
                <Col xs={24} sm={12}>
                    <Text strong>Ảnh CCCD mặt trước:</Text>
                    <div className="mt-1">
                    {userData.identityInfo?.nationalIdFrontImageUrl ? <Image src={userData.identityInfo.nationalIdFrontImageUrl} width={100} /> : <Text type="secondary">Chưa cập nhật</Text>}
                    </div>
                </Col>
                <Col xs={24} sm={12}>
                    <Text strong>Ảnh CCCD mặt sau:</Text>
                    <div className="mt-1">
                    {userData.identityInfo?.nationalIdBackImageUrl ? <Image src={userData.identityInfo.nationalIdBackImageUrl} width={100} /> : <Text type="secondary">Chưa cập nhật</Text>}
                    </div>
                </Col>
            </Row>

            <Divider>Thông tin thuế</Divider>
            <div><Text strong>Mã số thuế cá nhân:</Text><div className="mt-1"><SolutionOutlined style={{ marginRight: 8 }} />{userData.taxInfo?.personalTaxId || <Text type="secondary">Chưa cập nhật</Text>}</div></div>
            
            <Divider>Thông tin ngân hàng</Divider>
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12}><div><Text strong>Tên chủ tài khoản:</Text><div className="mt-1"><UserOutlined style={{ marginRight: 8 }} />{userData.bankingInfo?.accountHolderName || <Text type="secondary">Chưa cập nhật</Text>}</div></div></Col>
              <Col xs={24} sm={12}><div><Text strong>Số tài khoản:</Text><div className="mt-1"><IdcardOutlined style={{ marginRight: 8 }} />{userData.bankingInfo?.accountNumber || <Text type="secondary">Chưa cập nhật</Text>}</div></div></Col>
            </Row>
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12}><div><Text strong>Tên ngân hàng:</Text><div className="mt-1"><BankOutlined style={{ marginRight: 8 }} />{userData.bankingInfo?.bankName || <Text type="secondary">Chưa cập nhật</Text>}</div></div></Col>
              <Col xs={24} sm={12}><div><Text strong>Chi nhánh:</Text><div className="mt-1"><EnvironmentOutlined style={{ marginRight: 8 }} />{userData.bankingInfo?.bankBranch || <Text type="secondary">Chưa cập nhật</Text>}</div></div></Col>
            </Row>

            <Divider>Thông tin công ty (Nếu có)</Divider>
            <div><Text strong>Tên công ty/đại lý:</Text><div className="mt-1"><TeamOutlined style={{ marginRight: 8 }} />{userData.companyInfo?.companyName || <Text type="secondary">Chưa cập nhật</Text>}</div></div>

            <Divider>Liên kết</Divider>
            <Row gutter={[24, 24]}>
                <Col xs={24} sm={12}><div><Text strong>LinkedIn:</Text><div className="mt-1"><LinkedinFilled style={{ marginRight: 8 }} /><a href={userData.socialLinks?.linkedIn} target="_blank" rel="noopener noreferrer">{userData.socialLinks?.linkedIn || <Text type="secondary">Chưa cập nhật</Text>}</a></div></div></Col>
                <Col xs={24} sm={12}><div><Text strong>Website cá nhân:</Text><div className="mt-1"><GlobalOutlined style={{ marginRight: 8 }} /><a href={userData.socialLinks?.website} target="_blank" rel="noopener noreferrer">{userData.socialLinks?.website || <Text type="secondary">Chưa cập nhật</Text>}</a></div></div></Col>
            </Row>

            <Divider>Địa chỉ làm việc (Môi giới)</Divider>
            <div><Text strong>Địa chỉ:</Text><div className="mt-1"><EnvironmentOutlined style={{ marginRight: 8 }} />{userData.contactInfo?.address || <Text type="secondary">Chưa cập nhật</Text>}</div></div>
          </div>
        ) : ( <div className="text-center py-8"><Text type="secondary">Bạn chưa đăng ký làm môi giới. Nhấn vào nút bên trên để đăng ký.</Text></div>)}
      </Card>
    );
  }

  return (
    <Card>
      <Title level={4} style={{ marginBottom: 24 }}><ShopOutlined style={{ marginRight: 8 }} />{form.getFieldValue('isBroker') ? 'Cập nhật thông tin môi giới' : 'Đăng ký làm môi giới'}</Title>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="isBroker" valuePropName="checked"><Checkbox>{userData?.isBroker ? 'Duy trì trạng thái môi giới' : 'Đăng ký làm môi giới'}</Checkbox></Form.Item>
        <Form.Item noStyle shouldUpdate={(prev, curr) => prev.isBroker !== curr.isBroker}>
          {({ getFieldValue }) => getFieldValue('isBroker') && (
            <>
              <Row gutter={24}><Col xs={24} sm={12}><Form.Item name="brokerLicense" label="Giấy phép môi giới (nếu có)"><Input prefix={<FileTextOutlined />} placeholder="Nhập số giấy phép" /></Form.Item></Col><Col xs={24} sm={12}><Form.Item name="experience" label="Kinh nghiệm" rules={[{ required: true, message: 'Vui lòng nhập kinh nghiệm' }]}><Input prefix={<ClockCircleOutlined />} placeholder="Ví dụ: 5 năm kinh nghiệm" /></Form.Item></Col></Row>
              <Form.Item name="specialties" label="Chuyên môn (cách nhau bởi dấu phẩy)" rules={[{ required: true, message: 'Vui lòng nhập chuyên môn' }]} getValueFromEvent={(e) => {const val = e.target.value; return val ? val.split(',').map(item => item.trim()).filter(item => item) : [];}} getValueProps={(value) => ({ value: Array.isArray(value) ? value.join(', ') : '' })}><Input prefix={<TagsOutlined />} placeholder="Ví dụ: BĐS nghỉ dưỡng, Căn hộ cao cấp" /></Form.Item>
              <Form.Item name="introduction" label="Giới thiệu bản thân và kinh nghiệm" rules={[{ required: true, message: 'Vui lòng nhập giới thiệu' }]}><TextArea rows={4} placeholder="Mô tả chi tiết..." /></Form.Item>
              
              <Row gutter={24}>
                <Col xs={24} sm={8}><Form.Item name={['identityInfo', 'nationalIdNumber']} label="Số CCCD" rules={[{ required: true, message: 'Vui lòng nhập số CCCD' }, { pattern: /^\d{12}$/, message: 'Số CCCD gồm 12 chữ số' }]}><Input prefix={<IdcardOutlined />} placeholder="12 số CCCD" /></Form.Item></Col>
                <Col xs={24} sm={8}><Form.Item name={['identityInfo', 'nationalIdIssueDate']} label="Ngày cấp CCCD" rules={[{ required: true, message: 'Vui lòng chọn ngày cấp' }]}><DatePicker style={{ width: '100%' }} placeholder="Chọn ngày cấp" format="DD/MM/YYYY" /></Form.Item></Col>
                <Col xs={24} sm={8}><Form.Item name={['identityInfo', 'nationalIdIssuePlace']} label="Nơi cấp CCCD" rules={[{ required: true, message: 'Vui lòng nhập nơi cấp' }]}><Input prefix={<EnvironmentOutlined />} placeholder="Ví dụ: Cục CSQLHC về TTXH" /></Form.Item></Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={12}>
                  <Form.Item label="Ảnh CCCD mặt trước" name={['identityInfo', 'nationalIdFrontImage']} rules={[{ required: !nationalIdFrontFileList.find(f => f.url), message: 'Vui lòng tải ảnh mặt trước CCCD' }]}>
                    <Upload {...commonUploadProps(nationalIdFrontFileList, setNationalIdFrontFileList)}>
                      <div><UploadOutlined /><div>Tải lên</div></div>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Ảnh CCCD mặt sau" name={['identityInfo', 'nationalIdBackImage']} rules={[{ required: !nationalIdBackFileList.find(f => f.url), message: 'Vui lòng tải ảnh mặt sau CCCD' }]}>
                     <Upload {...commonUploadProps(nationalIdBackFileList, setNationalIdBackFileList)}>
                      <div><UploadOutlined /><div>Tải lên</div></div>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name={['taxInfo', 'personalTaxId']} label="Mã số thuế cá nhân" rules={[{ required: true, message: 'Vui lòng nhập mã số thuế' }]}><Input prefix={<SolutionOutlined />} placeholder="Nhập mã số thuế cá nhân" /></Form.Item>
              
              <Divider>Thông tin ngân hàng</Divider>
              <Row gutter={24}>
                <Col xs={24} sm={12}><Form.Item name={['bankingInfo', 'accountHolderName']} label="Tên chủ tài khoản" rules={[{ required: true, message: 'Vui lòng nhập tên chủ tài khoản' }]}><Input prefix={<UserOutlined />} placeholder="Tên trên thẻ/tài khoản" /></Form.Item></Col>
                <Col xs={24} sm={12}><Form.Item name={['bankingInfo', 'accountNumber']} label="Số tài khoản" rules={[{ required: true, message: 'Vui lòng nhập số tài khoản' }]}><Input prefix={<IdcardOutlined />} placeholder="Nhập số tài khoản ngân hàng" /></Form.Item></Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={12}><Form.Item name={['bankingInfo', 'bankName']} label="Tên ngân hàng" rules={[{ required: true, message: 'Vui lòng nhập tên ngân hàng' }]}><Input prefix={<BankOutlined />} placeholder="Ví dụ: Vietcombank, Techcombank" /></Form.Item></Col>
                <Col xs={24} sm={12}><Form.Item name={['bankingInfo', 'bankBranch']} label="Chi nhánh (Nếu có)"><Input prefix={<EnvironmentOutlined />} placeholder="Nhập chi nhánh ngân hàng" /></Form.Item></Col>
              </Row>
              <Form.Item name={['companyInfo', 'companyName']} label="Tên công ty/đại lý môi giới"><Input prefix={<TeamOutlined />} placeholder="Nhập tên công ty hoặc đại lý bạn làm việc" /></Form.Item>

              <Form.Item name={['contactInfo', 'address']} label="Địa chỉ làm việc" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ làm việc' }]}><Input prefix={<EnvironmentOutlined />} placeholder="Nhập địa chỉ văn phòng/làm việc" /></Form.Item>
            </>
          )}
        </Form.Item>
        <Form.Item><Space><Button onClick={handleCancel}>Hủy</Button><Button type="primary" htmlType="submit" loading={loading}>Lưu thông tin</Button></Space></Form.Item>
      </Form>
    </Card>
  );
};
const Image = ({ src, width, alt = "image" }) => <img src={src} width={width} alt={alt} style={{ display: 'block', maxWidth: '100%' }} />;


export default BrokerRegistration;