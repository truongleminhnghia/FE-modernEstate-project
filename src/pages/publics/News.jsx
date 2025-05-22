import React, { useState } from 'react'
import { Row, Col, Pagination } from 'antd'
import BreadcrumbComponent from '../../components/ui/BreadcrumbComponent'
import NewCardComponent from '../../components/cards/NewCardComponent'

const News = () => {
    const breadcrumbItems = [
        { title: 'Trang chủ', href: '/' },
        { title: 'Tin tức' }
    ]

    // — Dữ liệu mẫu —
    const newsList = [
        {
            id: 1,
            image: '/images/cards/card-1.jpg',
            avatar: '/images/avatars/avatar-1.png',
            author: 'Minh Nghĩa',
            date: 'Mar 10, 2025',
            title: 'Xu hướng sống xanh: Vì sao nhà ở sinh thái là Vì sao nhà ở sinh thái là Vì sao nhà ở sinh thái là',
            description:
                'Nhu cầu về nhà ở thân thiện với môi trường đang tăng cao khi người mua tìm kiếm không gian sống bền vững và tiết kiệm năng lượng. Nhu cầu về nhà ở thân thiện với môi trường đang tăng cao khi người mua tìm kiếm không gian sống bền vững và tiết kiệm năng lượng.',
            to: '/posts/1'
        },
        {
            id: 2,
            image: '/images/cards/card-2.jpg',
            avatar: '/images/avatars/avatar-1.png',
            author: 'Trần Thuỳ',
            date: 'Nov 22, 2024',
            title: 'Nhà thông minh & bền vững: Sự kết hợp hoàn hảo',
            description:
                'Công nghệ thông minh đang thay đổi cách chúng ta sống, giúp tiết kiệm năng lượng, bảo vệ môi trường.',
            to: '/posts/2'
        },
        {
            id: 3,
            image: '/images/cards/card-3.jpg',
            avatar: '/images/avatars/avatar-1.png',
            author: 'Trần Thuỳ',
            date: 'Nov 22, 2024',
            title: 'Nhà thông minh & bền vững: Sự kết hợp hoàn hảo',
            description:
                'Công nghệ thông minh đang thay đổi cách chúng ta sống, giúp tiết kiệm năng lượng, bảo vệ môi trường.',
            to: '/posts/2'
        },
        {
            id: 4,
            image: '/images/cards/card-4.jpg',
            avatar: '/images/avatars/avatar-1.png',
            author: 'Trần Thuỳ',
            date: 'Nov 22, 2024',
            title: 'Nhà thông minh & bền vững: Sự kết hợp hoàn hảo',
            description:
                'Công nghệ thông minh đang thay đổi cách chúng ta sống, giúp tiết kiệm năng lượng, bảo vệ môi trường.',
            to: '/posts/2'
        },
        {
            id: 5,
            image: '/images/cards/card-5.jpg',
            avatar: '/images/avatars/avatar-1.png',
            author: 'Trần Thuỳ',
            date: 'Nov 22, 2024',
            title: 'Nhà thông minh & bền vững: Sự kết hợp hoàn hảo',
            description:
                'Công nghệ thông minh đang thay đổi cách chúng ta sống, giúp tiết kiệm năng lượng, bảo vệ môi trường.',
            to: '/posts/2'
        },
        {
            id: 6,
            image: '/images/cards/card-6.jpg',
            avatar: '/images/avatars/avatar-1.png',
            author: 'Trần Thuỳ',
            date: 'Nov 22, 2024',
            title: 'Nhà thông minh & bền vững: Sự kết hợp hoàn hảo',
            description:
                'Công nghệ thông minh đang thay đổi cách chúng ta sống, giúp tiết kiệm năng lượng, bảo vệ môi trường.',
            to: '/posts/2'
        },
        {
            id: 7,
            image: '/images/cards/card-7.jpg',
            avatar: '/images/avatars/avatar-1.png',
            author: 'Trần Thuỳ',
            date: 'Nov 22, 2024',
            title: 'Nhà thông minh & bền vững: Sự kết hợp hoàn hảo',
            description:
                'Công nghệ thông minh đang thay đổi cách chúng ta sống, giúp tiết kiệm năng lượng, bảo vệ môi trường.',
            to: '/posts/2'
        },
        {
            id: 8,
            image: '/images/cards/card-8.jpg',
            avatar: '/images/avatars/avatar-1.png',
            author: 'Trần Thuỳ',
            date: 'Nov 22, 2024',
            title: 'Nhà thông minh & bền vững: Sự kết hợp hoàn hảo',
            description:
                'Công nghệ thông minh đang thay đổi cách chúng ta sống, giúp tiết kiệm năng lượng, bảo vệ môi trường.',
            to: '/posts/2'
        },
        {
            id: 9,
            image: '/images/cards/card-9.jpg',
            avatar: '/images/avatars/avatar-1.png',
            author: 'Trần Thuỳ',
            date: 'Nov 22, 2024',
            title: 'Nhà thông minh & bền vững: Sự kết hợp hoàn hảo',
            description:
                'Công nghệ thông minh đang thay đổi cách chúng ta sống, giúp tiết kiệm năng lượng, bảo vệ môi trường.',
            to: '/posts/2'
        },
        {
            id: 10,
            image: '/images/cards/card-10.jpg',
            avatar: '/images/avatars/avatar-1.png',
            author: 'Trần Thuỳ',
            date: 'Nov 22, 2024',
            title: 'Nhà thông minh & bền vững: Sự kết hợp hoàn hảo',
            description:
                'Công nghệ thông minh đang thay đổi cách chúng ta sống, giúp tiết kiệm năng lượng, bảo vệ môi trường.',
            to: '/posts/2'
        },
    ]

    const pageSize = 12
    const [current, setCurrent] = useState(1)
    const pagedData = newsList.slice(
        (current - 1) * pageSize,
        current * pageSize
    )

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

            <Row gutter={[24, 24]} className="mt-8">
                {pagedData.map(item => (
                    <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                        <NewCardComponent {...item} />
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
        </div>
    )
}

export default News
