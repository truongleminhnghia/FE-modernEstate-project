import { Result, Button } from 'antd';

export default function Success({ onAgain }) {
    return (
        <Result
            status="success"
            title="Đăng tin thành công"
            extra={[
                <Button type="primary" key="again" onClick={onAgain}>
                    Đăng tin khác
                </Button>
            ]}
        />
    );
}