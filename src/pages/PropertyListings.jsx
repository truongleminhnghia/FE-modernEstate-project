import React, { useState } from 'react';
import { FilterIcon, Grid, List as ListIcon } from 'lucide-react';
import { Button as AntButton, Drawer, Select, Slider, Space, Col, Row } from 'antd';

import PropertyCard from '../components/PropertyCard.jsx';
import usePropertyData from '../hooks/usePropertyData.js';
import { Badge } from '../components/ui/badge.jsx';
import { Button } from '../components/ui/button.jsx';
import { useToast } from '../components/ui/use-toast.js';
import SearchBar from '../components/SearchBar.jsx';
import { cn } from '../lib/utils.js';

const { Option } = Select;

const PropertyListings = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterDrawerVisible, setIsFilterDrawerVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const [filters, setFilters] = useState({
    demand: 'ALL',
    propertyType: 'ALL',
    priceRange: [0, 500],
    areaRange: [0, 2000],
    bedrooms: null,
    bathrooms: null,
    district: 'ALL',
    searchQuery: ''
  });

  const { data, isLoading, error, filterOptions } = usePropertyData(filters, currentPage, pageSize);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      demand: 'ALL',
      propertyType: 'ALL',
      priceRange: [0, 500],
      areaRange: [0, 2000],
      bedrooms: null,
      bathrooms: null,
      district: 'ALL',
      searchQuery: ''
    });
  };
  
  const handleApplyFilters = () => {
      setCurrentPage(1);
      setIsFilterDrawerVisible(false);
  }

  const handleContactClick = (contact) => {
    toast({
      title: "Thông tin liên hệ",
      description: `${contact.contactName} - ${contact.contactPhone}`,
    });
  };

  const handleSearchChange = (query) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Có lỗi xảy ra</h2>
          <p className="text-gray-600">Không thể tải dữ liệu bất động sản</p>
        </div>
      </div>
    );
  }
  
  const renderFilterDrawer = () => (
    <Drawer
      title="Bộ lọc nâng cao"
      placement="right"
      onClose={() => setIsFilterDrawerVisible(false)}
      open={isFilterDrawerVisible}
      width={350}
      footer={
        <div style={{ textAlign: 'right' }}>
          <AntButton onClick={handleClearFilters} style={{ marginRight: 8 }}>
            Xóa bộ lọc
          </AntButton>
          <AntButton onClick={handleApplyFilters} type="primary">
            Áp dụng
          </AntButton>
        </div>
      }
    >
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <label className="font-semibold">Loại giao dịch</label>
                <Select
                    value={filters.demand}
                    onChange={(value) => handleFilterChange('demand', value)}
                    style={{ width: '100%', marginTop: '8px' }}
                >
                    <Option value="ALL">Tất cả</Option>
                    <Option value="MUA_BÁN">Mua bán</Option>
                    <Option value="CHO_THUÊ">Cho thuê</Option>
                </Select>
            </Col>
            <Col span={24}>
                <label className="font-semibold">Loại hình</label>
                <Select
                    value={filters.propertyType}
                    onChange={(value) => handleFilterChange('propertyType', value)}
                    style={{ width: '100%', marginTop: '8px' }}
                    loading={isLoading}
                >
                    <Option value="ALL">Tất cả</Option>
                    {filterOptions.propertyTypes.map(type => (
                        <Option key={type} value={type}>{type.replace(/_/g, ' ')}</Option>
                    ))}
                </Select>
            </Col>
            <Col span={24}>
                <label className="font-semibold">Quận/Huyện</label>
                <Select
                    value={filters.district}
                    onChange={(value) => handleFilterChange('district', value)}
                    style={{ width: '100%', marginTop: '8px' }}
                    loading={isLoading}
                >
                    <Option value="ALL">Tất cả</Option>
                    {filterOptions.districts.map(district => (
                        <Option key={district} value={district}>{district}</Option>
                    ))}
                </Select>
            </Col>
            <Col span={24}>
                <label className="font-semibold">Số phòng ngủ</label>
                <Select
                    value={filters.bedrooms}
                    onChange={(value) => handleFilterChange('bedrooms', value)}
                    style={{ width: '100%', marginTop: '8px' }}
                    allowClear
                    placeholder="Chọn số phòng ngủ"
                >
                    <Option value={1}>1 phòng</Option>
                    <Option value={2}>2 phòng</Option>
                    <Option value={3}>3 phòng</Option>
                    <Option value={4}>4+ phòng</Option>
                </Select>
            </Col>
            <Col span={24}>
                <label className="font-semibold">Khoảng giá (tỷ VND)</label>
                <Slider
                    range
                    min={0}
                    max={500}
                    value={filters.priceRange}
                    onChange={(value) => handleFilterChange('priceRange', value)}
                    step={1}
                />
                <div className="flex justify-between text-xs text-gray-500">
                    <span>{filters.priceRange[0]} tỷ</span>
                    <span>{filters.priceRange[1]} tỷ</span>
                </div>
            </Col>
            <Col span={24}>
                <label className="font-semibold">Diện tích (m²)</label>
                <Slider
                    range
                    min={0}
                    max={2000}
                    value={filters.areaRange}
                    onChange={(value) => handleFilterChange('areaRange', value)}
                    step={10}
                />
                <div className="flex justify-between text-xs text-gray-500">
                    <span>{filters.areaRange[0]} m²</span>
                    <span>{filters.areaRange[1]} m²</span>
                </div>
            </Col>
        </Row>
      </Space>
    </Drawer>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 style={{fontSize: '24px', fontWeight: 'bold', color: '#4A90E2', marginTop: '10px'}} className="text-3xl font-bold text-gray-900">
              DANH SÁCH CĂN HỘ
              </h1>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    'border-gray-300 transition-colors',
                    viewMode === 'grid'
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'hover:bg-gray-100'
                  )}
                  onClick={() => setViewMode('grid')}
                  style={{cursor: 'pointer'}}
                >
                  <Grid className="h-4 w-4" style={{ color: viewMode === 'grid' ? 'white' : 'black' }} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    'border-gray-300 transition-colors',
                    viewMode === 'list'
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'hover:bg-gray-100'
                  )}
                  onClick={() => setViewMode('list')}
                  style={{cursor: 'pointer'}}
                >
                  <ListIcon className="h-4 w-4" style={{ color: viewMode === 'list' ? 'white' : 'black' }} />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="w-full max-w-2xl">
                    <SearchBar
                        value={filters.searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Tìm kiếm theo tiêu đề, địa chỉ, mô tả..."
                    />
                </div>
                <AntButton style={{ height: '40px' }} onClick={() => setIsFilterDrawerVisible(true)}>
                  <FilterIcon className="h-4 w-4" /> Bộ lọc
                </AntButton>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Results summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 style={{marginBottom: 0}} className="text-lg font-semibold text-gray-900 mb-0">
              {isLoading ? 'Đang tải...' : `${data?.total || 0} kết quả`}
            </h2>
            {(filters.demand !== 'ALL' || filters.propertyType !== 'ALL' || filters.searchQuery) && (
              <div className="flex flex-wrap gap-2">
                {filters.demand !== 'ALL' && (
                  <Badge variant="secondary">
                    {filters.demand === 'MUA_BÁN' ? 'Mua bán' : 'Cho thuê'}
                  </Badge>
                )}
                {filters.propertyType !== 'ALL' && (
                  <Badge variant="secondary">
                    {filters.propertyType.replace('_', ' ')}
                  </Badge>
                )}
                {filters.searchQuery && (
                  <Badge variant="secondary">
                    "{filters.searchQuery}"
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Properties grid/list */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : data?.rowDatas?.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Grid className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Không tìm thấy kết quả
            </h3>
            <p className="text-gray-600 mb-4">
              Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
            </p>
            <AntButton onClick={handleClearFilters} variant="outline">
              Xóa bộ lọc
            </AntButton>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
          }>
            {data?.rowDatas?.map((post) => (
              <PropertyCard
                key={post.id}
                post={post}
                onContactClick={handleContactClick}
              />
            ))}
          </div>
        )}

        {/* Pagination would go here */}
        {data && data.total > pageSize && (
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Trước
              </Button>
              <Button
                variant="outline"
                disabled={currentPage * pageSize >= data.total}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Sau
              </Button>
            </div>
          </div>
        )}
      </div>
      {renderFilterDrawer()}
    </div>
  );
};

export default PropertyListings; 