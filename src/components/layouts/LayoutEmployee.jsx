import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../ui/layouts/AdminSidebar'
import AdminHeader from '../ui/layouts/AdminHeader'

const LayoutEmployee = () => {
    const [selectedKey, setSelectedKey] = useState('dashboard')
    return (
        <div className="flex min-h-screen">
            <AdminSidebar selectedKey={selectedKey} onSelect={setSelectedKey} />
            <div className="flex flex-col flex-1">
                <AdminHeader />
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutEmployee
