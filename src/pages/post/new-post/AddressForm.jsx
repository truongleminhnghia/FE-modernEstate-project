import { Form, Select, Input, Button } from 'antd';
import { useEffect, useState } from 'react';
import { getDistricts, getProvinces, getWards } from "vietnam-provinces";


export default function AddressForm({ onFinish, initialValues }) {
    const [form] = Form.useForm();
    const [wards, setWards] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [provinces, setProvinces] = useState([]);
    useEffect(() => {
        const provincesList = getProvinces();
        setProvinces(provincesList);
    }, []);

    const handleProvinceChange = (value) => {
        const districtsList = getDistricts(value);
        setDistricts(districtsList);
        setWards([]);
        form.setFieldsValue({ district: undefined, ward: undefined });
    };

    const handleDistrictChange = (value) => {
        const wardsList = getWards(value);
        setWards(wardsList);
        form.setFieldsValue({ ward: undefined });
    };

    const handleFinish = (values) => {
        const cityObj = provinces.find(p => p.code === values.city);
        const districtObj = districts.find(d => d.code === values.district);
        const wardObj = wards.find(w => w.code === values.ward);

        const data = {
            ...values,
            city: cityObj ? cityObj.name : values.city,
            district: districtObj ? districtObj.name : values.district,
            ward: wardObj ? wardObj.name : values.ward,
        };
        onFinish(data);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            onFinish={handleFinish}
            className="space-y-4"
        >
            <Form.Item label="Tỉnh/Thành Phố" name="city">
                <Select
                    className="input"
                    placeholder="Tỉnh/TP*"
                    onChange={handleProvinceChange}
                    showSearch
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                        0
                    }
                >
                    {provinces.map((province) => (
                        <Option key={province.code} value={province.code}>
                            {province.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="Quận/Huyện" name="district">
                <Select
                    className="input"
                    placeholder="Quận/Huyện*"
                    onChange={handleDistrictChange}
                    disabled={!districts.length}
                    showSearch
                    filterOption={(input, option) =>
                        option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {districts.map((district) => (
                        <Option key={district.code} value={district.code}>
                            {district.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="Phường/Xã" name="ward">
                <Select
                    className="input"
                    placeholder="Phường/Xã*"
                    disabled={!wards.length}
                    showSearch
                    filterOption={(input, option) =>
                        option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {wards.map((ward) => (
                        <Option key={ward.code} value={ward.code}>
                            {ward.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="addressDetail"
                label="Địa chỉ chi tiết"
                rules={[{ required: true, message: 'Nhập số nhà, ngõ, đường' }]}
            >
                <Input placeholder="Ví dụ: Số 123, ngõ 45, đường ABC" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Tiếp tục
                </Button>
            </Form.Item>
        </Form>
    );
}
