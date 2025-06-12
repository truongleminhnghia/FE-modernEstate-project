import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProjectsPage.css";
import { useNavigate, Link } from "react-router-dom";
import { MessageOutlined } from '@ant-design/icons';
import MessagePopup from '../../components/popup/MessagePopup';
import ChatPopup from '../../components/popup/ChatPopup';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [currentPopupView, setCurrentPopupView] = useState('message');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("https://222.255.117.195:8443/api/v1/projects");
        const raw = res.data?.data?.rowDatas || [];

        const mapped = raw.map((item, index) => ({
          id: item.id,
          name: item.title,
          status: item.status?.replace(/_/g, " "),
          area: `${item.projectArea?.toLocaleString()} ${item.unitArea || "m²"}`,
          address: item.address?.addressDetail || "Địa chỉ không rõ",
          company: item.invetor?.companyName || "Chủ đầu tư không rõ",
          image: item.images?.[0]?.imageUrl || "https://via.placeholder.com/300x200.png?text=No+Image",
          type: item.typeProject,
          featured: index === 0, // Chọn project đầu tiên làm nổi bật
        }));

        setProjects(mapped);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Không thể tải danh sách dự án.");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="projects-bg">
        <div className="projects-breadcrumb">
          <Link to="/">Trang chủ</Link> / <span>Dự án</span>
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
          <Link to="/">Trang chủ</Link> / <span>Dự án</span>
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
          <Link to="/">Trang chủ</Link> / <span>Dự án</span>
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
  const togglePopup = () => {
    setShowPopup(!showPopup);
    if (!showPopup) {
      setCurrentPopupView('message');
    }
  };

  const switchToChatView = () => {
    setCurrentPopupView('chat');
  };

  const switchToMessageView = () => {
    setCurrentPopupView('message');
  };

  return (
    <div className="projects-bg">
      <div className="projects-breadcrumb">
        <a href="/">Trang chủ</a> <span>/ Dự án</span>
      </div>

      <div className="projects-banner">
        <img src="/src/assets/images/tp_HCM.jpeg" alt="Banner Dự án" />
      </div>

      <div className="projects-grid-wrapper">
        {loading && <div className="loading-text">Đang tải dữ liệu dự án...</div>}
        {error && <div className="error-text">{error}</div>}

        {!loading && !error && (
          <div className="projects-grid">
            {projects.map((p) => (
              <div 
                key={p.id} 
                className={`project-card ${p.featured ? "project-card-featured" : ""}`}
                onClick={() => navigate(`/du-an/${p.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <img src={p.image} alt={p.name} onError={(e) => (e.target.src = "/fallback.png")} />

                <div className="project-card-content">
                <div className="project-card-title">{p.name}</div>
                  <span className="project-status-badge">{p.status}</span>
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
        )}
      </div>

      <button className="message-button" onClick={togglePopup}>
        <MessageOutlined />
      </button>    

      {showPopup && currentPopupView === 'message' && (
        <MessagePopup showPopup={showPopup} togglePopup={togglePopup} onSwitchToChat={switchToChatView} />
      )}

      {showPopup && currentPopupView === 'chat' && (
        <ChatPopup showPopup={showPopup} togglePopup={togglePopup} onSwitchToMessage={switchToMessageView} />
      )}

    </div>
  );
}

export default ProjectsPage;
