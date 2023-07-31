import React from 'react'
import ProductDetails from '../features/product/component/ProductDetails'
import Navbar from '../features/navbar/Navbar'

const ProductDetailPage = () => {
  return (
    <div>
        <Navbar>
      <ProductDetails />
        </Navbar>
    </div>
  )
}

export default ProductDetailPage
