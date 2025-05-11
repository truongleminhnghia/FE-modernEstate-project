import React from 'react'
import Header from '../ui/layouts/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../ui/layouts/Footer'

const LayoutGuest = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>

  )
}

export default LayoutGuest