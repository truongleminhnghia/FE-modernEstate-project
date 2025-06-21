import React, { useState, useEffect } from "react";
import "./ApartmentsPage.css";
import { Select, Card, Tag, Pagination, Spin, message, Slider, Checkbox, Button } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { MessageOutlined, FilterOutlined, ClearOutlined } from '@ant-design/icons';
import { getPosts, transformPostsList } from "../../apis/projectApi";

const { Option } = Select;

const PAGE_SIZE = 20;

const ApartmentsPage = () => {
  const [page, setPage] = useState(1);
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [allApartments, setAllApartments] = useState([]);
  const navigate = useNavigate();

  // Filter states
  const [filters, setFilters] = useState({
    demand: '',
    bedrooms: [],
    priceRange: [0, 50],
    districts: [],
    areaRange: [0, 200],
    interior: [],
    document: []
  });

  // Extract unique values for filters
  const uniqueDemands = [...new Set(allApartments.map(apt => apt.demand))];
  const uniqueBedrooms = [...new Set(allApartments.map(apt => apt.bed).filter(bed => bed !== 'N/A'))];
  const uniqueDistricts = [...new Set(allApartments.map(apt => apt.location).filter(loc => loc !== 'N/A'))];
  const uniqueInteriors = [...new Set(allApartments.map(apt => apt.interior).filter(int => int))];
  const uniqueDocuments = [...new Set(allApartments.map(apt => apt.document).flat().filter(doc => doc))];

  // Fetch all apartments for filter data
  const fetchAllApartments = async () => {
    try {
      const response = await getPosts(1, 1000); // Get all for filter data
      if (response.success && response.data) {
        const transformedData = transformPostsList(response.data.rowDatas);
        setAllApartments(transformedData);
      }
    } catch (error) {
      console.error('Error fetching all apartments for filters:', error);
    }
  };

  // Fetch apartments data
  const fetchApartments = async (currentPage = 1) => {
    try {
      setLoading(true);
      const response = await getPosts(currentPage, PAGE_SIZE);
      
      if (response.success && response.data) {
        const transformedData = transformPostsList(response.data.rowDatas);
        setApartments(transformedData);
        setTotal(response.data.total);
      } else {
        message.error('Không thể tải dữ liệu căn hộ');
      }
    } catch (error) {
      console.error('Error fetching apartments:', error);
      message.error('Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllApartments();
    fetchApartments(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      demand: '',
      bedrooms: [],
      priceRange: [0, 50],
      districts: [],
      areaRange: [0, 200],
      interior: [],
      document: []
    });
  };

  const applyFilters = () => {
    // Apply filters logic here
    console.log('Applying filters:', filters);
    // You can implement the actual filtering logic here
    message.success('Đã áp dụng bộ lọc');
  };

  // Filter apartments based on current filters
  const filteredApartments = apartments.filter(apt => {
    if (filters.demand && apt.demand !== filters.demand) return false;
    if (filters.bedrooms.length > 0 && !filters.bedrooms.includes(apt.bed)) return false;
    if (filters.districts.length > 0 && !filters.districts.includes(apt.location)) return false;
    
    // Price filter
    const price = parseFloat(apt.price.replace(/[^\d]/g, ''));
    if (price < filters.priceRange[0] || price > filters.priceRange[1]) return false;
    
    return true;
  });

  return (
    <div className="apartments-bg">
      {/* Breadcrumb */}
      <div className="apartments-breadcrumb">
        <Link to="/">Trang chủ</Link> / <span>Căn hộ</span>
      </div>

      {/* Main Container */}
      <div className="apartments-container">
        {/* Sidebar Filter */}
        <div className="apartments-sidebar">
          <div className="apartments-filter-sidebar">
            <div className="apartments-filter-title">
              <FilterOutlined style={{ marginRight: 8 }} />
              Bộ lọc tìm kiếm
            </div>

            {/* Demand Filter */}
            <div className="apartments-filter-section">
              <div className="apartments-filter-section-title">Loại giao dịch</div>
              <div className="apartments-filter-item">
                <Select
                  value={filters.demand}
                  onChange={(value) => handleFilterChange('demand', value)}
                  placeholder="Chọn loại giao dịch"
                  allowClear
                >
                  <Option value="MUA_BÁN">Mua bán</Option>
                  <Option value="CHO_THUÊ">Cho thuê</Option>
                </Select>
              </div>
            </div>

            {/* Bedrooms Filter */}
            <div className="apartments-filter-section">
              <div className="apartments-filter-section-title">Số phòng ngủ</div>
              <div className="apartments-filter-item">
                <Checkbox.Group
                  value={filters.bedrooms}
                  onChange={(value) => handleFilterChange('bedrooms', value)}
                  className="apartments-filter-checkbox-group"
                >
                  {uniqueBedrooms.map(bed => (
                    <Checkbox key={bed} value={bed} className="apartments-filter-checkbox-item">
                      {bed}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="apartments-filter-section">
              <div className="apartments-filter-section-title">Khoảng giá (tỷ VND)</div>
              <div className="apartments-filter-item">
                <Slider
                  range
                  min={0}
                  max={50}
                  value={filters.priceRange}
                  onChange={(value) => handleFilterChange('priceRange', value)}
                  tipFormatter={(value) => `${value} tỷ`}
                />
                <div className="price-range-display">
                  {filters.priceRange[0]} - {filters.priceRange[1]} tỷ VND
                </div>
              </div>
            </div>

            {/* District Filter */}
            <div className="apartments-filter-section">
              <div className="apartments-filter-section-title">Quận/Huyện</div>
              <div className="apartments-filter-item">
                <Checkbox.Group
                  value={filters.districts}
                  onChange={(value) => handleFilterChange('districts', value)}
                  className="apartments-filter-checkbox-group"
                >
                  {uniqueDistricts.map(district => (
                    <Checkbox key={district} value={district} className="apartments-filter-checkbox-item">
                      {district}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </div>
            </div>

            {/* Area Range Filter */}
            <div className="apartments-filter-section">
              <div className="apartments-filter-section-title">Diện tích (m²)</div>
              <div className="apartments-filter-item">
                <Slider
                  range
                  min={0}
                  max={200}
                  value={filters.areaRange}
                  onChange={(value) => handleFilterChange('areaRange', value)}
                  tipFormatter={(value) => `${value}m²`}
                />
                <div className="price-range-display">
                  {filters.areaRange[0]} - {filters.areaRange[1]} m²
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="apartments-filter-actions">
              <Button 
                type="primary" 
                className="apartments-filter-btn"
                onClick={applyFilters}
              >
                Áp dụng bộ lọc
              </Button>
              <Button 
                className="apartments-filter-clear"
                icon={<ClearOutlined />}
                onClick={clearFilters}
              >
                Xóa bộ lọc
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="apartments-main">
          {/* Apartment Grid */}
          <div className="apartments-grid">
            {loading ? (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '400px',
                width: '100%'
              }}>
                <Spin size="large" />
              </div>
            ) : filteredApartments.length > 0 ? (
              filteredApartments.map((apt) => (
                <Card
                  key={apt.id}
                  className="apartment-card"
                  hoverable
                  onClick={() => navigate(`/can-ho/${apt.id}`)}
                  cover={
                    <div className="apartment-card-img-wrap">
                      <img alt={apt.title} src={apt.image} className="apartment-card-img" />
                      <Tag className="apartment-card-tag" color={apt.tag === "Mua" ? "#52c41a" : "#4a90e2"}>{apt.tag}</Tag>
                    </div>
                  }
                  bodyStyle={{ padding: 16 }}
                >
                  <div className="apartment-card-title">{apt.title}</div>
                  <div className="apartment-card-price">{apt.price}</div>
                  <div className="apartment-card-info">
                    <span>{apt.area}</span>
                    <span>•</span>
                    <span>{apt.bed}</span>
                    <span>•</span>
                    <span>{apt.bath}</span>
                  </div>
                  <div className="apartment-card-location">{apt.location}</div>
                </Card>
              ))
            ) : (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '400px',
                width: '100%',
                fontSize: '16px',
                color: '#666'
              }}>
                Không có căn hộ nào được tìm thấy
              </div>
            )}
          </div>

          {/* Pagination */}
          {!loading && total > 0 && (
            <div className="apartments-pagination">
              <Pagination
                current={page}
                pageSize={PAGE_SIZE}
                total={total}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Message Button */}
      <button className="message-button">
        <MessageOutlined />
      </button>
    </div>
  );
};

export default ApartmentsPage;
