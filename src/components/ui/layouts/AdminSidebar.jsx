import React, { useState } from 'react'
import { Icon } from '@iconify/react'

const menuItems = [
  { key: 'dashboard', label: 'Dashboard', icon: 'mdi:chart-pie' },
  { key: 'top-list', label: 'Danh sách dẫn đầu', icon: 'mdi:format-list-bulleted' },
  { key: 'orders', label: 'Đặt hàng', icon: 'mdi:cart-outline' },
  { key: 'products', label: 'Products', icon: 'mdi:package-variant-closed' },
  { key: 'sales-report', label: 'Sales Report', icon: 'mdi:chart-line' },
  { key: 'messages', label: 'Tin nhắn', icon: 'mdi:message-text-outline' },
  { key: 'settings', label: 'Cài đặt', icon: 'mdi:cog-outline' },
  { key: 'logout', label: 'Đăng xuất', icon: 'mdi:logout' },
]

const AdminSidebar = ({ selectedKey, onSelect }) => {
  return (
    <aside className="w-64 bg-white min-h-screen shadow-md flex flex-col">
      <div className="flex justify-center items-center p-6 border-b">
        <img src="/images/logos/logo-estate.png" alt="logo" className="w-28" />
      </div>
      <nav className="flex flex-col mt-6 space-y-2 px-4">
        {menuItems.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-left w-full
              ${
                selectedKey === key
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }
            `}
          >
            <Icon icon={icon} width={20} height={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default AdminSidebar
