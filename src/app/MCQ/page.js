'use client'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import McqPage from '@/components/mcq/mcqPage'
import React from 'react'

export default function page() {
  return (
    <div>
      <Header/>


      <div className='flex flex-col gap-[52vh]'>

      <McqPage/>
      <Footer/>

      </div>




    </div>
  )
}
