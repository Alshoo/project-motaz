import Header from '@/components/Header'
import Footer from '@/components/Footer'
import React from 'react'
import Store from '@/components/Store/store'

function store() {
    return (
        <>
            <Header /> 

            <Store/>
    
            <Footer />
        </>

    )
}

export default store 