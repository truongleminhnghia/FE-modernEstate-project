import { Button, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <Row className='py-2'>
            <div className='container flex items-center'>
                <img
                    className='h-[70px] w-[100px] object-cover'
                    src="images/logos/logo-estate.png"
                    alt="Logo"
                />
                <ul className='flex ml-20'>
                    <li className='text-[18px] font-medium px-[12px] py-2'>
                        <Link>Trang chủ</Link>
                    </li>
                    <li className='text-[18px] font-medium px-[12px] py-2'>
                        <Link>Dịch vụ</Link>
                    </li>
                    <li className='text-[18px] font-medium px-[12px] py-2'>
                        <Link>Thông tin</Link>
                    </li>
                </ul>
                <Button className='ml-auto bg-[#FF6A00] text-white font-medium px-4 py-2 rounded-[8px]'>
                    Đăng Nhập
                </Button>
            </div>
        </Row>
    )
}

export default Header
