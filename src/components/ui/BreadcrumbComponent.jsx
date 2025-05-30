import { Breadcrumb } from 'antd';
import React from 'react'

const BreadcrumbComponent = (props) => {
  const { items } = props;

  return (
    <Breadcrumb className='text-[12px] my-[8px] !mt-[30px]'
      items={items}
    />
  )
}

export default BreadcrumbComponent