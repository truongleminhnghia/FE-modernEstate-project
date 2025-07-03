// src/pages/publics/NewsDetailPage.js (Phiên bản Ant Design - không dùng ID từ URL)
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
import axios from "axios";

const { Title, Text, Paragraph } = Typography;
const primaryColor = "#4a90e2";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    moment.locale("vi");
    setLoading(true);
    setError(null);
    axios.get(`https://bemodernestate.site/api/v1/news/${id}`)
      .then(res => {
        setNews(res.data.data || res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không tìm thấy bài viết hoặc có lỗi khi tải dữ liệu.");
        setLoading(false);
      });
  }, [id]);

  const handleShare = (platform) => {
    const url = window.location.href; // URL của trang hiện tại (sẽ là route tĩnh bạn đặt cho trang này)
    const title = news?.title || "Bài viết thú vị";
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

  if (error || !news) {
    return (
      <Result
        status="404"
        title="404 - Lỗi hoặc không tìm thấy"
        subTitle={error || "Không có dữ liệu bài viết để hiển thị."}
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
              {news.title}
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
                {news.category && typeof news.category === 'object' ? news.category.categoryName : news.category}
              </Tag>
              <Title
                level={1}
                style={{
                  marginBottom: 12,
                  fontSize: "2.5em",
                  lineHeight: "1.3",
                }}
              >
                {news.title}
              </Title>
              <Space
                size="middle"
                style={{ color: "#595959", fontSize: "0.95em" }}
              >
                <span>
                  <UserOutlined /> {news.author}
                </span>
                <span>
                  <CalendarOutlined />{" "}
                  {moment(news.publishDate || news.publicationDate).format(
                    "dddd, DD/MM/YYYY HH:mm"
                  )}
                </span>
              </Space>
            </header>

            {news.imageUrl && (
              <Row justify="center" style={{ marginBottom: "24px" }}>
                <Col>
                  <Image
                    src={news.imageUrl}
                    alt={news.title}
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
              dangerouslySetInnerHTML={{ __html: news.content }}
            />

            {news.tags && news.tags.length > 0 && (
              <div style={{ marginTop: "32px" }}>
                <Text strong style={{ fontSize: "1.05em" }}>
                  <TagsOutlined /> Tags: {" "}
                </Text>
                {news.tags.map((tag) => (
                  <Tag
                    key={tag.id}
                    color="blue"
                    style={{
                      margin: "4px",
                      fontSize: "0.9em",
                      padding: "3px 8px",
                    }}
                  >
                    <Link to={`/news`}>{tag.tagName}</Link>
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
                  onClick={() => navigate("/news")}
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
