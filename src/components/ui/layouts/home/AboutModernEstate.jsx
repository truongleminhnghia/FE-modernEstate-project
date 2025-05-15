import React from "react";
import { Typography, Image } from "antd";

const { Title, Paragraph } = Typography;

const AboutModernEstate = () => {
  return (
    <div style={{ padding: "40px 0" }}>
      <div>
        <div
          style={{
            fontSize: 26,
            fontWeight: 600,
            marginBottom: 24,
            textAlign: "left",
          }}
        >
          Về <span style={{color: "#4a90e2"}}> Modern Estate</span>
        </div>

        <div
          style={{
            backgroundColor: "#eaf4fd",
            borderRadius: 12,
            padding: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          <Image
            src="/images/logos/logo-estate.png"
            alt="Modern Estate"
            preview={false}
            width={100}
            style={{ minWidth: 80 }}
          />

          <div style={{ maxWidth: 800 }}>
            <Paragraph style={{ margin: 0, fontSize: 16, lineHeight: 1.75 }}>
              <strong>Modern Estate</strong> – Giải pháp công nghệ cho thuê &
              mua bán căn hộ. Chúng tôi kết nối khách hàng với môi giới và nhà
              đầu tư nhanh chóng, minh bạch, tối ưu trải nghiệm. Tận dụng công
              nghệ AI và dữ liệu thị trường, Modern Estate giúp bạn tìm được căn
              hộ phù hợp một cách dễ dàng và an toàn.
            </Paragraph>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModernEstate;
