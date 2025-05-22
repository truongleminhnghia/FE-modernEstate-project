import React from 'react'
import Header from '../ui/layouts/header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../ui/layouts/footer/Footer'

const LayoutEmployee = () => {
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

export default LayoutEmployee
