import React, { useState, useEffect } from 'react'
import { Row, Col, Pagination } from 'antd'
import BreadcrumbComponent from '../../components/ui/BreadcrumbComponent'
import NewCardComponent from '../../components/cards/NewCardComponent'
import { getNewsList } from '../../apis/newsApi'

const News = () => {
    const breadcrumbItems = [
        { title: 'Trang chủ', href: '/' },
        { title: 'Tin tức' }
    ]

    // — Dữ liệu mẫu —
    const pageSize = 12
    const [current, setCurrent] = useState(1)
    const [newsList, setNewsList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await getNewsList()
                console.log('API news data:', data)
                let list = []
                if (Array.isArray(data)) {
                  list = data
                } else if (Array.isArray(data?.data?.rowDatas)) {
                  list = data.data.rowDatas
                }
                setNewsList(list)
            } catch (err) {
                setError('Không thể tải tin tức. Vui lòng thử lại sau.')
                setNewsList([])
            } finally {
                setLoading(false)
            }
        }
        fetchNews()
    }, [])

    // Map dữ liệu cho NewCardComponent
    const mappedPagedData = Array.isArray(newsList) ? newsList.slice(
        (current - 1) * pageSize,
        current * pageSize
    ).map(item => ({
        id: item.id,
        image: item.imageUrl || '/images/cards/card-1.jpg',
        avatar: item.account?.avatar || '/images/avatars/avatar-1.png',
        author: item.account ? `${item.account.firstName} ${item.account.lastName}` : 'Ẩn danh',
        date: item.publishDate ? new Date(item.publishDate).toLocaleDateString('vi-VN') : '',
        title: item.title,
        description: item.content,
        to: `/posts/${item.id}`
    })) : []

    return (
        <div className="container mx-auto px-4">
            <BreadcrumbComponent items={breadcrumbItems} />
            <Row className='text-center mt-[50px]'>
                <Col span={24} className='mb-[12px]'>
                    <h1 className='text-[24px] font-bold text[#000]'>Tin tức Bất động sản – Cập nhật mỗi ngày</h1>
                </Col>
                <Col span={24}>
                    <span className='block text-[16px] font-normal text[#000]'>Ý tưởng, xu hướng và nguồn cảm hứng cho một tương lai tươi sáng hơn</span>
                </Col>
            </Row>

            {loading ? (
                <div className="flex justify-center mt-8">Đang tải tin tức...</div>
            ) : error ? (
                <div className="flex justify-center mt-8 text-red-500">{error}</div>
            ) : (
                <>
                    <Row gutter={[24, 24]} className="mt-8">
                        {mappedPagedData.map(item => (
                            <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                                <NewCardComponent key={item.id} {...item} />
                            </Col>
                        ))}
                    </Row>

                    <div className="flex justify-center mt-8">
                        <Pagination
                            current={current}
                            pageSize={pageSize}
                            total={newsList.length}
                            onChange={page => setCurrent(page)}
                            showSizeChanger={false}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default News
