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
  Select
} from 'antd';
import {
  HomeOutlined,
  BankOutlined, // Giữ lại cho Loại chủ sở hữu & Tên tổ chức
  TagsOutlined,
  InfoCircleOutlined,
  UserOutlined, // Thay cho BankOutlined ở Loại chủ sở hữu nếu là cá nhân
  SolutionOutlined, // Có thể dùng cho "Loại chủ sở hữu"
  EnvironmentOutlined // Giữ lại cho Địa chỉ (nếu có)
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const OwnerRegistration = ({ userData, onUpdate }) => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Hàm chuẩn bị giá trị ban đầu cho form
  const prepareInitialValues = (data) => {
    const ownerProfile = data?.ownerProfile || {};
    return {
      isOwner: data?.isOwner || false,
      ownerType: ownerProfile.ownerType || undefined,
      propertyCount: ownerProfile.propertyCount || undefined, // Để undefined nếu không có giá trị
      organizationName: ownerProfile.organizationName || '',
      propertyTypes: ownerProfile.propertyTypes || [],
      introduction: ownerProfile.introduction || '',
      ownerContactAddress: ownerProfile.ownerContactAddress || '',
    };
  };

  useEffect(() => {
    if (userData) {
      const initialValues = prepareInitialValues(userData);
      if (!isEditing) { // Chỉ set giá trị khi không ở chế độ sửa
        form.setFieldsValue(initialValues);
      }
    }
  }, [userData, form, isEditing]); // Thêm isEditing vào dependencies

  const handleEditClick = () => {
    let initialFormValues = prepareInitialValues(userData);
    if (!userData?.isOwner) {
      initialFormValues.isOwner = true; // Tự động check khi đăng ký mới
    }
    form.setFieldsValue(initialFormValues);
    setIsEditing(true);
  };

  const handleCancel = () => {
    // Reset về giá trị ban đầu từ userData khi hủy
    form.setFieldsValue(prepareInitialValues(userData));
    setIsEditing(false);
  };

  const handleSubmit = async (formValues) => {
    setLoading(true);
    // Gom các giá trị của owner profile vào một object nếu cấu trúc userData của bạn là vậy
    const dataToUpdate = {
      isOwner: formValues.isOwner,
      ownerProfile: {
        ownerType: formValues.ownerType,
        propertyCount: formValues.propertyCount,
        organizationName: formValues.ownerType === 'organization' ? formValues.organizationName : undefined, // Chỉ lưu nếu là tổ chức
        propertyTypes: formValues.propertyTypes,
        introduction: formValues.introduction,
        ownerContactAddress: formValues.ownerContactAddress,
      }
    };

    try {
      await onUpdate(dataToUpdate); // Gửi cấu trúc này lên cho MyProfile
      setIsEditing(false);
      message.success('Cập nhật thông tin chủ sở hữu thành công!');
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật thông tin!');
    }
    setLoading(false);
  };

  const currentValues = prepareInitialValues(userData); // Lấy giá trị hiện tại để hiển thị

  if (!isEditing) {
    return (
      <Card>
        <div className="flex justify-between items-center mb-6">
          <Title level={4} style={{ margin: 0 }}>
            <HomeOutlined style={{ marginRight: 8 }} />
            Thông tin chủ sở hữu
          </Title>
          <Button
            type="primary"
            onClick={handleEditClick} // Sử dụng handleEditClick
            icon={<HomeOutlined />}
          >
            {currentValues.isOwner ? 'Cập nhật thông tin' : 'Đăng ký làm chủ sở hữu'}
          </Button>
        </div>

        {currentValues.isOwner ? (
          <div className="space-y-6">
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12}>
                <div>
                  <Text strong>Loại chủ sở hữu:</Text>
                  <div className="mt-1">
                    {currentValues.ownerType ? (
                      <>
                        <SolutionOutlined style={{ marginRight: 8 }} />
                        {currentValues.ownerType === 'individual' ? 'Cá nhân' : 'Tổ chức'}
                      </>
                    ) : <Text type="secondary">Chưa cập nhật</Text>}
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div>
                  <Text strong>Số lượng tài sản (ước tính):</Text>
                  <div className="mt-1">
                    <HomeOutlined style={{ marginRight: 8 }} />
                    {typeof currentValues.propertyCount === 'number' ? `${currentValues.propertyCount} tài sản` : <Text type="secondary">Chưa cập nhật</Text>}
                  </div>
                </div>
              </Col>
            </Row>

            {currentValues.ownerType === 'organization' && (
              <div>
                <Text strong>Tên tổ chức:</Text>
                <div className="mt-1">
                  <BankOutlined style={{ marginRight: 8 }} />
                  {currentValues.organizationName || <Text type="secondary">Chưa cập nhật</Text>}
                </div>
              </div>
            )}

            <div>
              <Text strong>Loại tài sản thường sở hữu/giao dịch:</Text>
              <div className="mt-2">
                {currentValues.propertyTypes && currentValues.propertyTypes.length > 0 ? (
                  <Space wrap>
                    {currentValues.propertyTypes.map((type, index) => (
                      <Tag key={index} color="green">
                        <TagsOutlined style={{ marginRight: 4 }} />
                        {/* Hiển thị label thay vì value nếu cần */}
                        {type === 'apartment' ? 'Căn hộ' : 
                         type === 'house' ? 'Nhà riêng' : 
                         type === 'land' ? 'Đất' : 
                         type === 'commercial' ? 'BĐS Thương mại' : 
                         type === 'industrial' ? 'BĐS Công nghiệp' : type}
                      </Tag>
                    ))}
                  </Space>
                ) : <div className="mt-1"><Text type="secondary">Chưa cập nhật</Text></div>}
              </div>
            </div>

            <div>
              <Text strong>Giới thiệu:</Text>
              <div className="mt-1" style={{ whiteSpace: 'pre-wrap' }}>
                <InfoCircleOutlined style={{ marginRight: 8 }} />
                {currentValues.introduction || <Text type="secondary">Chưa cập nhật</Text>}
              </div>
            </div>
            
            {currentValues.ownerContactAddress && (
                 <div>
                 <Text strong>Địa chỉ liên hệ (Chủ sở hữu):</Text>
                 <div className="mt-1">
                   <EnvironmentOutlined style={{ marginRight: 8 }} />
                   {currentValues.ownerContactAddress}
                 </div>
               </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Text type="secondary">
              Bạn chưa đăng ký làm chủ sở hữu. Nhấn vào nút bên trên để đăng ký.
            </Text>
          </div>
        )}
      </Card>
    );
  }

  // EDITING MODE
  return (
    <Card>
      <Title level={4} style={{ marginBottom: 24 }}>
        <HomeOutlined style={{ marginRight: 8 }} />
        Thông tin chủ sở hữu
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        // initialValues không cần thiết ở đây nữa vì đã dùng setFieldsValue
      >
        <Form.Item
          name="isOwner"
          valuePropName="checked"
        >
          <Checkbox>Đăng ký làm chủ sở hữu</Checkbox>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.isOwner !== currentValues.isOwner
          }
        >
          {({ getFieldValue }) =>
            getFieldValue('isOwner') && (
              <>
                <Row gutter={24}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="ownerType"
                      label="Loại chủ sở hữu"
                      rules={[{ required: true, message: 'Vui lòng chọn loại chủ sở hữu' }]}
                    >
                      <Select placeholder="Chọn loại chủ sở hữu">
                        <Option value="individual">Cá nhân</Option>
                        <Option value="organization">Tổ chức</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="propertyCount"
                      label="Số lượng tài sản sở hữu (ước tính)"
                      // rules={[{ type: 'number', message: 'Vui lòng nhập số' }]} // Bỏ required
                    >
                      <Input
                        type="number"
                        min={0}
                        prefix={<HomeOutlined />}
                        placeholder="Nhập số lượng (nếu có)"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.ownerType !== currentValues.ownerType
                  }
                >
                  {({ getFieldValue: getOwnerTypeValue }) =>
                    getOwnerTypeValue('ownerType') === 'organization' && (
                      <Form.Item
                        name="organizationName"
                        label="Tên tổ chức"
                        rules={[{ required: true, message: 'Vui lòng nhập tên tổ chức' }]}
                      >
                        <Input
                          prefix={<BankOutlined />}
                          placeholder="Nhập tên tổ chức"
                        />
                      </Form.Item>
                    )
                  }
                </Form.Item>

                <Form.Item
                  name="propertyTypes"
                  label="Loại tài sản thường sở hữu/giao dịch"
                  rules={[{ required: true, message: 'Vui lòng chọn ít nhất một loại tài sản' }]}
                >
                  <Select
                    mode="multiple"
                    placeholder="Chọn các loại tài sản"
                    optionLabelProp="label"
                    allowClear
                  >
                    <Option value="apartment" label="Căn hộ">Căn hộ</Option>
                    <Option value="house" label="Nhà riêng">Nhà riêng</Option>
                    <Option value="land" label="Đất nền">Đất nền</Option>
                    <Option value="villa" label="Biệt thự">Biệt thự</Option>
                    <Option value="shophouse" label="Shophouse">Shophouse</Option>
                    <Option value="commercial" label="Bất động sản thương mại">Bất động sản thương mại</Option>
                    <Option value="industrial" label="Bất động sản công nghiệp">Bất động sản công nghiệp</Option>
                    <Option value="other" label="Khác">Khác</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="introduction"
                  label="Giới thiệu (về bạn với tư cách chủ sở hữu)"
                  rules={[{ required: true, message: 'Vui lòng nhập giới thiệu' }]}
                >
                  <TextArea
                    rows={4}
                    placeholder="Giới thiệu về kinh nghiệm, phương châm của bạn khi là chủ sở hữu..."
                  />
                </Form.Item>

                <Form.Item
                  name="ownerContactAddress"
                  label="Địa chỉ liên hệ (Chủ sở hữu - nếu cần thiết và khác địa chỉ cá nhân)"
                >
                  <Input
                    prefix={<EnvironmentOutlined />}
                    placeholder="Nhập địa chỉ liên hệ riêng (nếu có)"
                  />
                </Form.Item>
              </>
            )
          }
        </Form.Item>

        <Form.Item>
          <Space>
            <Button onClick={handleCancel}>
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Lưu thông tin
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default OwnerRegistration;