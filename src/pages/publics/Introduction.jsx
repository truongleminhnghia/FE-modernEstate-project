import { Icon } from '@iconify/react/dist/iconify.js'
import { Col, Row } from 'antd'
import React from 'react'

const Introduction = () => {
    return (
        <div>
            <img
                className='mt-[20px] w-full h-[480px] object-cover relative'
                src="/images/backgrounds/background1.png" alt="" />
            <Row className='bg-[#EEF6FF] h-[430px] relative'>
                <div className='container flex items-center gap-[20px] relative'>
                    <div className='w-full'>
                        <h2 className='uppercase text-[#000000] text-[24px] font-semibold'>Công ty công nghệ bất động sản hiện đại</h2>
                        <p className='text-[#000] text-[16px] font-normal mt-[16px] w-[800px]'><strong>Modern Estate</strong> là một startup công nghệ trong lĩnh vực bất động sản,
                            mong muốn góp phần số hóa và đơn giản hóa các giao dịch bất động sản tại Việt Nam.
                            Chúng tôi không ngừng cải thiện và phát triển để mang đến những giải pháp tiện lợi,
                            minh bạch và an toàn cho khách hàng.
                        </p>
                        <p className='text-[#000] text-[16px] font-normal mt-[16px] w-[800px]'>Bên cạnh việc ứng dụng công nghệ để nâng cao trải nghiệm người dùng, Modern Estate
                            cũng hướng đến việc xây dựng các điểm giao dịch thân thiện và chuyên nghiệp, tạo cầu nối
                            giữa chủ đầu tư, khách hàng và nhà môi giới.
                        </p>
                    </div>
                    <img
                        className='w-[500px] h-[500px] block object-cover absolute right-0 mt-[140px] z-[999]'
                        src="/images/backgrounds/banner-1.png" alt="" />
                </div>
            </Row>
            <Row className=''>
                <div className='container flex items-center'>
                    <img
                        className='w-[650px] h-[550px] block object-cover '
                        src="/images/backgrounds/Online world-pana 1.png" alt="" />
                    <div className='ml-auto'>
                        <h2 className='uppercase text-[#000000] text-[24px] font-semibold'>Sứ mệnh</h2>
                        <p className='text-[#000] text-[16px] font-normal mt-[16px] w-auto'>Cung cấp thông tin minh bạch</p>
                        <p className='text-[#000] text-[16px] font-normal mt-[16px] w-auto'>Bảo vệ quyền lợi khách hàng và tạo môi trường giao dịch thuận lợi</p>
                        <p className='text-[#000] text-[16px] font-normal mt-[16px] w-auto'>Góp phần xây dựng thị trường bất động sản lành mạnh</p>
                    </div>
                </div>
            </Row>
            <Row className=''>
                <div className='container flex items-center'>
                    <div className='ml-[100px]'>
                        <h2 className='uppercase text-[#000000] text-[24px] font-semibold text-right'>Tầm nhin</h2>
                        <p className='text-[#000] text-[16px] font-normal mt-[16px] w-auto text-right'>
                            Trở thành nền tảng kết nối giao dịch căn
                            <br />
                            hộ được biết đến với sự uy tín, minh
                            <br />
                            bạch và hiệu quả.
                        </p>
                    </div>
                    <img
                        className='w-[550px] h-[550px] block object-cover ml-[190px]'
                        src="/images/backgrounds/Navigation-amico 1.png" alt="" />
                </div>
            </Row>
            <div className="container mt-[40px]">
                <h2 className="uppercase text-[#000000] text-[24px] !font-bold text-center">GIÁ TRỊ CỐT LÕI</h2>
                <div className="flex justify-around gap-12 mt-[50px]">
                    <div className="flex flex-col items-center w-[200px]">
                        <img className='w-[100px] h-[100px] mb-[30px]' src="/images/icon/icon-1.png" alt="icon" />
                        <h3 className="font-semibold text-[18px] mb-[12px] text-[#000]">Tận tâm</h3>
                        <p className="text-center text-[14px] text-[#333]">Tận tâm với khách hàng</p>
                    </div>
                    <div className="flex flex-col items-center w-[200px]">
                        <img className='w-[100px] h-[100px] mb-[30px]' src="/images/icon/icon-2.png" alt="icon" />
                        <h3 className="font-semibold text-[18px] mb-[12px] text-[#000]">Trách nhiệm</h3>
                        <p className="text-center text-[14px] text-[#333]">Làm đúng cam kết nhận trách nhiệm</p>
                    </div>
                    <div className="flex flex-col items-center w-[200px]">
                        <img className='w-[100px] h-[100px] mb-[30px]' src="/images/icon/icon-3.png" alt="icon" />
                        <h3 className="font-semibold text-[18px] mb-[12px] text-[#000]">Bảo mật</h3>
                        <p className="text-center text-[14px] text-[#333]">Đảm bảo an toàn thông tin người dùng</p>
                    </div>
                </div>
            </div>
            <Row className="container mb-[40px] !mt-[100px]">
                <div className='flex mb-[40px]'>
                    <h2 className="text-[24px] font-bold mb-6 w-[800px] text-[#000]">
                        MÔ HÌNH KINH DOANH <span className="text-[#4F98CD]">MODERN ESTATE</span>
                    </h2>
                    <p className="mb-6 text-[18px] text-[#000] w-[600px]">
                        Tiên phong và minh bạch thị trường bất động sản, tích hợp dịch vụ BĐS thông minh, ứng dụng công nghệ hiện đại, xây dựng hệ sinh thái kết nối khách hàng, chủ đầu tư, nhà môi giới và các đối tác liên quan.
                    </p>
                </div>
                <div className="flex justify-between space-x-6 w-full">
                    {/* mỗi card flex-1 để đều nhau */}
                    <div className="flex-1 bg-[#F2F7FF] rounded-lg p-5 shadow">
                        <div className="flex items-center gap-2.5 bg-[#4F98CD] py-3 px-4 rounded-lg mb-4">
                            <div className="w-8 h-8 flex items-center justify-center bg-[#A7CBE6] rounded-full">
                                <Icon icon="solar:user-bold" width="20" height="20" className="text-white" />
                            </div>
                            <h3 className="text-base font-medium text-white !m-0">Kinh doanh nền tảng</h3>
                        </div>
                        <p className="text-sm text-gray-800">Sàn TMĐT BĐS<br />DV công nghệ BĐS (SaaS)</p>
                    </div>

                    <div className="flex-1 bg-[#ECF7F9] rounded-lg p-5 shadow">
                        <div className="flex items-center gap-2.5 bg-[#4FCDC3] py-3 px-4 rounded-lg mb-4">
                            <div className="w-8 h-8 flex items-center justify-center bg-[#95E1DB] rounded-full">
                                <Icon icon="solar:user-bold" width="20" height="20" className="text-white" />
                            </div>
                            <h3 className="text-base font-medium text-white !m-0">Nhượng quyền mô hình MG BĐS</h3>
                        </div>
                        <p className="text-sm text-gray-800">Thương hiệu Modern Estate…</p>
                    </div>

                    <div className="flex-1 bg-[#EDF3FA] rounded-lg p-5 shadow">
                        <div className="flex items-center gap-2.5 bg-[#2E71A2] py-3 px-4 rounded-lg mb-4">
                            <div className="w-8 h-8 flex items-center justify-center bg-[#81A9C7] rounded-full">
                                <Icon icon="solar:user-bold" width="20" height="20" className="text-white" />
                            </div>
                            <h3 className="text-base font-medium text-white !m-0">Dịch vụ gia tăng</h3>
                        </div>
                        <p className="text-sm text-gray-800">Dịch vụ tài chính…</p>
                    </div>
                </div>
            </Row>
        </div>
    )
}

export default Introduction
