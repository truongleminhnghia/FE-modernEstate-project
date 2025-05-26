import React, { useState, useEffect } from "react";
import "./ProjectsPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MessageOutlined } from '@ant-design/icons';


// Mock data
const mockProjects = [
  {
    id: 1,
    name: "HONAS RESIDENCE",
    status: "Đang xây dựng",
    area: "9200 m²",
    address: "Thuận Giao D5, Nguyễn Văn Bá, Dĩ An, Bình Dương",
    company: "Cty CP DTTM BĐS Đại Quang Minh",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2000&auto=format&fit=crop",
    featured: true,
    type: "Chung cư",
  },
  {
    id: 2,
    name: "HT PEARL",
    status: "Đang xây dựng",
    area: "5000 m²",
    address: "Thuận Giao D5, Nguyễn Văn Bá",
    company: "Cty CP DTTM BĐS Đại Quang Minh",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    featured: false,
    type: "Chung cư",
  },
  {
    id: 3,
    name: "HT PEARL",
    status: "Đang xây dựng",
    area: "5000 m²",
    address: "Thuận Giao D5, Nguyễn Văn Bá",
    company: "Cty CP DTTM BĐS Đại Quang Minh",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
    featured: false,
    type: "Chung cư",
  },
  {
    id: 4,
    name: "HT PEARL",
    status: "Đang xây dựng",
    area: "5000 m²",
    address: "Thuận Giao D5, Nguyễn Văn Bá",
    company: "Cty CP DTTM BĐS Đại Quang Minh",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    featured: false,
    type: "Chung cư",
  },
  // Thêm nhiều project nhỏ hơn để đủ grid
  ...Array.from({ length: 9 }).map((_, i) => ({
    id: 5 + i,
    name: "HONAS RESIDENCE",
    status: "Đang xây dựng",
    area: "9200 m²",
    address: "Thuận Giao D5, Nguyễn Văn Bá",
    company: "Cty CP DTTM BĐS Đại Quang Minh",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    featured: false,
    type: "Chung cư",
  })),
];

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Giả lập việc gọi API
    const fetchProjects = async () => {
      try {
        console.log('Fetching projects...');
        // Giả lập delay 1 giây
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Sử dụng mock data thay vì gọi API
        setProjects(mockProjects);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(error.response?.data?.message || 'Có lỗi xảy ra khi tải dữ liệu');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="projects-bg">
        <div className="projects-breadcrumb">
          <span>Trang chủ</span> / <span>Danh sách dự án</span>
        </div>
        <div className="projects-banner">
          <img src="https://unsplash.com/fr/photos/une-ville-la-nuit-avec-beaucoup-de-grands-immeubles-vLOA_KJ_pj0" alt="banner" />
        </div>
        <div className="projects-grid-wrapper">
          <div className="projects-grid">
            <div className="loading-text">Đang tải dữ liệu...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="projects-bg">
        <div className="projects-breadcrumb">
          <span>Trang chủ</span> / <span>Danh sách dự án</span>
        </div>
        <div className="projects-banner">
          <img src="https://unsplash.com/fr/photos/une-ville-la-nuit-avec-beaucoup-de-grands-immeubles-vLOA_KJ_pj0" alt="banner" />
        </div>
        <div className="projects-grid-wrapper">
          <div className="projects-grid">
            <div className="loading-text error-text">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="projects-bg">
        <div className="projects-breadcrumb">
          <span>Trang chủ</span> / <span>Danh sách dự án</span>
        </div>
        <div className="projects-banner">
          <img src="https://unsplash.com/fr/photos/une-ville-la-nuit-avec-beaucoup-de-grands-immeubles-vLOA_KJ_pj0" alt="banner" />
        </div>
        <div className="projects-grid-wrapper">
          <div className="projects-grid">
            <div className="loading-text">Không có dự án nào</div>
          </div>
        </div>
      </div>
    );
  }

  const featured = projects.find((p) => p.featured);
  const normalProjects = projects.filter((p) => !p.featured);

  return (
    <div className="projects-bg">
      {/* Breadcrumb */}
      <div className="projects-breadcrumb">
        <span>Trang chủ</span> / <span>Danh sách dự án</span>
      </div>
      {/* Banner */}
      <div className="projects-banner">
        <img src="https://images.unsplash.com/photo-1582407947304-fd86f028f716" alt="banner" />
      </div>
      {/* Grid */}
      <div className="projects-grid-wrapper">
        <div className="projects-grid">
          {featured && (
            <div className="project-card project-card-featured" onClick={() => navigate(`/du-an/${featured.id}`)} style={{ cursor: 'pointer' }}>
              <img src={featured.image} alt={featured.name} />
              <div className="project-card-content">
                <div className="project-card-title">{featured.name}</div>
                <div className="project-status-badge">{featured.status}</div>
                <div className="project-area-address">
                  <div className="project-card-area">{featured.area}</div>
                  <div className="project-card-address">{featured.address}</div>
                </div>
              </div>
              <div className="project-card-footer">
                 <div className="project-card-company">{featured.company}</div>
              </div>
            </div>
          )}
          {normalProjects.map((p) => (
            <div className="project-card" key={p.id} onClick={() => navigate(`/du-an/${p.id}`)} style={{ cursor: 'pointer' }}>
              <img src={p.image} alt={p.name} />
              <div className="project-card-content">
                <div className="project-card-title">{p.name}</div>
                <div className="project-status-badge">{p.status}</div>
                <div className="project-area-address">
                  <div className="project-card-area">{p.area}</div>
                  <div className="project-card-address">{p.address}</div>
                </div>
                <div className="project-card-type">{p.type}</div>
              </div>
              <div className="project-card-footer">
                <div className="project-card-company">{p.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Button */}
      <button className="message-button">
        <MessageOutlined />
      </button>    

    </div>
  );
};

export default ProjectsPage;
