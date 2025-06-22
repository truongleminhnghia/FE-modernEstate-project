import { Card, Descriptions, Button } from 'antd';

export default function Confirm({ combined, onFinish }) {
    return (
        <Card title="Xác nhận thông tin">
            <Descriptions column={1} bordered>
                <Descriptions.Item label="Loại giao dịch">{combined.demand}</Descriptions.Item>
                <Descriptions.Item label="Tên liên hệ">{combined.contact.contactName}</Descriptions.Item>
                <Descriptions.Item label="Email liên hệ">{combined.contact.contactEmail}</Descriptions.Item>
                <Descriptions.Item label="SĐT liên hệ">{combined.contact.contactPhone}</Descriptions.Item>

                {/* New Property */}
                <Descriptions.Item label="Tiêu đề">{combined.newProperty.title}</Descriptions.Item>
                <Descriptions.Item label="Mô tả">{combined.newProperty.description}</Descriptions.Item>
                {/* ... thêm các trường theo need ... */}

                {/* Package */}
                <Descriptions.Item label="Bắt đầu">{combined.postPackagesRequest.startDate?.format('YYYY-MM-DD')}</Descriptions.Item>
                <Descriptions.Item label="Kết thúc">{combined.postPackagesRequest.endDate?.format('YYYY-MM-DD')}</Descriptions.Item>
                <Descriptions.Item label="Tổng phí">{combined.postPackagesRequest.totalAmout} {combined.postPackagesRequest.currency}</Descriptions.Item>
            </Descriptions>
            <Button type="primary" style={{ marginTop: 16 }} onClick={onFinish}>
                Xác nhận và gửi
            </Button>
        </Card>
    );
}