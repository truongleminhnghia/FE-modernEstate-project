import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../ui/layouts/footer/Footer'
import Header from '../ui/layouts/header/Header'


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