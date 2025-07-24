import React, { useState, useEffect } from 'react'
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Select,
  Input,
  Tag,
  Space,
  Empty,
  message,
  Pagination,
} from 'antd'
import {
  SearchOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import './FavoritesList.css'
import favoriteApi from '../../../apis/favoriteApi'
import { Star, Heart, Maximize, Bed, Bath, MapPin } from 'lucide-react'

const { Title, Text } = Typography
const { Option } = Select

const FavoritesList = () => {
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [favorites, setFavorites] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetchFavorites()
    // eslint-disable-next-line
  }, [page, pageSize])

  const fetchFavorites = async () => {
    setLoading(true)
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const accountId = user?.id
      const res = await favoriteApi.getFavorites(accountId)
      setFavorites(res.data.data.rowDatas || [])
      setTotal(res.data?.total || 0)
      console.log('Data:', res.data.data.rowDatas)
    } catch (error) {
      message.error('Không thể tải danh sách yêu thích!')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value) => {
    setSearchText(value)
    // Có thể gọi lại API với filter nếu backend hỗ trợ
  }

  const handleFilter = (values) => {
    // Có thể gọi lại API với filter nếu backend hỗ trợ
    console.log('Filter values:', values)
  }

  const handleRemoveFavorite = async (propertyId) => {
    try {
      await favoriteApi.removeFavorite(propertyId)
      message.success('Đã xóa khỏi danh sách yêu thích')
      fetchFavorites()
    } catch (error) {
      message.error('Xóa khỏi danh sách yêu thích thất bại!')
    }
  }

  const handleViewDetails = (id) => {
    // Chuyển hướng sang trang chi tiết căn hộ
    window.location.href = `/can-ho/${id}`
  }

  // Lọc trên client nếu cần
  const filteredFavorites = favorites.filter((item) =>
    item.property?.title?.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div className="favorites-container">
      <Card
        loading={loading}
        style={{ border: 'none', boxShadow: 'none', background: 'transparent' }}
      >
        <div className="favorites-header">
          <Title level={4}>Danh sách yêu thích</Title>
          <div className="favorites-filters">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8}>
                <Input
                  placeholder="Tìm kiếm bất động sản"
                  prefix={<SearchOutlined />}
                  onChange={(e) => handleSearch(e.target.value)}
                  allowClear
                />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Select
                  placeholder="Loại căn hộ"
                  style={{ width: '100%' }}
                  onChange={(value) => handleFilter({ type: value })}
                  allowClear
                >
                  <Option value="rent">Cho thuê</Option>
                  <Option value="buy-sell">Mua bán</Option>
                  <Option value="all">Tất cả</Option>
                </Select>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Select
                  placeholder="Sắp xếp theo"
                  style={{ width: '100%' }}
                  onChange={(value) => handleFilter({ sort: value })}
                  defaultValue="newest"
                >
                  <Option value="newest">Mới nhất</Option>
                  <Option value="oldest">Cũ nhất</Option>
                  <Option value="price_asc">Giá tăng dần</Option>
                  <Option value="price_desc">Giá giảm dần</Option>
                </Select>
              </Col>
            </Row>
          </div>
        </div>

        {filteredFavorites.length > 0 ? (
          <>
            <div
              className="favorite-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 24,
                marginTop: 24,
              }}
            >
              {filteredFavorites.map((item) => {
                const property = item.property
                const address = [
                  property?.address?.addressDetail,
                  property?.address?.ward,
                  property?.address?.district,
                  property?.address?.city,
                ]
                  .filter(Boolean)
                  .join(', ')
                return (
                  <div
                    key={item.id}
                    className="favorite-card-modern group"
                    style={{
                      borderRadius: 12,
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      background: '#fff',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'box-shadow 0.2s',
                      minHeight: 370,
                    }}
                    onClick={() => handleViewDetails(item.propertyId)}
                  >
                    <div
                      style={{
                        position: 'relative',
                        height: 160,
                        background: '#f3f4f6',
                      }}
                    >
                      {property?.propertyImages &&
                      property?.propertyImages.length > 0 &&
                      property?.propertyImages[0].imageUrl ? (
                        <img
                          src={property.propertyImages[0].imageUrl}
                          alt="Property"
                          style={{
                            width: '100%',
                            height: '50px',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <img
                          src="https://www.lendlease.com/contentassets/302840d3bc9846579cb9f785ed8abb9a/luxury-interior-design.jpg"
                          alt="Default Property"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      )}
                      <div
                        style={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          display: 'flex',
                          gap: 8,
                        }}
                      >
                        <Tag
                          color={
                            property?.demand === 'MUA_BÁN' ? 'blue' : 'green'
                          }
                          style={{ fontWeight: 600, borderRadius: 6 }}
                        >
                          {property?.demand === 'MUA_BÁN' ? 'Bán' : 'Thuê'}
                        </Tag>
                        <Tag
                          color="gold"
                          style={{ fontWeight: 600, borderRadius: 6 }}
                        >
                          {property?.priorityStatus}
                        </Tag>
                      </div>
                      {property?.priorityStatus === 'VIP1' && (
                        <div
                          style={{ position: 'absolute', top: 12, right: 12 }}
                        >
                          <Star size={20} color="#facc15" fill="#facc15" />
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        padding: 16,
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div style={{ minHeight: 48 }}>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: 16,
                            color: '#222',
                            marginBottom: 4,
                            lineHeight: 1.2,
                          }}
                        >
                          {property?.title?.length > 30
                            ? property?.title.slice(0, 30) + '...'
                            : property?.title}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#666',
                            fontSize: 13,
                            marginBottom: 8,
                          }}
                        >
                          <MapPin size={14} style={{ marginRight: 4 }} />
                          <span
                            style={{
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {address || 'Địa chỉ cập nhật sau'}
                          </span>
                        </div>
                      </div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 20,
                          color: '#2563eb',
                          marginBottom: 8,
                        }}
                      >
                        {property?.price?.toLocaleString()}{' '}
                        {property?.priceUnit}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          gap: 12,
                          color: '#666',
                          fontSize: 14,
                          marginBottom: 8,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Maximize size={14} style={{ marginRight: 3 }} />
                          {property?.area} {property?.areaUnit}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Bed size={14} style={{ marginRight: 3 }} />
                          {property?.numberOfBedrooms} PN
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Bath size={14} style={{ marginRight: 3 }} />
                          {property?.numberOfBathrooms} PT
                        </div>
                      </div>
                      <div
                        style={{
                          marginTop: 'auto',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 8,
                        }}
                      >
                        <Button
                          type="text"
                          icon={<EyeOutlined />}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewDetails(item.propertyId)
                          }}
                        >
                          Xem chi tiết
                        </Button>
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveFavorite(item.id)
                          }}
                        >
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <Pagination
              current={page}
              pageSize={pageSize}
              total={total}
              onChange={setPage}
              onShowSizeChange={(current, size) => setPageSize(size)}
              style={{ marginTop: 24, textAlign: 'right' }}
            />
          </>
        ) : (
          <Empty description="Không có bất động sản nào trong danh sách yêu thích." />
        )}
      </Card>
    </div>
  )
}

export default FavoritesList
