import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]); // Để lưu dữ liệu sản phẩm từ API

  // Gọi API khi component được render
  useEffect(() => {
    axios.get("https://dummyjson.com/products")
      .then(res => {
        console.log(res.data); // Log dữ liệu trả về từ API
        setProducts(res.data.products); // Lưu dữ liệu vào state 'products'
      })
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* HEADER */}
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#333', color: '#fff' }}>
        <div className="logo" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>SHOPNAME</div>
        <nav>
          <ul style={{ display: 'flex', listStyle: 'none', gap: '20px', margin: 0 }}>
            <li>Home</li>
            <li>Cart</li>
            <li>Username</li>
          </ul>
        </nav>
      </header>

      <div style={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center', color: 'red' }}>FILE placeholder thôi nha!</div>

      {/* SEARCH BAR */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          style={{ width: '60%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      {/* PRODUCT GRID */}
      <main style={{ padding: '20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          {products.length === 0 ? (
            <p>Loading products...</p> // Hiển thị thông báo khi chưa có sản phẩm
          ) : (
            products.map(product => (
              <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ height: '150px', background: '#eee', marginBottom: '10px' }}>Ảnh sản phẩm</div>
                <h3>{product.name}</h3>
                <p style={{ color: 'red', fontWeight: 'bold' }}>{product.price}</p>
                <button style={{ padding: '5px 10px', cursor: 'pointer' }}>Thêm vào giỏ</button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
