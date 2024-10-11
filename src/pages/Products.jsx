// // ปรับ Products.js: ใช้ useSelector เพื่อดึงข้อมูลจาก Redux store และ useDispatch เพื่อส่ง action

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct, removeProduct } from '../features/productSlice';

function Products() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);

  // สร้าง state สำหรับเก็บค่าจากฟอร์ม
  const [newProductID, setNewProductID] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: productList.length + 1, // ให้ ID เป็นลำดับถัดไป
      name: newProductName,
      price: newProductPrice,
      description: newProductDescription,
    };
    dispatch(addProduct(newProduct));

    // รีเซ็ตฟอร์ม
    setNewProductID('');
    setNewProductName('');
    setNewProductPrice('');
    setNewProductDescription('');
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {productList.map(product => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              {product.name} - {product.price}
            </Link>
            <button onClick={() => handleRemoveProduct(product.id)}>Remove</button>
          </li>
        ))}
      </ul>

      {/* แบบฟอร์มสำหรับเพิ่มสินค้าใหม่ */}
      <h3 style={{ marginTop: '20px' }}>Add New Product</h3>
      <form onSubmit={handleAddProduct} style={{ marginTop: '10px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="productID" style={{ marginLeft: '10px' }}>Product ID:</label><br />
          <input
            type="text"
            id="productID"
            value={newProductID}
            onChange={(e) => setNewProductID(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="productName" style={{ marginLeft: '10px' }}>Product Name:</label><br />
          <input
            type="text"
            id="productName"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="productPrice" style={{ marginLeft: '10px' }}>Price:</label><br />
          <input
            type="text"
            id="productPrice"
            value={newProductPrice}
            onChange={(e) => setNewProductPrice(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="productDescription" style={{ marginLeft: '10px' }}>Description:</label><br />
          <textarea
            id="productDescription"
            value={newProductDescription}
            onChange={(e) => setNewProductDescription(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default Products;
