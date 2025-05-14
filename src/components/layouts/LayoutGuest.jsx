import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../ui/layouts/Footer'
import Header from '../ui/layouts/Header/Header'

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