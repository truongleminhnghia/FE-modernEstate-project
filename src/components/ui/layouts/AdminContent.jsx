import React from 'react'

const AdminContent = ({ children }) => {
  return (
    <main className="flex-1 p-6 bg-gray-50 min-h-screen overflow-auto">
      {children}
    </main>
  )
}

export default AdminContent