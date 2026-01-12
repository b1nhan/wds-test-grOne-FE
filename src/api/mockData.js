// src/api/mockData.js

export const MOCK_USER = {
  success: true,
  message: "Lấy thông tin profile thành công.",
  data: {
    id: 10,
    email: "user@example.com",
    fullName: "Nguyen Van A",
    phone: "0909123456",
    totalSpending: 12500000,
    role: "user"
  }
};

export const MOCK_ORDERS = {
  success: true,
  message: "Lấy lịch sử đơn hàng thành công.",
  data: [
    {
      id: 501,
      createdAt: "2023-10-27T10:00:00Z",
      totalAmount: 7000000,
      phone: "0909123456",
      items: [
        {
          product: {
            id: 101,
            name: "Nike Air Jordan 1 High",
            price: 3500000,
            imageUrl: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/005e8138-038c-4fd2-8d76-646979603f9c/AIR+JORDAN+1+RETRO+HIGH+OG.png",
          },
          quantity: 2,
          totalPrice: 7000000
        }
      ]
    },
    {
      id: 502,
      createdAt: "2024-01-05T14:20:00Z",
      totalAmount: 5500000,
      phone: "0909123456",
      items: [
        {
          product: {
            id: 102,
            name: "Adidas Ultraboost",
            price: 2800000,
            imageUrl: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/0f464010640f4211a76aad5000a6560b_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg",
          },
          quantity: 1,
          totalPrice: 2800000
        },
        {
          product: {
            id: 103,
            name: "New Balance 550",
            price: 2700000,
            imageUrl: "https://nb.scene7.com/is/image/NB/bb550wt1_nb_02_i?$pdp_main_v7$&fmt=webp",
          },
          quantity: 1,
          totalPrice: 2700000
        }
      ]
    }
  ]
};