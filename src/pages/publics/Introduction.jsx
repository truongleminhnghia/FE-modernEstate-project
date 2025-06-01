import React, { useState } from 'react';
import { Tabs, Typography, Row, Col, Collapse, Card, Avatar, List, Form, Input, Button } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  QuestionCircleOutlined,
  FileTextOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  RocketOutlined,
  BulbOutlined,
  RightOutlined,
} from '@ant-design/icons';
import './Introduction.css';

const { TabPane } = Tabs;
const { Title, Paragraph, Text, Link } = Typography;
const { Panel } = Collapse;

const companyInfo = {
  mission: "Kết nối cộng đồng, kiến tạo không gian sống lý tưởng và mang đến những giao dịch bất động sản minh bạch, hiệu quả cho mọi khách hàng.",
  vision: "Trở thành nền tảng bất động sản công nghệ hàng đầu Việt Nam, được tin cậy bởi sự chuyên nghiệp, đổi mới và tận tâm.",
  coreValues: [
    { icon: <UserOutlined />, title: "Khách hàng là trung tâm", description: "Luôn lắng nghe, thấu hiểu và đặt lợi ích của khách hàng lên hàng đầu." },
    { icon: <TeamOutlined />, title: "Chuyên nghiệp & Chính trực", description: "Hoạt động với sự minh bạch, đạo đức và trách nhiệm cao nhất." },
    { icon: <RocketOutlined />, title: "Đổi mới & Sáng tạo", description: "Không ngừng ứng dụng công nghệ và cải tiến để mang lại trải nghiệm vượt trội." },
    { icon: <HeartOutlined />, title: "Tận tâm & Đồng hành", description: "Hỗ trợ khách hàng từ bước đầu tiên đến khi hoàn tất giao dịch và hơn thế nữa." },
  ],
  history: "Modern Estate chính thức ra mắt vào đầu năm 2025, mang theo một khát vọng lớn: tạo ra một sự thay đổi tích cực và hiện đại trong cách mọi người tìm kiếm, trải nghiệm và thực hiện giao dịch bất động sản. Nhận thấy tiềm năng của công nghệ trong việc kết nối và minh bạch hóa thông tin, đội ngũ của chúng tôi đã cùng nhau xây dựng một nền tảng tập trung vào sự tiện lợi, chính xác và trải nghiệm người dùng tối ưu. \n\n Dù hành trình chỉ mới bắt đầu, mỗi thành viên của Modern Estate đều đang nỗ lực từng ngày để hoàn thiện sản phẩm, lắng nghe những phản hồi đầu tiên và xây dựng một cộng đồng nơi niềm tin và giá trị được đặt lên hàng đầu. Chúng tôi tin rằng với sự tận tâm và không ngừng đổi mới, Modern Estate sẽ sớm trở thành người bạn đồng hành đáng tin cậy trên hành trình tìm kiếm tổ ấm và cơ hội đầu tư của quý vị.",
};

const faqs = {
  buyer: [
    { q: "Làm thế nào để tìm kiếm căn hộ phù hợp trên Modern Estate?", a: "Bạn có thể sử dụng bộ lọc chi tiết của chúng tôi về vị trí, giá, diện tích, số phòng ngủ, tiện ích... để thu hẹp kết quả tìm kiếm theo đúng nhu cầu của mình." },
    { q: "Quy trình mua một căn hộ diễn ra như thế nào?", a: "Quy trình cơ bản bao gồm: tìm kiếm, tham quan thực tế, đàm phán giá, kiểm tra pháp lý, ký hợp đồng đặt cọc, ký hợp đồng mua bán và hoàn tất thủ tục sang tên." },
    { q: "Modern Estate có hỗ trợ vay vốn ngân hàng không?", a: "Chúng tôi có liên kết với nhiều đối tác ngân hàng uy tín và sẵn sàng tư vấn, giới thiệu các gói vay phù hợp với khả năng tài chính của bạn." },
  ],
  seller: [
    { q: "Làm sao để đăng tin bán/cho thuê căn hộ?", a: "Bạn chỉ cần tạo tài khoản, chọn mục 'Đăng tin' và điền đầy đủ thông tin theo hướng dẫn. Đội ngũ của chúng tôi sẽ duyệt tin và hỗ trợ bạn nếu cần." },
    { q: "Chi phí đăng tin trên Modern Estate là bao nhiêu?", a: "Chúng tôi có các gói đăng tin khác nhau, từ miễn phí đến các gói VIP với nhiều ưu đãi quảng bá. Vui lòng tham khảo bảng giá chi tiết hoặc liên hệ để được tư vấn." },
  ],
};

const policies = [
  { title: "Điều khoản Sử dụng Dịch vụ", link: "/terms-of-service", description: "Quy định các điều kiện và thỏa thuận khi bạn sử dụng nền tảng và dịch vụ của Modern Estate." },
  { title: "Chính sách Bảo mật Thông tin", link: "/privacy-policy", description: "Giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn." },
  { title: "Quy chế Hoạt động Sàn Giao Dịch TMĐT", link: "/operational-regulations", description: "Các quy định liên quan đến hoạt động của Modern Estate với vai trò là sàn giao dịch thương mại điện tử." },
  { title: "Chính sách Giải quyết Tranh chấp", link: "/dispute-resolution", description: "Quy trình và phương thức giải quyết các vấn đề phát sinh giữa các bên." },
];

const ContactInfo = () => (
  <Row gutter={[24, 24]}>
    <Col xs={24} md={12}>
      <Title level={4} style={{marginBottom: 20}}>Gửi Lời Nhắn Cho Chúng Tôi</Title>
      <Form layout="vertical" name="contact_form" onFinish={(values) => console.log('Form values:', values)}>
        <Form.Item name="name" label="Họ và Tên" rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}>
          <Input placeholder="Nhập họ và tên của bạn" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}>
          <Input placeholder="Nhập địa chỉ email" />
        </Form.Item>
        <Form.Item name="subject" label="Chủ đề" rules={[{ required: true, message: 'Vui lòng nhập chủ đề!' }]}>
          <Input placeholder="Chủ đề lời nhắn" />
        </Form.Item>
        <Form.Item name="message" label="Nội dung lời nhắn" rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}>
          <Input.TextArea rows={4} placeholder="Nội dung bạn muốn gửi..." />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{borderRadius: 20, padding: '0 30px'}}>
            Gửi Lời Nhắn
          </Button>
        </Form.Item>
      </Form>
    </Col>
    <Col xs={24} md={12}>
      <Title level={4} style={{marginBottom: 20}}>Thông Tin Liên Hệ Trực Tiếp</Title>
      <Paragraph style={{fontSize: 16}}>
        <EnvironmentOutlined style={{ marginRight: 8, color: '#4a90e2' }} />
        <strong>Địa chỉ:</strong> Số 123 Đường ABC, Phường XYZ, Quận Hoàn Kiếm, Hà Nội (Ví dụ)
      </Paragraph>
      <Paragraph style={{fontSize: 16}}>
        <PhoneOutlined style={{ marginRight: 8, color: '#4a90e2' }} />
        <strong>Hotline:</strong> <a href="tel:19001234">1900 1234</a> (Nhánh 1: Hỗ trợ KH, Nhánh 2: Hợp tác)
      </Paragraph>
      <Paragraph style={{fontSize: 16}}>
        <MailOutlined style={{ marginRight: 8, color: '#4a90e2' }} />
        <strong>Email:</strong> <a href="mailto:support@modernestate.vn">support@modernestate.vn</a>
      </Paragraph>
      <Paragraph style={{fontSize: 16}}>
        <strong>Giờ làm việc:</strong> Thứ 2 - Thứ 6: 8:00 - 17:30; Thứ 7: 8:00 - 12:00
      </Paragraph>
      <div style={{marginTop: 20, height: 250, backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8}}>
        {/* Bạn có thể nhúng Google Maps vào đây */}
        <Text type="secondary">(Khu vực nhúng bản đồ Google Maps)</Text>
      </div>
    </Col>
  </Row>
);


const Introduction = () => {
  const [showFullHistory, setShowFullHistory] = useState(false);
  const maxHistoryLength = 350; // Số ký tự muốn hiển thị trước khi ẩn

  return (
    <div className="information-page-container" style={{ maxWidth: 1200, margin: '40px auto', padding: '0 20px' }}>
      <Title level={1} style={{ textAlign: 'center', marginBottom: 40, fontWeight:700 }}>
        THÔNG TIN <span style={{color: '#4a90e2'}}>MODERN ESTATE</span>
      </Title>

      <Tabs defaultActiveKey="1" centered size="large" type="line">
        <TabPane
          tab={<span><BulbOutlined /> Về Chúng Tôi</span>}
          key="1"
          className="info-tab-pane"
        >
          <Row gutter={[32, 32]} style={{marginTop: 20}}>
            <Col xs={24} md={12}>
                <Card bordered={false} style={{backgroundColor: '#f9f9f9', borderRadius: 8, padding: 10}}>
                    <Title level={3} style={{color: '#4a90e2'}}>Sứ Mệnh</Title>
                    <Paragraph style={{fontSize: 16, lineHeight: 1.7}}>{companyInfo.mission}</Paragraph>
                </Card>
            </Col>
            <Col xs={24} md={12}>
                <Card bordered={false} style={{backgroundColor: '#f9f9f9', borderRadius: 8, padding: 10}}>
                    <Title level={3} style={{color: '#4a90e2'}}>Tầm Nhìn</Title>
                    <Paragraph style={{fontSize: 16, lineHeight: 1.7}}>{companyInfo.vision}</Paragraph>
                </Card>
            </Col>
          </Row>
          <div style={{marginTop: 30}}>
            <Title level={3} style={{textAlign: 'center', marginBottom: 30}}>Giá Trị Cốt Lõi</Title>
            <Row gutter={[24, 24]} justify="center">
              {companyInfo.coreValues.map(value => (
                <Col xs={24} sm={12} md={6} key={value.title}>
                  <Card hoverable style={{textAlign: 'center', borderRadius: 8, height: '100%'}}>
                    <Avatar size={64} icon={value.icon} style={{backgroundColor: 'transparent', color: '#4a90e2', fontSize: 32, marginBottom: 16}}/>
                    <Title level={5} style={{minHeight: 40}}>{value.title}</Title>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
           <div style={{marginTop: 40}}>
                <Title level={3}>Lịch Sử Hình Thành</Title>
                <Paragraph style={{fontSize: 16, lineHeight: 1.7,  textAlign: 'justify', whiteSpace: 'pre-line'}}>
                    {showFullHistory || companyInfo.history.length <= maxHistoryLength
                        ? companyInfo.history
                        : (
                            <>
                                {companyInfo.history.slice(0, maxHistoryLength)}...
                                <Button
                                    type="link"
                                    style={{ paddingLeft: 4, fontWeight: 500 }}
                                    onClick={() => setShowFullHistory(true)}
                                >
                                    Đọc thêm
                                </Button>
                            </>
                        )
                    }
                    {showFullHistory && companyInfo.history.length > maxHistoryLength && (
                        <Button
                            type="link"
                            style={{ paddingLeft: 4, fontWeight: 500 }}
                            onClick={() => setShowFullHistory(false)}
                        >
                            Thu gọn
                        </Button>
                    )}
                </Paragraph>
            </div>
        </TabPane>

        <TabPane
          tab={<span><BookOutlined /> Hướng Dẫn & Tài Nguyên</span>}
          key="2"
          className="info-tab-pane"
        >
          <Title level={3} style={{marginTop: 20, marginBottom: 20}}>Câu Hỏi Thường Gặp (FAQs)</Title>
          <Collapse accordion bordered={false} defaultActiveKey={['1']} className="faq-collapse">
            <Panel header={<Text strong>Dành cho Người Mua/Thuê</Text>} key="1" className="faq-panel">
              <List
                itemLayout="horizontal"
                dataSource={faqs.buyer}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<QuestionCircleOutlined style={{color: '#4a90e2', fontSize: 20}} />}
                      title={<Text strong>{item.q}</Text>}
                      description={<Paragraph style={{marginBottom: 0}}>{item.a}</Paragraph>}
                    />
                  </List.Item>
                )}
              />
            </Panel>
            <Panel header={<Text strong>Dành cho Người Bán/Cho Thuê</Text>} key="2" className="faq-panel">
               <List
                itemLayout="horizontal"
                dataSource={faqs.seller}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<QuestionCircleOutlined style={{color: '#52c41a', fontSize: 20}} />}
                      title={<Text strong>{item.q}</Text>}
                      description={<Paragraph style={{marginBottom: 0}}>{item.a}</Paragraph>}
                    />
                  </List.Item>
                )}
              />
            </Panel>
          </Collapse>
          {/* Bạn có thể thêm các mục hướng dẫn chi tiết khác ở đây */}
           <Title level={3} style={{marginTop: 40, marginBottom: 20}}>Bài Viết Hướng Dẫn</Title>
           <Row gutter={[16,16]}>
            <Col xs={24} md={8}>
                <Card hoverable title="5 Lưu ý khi mua căn hộ lần đầu" extra={<Link href="/guides/buying-tips">Đọc thêm</Link>}>
                    <Paragraph ellipsis={{rows: 3, expandable: false}}>Những điều cần biết để tránh rủi ro và chọn được căn nhà ưng ý cho người mới bắt đầu hành trình an cư...</Paragraph>
                </Card>
            </Col>
            <Col xs={24} md={8}>
                <Card hoverable title="Kinh nghiệm đăng tin bán nhà hiệu quả" extra={<Link href="/guides/selling-tips">Đọc thêm</Link>}>
                    Bí quyết tối ưu hóa tin đăng, thu hút nhiều người xem và chốt giao dịch nhanh chóng trên nền tảng số...</Card>
            </Col>
             <Col xs={24} md={8}>
                <Card hoverable title="Thủ tục pháp lý cần biết khi giao dịch BĐS" extra={<Link href="/guides/legal-procedures">Đọc thêm</Link>}>
                    Tổng hợp các giấy tờ, quy trình pháp lý quan trọng bạn cần nắm vững để đảm bảo quyền lợi...</Card>
            </Col>
           </Row>
        </TabPane>

        <TabPane
          tab={<span><FileTextOutlined /> Chính Sách & Điều Khoản</span>}
          key="3"
          className="info-tab-pane"
        >
          <Title level={3} style={{marginTop: 20, marginBottom: 30}}>Quy Định và Chính Sách của Chúng Tôi</Title>
          <List
            itemLayout="vertical"
            dataSource={policies}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                  <Button type="link" href={item.link} style={{paddingLeft: 0}}>
                    Xem chi tiết <RightOutlined />
                  </Button>
                ]}
              >
                <List.Item.Meta
                  title={<Link href={item.link} style={{fontSize: 18, color: '#4a90e2'}}>{item.title}</Link>}
                  description={<Paragraph style={{fontSize: 15}}>{item.description}</Paragraph>}
                />
              </List.Item>
            )}
          />
        </TabPane>

        <TabPane
          tab={<span><PhoneOutlined /> Liên Hệ Với Chúng Tôi</span>}
          key="4"
          className="info-tab-pane"
        >
            <div style={{marginTop: 20}}>
                <ContactInfo />
            </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Introduction;