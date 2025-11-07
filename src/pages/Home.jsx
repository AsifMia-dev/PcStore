import React from 'react'
import Layout from '../components/Layout'
import HeroSection from '../components/HomeComponents/HeroSection'
import ProductCard from '../components/HomeComponents/ProductList/ProductCard'


const Home = () => {
  
  return (
    <Layout>
       <HeroSection />
       <ProductCard />
    </Layout>
  )
}

export default Home
