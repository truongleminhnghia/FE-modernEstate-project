import { Button, Form, Input, Select } from "antd";

export default function DemandContactForm({ onFinish, initialValues }) {
    return (
        <div className="container">
            <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={initialValues}
            >
                <Form.Item
                    name="demand"
                    label="Nhu Cầu"
                    rules={[
                        { required: true, message: 'Chọn nhu cầu' }
                    ]}
                >
                    <Select placeholder='Vui lòng chọn như cầu căn hộ'>
                        <Select.Option value='MUA_BÁN'>Mua bán</Select.Option>
                        <Select.Option value='CHO_THUÊ'>Cho thuê</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="contactName"
                    label="Tên liên hệ"
                    rules={[{ required: true, message: 'Nhập tên người liên hệ' }]}
                >
                    <Input placeholder="Tên người liên hệ" />
                </Form.Item>

                <Form.Item
                    name="contactEmail"
                    label="Email liên hệ"
                    rules={[
                        { required: true, message: 'Nhập email' },
                        { type: 'email', message: 'Email không hợp lệ' }
                    ]}
                >
                    <Input placeholder="example@domain.com" />
                </Form.Item>

                <Form.Item
                    name="contactPhone"
                    label="Số điện thoại"
                    rules={[{ required: true, message: 'Nhập số điện thoại' }]}
                >
                    <Input placeholder="0123456789" maxLength={15} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Tiếp tục
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}