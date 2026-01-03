import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Search,Settings2} from 'lucide-react'
import bannerIMG from '../../assets/banner.jpg'

let products = [
  {
    name: "Giày NIKE",
    price: 10000000,
    description: "Sản phẩm giày NIKE chính hãng 100%",
    quantity: 10,
    image_url: "https://imgs.search.brave.com/nSjzY_yAgYrwPEzNJy8I4bwMCj8G6L8kF-zYJBDBBJw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/NDIyOTEwMjYtN2Vl/YzI2NGMyN2ZmP2l4/bGliPXJiLTQuMS4w/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TW54OGJt/bHJaWHhsYm53d2ZI/d3dmSHg4TUE9PSZm/bT1qcGcmcT02MCZ3/PTMwMDA"
  },
  {
    name: "Giày ADIDAS",
    price: 10000000,
    description: "Sản phẩm giày ADIDAS chính hãng 99%",
    quantity: 10,
    image_url: "https://imgs.search.brave.com/6980T_yJvvDlRPkZj-EF0rV2se8YpQqRl-96MEBMXf0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9icmFu/ZC5hc3NldHMuYWRp/ZGFzLmNvbS9pbWFn/ZS91cGxvYWQvZl9h/dXRvLHFfYXV0bzpi/ZXN0LGZsX2xvc3N5/L2lmX3dfZ3RfODAw/LHdfODAwL29yaWdf/c3MyNl9hZGlzdGFy/X2NvbnRyb2xfNV90/Y2NfMDRfZF9lMzdj/MWI2ZGExLmpwZw"
  },
  {
    name: "Giày NIKE",
    price: 10000000,
    description: "Sản phẩm giày NIKE chính hãng 100%",
    quantity: 10,
    image_url: "https://imgs.search.brave.com/nSjzY_yAgYrwPEzNJy8I4bwMCj8G6L8kF-zYJBDBBJw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/NDIyOTEwMjYtN2Vl/YzI2NGMyN2ZmP2l4/bGliPXJiLTQuMS4w/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TW54OGJt/bHJaWHhsYm53d2ZI/d3dmSHg4TUE9PSZm/bT1qcGcmcT02MCZ3/PTMwMDA"
  },
  {
    name: "Giày ADIDAS",
    price: 10000000,
    description: "Sản phẩm giày ADIDAS chính hãng 99%",
    quantity: 10,
    image_url: "https://imgs.search.brave.com/6980T_yJvvDlRPkZj-EF0rV2se8YpQqRl-96MEBMXf0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9icmFu/ZC5hc3NldHMuYWRp/ZGFzLmNvbS9pbWFn/ZS91cGxvYWQvZl9h/dXRvLHFfYXV0bzpi/ZXN0LGZsX2xvc3N5/L2lmX3dfZ3RfODAw/LHdfODAwL29yaWdf/c3MyNl9hZGlzdGFy/X2NvbnRyb2xfNV90/Y2NfMDRfZF9lMzdj/MWI2ZGExLmpwZw"
  },
]


const Home = () => {
  return (
    <div className="flex flex-col items-center">
    <div className='banner-search relative'>
      <div className='container-fluid bg-slate-300 h-[500px] w-screen mt-[100px] overflow-hidden'>
        <img src={bannerIMG} alt="banner" className='h-full w-full object-cover' />
      </div>
      <div className='search h-12 w-[80%] border border-black absolute bottom-[-20px] left-[50%] translate-x-[-50%]'>
        <input type='text' placeholder='Tìm kiếm tại đây...' className='h-full w-full p-2'></input>
        <div className='absolute top-2 right-5 flex gap-3'>
          <Settings2 className='pt-1'/>
          <button className='color-black btn bg-gray-400 h-full w-14 flex justify-center rounded-[5px] py-1'><Search/></button>
          </div>
      </div>
    </div>
    <div className='products-container flex flex-col items-center'>
    <div className="underline w-[50%] h-[2px] bg-black mt-10"></div>
      <h1 className='font-bold text-4xl pt-4'>Sản phẩm</h1>
    <div className='product-list grid md:grid-cols-4 grid-cols-1 gap-2 pt-3'>
      {products?.map((item,index) => (
        <div className='flex flex-col items-center'>
          <div className='h-[200px] w-[250px] bg-black relative'>
            <img src={item.image_url} alt={item.name} className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'></img>
            <div className='bg-white/50 w-full h-[30%] absolute bottom-0 flex items-center justify-center shadow'>
              <div className='w-12 h-12 bg-black opacity-1'>
                <img src={item.image_url} alt={item.name} className='h-full w-full object-cover'/>
              </div>
            </div>
          </div>
          <div className='mt-2'>{item?.name}</div>
          <b>{item.price.toLocaleString('vi-VN') + 'đ'}</b>
        </div>
      ))
      }
    </div>
      <button className='border w-24 border-black p-2 mt-5 bg-gray-200 rounded-[5px] hover:bg-green-200'>Xem thêm</button>
    </div>
      <div className='products-container flex flex-col items-center'>
    <div className="underline w-[50%] h-[2px] bg-black mt-10"></div>
      <h1 className='font-bold text-4xl pt-4'>Đề xuất</h1>
    <div className='product-list grid md:grid-cols-4 grid-cols-1 gap-2 pt-3'>
      {products?.map((item,index) => (
        <div className='flex flex-col items-center'>
          <div className='h-[200px] w-[250px] bg-black relative'>
            <img src={item.image_url} alt={item.name} className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'></img>
            <div className='bg-white/50 w-full h-[30%] absolute bottom-0 flex items-center justify-center shadow'>
              <div className='w-12 h-12 bg-black opacity-1'>
                <img src={item.image_url} alt={item.name} className='h-full w-full object-cover'/>
              </div>
            </div>
          </div>
          <div className='mt-2'>{item?.name}</div>
          <b>{item.price.toLocaleString('vi-VN')+ 'đ'}</b>
        </div>
      ))
      }
    </div>
      <button className='border w-24 border-black p-2 mt-5 bg-gray-200 rounded-[5px] hover:bg-green-200'>Xem thêm</button>
    </div>
    <div className='h-10'></div>
    </div>
  );
};

export default Home;
