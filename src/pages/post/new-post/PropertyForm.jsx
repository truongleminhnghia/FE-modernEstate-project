import { useState, } from "react";
import { Col, Form, Input, InputNumber, Row, Select, Upload, Image, Button } from "antd";
import ImgCrop from 'antd-img-crop';
import { uploadImageToFirebase } from "../../../lib/utils";

const getBase64 = file => new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => res(reader.result);
    reader.onerror = err => rej(err);
});

export default function PropertyForm({ onFinish, initialValues }) {
    const [attrs, setAttrs] = useState(initialValues?.attribute || []);
    const [interior, setInterior] = useState(initialValues?.attribute || []);
    const [files, setFiles] = useState(initialValues?.images || []);
    const [uploading, setUploading] = useState(false);

    const handleCustomRequest = async ({ file, onSuccess, onError }) => {
        try {
            const url = await uploadImageToFirebase(file, "property-images");
            // Gán url và status vào file để Ant Design lưu lại
            file.url = url;
            file.status = 'done';
            onSuccess({ url });
        } catch (err) {
            file.status = 'error';
            onError(err);
        }
    };

    const handleSubmit = async vals => {
        setUploading(true);
        // Lấy url từ fileList (chỉ lấy file đã upload thành công)
        const imageUrls = files
            .filter(file => file.status === 'done' && file.url)
            .map(file => ({ imageUrl: file.url }));

        // Đảm bảo các trường đúng format
        const data = {
            ...vals,
            attribute: attrs,
            interior: Array.isArray(interior) ? interior.join(", ") : interior, // nếu interior là mảng thì join lại
            images: imageUrls,
            areaUnit: vals.areaUnit || "m2",
            priceUnit: vals.priceUnit || "VND",
            projectId: vals.projectId || null,
        };
        setUploading(false);
        onFinish(data);
    };

    const handlePreview = async file => {
        if (!file.url && !file.preview) file.preview = await getBase64(file.originFileObj);
    };

    return (
        <Form
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={initialValues}
        >
            <Form.Item
                name="title"
                label="Tiêu đề"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="description"
                label="Mô tả"
                rules={[{ required: true }]}
            >
                <Input.TextArea rows={4} />
            </Form.Item>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="type"
                        label="Loại tài sản"
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Select.Option value="Căn_hộ_Chung_cư">Căn hộ chung cư</Select.Option>
                            <Select.Option value="Nhà_riêng">Nhà riêng</Select.Option>
                            <Select.Option value="Đất">Đất</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="attribute"
                        label="Đặc tính"
                        help="Nhập và nhấn Enter để thêm"
                    >
                        <Select
                            mode="tags"
                            value={attrs}
                            onChange={setAttrs}
                            placeholder="Ví dụ: gần trường, hướng biển"
                        />
                    </Form.Item>

                    <Form.Item
                        name="area"
                        label="Diện tích (m2)"
                        rules={[{ type: 'number', min: 0, required: true }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="Giá (VND)"
                        rules={[{ type: 'number', min: 0, required: true }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        name="interior"
                        label="Nội thất"
                        help="Nhập và nhấn Enter để thêm"
                    >
                        <Select
                            mode="tags"
                            value={interior}
                            onChange={setInterior}
                            placeholder="Có nội thất, Full nội thất"
                        />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="numberOfBedrooms"
                                label="Phòng ngủ"
                                rules={[{ type: 'number', min: 0 }]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="numberOfBathrooms"
                                label="Phòng tắm"
                                rules={[{ type: 'number', min: 0 }]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="houseDirection"
                        label="Hướng nhà"
                    >
                        <Select>
                            {['Đông', 'Tây', 'Nam', 'Bắc'].map(d => (
                                <Select.Option key={d} value={d}>{d}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="images" 
                        label="Ảnh minh họa">
                        <ImgCrop rotationSlider>
                            <Upload
                                listType="picture-card"
                                fileList={files}
                                onChange={({ fileList: fl }) => setFiles(fl)}
                                onPreview={handlePreview}
                                customRequest={handleCustomRequest}
                            >{files.length < 5 && '+ Upload'}</Upload>
                        </ImgCrop>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={uploading}>
                    Tiếp tục
                </Button>
            </Form.Item>
        </Form>
    );
}