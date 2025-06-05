import React from 'react'
import BreadcrumbComponent from '../components/ui/BreadcrumbComponent'

const BuyAndSellProperty = () => {

  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Thông tin cá nhân' }
  ];

  return (
    <div className='container'>
      <BreadcrumbComponent items={breadcrumbItems} />
    </div>
  )
}

export default BuyAndSellProperty
