import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../ui/layouts/header/Header'
import Footer from '../ui/layouts/footer/Footer'

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