import { Form, DatePicker, InputNumber, Input, Button, Spin, Card, Row, Col, Alert, Select } from 'antd';
import { useEffect, useState } from 'react';
import { packages as fetchPackages } from '../../../services/package.service';
import dayjs from 'dayjs';

export default function PackageForm({ onFinish, initialValues }) {
    const [pkgList, setPkgList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [selectedPkg, setSelectedPkg] = useState(
        initialValues
            ? { id: initialValues.packageId, price: initialValues.totalAmout, currency: initialValues.currency }
            : null
    );

    // Watch dates
    const startDate = Form.useWatch('startDate', form);
    const endDate = Form.useWatch('endDate', form);

    // Load packages on mount
    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                const res = await fetchPackages();
                setPkgList(res.rowDatas);
            } catch {
                setPkgList([]);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    // Initialize form on edit
    useEffect(() => {
        if (initialValues) form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    // Recalculate total amount when dates or package change
    useEffect(() => {
        if (startDate && endDate && selectedPkg) {
            const days = dayjs(endDate).diff(dayjs(startDate), 'day') + 1;
            form.setFieldsValue({ totalAmout: days * selectedPkg.price });
        }
    }, [startDate, endDate, selectedPkg, form]);

    const handleSelect = (pkg) => {
        setSelectedPkg({ id: pkg.id, price: pkg.price, currency: pkg.currency });
        form.setFieldsValue({
            packageId: pkg.id,
            totalAmout: 0,
            currency: pkg.currency,
        });
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={initialValues}
            className="mt-4"
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="startDate"
                        label="Ngày bắt đầu"
                        rules={[{ required: true, message: 'Chọn ngày bắt đầu' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="endDate"
                        label="Ngày kết thúc"
                        rules={[{ required: true, message: 'Chọn ngày kết thúc' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>

            {/* Show package list only after dates selected */}
            {/* {!(startDate && endDate) ? (
                <Alert
                    message="Vui lòng chọn ngày bắt đầu và kết thúc trước khi chọn gói đăng tin"
                    type="info"
                    showIcon
                    className="mb-4"
                />
            ) : ( */}
                <div className="bg-white border w-[300px] p-4 space-y-2 overflow-auto mb-4">
                    <h2 className="font-bold text-lg">Chọn gói đăng tin</h2>
                    {loading ? (
                        <Spin />
                    ) : (
                        pkgList.map((pkg) => (
                            <Card
                                key={pkg.id}
                                size="small"
                                hoverable
                                className="cursor-pointer"
                                style={{ borderColor: pkg.id === selectedPkg?.id ? '#1890ff' : undefined }}
                                onClick={() => handleSelect(pkg)}
                            >
                                <h3>{pkg.packageName}</h3>
                                <p>{pkg.description}</p>
                                <p>
                                    <strong>{pkg.price} VND</strong>
                                </p>
                            </Card>
                        ))
                    )}
                </div>
            {/* )} */}

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="totalAmout"
                        label="Tổng phí"
                        rules={[{ type: 'number', min: 0, required: true }]}
                    >
                        <InputNumber style={{ width: '100%' }} addonAfter="VND" disabled />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="currency" label="Đơn vị">
                        <Select
                        >
                            <Option value='VND'>
                                VND
                            </Option>
                            <Option value='USD'>
                                USD
                            </Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>


            <Form.Item name="packageId" hidden>
                <Input />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!selectedPkg || !(startDate && endDate)}
                >
                    Tiếp tục
                </Button>
            </Form.Item>
        </Form>
    );
}
