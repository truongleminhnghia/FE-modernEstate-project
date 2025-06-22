import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  InputNumber,
  DatePicker,
  Button,
  Card,
  Row,
  Col,
  Divider,
  message,
  Upload,
  Space,
  Typography,
  Steps,
  Collapse,
} from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  HomeOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  PictureOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { storage } from "../../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import moment from "moment";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;

const PROPERTY_TYPES = [
  { value: "Căn_hộ_Chung_cư", label: "Căn hộ chung cư" },
  { value: "Chung_Cư_Mini", label: "Chung cư mini" },
  { value: "Căn_hộ_dịch_vụ", label: "Căn hộ dịch vụ" },
  { value: "Nhà_riêng", label: "Nhà riêng" },
  { value: "Nhà_biệt_thự", label: "Nhà biệt thự" },
  { value: "Nhà_mặt_phố", label: "Nhà mặt phố" },
  { value: "Shophouse", label: "Shophouse" },
  { value: "Nhà_mặt_phố_thương_mại", label: "Nhà mặt phố thương mại" },
  { value: "Đất_nền_dự_án", label: "Đất nền dự án" },
  { value: "Trang_trại", label: "Trang trại" },
  { value: "Kho_nhà_xưởng", label: "Kho, nhà xưởng" },
  { value: "Khác", label: "Khác" },
];

const Maps_API_KEY = "AIzaSyDH65U1tsUHeWw-XMgtSyaVU9Sh4QO4J1o";

export default function CreatePost() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {};
  const userId = user.id || '';
  const userName = (user.firstName || '') + (user.lastName ? ' ' + user.lastName : '');
  const userPhone = user.phone || '';

  const [mapLatLng, setMapLatLng] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: Maps_API_KEY,
    libraries: ["places"],
  });
  const [fileList, setFileList] = useState([]);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const initialState = {
    postBy: userId,
    demand: "MUA_BÁN",
    newProperty: {
      title: "",
      description: "",
      attribute: [],
      type: "Căn_hộ_Chung_cư",
      area: undefined,
      areaUnit: "m2",
      price: undefined,
      priceUnit: "VND",
      document: [],
      interior: "Không nội thất",
      numberOfBedrooms: undefined,
      numberOfBathrooms: undefined,
      houseDirection: "Đông",
      videoUrl: [],
      address: {
        houseNumber: "",
        street: "",
        ward: "",
        district: "",
        city: "",
        country: "Việt Nam",
        addressDetail: "",
      },
      projectId: "",
      images: [],
    },
    contact: {
      contactName: userName,
      contactEmail: user.email || '',
      contactPhone: userPhone,
    },
    postPackagesRequest: {
      startDate: moment(),
      endDate: null,
      totalAmout: 0,
      currency: "VND",
      accountId: userId,
      packageId: "",
      id: "",
    },
  };

  useEffect(() => {
    form.setFieldsValue(initialState);
  }, []);

  useEffect(() => {
    handleAddressChange();
  }, [isLoaded]);

  const steps = [
    {
      title: "Thông tin cơ bản",
      icon: <UserOutlined />,
    },
    {
      title: "Chi tiết bất động sản",
      icon: <HomeOutlined />,
    },
    {
      title: "Địa chỉ",
      icon: <EnvironmentOutlined />,
    },
    {
      title: "Hình ảnh & Video",
      icon: <PictureOutlined />,
    },
    {
      title: "Thông tin liên hệ",
      icon: <PhoneOutlined />,
    },
    {
      title: "Gói đăng",
      icon: <ShoppingOutlined />,
    },
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const transformedData = {
        postBy: userId,
        demand: values.demand,
        newProperty: {
          ...values.newProperty,

          images: (form.getFieldValue(['newProperty', 'images']) || []).map(file => ({ imageUrl: file.url || file.imageUrl })), videoUrl: values.newProperty?.videoUrl ? [values.newProperty.videoUrl[0]].filter(Boolean) : [],
        },
        contact: values.contact,
        postPackagesRequest: {
          startDate: values.postPackagesRequest?.startDate?.format("YYYY-MM-DD"),
          accountId: userId
        },
      };

      const payload = { request: transformedData };

      console.log("Payload gửi đi:", JSON.stringify(payload, null, 2));

      const res = await fetch(`${import.meta.env.VITE_API_URL}posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        message.success("Tạo bài đăng thành công!");
        form.resetFields();
        setFileList([]);
        setCurrentStep(0);
      } else {
        const data = await res.json();
        console.error("Lỗi từ server:", data);
        message.error(data.title || data.message || "Có lỗi xảy ra khi tạo bài đăng!");
        if (data.errors) {
          Object.values(data.errors).forEach(errArray => {
            errArray.forEach(errMsg => message.error(errMsg));
          });
        }
      }
    } catch (err) {
      console.error("Lỗi khi gửi request:", err);
      message.error("Có lỗi xảy ra khi gửi request!");
    }
    setLoading(false);
  };

  const nextStep = async () => {
    try {
      let fieldsToValidate = [];
      if (currentStep === 0) {
        fieldsToValidate = ['demand', ['newProperty', 'type']];
      } else if (currentStep === 1) {
        fieldsToValidate = [
          ['newProperty', 'title'],
          ['newProperty', 'description'],
          ['newProperty', 'area'],
          ['newProperty', 'price'],
        ];
      } else if (currentStep === 2) {
      } else if (currentStep === 3) {
        const currentImages = form.getFieldValue(["newProperty", "images"]);
        if (!currentImages || currentImages.length === 0) {
          message.error("Vui lòng tải lên ít nhất một hình ảnh cho bất động sản.");
          return;
        }
      } else if (currentStep === 4) {
        fieldsToValidate = [
          ['contact', 'contactName'],
          ['contact', 'contactEmail'],
          ['contact', 'contactPhone'],
        ];
      } else if (currentStep === 5) {
        fieldsToValidate = [
          ['postPackagesRequest', 'startDate'],
          ['postPackagesRequest', 'endDate'],
        ];
        if (!selectedPackage) {
          message.error("Vui lòng chọn một gói đăng.");
          return;
        }
      }

      if (fieldsToValidate.length > 0) {
        await form.validateFields(fieldsToValidate);
      }
      setCurrentStep(currentStep + 1);
    } catch (errorInfo) {
      console.log('Validation Failed:', errorInfo);
      message.error("Vui lòng điền đầy đủ và chính xác các thông tin bắt buộc.");
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleAddressChange = async () => {
    if (!isLoaded || !window.google || !window.google.maps) return;

    const addressObj = form.getFieldValue(["newProperty", "address"]);
    const addressString = [
      addressObj?.houseNumber,
      addressObj?.street,
      addressObj?.ward,
      addressObj?.district,
      addressObj?.city,
      addressObj?.country,
    ]
      .filter(Boolean)
      .join(", ");

    if (!addressString) {
      setMapLatLng(null);
      setMarkerPosition(null);
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: addressString }, (results, status) => {
      if (status === "OK" && results[0]) {
        const loc = results[0].geometry.location;
        setMapLatLng({ lat: loc.lat(), lng: loc.lng() });
        setMarkerPosition({ lat: loc.lat(), lng: loc.lng() });
      } else {
        console.error("Geocode failed:", status);
        setMapLatLng(null);
        setMarkerPosition(null);
      }
    });
  };

  const handleMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPosition({ lat, lng });
    setMapLatLng({ lat, lng });
    if (window.google && window.google.maps) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results[0]) {
          const addressComponents = results[0].address_components;
          const getComponent = (type) => {
            const comp = addressComponents.find((c) => c.types.includes(type));
            return comp ? comp.long_name : "";
          };
          form.setFieldsValue({
            newProperty: {
              ...form.getFieldValue("newProperty"),
              address: {
                houseNumber: getComponent("street_number"),
                street: getComponent("route"),
                ward: getComponent("sublocality_level_1"),
                district: getComponent("administrative_area_level_2") || getComponent("administrative_area_level_3"),
                city: getComponent("administrative_area_level_1"),
                country: getComponent("country"),
                addressDetail: results[0].formatted_address,
              },
            },
          });
        } else {
          console.error("Reverse geocode failed:", status);
          message.warn("Không thể tìm thấy địa chỉ từ vị trí này.");
        }
      });
    }
  };

  const handleUploadFirebase = async ({ file, onSuccess, onError }) => {
    if (fileList.length >= 5) {
      message.error("Chỉ được upload tối đa 5 ảnh!");
      onSuccess("Too many files");
      return;
    }
    try {
      const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Upload error:", error);
          message.error(`Tải ảnh thất bại: ${error.message}`);
          onError(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const newFile = {
            uid: file.uid,
            name: file.name,
            status: 'done',
            url: downloadURL,
            imageUrl: downloadURL
          };
          const newFileList = [...fileList, newFile];
          setFileList(newFileList);
          form.setFieldsValue({
            newProperty: {
              ...form.getFieldValue("newProperty"),
              images: newFileList,
            }
          });
          message.success(`${file.name} tải lên thành công!`);
          onSuccess("OK");
        }
      );
    } catch (err) {
      console.error("Upload process error:", err);
      message.error("Có lỗi xảy ra trong quá trình tải ảnh.");
      onError(err);
    }
  };


  const handleRemove = (file) => {
    const currentImagesInForm = form.getFieldValue(["newProperty", "images"]) || [];
    const newImages = currentImagesInForm.filter(img => img.uid !== file.uid && img.url !== file.url);

    form.setFieldsValue({
      newProperty: {
        ...form.getFieldValue("newProperty"),
        images: newImages,
      },
    });
    setFileList((prev) => prev.filter(f => f.uid !== file.uid));
    return true;
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}packages`);
        setPackages(res.data.data.rowDatas || []);
      } catch (error) {
        console.error("Error fetching packages:", error);
        message.error("Không thể tải danh sách gói đăng.");
      }
    };
    fetchPackages();
  }, []);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card title="Thông tin người đăng" className="mb-4">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Tên người đăng">
                  <Input value={userName} disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Số điện thoại liên hệ"
                >
                  <Input value={userPhone} disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="demand"
                  label="Nhu cầu"
                  rules={[{ required: true, message: "Vui lòng chọn nhu cầu!" }]}
                >
                  <Select placeholder="Chọn nhu cầu">
                    <Option value="MUA_BÁN">Mua bán</Option>
                    <Option value="CHO_THUÊ">Cho thuê</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={["newProperty", "type"]}
                  label="Loại bất động sản"
                  rules={[{ required: true, message: "Vui lòng chọn loại BĐS!" }]}
                >
                  <Select placeholder="Chọn loại bất động sản">
                    {PROPERTY_TYPES.map((item) => (
                      <Option key={item.value} value={item.value}>{item.label}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        );

      case 1:
        return (
          <Card title="Chi tiết bất động sản" className="mb-4">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name={["newProperty", "title"]}
                  label="Tiêu đề"
                  rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
                >
                  <Input placeholder="Nhập tiêu đề bài đăng" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={["newProperty", "description"]}
                  label="Mô tả"
                  rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
                >
                  <TextArea rows={4} placeholder="Mô tả chi tiết về bất động sản" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={["newProperty", "area"]}
                  label="Diện tích"
                  rules={[{ required: true, message: "Vui lòng nhập diện tích!" }]}
                >
                  <InputNumber
                    min={0}
                    placeholder="Diện tích"
                    style={{ width: "100%" }}
                    addonAfter="m²"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={["newProperty", "price"]}
                  label="Giá"
                  rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
                >
                  <InputNumber
                    min={0}
                    placeholder="Giá"
                    style={{ width: "100%" }}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    addonAfter="VND"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={["newProperty", "houseDirection"]}
                  label="Hướng nhà"
                >
                  <Select placeholder="Chọn hướng">
                    <Option value="Đông">Đông</Option>
                    <Option value="Tây">Tây</Option>
                    <Option value="Nam">Nam</Option>
                    <Option value="Bắc">Bắc</Option>
                    <Option value="Đông Nam">Đông Nam</Option>
                    <Option value="Đông Bắc">Đông Bắc</Option>
                    <Option value="Tây Nam">Tây Nam</Option>
                    <Option value="Tây Bắc">Tây Bắc</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={["newProperty", "numberOfBedrooms"]}
                  label="Số phòng ngủ"
                >
                  <InputNumber min={0} placeholder="Số phòng ngủ" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={["newProperty", "numberOfBathrooms"]}
                  label="Số phòng tắm"
                >
                  <InputNumber min={0} placeholder="Số phòng tắm" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={["newProperty", "interior"]}
                  label="Nội thất"
                >
                  <Select placeholder="Chọn nội thất">
                    <Option value="Cơ bản">Cơ bản</Option>
                    <Option value="Cao cấp">Cao cấp</Option>
                    <Option value="Không nội thất">Không nội thất</Option>
                    <Option value="Đầy đủ">Đầy đủ</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={["newProperty", "attribute"]}
                  label="Tiện ích xung quanh"
                >
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="Nhập hoặc chọn tiện ích (ví dụ: Hồ bơi, Gym, Trường học...)"
                    options={[
                      { value: "Hồ bơi" },
                      { value: "Gym" },
                      { value: "Trường học" },
                      { value: "Siêu thị" },
                      { value: "Công viên" },
                      { value: "Bãi đậu xe" },
                      { value: "Trung tâm thương mại" },
                      { value: "Bệnh viện" },
                      { value: "Nhà hàng" },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        );

      case 2:
        return (
          <Card title="Địa chỉ" className="mb-4">
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  name={["newProperty", "address", "houseNumber"]}
                  label="Số nhà"
                >
                  <Input placeholder="Số nhà" onBlur={handleAddressChange} />
                </Form.Item>
              </Col>
              <Col span={18}>
                <Form.Item
                  name={["newProperty", "address", "street"]}
                  label="Đường"
                >
                  <Input placeholder="Tên đường" onBlur={handleAddressChange} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={["newProperty", "address", "ward"]}
                  label="Phường/Xã"
                >
                  <Input placeholder="Phường/Xã" onBlur={handleAddressChange} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={["newProperty", "address", "district"]}
                  label="Quận/Huyện"
                >
                  <Input placeholder="Quận/Huyện" onBlur={handleAddressChange} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={["newProperty", "address", "city"]}
                  label="Thành phố"
                >
                  <Input placeholder="Thành phố" onBlur={handleAddressChange} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={["newProperty", "address", "country"]}
                  label="Quốc gia"
                >
                  <Input placeholder="Quốc gia" onBlur={handleAddressChange} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={["newProperty", "address", "addressDetail"]}
                  label="Chi tiết địa chỉ"
                >
                  <Input placeholder="Chi tiết địa chỉ" onBlur={handleAddressChange} />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <div style={{ width: "100%", height: 350, borderRadius: 8, overflow: "hidden", marginTop: 16, background: "#f0f0f0" }}>
              {isLoaded && mapLatLng ? (
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={mapLatLng}
                  zoom={16}
                >
                  <Marker
                    position={markerPosition}
                    draggable={true}
                    onDragEnd={handleMarkerDragEnd}
                  />
                </GoogleMap>
              ) : (
                <div style={{ textAlign: "center", lineHeight: "350px" }}>Đang tải bản đồ hoặc không tìm thấy địa chỉ...</div>
              )}
            </div>
          </Card>
        );

      case 3:
        return (
          <Card title="Hình ảnh & Video" className="mb-4">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name={["newProperty", "images"]}
                  label="Hình ảnh (tối đa 5 ảnh)"
                  rules={[{ required: true, message: "Vui lòng tải lên ít nhất một hình ảnh cho bất động sản." }]}
                >
                  <Upload
                    listType="picture-card"
                    customRequest={handleUploadFirebase}
                    fileList={fileList}
                    maxCount={5}
                    accept="image/*"
                    onRemove={file => {
                      const newFileList = fileList.filter(f => f.uid !== file.uid);
                      setFileList(newFileList);
                      form.setFieldsValue({
                        newProperty: {
                          ...form.getFieldValue("newProperty"),
                          images: newFileList,
                        }
                      });
                      return true;
                    }}
                    onChange={({ fileList: newFileList }) => {
                      setFileList(newFileList);
                      form.setFieldsValue({
                        newProperty: {
                          ...form.getFieldValue("newProperty"),
                          images: newFileList,
                        }
                      });
                    }}
                  >
                    {fileList.length >= 5 ? null : "+ Upload"}
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={["newProperty", "videoUrl", 0]}
                  label="URL video"
                >
                  <Input placeholder="Nhập URL video (YouTube, Vimeo, etc.)" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Text type="secondary">
                  <PictureOutlined /> Bạn có thể thêm nhiều hình ảnh và video sau khi tạo bài đăng
                </Text>
              </Col>
            </Row>
          </Card>
        );

      case 4:
        return (
          <Card title="Thông tin liên hệ" className="mb-4">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name={["contact", "contactName"]}
                  label="Tên liên hệ"
                  rules={[{ required: true, message: "Vui lòng nhập tên liên hệ!" }]}
                >
                  <Input placeholder="Tên liên hệ" prefix={<UserOutlined />} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={["contact", "contactEmail"]}
                  label="Email liên hệ"
                  rules={[
                    { required: true, message: "Vui lòng nhập email!" },
                    { type: "email", message: "Email không hợp lệ!" }
                  ]}
                >
                  <Input placeholder="Email liên hệ" prefix={<MailOutlined />} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={["contact", "contactPhone"]}
                  label="Số điện thoại"
                  rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
                >
                  <Input placeholder="Số điện thoại" prefix={<PhoneOutlined />} />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        );

      case 5:
        return (
          <Card title="Gói đăng" className="mb-4">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Chọn gói đăng"
                  rules={[{ required: true, message: "Vui lòng chọn một gói đăng!" }]}
                >
                  <Select
                    placeholder="Chọn gói đăng"
                    value={selectedPackage}
                    onChange={val => {
                      setSelectedPackage(val);
                      const pkg = packages.find(p => p.id === val);
                      if (pkg) {
                        form.setFieldsValue({
                          postPackagesRequest: {
                            ...form.getFieldValue("postPackagesRequest"),
                            packageId: pkg.id,
                            totalAmout: pkg.price,
                            id: pkg.id,
                          },
                        });
                      } else {
                        form.setFieldsValue({
                          postPackagesRequest: {
                            ...form.getFieldValue("postPackagesRequest"),
                            packageId: "",
                            totalAmout: 0,
                            id: "",
                          },
                        });
                      }
                    }}
                  >
                    {packages.map(pkg => (
                      <Option key={pkg.id} value={pkg.id}>
                        {pkg.packageName} - {pkg.price.toLocaleString()} VND ({pkg.typePackage})
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={['postPackagesRequest', 'startDate']}
                  label="Ngày bắt đầu"
                  rules={[
                    { type: 'object', required: true, message: 'Vui lòng chọn ngày bắt đầu!' }
                  ]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    placeholder="Chọn ngày bắt đầu"
                    // disable chọn trước hôm nay
                    disabledDate={current => current && current < moment().startOf('day')}
                  />
                </Form.Item>
              </Col>

              {/* Ngày kết thúc */}
              <Col span={12}>
                <Form.Item
                  name={['postPackagesRequest', 'endDate']}
                  label="Ngày kết thúc"
                  dependencies={[['postPackagesRequest', 'startDate']]}
                  rules={[
                    { type: 'object', required: true, message: 'Vui lòng chọn ngày kết thúc!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const startDate = getFieldValue(['postPackagesRequest', 'startDate']);
                        // nếu chưa chọn startDate hoặc endDate, hoặc endDate > startDate thì OK
                        if (!value || !startDate || value.isAfter(startDate)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Ngày kết thúc phải sau ngày bắt đầu!'));
                      },
                    }),
                  ]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    placeholder="Chọn ngày kết thúc"
                    // disable chọn trước startDate
                    disabledDate={current => {
                      const startDate = form.getFieldValue(['postPackagesRequest', 'startDate']);
                      return startDate
                        ? current && current < startDate.endOf('day')
                        : false;
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={["postPackagesRequest", "totalAmout"]}
                  label="Tổng tiền"
                >
                  <Input
                    disabled
                    placeholder="Tổng tiền sẽ tự động điền khi chọn gói"
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={["postPackagesRequest", "packageId"]}
                  label="Package ID"
                >
                  <Input disabled placeholder="Tự động điền" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={["postPackagesRequest", "id"]}
                  label="Mã gói đăng (Code)"
                >
                  <Input disabled placeholder="Tự động điền" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px" }}>
      <div style={{ marginBottom: "24px" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "8px" }}>
          Tạo bài đăng mới
        </Title>
        <Text type="secondary" style={{ textAlign: "center", display: "block" }}>
          Điền đầy đủ thông tin để tạo bài đăng bất động sản
        </Text>
      </div>

      <Steps
        current={currentStep}
        items={steps}
        style={{ marginBottom: "32px" }}
        responsive={true}
      />

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={initialState}
        size="large"
      >
        {renderStepContent()}

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <Space size="middle">
            {currentStep > 0 && (
              <Button onClick={prevStep} size="large">
                Quay lại
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={nextStep} size="large">
                Tiếp theo
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                icon={<PlusOutlined />}
              >
                {loading ? "Đang tạo..." : "Tạo bài đăng"}
              </Button>
            )}
          </Space>
        </div>
      </Form>
    </div>
  );
}