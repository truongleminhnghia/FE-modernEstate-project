import React from "react";
import "./ProjectDetailsPage.css";
import { useParams } from "react-router-dom";

const projects = [
  {
    id: 1,
    name: "HONAS RESIDENCE",
    status: "Đang xây dựng",
    area: "9200 m²",
    address: "Thuận Giao D5, Nguyễn Văn Bá, Dĩ An, Bình Dương",
    company: "Cty CP DTTM BĐS Đại Quang Minh",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    featured: true,
  },
  {
    id: 2,
    name: "HT PEARL",
    status: "Đang xây dựng",
    area: "5000 m²",
    address: "Thuận Giao D5, Nguyễn Văn Bá, Dĩ An, Bình Dương",
    company: "Cty CP DTTM BĐS Đại Quang Minh",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    featured: false,
  },
  {
    id: 3,
    name: "HT PEARL",
    status: "Đang xây dựng",
    area: "5000 m²",
    address: "Thuận Giao D5, Nguyễn Văn Bá, Dĩ An, Bình Dương",
    company: "Cty CP DTTM BĐS Đại Quang Minh",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
    featured: false,
  },
  {
    id: 4,
    name: "HT PEARL",
    status: "Đang xây dựng",
    area: "5000 m²",
    address: "Thuận Giao D5, Nguyễn Văn Bá, Dĩ An, Bình Dương",
    company: "Cty CP DTTM BĐS Đại Quang Minh",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    featured: false,
  },
  ...Array.from({ length: 8 }).map((_, i) => ({
    id: 5 + i,
    name: "HONAS RESIDENCE",
    status: "Đang xây dựng",
    area: "9200 m²",
    address: "Thuận Giao D5, Nguyễn Văn Bá, Dĩ An, Bình Dương",
    company: "Cty CP DTTM BĐS Đại Quang Minh",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    featured: false,
  })),
];

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === Number(id));

  if (!project) return <div>Không tìm thấy dự án.</div>;

  return (
    <div className="project-details-bg">
      <div className="project-details-breadcrumb">Trang chủ / Dự án / Chi tiết dự án</div>
      <div className="project-details-header-row">
        <div className="project-details-header-images-group">
          <div className="project-details-header-main-img-wrap">
            <img src="#" alt="main" className="project-details-header-main-img" />
          </div>
          <div className="project-details-header-thumbs">
            <img src="#" alt="img1" className="project-details-header-thumb" />
            <img src="#" alt="img2" className="project-details-header-thumb" />
            <img src="#" alt="img3" className="project-details-header-thumb" />
            <div className="project-details-header-thumb project-details-header-thumb-last">
              <img src="#" alt="img4" className="project-details-header-thumb-img" />
              <span className="project-details-header-thumb-more">Xem 8 ảnh</span>
            </div>
          </div>
        </div>
        <div className="project-details-header-info-box">
          <div className="project-details-header-title">Ariyana Lakeside Văn Quán (Hesco Văn Quán)</div>
          <div className="project-details-header-address">Số 3, đường Nguyễn Khuyến, Phường 12, Quận Bình Thạnh, TP.HCM</div>
          <hr className="project-details-header-hr" />
          <div className="project-details-header-info-list">
            <div><b>Giá từ:</b> <span>Đang cập nhật</span></div>
            <div><b>Chủ đầu tư:</b> <span>Công ty cổ phần thiết bị Thủy lợi (HESCO)</span></div>
            <div><b>Loại hình:</b> <span>Nhà biệt thự, liền kề, Căn hộ</span></div>
          </div>
        </div>
      </div>
      {/* Thông tin chi tiết dự án bên dưới */}
      <div className="project-details-section-row">
        {/* LEFT: Project Info */}
        <div className="project-details-section-main">
          <div className="project-details-section-label">THÔNG TIN DỰ ÁN</div>
          <div className="project-details-section-title">Tổng quan dự án Ariyana Lakeside Văn Quán (Hesco Văn Quán)</div>
          <div className="project-details-summary-table">
            <div className="project-details-summary-grid">
              <div><b>Giá từ:</b> Đang cập nhật</div>
              <div><b>Tổng diện tích:</b> 5.748,50 m2</div>
              <div><b>Chủ đầu tư:</b> Công ty cổ phần thiết bị Thủy lợi (HESCO)</div>
              <div><b>Diện tích xây dựng:</b> 3.199,88 m2</div>
              <div><b>Thời gian khởi công:</b> Quý 3/2021</div>
              <div><b>Loại hình:</b> Nhà biệt thự, liền kề, căn hộ</div>
              <div><b>Quy mô:</b> 2 tòa tháp cao 45 và 50 tầng, 1032 căn hộ</div>
              <div><b>Diện tích căn hộ:</b> 62m² – 73m² – 82m² – 89m² – 99m² – 111m²</div>
              <div><b>Pháp lý:</b> Quyết định của UBND TP số 4132-QĐ/UBND ngày 06/07/2017.</div>
              <div><b>Các loại hình sản phẩm:</b> Căn hộ, biệt thự, liền kề</div>
            </div>
          </div>
          <div className="project-details-desc">
          <b>Dự án do Gamuda Land phát triển</b> sở hữu vị trí đắc địa nhất Quận Hà Đông nằm tại ngã tư giao đường Nguyễn Khuyến, Vũ Trọng Khánh Mỗ Lao, Trần Phú, Quang Trung. Với quy mô lên tới 100.000m2 cùng hệ thống tiện ích nội khu và ngoại khu đa dạng, hiện đại, hạ tầng hoàn chỉnh được đánh giá là đẹp nhất khu vực phía tây thủ đô. Dự án có tổng diện tích đất là 5,748.50m2, do công ty cổ phần thiết bị Thủy lợi (HESCO) là chủ đầu tư, tọa lạc tại khu đô thị mới Văn Quán, phường Văn Quán, quận Hà Đông, Hà Nội. Thăng Long với gần 10.000 tỷ đồng và diện tích xây dựng là 3199.88m2.
        </div>
          <img src="https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2022/09/du-an-chung-cu.jpg" alt="phoi canh" className="project-details-main-img-desc" />
          <div className="project-details-img-caption">
          (Phối cảnh dự án Ariyana Lakeside Văn Quán (Hesco Văn Quán))
        </div>
          <div className="project-details-desc">
          Dự án do Gamuda Land phát triển là dự án duy nhất có quy mô 2 tòa tháp cao 45 và 50 tầng, 03 tầng hầm. Sở hữu trung tâm thương mại quy mô tổng diện tích lớn nhất khu vực này, tổng 5,748.50m2, chiều cao tối đa 182m, có thiết kế đa dạng 2-3 phòng ngủ.
        </div>
          <ul className="project-details-list">
          <li><b>Dự án:</b> Ariyana Lakeside Văn Quán (Hesco Văn Quán)</li>
          <li><b>Vị trí:</b> Đường số 3, Nguyễn Khuyến, Hà Đông, Hà Nội</li>
          <li><b>Chủ đầu tư:</b> Công ty cổ phần thiết bị Thủy Lợi (HESCO) Tập đoàn phát triển nhà và đô thị Thăng Long</li>
          <li><b>Tổng diện tích:</b> 5748.5m2</li>
          <li><b>Diện tích xây dựng:</b> 3199.88m2</li>
          <li><b>Quy mô:</b> 2 tòa tháp cao 45 và 50 tầng, 1032 căn hộ</li>
          <li><b>Diện tích căn hộ:</b> 62m² – 73m² – 82m² – 89m² – 99m² – 111m²</li>
          <li><b>Pháp lý:</b> Quyết định của UBND TP số 4132-QĐ/UBND ngày 06/07/2017.</li>
        </ul>
          <div className="project-details-collapse">
            <span>Thu gọn ▲</span>
          </div>
        </div>
        {/* RIGHT: Sidebar */}
        <div className="project-details-section-sidebar">
          <div className="project-details-download-box">
            <div className="project-details-download-title">Tải tài liệu và báo giá</div>
            <form>
              <div className="project-details-download-form">
                <input type="text" placeholder="Họ và tên" className="project-details-input" />
                <input type="email" placeholder="Email" className="project-details-input" />
                <input type="text" placeholder="Số điện thoại" className="project-details-input" />
              </div>
              <button type="submit" className="project-details-btn">Đăng ký</button>
            </form>
          </div>
          <div className="project-details-toc-box">
            <div className="project-details-toc-title">Mục lục</div>
            <ul className="project-details-toc-list">
              <li><a href="#tongquan">Tổng quan dự án</a></li>
              <li><a href="#vitri">Vị trí</a></li>
              <li><a href="#tienich">Tiện ích</a></li>
              <li><a href="#tien_do">Tiến độ dự án Ariyana Lakeside Văn Quán</a></li>
            </ul>
          </div>
        </div>
      </div>
      {/* Section: Vị trí dự án */}
      <div className="project-location-section">
        <div className="project-location-box">
          <div className="project-location-tabs">
            <button className="project-location-tab project-location-tab-active">Trường học</button>
            <button className="project-location-tab">Siêu thị</button>
            <button className="project-location-tab">Bến xe tàu</button>
            <button className="project-location-tab">Ngân hàng</button>
          </div>
          <div className="project-location-map-wrap">
            <img src="#" alt="map" className="project-location-map" />
          </div>
          <div className="project-location-list-table">
            <div className="project-location-list-row">
              <span className="project-location-list-icon"><i className="fas fa-school"></i></span>
              <span className="project-location-list-name">Trường Mầm non Song ngữ Global Kids - Cơ sở 3</span>
              <span className="project-location-list-address">Thành phố Dĩ An, TP.HCM</span>
              <span className="project-location-list-distance">2.5km</span>
            </div>
            <div className="project-location-list-row">
              <span className="project-location-list-icon"><i className="fas fa-school"></i></span>
              <span className="project-location-list-name">Trường Mầm non Quốc tế Grow Montessori - An Phú</span>
              <span className="project-location-list-address">Thành phố Dĩ An, TP.HCM</span>
              <span className="project-location-list-distance">2.7km</span>
            </div>
            <div className="project-location-list-row">
              <span className="project-location-list-icon"><i className="fas fa-school"></i></span>
              <span className="project-location-list-name">Trường Mầm non Montessori Academy - Thảo Điền</span>
              <span className="project-location-list-address">Thành phố Dĩ An, TP.HCM</span>
              <span className="project-location-list-distance">2.9km</span>
            </div>
            <div className="project-location-list-row">
              <span className="project-location-list-icon"><i className="fas fa-school"></i></span>
              <span className="project-location-list-name">Trường Mầm non Song ngữ WIS - Cơ sở Bàu Thắng Hai</span>
              <span className="project-location-list-address">Thành phố Dĩ An, TP.HCM</span>
              <span className="project-location-list-distance">3.2km</span>
            </div>
            <div className="project-location-list-row">
              <span className="project-location-list-icon"><i className="fas fa-university"></i></span>
              <span className="project-location-list-name">Trường Đại học Tài chính - Marketing</span>
              <span className="project-location-list-address">Thành phố Dĩ An, TP.HCM</span>
              <span className="project-location-list-distance">3.5km</span>
            </div>
          </div>
        </div>
        <div className="project-location-desc">
          Dự án do Gamuda Land phát triển tọa lạc trên mặt đường đôi Nguyễn Khuyến, cách mặt đường Nguyễn Trãi – Trần Phú khoảng 50m chưa đầy 50 giây xe máy, đây là vị trí được giới chuyên gia bất động sản Modern Estate đánh giá là vị trí vàng khi hạ tầng – Thủy quận tại và đồng thời là "mảnh đất cuối cùng" ở quận Hà Đông.
        </div>
        <div className="project-location-sodo-box">
          <img src="#" alt="sơ đồ vị trí" className="project-location-sodo-img" />
          <div className="project-location-sodo-caption">(Sơ đồ vị trí dự án)</div>
        </div>
        <div className="project-location-tienich-list">
          <div className="project-location-tienich-item"><span className="project-location-tienich-dot"></span>Kết nối nhanh đến các tuyến đường lớn, bến xe, trung tâm hành chính và các tiện ích hiện đại của khu vực.</div>
          <div className="project-location-tienich-item"><span className="project-location-tienich-dot"></span>Cách các trường học lớn, lang vân khu vực, khu chợ, Bệnh viện, TTTM chỉ trong bán kính 1-2km.</div>
          <div className="project-location-tienich-item"><span className="project-location-tienich-dot"></span>Sát ngay các trường: Viện An Ninh, Đại học Kiến Trúc, Học Viện Bưu Chính Viễn Thông.</div>
          <div className="project-location-tienich-item"><span className="project-location-tienich-dot"></span>Ga tàu điện Metro Hà Đông: Cách 1.1km – Chợ Hà Đông cách 1.3km; chợ Mỗ Lao cách 1.7km; TTTM: Cách TTTM chợ Mỗ Lao 1.7km; Cách Siêu thị Melinh Plaza Hà Đông, Aeon Mall, Coop Mart, BigC chỉ 1.5km.</div>
        </div>
      </div>
      {/* Section: Mặt bằng */}
      <div className="project-matbang-section">
        <div className="project-matbang-title">Mặt bằng Ariyana Lakeside Văn Quán (Hesco Văn Quán)</div>
        <div className="project-matbang-box">
          <div className="project-matbang-subtitle">Mặt bằng tổng thể</div>
          <img src="#" alt="Mặt bằng tổng thể" className="project-matbang-img" />
        </div>
      </div>
      {/* Section: Mặt bằng chi tiết */}
      <div className="project-matbang-details-section">
        <div className="project-matbang-details-desc">
          Ariyana Lakeside Văn Quán (Hesco Văn Quán) có thiết kế cực kỳ đặc biệt mang phong cách Châu Âu với diện tích xây dựng là 3199.88m2. Các căn hộ được bố trí hài hòa, không gian mở mang lại cảm giác thông thoáng, tràn ngập ánh sáng tự nhiên cho từng căn hộ.
        </div>
        <div className="project-matbang-details-image-box">
          <img src="#" alt="Mặt bằng chi tiết" className="project-matbang-details-img" />
          <div className="project-matbang-details-caption">Mặt bằng của dự án Ariyana Lakeside Văn Quán (Hesco Văn Quán)</div>
        </div>
        <div className="project-matbang-details-desc">
          Với diện tích mỗi căn hộ giao động từ 87-134 m2 và được thiết kế kế từ 2-3 phòng ngủ có gần 1.024 căn hộ chung cư cao cấp đáp ứng số lượng lớn khách hàng có nhu cầu trong tương lai. Dự án được liên doanh bởi hai công ty là công ty cổ phần thiết bị Thủy Lợi (HESCO) & Tập đoàn phát triển nhà và đô thị Thăng Long cùng nhau hợp tác xây dựng dựa trên Quyết định của UBND TP số 4132-QĐ/UBND ngày 06/07/2017 với vốn đầu tư hơn 1000 tỷ đồng, mật độ xây dựng 55,6%.
        </div>
        <div className="project-matbang-details-image-box">
          <img src="#" alt="Mặt bằng chi tiết 2" className="project-matbang-details-img" />
          <div className="project-matbang-details-caption">Các căn hộ được thiết kế tối ưu, tiết kiệm diện tích nhưng không mang lại cảm giác gò bó mà làm cho người dùng cảm nhận được không gian thoải mái sinh hoạt cho gia đình. Đặc biệt, hành lang rộng, thông thoáng, khả năng thông gió và chống cháy tốt cũng là một ưu điểm mà Ariyana Lakeside Văn Quán (Hesco Văn Quán) đưa đến giúp cho cư dân tương lai ở đây càng thêm yêu thích.
          </div>
        </div>
      </div>
      {/* Section: Tiện ích dự án */}
      <div className="project-tienich-section">
        <div className="project-tienich-title">Tiện ích dự án Ariyana Lakeside Văn Quán (Hesco Văn Quán)</div>
        <div className="project-tienich-grid">
          <div className="project-tienich-category-box">
            <div className="project-tienich-category-title">Cơ sở vật chất</div>
            <div className="project-tienich-items-container">
              <div className="project-tienich-item"><i className="fas fa-park"></i> Công viên</div>
              <div className="project-tienich-item"><i className="fas fa-box-open"></i> Hộp thư dân cư</div>
              <div className="project-tienich-item"><i className="fas fa-dumpster"></i> Bỏ rác</div>
            </div>
          </div>
          <div className="project-tienich-category-box">
            <div className="project-tienich-category-title">An ninh, vệ sinh</div>
            <div className="project-tienich-items-container">
              <div className="project-tienich-item"><i className="fas fa-door-open"></i> Lễ tân</div>
              <div className="project-tienich-item"><i className="fas fa-shield-alt"></i> An ninh bảo vệ</div>
              <div className="project-tienich-item"><i className="fas fa-toilet"></i> Dọn vệ sinh</div>
              <div className="project-tienich-item"><i className="fas fa-fire-extinguisher"></i> Hệ thống PCCC</div>
              <div className="project-tienich-item"><i className="fas fa-camera"></i> Camera giám sát</div>
              <div className="project-tienich-item"><i className="fas fa-bell"></i> Phòng (lảnh) chờ</div>
            </div>
          </div>
          <div className="project-tienich-category-box">
            <div className="project-tienich-category-title">Y tế, giáo dục</div>
            <div className="project-tienich-items-container">
              <div className="project-tienich-item"><i className="fas fa-school"></i> Trường học cấp 1,2,3</div>
              <div className="project-tienich-item"><i className="fas fa-hospital"></i> Bệnh viện, phòng khám</div>
              <div className="project-tienich-item"><i className="fas fa-school"></i> Trường mầm non</div>
              <div className="project-tienich-item"><i className="fas fa-plus-square"></i> Nhà thuốc, quầy thuốc</div>
            </div>
          </div>
          <div className="project-tienich-category-box">
            <div className="project-tienich-category-title">Giải trí</div>
            <div className="project-tienich-items-container">
              <div className="project-tienich-item"><i className="fas fa-bath"></i> Làm đẹp, spa</div>
              <div className="project-tienich-item"><i className="fas fa-film"></i> Rạp chiếu phim</div>
              <div className="project-tienich-item"><i className="fas fa-child"></i> Khu vui chơi trẻ em</div>
              <div className="project-tienich-item"><i className="fas fa-glass-martini-alt"></i> Bar</div>
              <div className="project-tienich-item"><i className="fas fa-book"></i> Thư viện</div>
            </div>
          </div>
          <div className="project-tienich-category-box">
            <div className="project-tienich-category-title">Tiêu dùng, ẩm thực</div>
            <div className="project-tienich-items-container">
              <div className="project-tienich-item"><i className="fas fa-utensils"></i> Nhà hàng</div>
              <div className="project-tienich-item"><i className="fas fa-shopping-bag"></i> Shop thời trang</div>
              <div className="project-tienich-item"><i className="fas fa-coffee"></i> Coffee shop</div>
              <div className="project-tienich-item"><i className="fas fa-shopping-cart"></i> Chợ</div>
              <div className="project-tienich-item"><i className="fas fa-money-check-alt"></i> ATM</div>
              <div className="project-tienich-item"><i className="fas fa-shopping-mall"></i> Trung tâm thương mại</div>
            </div>
          </div>
          <div className="project-tienich-category-box">
            <div className="project-tienich-category-title">Thể Thao</div>
            <div className="project-tienich-items-container">
              <div className="project-tienich-item"><i className="fas fa-swimmer"></i> Bể bơi trong nhà</div>
              <div className="project-tienich-item"><i className="fas fa-golf-ball"></i> Sân Golf</div>
              <div className="project-tienich-item"><i className="fas fa-swimmer"></i> Bể bơi ngoài trời</div>
              <div className="project-tienich-item"><i className="fas fa-dumbbell"></i> Fitness</div>
              <div className="project-tienich-item"><i className="fas fa-volleyball-ball"></i> Sân bóng rổ</div>
            </div>
          </div>
        </div>
        <div className="project-tienich-desc">
          Dự án Ariyana Lakeside Văn Quán (Hesco Văn Quán) là dự án tiện ích 5 sao hướng rất nhiều hệ thống tiện ích đẳng cấp có sẵn như: Nhà hàng, khu vui chơi, spa, khu thể dục... kiến tạo cuộc sống của cư dân tại đây trở nên viên mãn hơn. Hứa hẹn trong thời gian tới, Ariyana Lakeside Văn Quán (Hesco Văn Quán) sẽ là điểm nhấn Trung tâm du lịch, dịch vụ, vui chơi, giải trí, hoạt động kinh doanh, thương mại,... phía tây Hà Nội.
        </div>
        <div className="project-tienich-image-box">
          <img src="#" alt="Tiện ích 1" className="project-tienich-img" />
          <div className="project-tienich-caption">Tiện ích Ariyana Lakeside Văn Quán (Hesco Văn Quán)</div>
        </div>
        <div className="project-tienich-list">
          <ul>
            <li>5 bể bơi nội khu</li>
            <li>Sân bóng chuyền</li>
            <li>Khu BBQ</li>
            <li>Vườn Hawaii</li>
            <li>Khu vui chơi trẻ em</li>
            <li>Nhà cộng đồng, thư viện</li>
            <li>Phòng tập đa năng</li>
            <li>CLB cờ tướng, cờ vua</li>
            <li>S-Coffee</li>
            <li>Nhà hàng Á, Âu, Việt</li>
          </ul>
        </div>
         <div className="project-tienich-image-box">
          <img src="#" alt="Tiện ích 2" className="project-tienich-img" />
          <div className="project-tienich-caption">Tiện ích Ariyana Lakeside Văn Quán (Hesco Văn Quán)</div>
        </div>
      </div>
      {/* Section: Tiến độ dự án */}
      <div className="project-progress-section">
        <div className="project-progress-title">Tiến độ dự án Ariyana Lakeside Văn Quán</div>
        <div className="project-progress-image-box">
          <img src="#" alt="Tiến độ 1" className="project-progress-img" />
          <div className="project-progress-caption">Tiến độ dự án Ariyana Lakeside Văn Quán (Hesco Văn Quán)</div>
        </div>
        <div className="project-progress-image-box">
          <img src="#" alt="Tiến độ 2" className="project-progress-img" />
          <div className="project-progress-caption">Tiến độ dự án Ariyana Lakeside Văn Quán (Hesco Văn Quán)</div>
        </div>
      </div>
      {/* Section: Dự án lân cận */}
      <div className="nearby-projects-section">
        <div className="nearby-projects-header">
          <div className="nearby-projects-title">Dự án lân cận</div>
          <a href="#" className="nearby-projects-more">Xem thêm</a>
        </div>
        <div className="nearby-projects-list">
          {/* Project Card 1 */}
          <div className="nearby-project-card">
            <div className="nearby-project-card-img-wrap">
                <img src="#" alt="Project Image" className="nearby-project-card-img" />
            </div>
            <div className="nearby-project-card-content">
              <div className="nearby-project-card-title">BÁN GẤP CĂN HỘ CAO CẤP CHUNG CƯ MASTERI AN PHÚ, TP...</div>
              <div className="nearby-project-card-price">25 triệu/tháng</div>
              <div className="nearby-project-card-details">
                <span>50 m²</span>
                <span>3 PN</span>
                <span>2 WC</span>
              </div>
              <div className="nearby-project-card-location">Q.2, TP Hồ Chí Minh</div>
            </div>
          </div>
          {/* Project Card 2 - Repeat for more cards as in the image */}
           <div className="nearby-project-card">
            <div className="nearby-project-card-img-wrap">
                <img src="#" alt="Project Image" className="nearby-project-card-img" />
            </div>
            <div className="nearby-project-card-content">
              <div className="nearby-project-card-title">BÁN GẤP CĂN HỘ CAO CẤP CHUNG CƯ MASTERI AN PHÚ, TP...</div>
              <div className="nearby-project-card-price">25 triệu/tháng</div>
              <div className="nearby-project-card-details">
                <span>50 m²</span>
                <span>3 PN</span>
                <span>2 WC</span>
              </div>
              <div className="nearby-project-card-location">Q.2, TP Hồ Chí Minh</div>
            </div>
          </div>
           <div className="nearby-project-card">
            <div className="nearby-project-card-img-wrap">
                <img src="#" alt="Project Image" className="nearby-project-card-img" />
            </div>
            <div className="nearby-project-card-content">
              <div className="nearby-project-card-title">BÁN GẤP CĂN HỘ CAO CẤP CHUNG CƯ MASTERI AN PHÚ, TP...</div>
              <div className="nearby-project-card-price">25 triệu/tháng</div>
              <div className="nearby-project-card-details">
                <span>50 m²</span>
                <span>3 PN</span>
                <span>2 WC</span>
              </div>
              <div className="nearby-project-card-location">Q.2, TP Hồ Chí Minh</div>
            </div>
          </div>
           <div className="nearby-project-card">
            <div className="nearby-project-card-img-wrap">
                <img src="#" alt="Project Image" className="nearby-project-card-img" />
            </div>
            <div className="nearby-project-card-content">
              <div className="nearby-project-card-title">BÁN GẤP CĂN HỘ CAO CẤP CHUNG CƯ MASTERI AN PHÚ, TP...</div>
              <div className="nearby-project-card-price">25 triệu/tháng</div>
              <div className="nearby-project-card-details">
                <span>50 m²</span>
                <span>3 PN</span>
                <span>2 WC</span>
              </div>
              <div className="nearby-project-card-location">Q.2, TP Hồ Chí Minh</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
