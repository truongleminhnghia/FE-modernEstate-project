import React from "react";
import "./ProjectsPage.css";
import { useNavigate } from "react-router-dom";

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
  // Thêm nhiều project nhỏ hơn để đủ grid
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

const ProjectsPage = () => {
  const featured = projects.find((p) => p.featured);
  const normalProjects = projects.filter((p) => !p.featured);
  const navigate = useNavigate();

  return (
    <div className="projects-bg">
      {/* Breadcrumb */}
      <div className="projects-breadcrumb">
        <span>Trang chủ</span> / <span>Danh sách dự án</span>
      </div>
      {/* Banner */}
      <div className="projects-banner">
        <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca" alt="banner" />
      </div>
      {/* Grid */}
      <div className="projects-grid-wrapper">
        <div className="projects-grid">
          {featured && (
            <div className="project-card project-card-featured">
              <img src={featured.image} alt={featured.name} />
              <div className="project-card-content">
                <div className="project-card-title">{featured.name}</div>
                <div className="project-card-status">{featured.status}</div>
                <div className="project-card-area">{featured.area}</div>
                <div className="project-card-address">{featured.address}</div>
                <div className="project-card-company">{featured.company}</div>
                <button className="project-card-btn" onClick={() => navigate(`/du-an/${featured.id}`)}>Xem chi tiết</button>
              </div>
            </div>
          )}
          {normalProjects.map((p) => (
            <div className="project-card" key={p.id}>
              <img src={p.image} alt={p.name} />
              <div className="project-card-content">
                <div className="project-card-title">{p.name}</div>
                <div className="project-card-status">{p.status}</div>
                <div className="project-card-area">{p.area}</div>
                <div className="project-card-address">{p.address}</div>
                <div className="project-card-company">{p.company}</div>
                <button className="project-card-btn" onClick={() => navigate(`/du-an/${p.id}`)}>Xem chi tiết</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
