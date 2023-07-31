import React from 'react'
import Navbar from '../features/navbar/Navbar';
import AdminProductList from '../features/admin/component/AdminProductList'

const AdminHomePage = () => {
  return (
    <div>
      <Navbar>
        <AdminProductList />
      </Navbar>
    </div>
  )
}

export default AdminHomePage
