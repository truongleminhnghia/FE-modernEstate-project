// src/pages/publics/NewsDetailPage.js (Phiên bản Ant Design - không dùng ID từ URL)
import React, { useState, useEffect } from "react";
// Bỏ useParams nếu không dùng ID từ URL
// import { useParams, Link, useNavigate } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom"; // Vẫn giữ Link và useNavigate
import {
  Row,
  Col,
  Typography,
  Image,
  Tag,
  Spin,
  Breadcrumb,
  Divider,
  Button,
  Affix,
  Space,
  message,
  Result,
  Dropdown,
  Menu,
  Card,
} from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  TagsOutlined,
  LeftOutlined,
  ShareAltOutlined,
  HomeOutlined,
  ReadOutlined,
  FacebookFilled,
  TwitterSquareFilled,
  WhatsAppOutlined,
  CopyOutlined,
  LinkedinFilled,
} from "@ant-design/icons";
import moment from "moment";
import "moment/locale/vi";

const { Title, Text, Paragraph } = Typography;
const primaryColor = "#4a90e2";

// Dữ liệu mẫu cho Tin tức (đặt trực tiếp trong component)
const mockNewsArticles = [
  {
    id: "1", // ID vẫn cần để làm key hoặc tham chiếu nội bộ nếu cần
    title:
      "Thị trường căn hộ TP.HCM Quý 2/2025: Nguồn cung mới và xu hướng giá",
    publicationDate: "2025-05-20T10:00:00Z",
    author: "Ban biên tập RealHome",
    category: "Phân tích thị trường",
    imageUrl:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50JTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    content: `
      <p>Quý 2 năm 2025 chứng kiến nhiều biến động đáng chú ý trên thị trường căn hộ TP.HCM. Theo báo cáo mới nhất từ Savills Việt Nam, nguồn cung căn hộ mới có sự cải thiện nhẹ so với quý trước, tập trung chủ yếu ở khu Đông và khu Nam thành phố.</p>
      <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBhcnRtZW50JTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=700&q=60" alt="Dự án mới" style="width:100%;max-width:600px;margin:15px auto;display:block;border-radius:8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
      <h2>Nguồn cung và Phân khúc chủ đạo</h2>
      <p>Các dự án mới ra mắt chủ yếu thuộc phân khúc trung và cao cấp, đáp ứng nhu cầu ở thực của một bộ phận lớn người dân cũng như giới đầu tư. Phân khúc căn hộ bình dân vẫn khan hiếm, tạo ra áp lực không nhỏ lên giá nhà ở các khu vực ven trung tâm.</p>
      <p>Ông Troy Griffiths, Phó Tổng Giám đốc Savills Việt Nam, nhận định: "<em>Thị trường đang dần tìm thấy điểm cân bằng mới. Tuy nhiên, các yếu tố như chính sách tín dụng, lãi suất và tiến độ pháp lý dự án vẫn sẽ là những yếu tố then chốt ảnh hưởng đến sức mua trong các quý tới.</em>"</p>
      <h3 style="color: ${primaryColor};">Xu hướng giá</h3>
      <p>Giá bán sơ cấp căn hộ tại TP.HCM trong quý 2/2025 ghi nhận mức tăng trung bình từ 3-5% so với quý trước, tùy thuộc vào vị trí và phân khúc. Các dự án có pháp lý hoàn chỉnh, tiến độ xây dựng tốt và được phát triển bởi các chủ đầu tư uy tín vẫn thu hút được sự quan tâm lớn.</p>
      <ul style="list-style-type: disc; margin-left: 20px; padding-left: 5px;">
        <li><strong>Khu Đông:</strong> Giá tiếp tục neo ở mức cao do hạ tầng phát triển mạnh.</li>
        <li><strong>Khu Nam:</strong> Nguồn cung mới dồi dào hơn, giá cạnh tranh.</li>
        <li><strong>Khu Tây:</strong> Phát triển ổn định, tập trung vào nhu cầu ở thực.</li>
      </ul>
      <h2>Dự báo cho Quý 3</h2>
      <p>Dự kiến Quý 3/2025, thị trường sẽ tiếp tục sôi động hơn khi một số dự án lớn được cấp phép xây dựng và mở bán. Tuy nhiên, người mua nhà được khuyên nên cẩn trọng tìm hiểu kỹ thông tin pháp lý và uy tín chủ đầu tư trước khi ra quyết định.</p>
    `,
    tags: ["căn hộ", "TP.HCM", "bất động sản", "nguồn cung", "xu hướng giá"],
  },
  {
    id: "2",
    title: "5 Lưu ý vàng khi đầu tư bất động sản cho người mới bắt đầu",
    publicationDate: "2025-05-15T14:30:00Z",
    author: "Chuyên gia John Doe",
    category: "Kinh nghiệm đầu tư",
    imageUrl:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    content: `<p>Đầu tư bất động sản là một lựa chọn tốt...</p>`,
    tags: ["đầu tư", "bất động sản", "kinh nghiệm"],
  },
];

const NewsDetail = () => {
  const navigate = useNavigate();
  const [currentNews, setCurrentNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    moment.locale("vi");
    setLoading(true);
    setError(null);

    const newsIdToDisplay = "1";
    const foundNews = mockNewsArticles.find(
      (article) => article.id === newsIdToDisplay
    );

    const timer = setTimeout(() => {
      if (foundNews) {
        setCurrentNews(foundNews);
        document.title = `${foundNews.title} | RealHome News`;
      } else {
        // Nếu ID fix cứng không có trong mock data
        setError(`Không tìm thấy bài viết mẫu với ID "${newsIdToDisplay}".`);
      }
      setLoading(false);
    }, 200); // Giảm độ trễ để xem nhanh hơn

    return () => clearTimeout(timer);
  }, []); // Bỏ newsId khỏi mảng dependencies, chỉ chạy 1 lần

  const handleShare = (platform) => {
    const url = window.location.href; // URL của trang hiện tại (sẽ là route tĩnh bạn đặt cho trang này)
    const title = currentNews?.title || "Bài viết thú vị";
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          url
        )}&title=${encodeURIComponent(title)}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          title + " " + url
        )}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        message.success("Đã sao chép liên kết bài viết!");
        return;
      default:
        if (navigator.share) {
          navigator
            .share({ title: title, text: `Xem bài viết: ${title}`, url: url })
            .catch((error) => console.log("Lỗi khi chia sẻ:", error));
        } else {
          navigator.clipboard.writeText(url);
          message.info(
            "Trình duyệt không hỗ trợ chia sẻ trực tiếp, đã sao chép link!"
          );
        }
        return;
    }
    if (shareUrl)
      window.open(
        shareUrl,
        "_blank",
        "noopener,noreferrer,width=600,height=400"
      );
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 200px)",
          padding: "40px 0",
        }}
      >
        <Spin size="large" tip="Đang tải bài viết..." />
      </div>
    );
  }

  if (error || !currentNews) {
    return (
      <Result
        status="404"
        title="404 - Lỗi hoặc không tìm thấy"
        subTitle={error || "Không có dữ liệu bài viết mẫu để hiển thị."}
        extra={
          <Button
            type="primary"
            onClick={() => navigate("/")}
            style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
          >
            Về Trang chủ
          </Button>
        }
        style={{ padding: "40px 0" }}
      />
    );
  }

  const shareMenu = (
    <Menu onClick={({ key }) => handleShare(key)}>
      <Menu.Item
        key="facebook"
        icon={<FacebookFilled style={{ color: "#1877F2" }} />}
      >
        Facebook
      </Menu.Item>
      <Menu.Item
        key="twitter"
        icon={<TwitterSquareFilled style={{ color: "#1DA1F2" }} />}
      >
        Twitter
      </Menu.Item>
      <Menu.Item
        key="linkedin"
        icon={<LinkedinFilled style={{ color: "#0A66C2" }} />}
      >
        LinkedIn
      </Menu.Item>
      <Menu.Item
        key="whatsapp"
        icon={<WhatsAppOutlined style={{ color: "#25D366" }} />}
      >
        WhatsApp
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="copy" icon={<CopyOutlined />}>
        Sao chép liên kết
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ background: "#fff", borderRadius: "8px" }}>
      <Row justify="center">
        <Col
          xs={23}
          sm={22}
          md={20}
          lg={18}
          xl={16}
          style={{ padding: "24px 0" }}
        >
          <Affix offsetTop={15} style={{ zIndex: 10 }}>
            <Button
              type="default"
              shape="round"
              icon={<LeftOutlined />}
              onClick={() => navigate(-1)}
              style={{
                marginBottom: 16,
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(4px)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              Quay lại
            </Button>
          </Affix>

          <Breadcrumb style={{ marginBottom: "20px", fontSize: "0.9em" }}>
            <Breadcrumb.Item>
              <Link to="/">
                <HomeOutlined />
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/news">
                <ReadOutlined /> Tin tức
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item
              style={{
                maxWidth: "300px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {currentNews.title}
            </Breadcrumb.Item>
          </Breadcrumb>

          <Card bordered={false} bodyStyle={{ padding: "24px 0" }}>
            <header style={{ marginBottom: 24 }}>
              <Tag
                color={primaryColor}
                style={{
                  marginBottom: 10,
                  fontSize: "0.9em",
                  padding: "3px 10px",
                }}
              >
                {currentNews.category}
              </Tag>
              <Title
                level={1}
                style={{
                  marginBottom: 12,
                  fontSize: "2.5em",
                  lineHeight: "1.3",
                }}
              >
                {currentNews.title}
              </Title>
              <Space
                size="middle"
                style={{ color: "#595959", fontSize: "0.95em" }}
              >
                <span>
                  <UserOutlined /> {currentNews.author}
                </span>
                <span>
                  <CalendarOutlined />{" "}
                  {moment(currentNews.publicationDate).format(
                    "dddd, DD/MM/YYYY HH:mm"
                  )}
                </span>
              </Space>
            </header>

            {currentNews.imageUrl && (
              <Row justify="center" style={{ marginBottom: "24px" }}>
                <Col>
                  <Image
                    src={currentNews.imageUrl}
                    alt={currentNews.title}
                    style={{
                      width: "100%",
                      maxHeight: "500px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                    }}
                  />
                </Col>
              </Row>
            )}
            <Divider />

            <div
              className="news-article-content"
              style={{
                lineHeight: "1.9",
                fontSize: "1.1em",
                color: "#333",
                padding: "0 8px",
              }}
              dangerouslySetInnerHTML={{ __html: currentNews.content }}
            />

            {currentNews.tags && currentNews.tags.length > 0 && (
              <div style={{ marginTop: "32px" }}>
                <Text strong style={{ fontSize: "1.05em" }}>
                  <TagsOutlined /> Tags:{" "}
                </Text>
                {currentNews.tags.map((tag) => (
                  <Tag
                    key={tag}
                    color="blue"
                    style={{
                      margin: "4px",
                      fontSize: "0.9em",
                      padding: "3px 8px",
                    }}
                  >
                    <Link to={`/news`}>{tag}</Link>
                  </Tag>
                ))}
              </div>
            )}

            <Divider style={{ marginTop: "32px" }} />

            <Row
              justify="space-between"
              align="middle"
              style={{ marginTop: "24px" }}
            >
              <Col>
                <Button
                  type="default"
                  shape="round"
                  onClick={() => navigate("/news")} // Nút này sẽ đưa về trang danh sách tin
                  icon={<ReadOutlined />}
                  style={{ borderColor: primaryColor, color: primaryColor }}
                >
                  Xem các tin khác
                </Button>
              </Col>
              <Col>
                <Dropdown overlay={shareMenu} placement="bottomRight">
                  <Button
                    type="primary"
                    shape="round"
                    icon={<ShareAltOutlined />}
                    style={{
                      backgroundColor: primaryColor,
                      borderColor: primaryColor,
                    }}
                  >
                    Chia sẻ
                  </Button>
                </Dropdown>
              </Col>
            </Row>

            <div
              style={{
                marginTop: 40,
                background: "#fafafa",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <Title level={4} style={{ color: primaryColor }}>
                Bài viết liên quan
              </Title>
              <Paragraph type="secondary">
                Chức năng hiển thị các bài viết liên quan đang được phát triển.
              </Paragraph>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NewsDetail;
