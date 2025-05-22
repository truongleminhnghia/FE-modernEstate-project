import React from 'react'
import { Input, Dropdown, Avatar, Badge } from 'antd'
import { SearchOutlined, DownOutlined, BellOutlined } from '@ant-design/icons'

const userMenu = (
  <div className="py-2">
    <p className="px-4 py-2 cursor-pointer hover:bg-gray-100">Profile</p>
    <p className="px-4 py-2 cursor-pointer hover:bg-gray-100">Logout</p>
  </div>
)

const AdminHeader = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      <h2 className="text-2xl font-semibold text-blue-600">Dashboard</h2>

      <Input
        placeholder="Search here..."
        prefix={<SearchOutlined />}
        className="max-w-md rounded-full"
        style={{ background: '#F5F7FA', border: 'none' }}
        allowClear
      />

      <div className="flex items-center gap-6">
        <Dropdown
          overlay={
            <div className="p-2 bg-white shadow-md rounded">
              <p className="cursor-pointer px-3 py-1 hover:bg-gray-100">English (US)</p>
              <p className="cursor-pointer px-3 py-1 hover:bg-gray-100">Vietnamese</p>
            </div>
          }
          placement="bottomRight"
        >
          <div className="flex items-center cursor-pointer gap-1 select-none">
            <span>Eng (US)</span>
            <DownOutlined />
          </div>
        </Dropdown>

        <Badge count={5} size="small" offset={[0, 0]}>
          <BellOutlined className="text-xl cursor-pointer" />
        </Badge>

        <Dropdown overlay={userMenu} placement="bottomRight" trigger={['click']}>
          <div className="flex items-center cursor-pointer gap-2 select-none">
            <Avatar src="/images/avatars/avatar-1.png" alt="User" />
            <div className="text-left">
              <p className="font-medium m-0">Musfiq</p>
              <small className="text-gray-500">Admin</small>
            </div>
            <DownOutlined />
          </div>
        </Dropdown>
      </div>
    </header>
  )
}

export default AdminHeader
