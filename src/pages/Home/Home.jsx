import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Search,Settings2} from 'lucide-react'
const Home = () => {
  return (
    <div className="flex flex-col items-center">
    <div className='banner-search relative'>
      <div className='container-fluid bg-slate-300 h-[400px] w-screen mt-[100px]'></div>
      <div className='search h-12 w-[80%] border border-black absolute bottom-[-20px] left-[50%] translate-x-[-50%]'>
        <input type='text' placeholder='Tìm kiếm tại đây...' className='h-full w-full p-2'></input>
        <div className='absolute top-2 right-5 flex gap-3'>
          <Settings2 className='pt-1'/>
          <button className='color-black btn bg-gray-400 h-full w-14 flex justify-center rounded-[5px] py-1'><Search/></button>
          </div>
      </div>
    </div>
    <div className="underline w-[50%] h-[2px] bg-black mt-10"></div>
    <h1 className='font-bold text-4xl pt-4'>Sản phẩm</h1>
    <div className='product-list grid md:grid-cols-4 grid-cols-1 gap-2 pt-3'>
      <div className='h-[200px] w-[250px] bg-black'></div>
      <div className='h-[200px] w-[250px] bg-black'></div>
      <div className='h-[200px] w-[250px] bg-black'></div>
      <div className='h-[200px] w-[250px] bg-black'></div>
      <div className='h-[200px] w-[250px] bg-black'></div>
      <div className='h-[200px] w-[250px] bg-black'></div>
      <div className='h-[200px] w-[250px] bg-black'></div>
      <div className='h-[200px] w-[250px] bg-black'></div>
    </div>
      <div className="underline w-[50%] h-[2px] bg-black mt-10"></div>
    <h1 className='font-bold text-4xl pt-4'>Đề xuất</h1>
 <div className='product-list grid md:grid-cols-4 grid-cols-1 gap-2 pt-3'>
      <div className='h-[200px] w-[250px] bg-black'></div>
      <div className='h-[200px] w-[250px] bg-black'></div>
      <div className='h-[200px] w-[250px] bg-black'></div>
      <div className='h-[200px] w-[250px] bg-black'></div>
      <div className='h-[200px] w-[250px] bg-black'></div>
      <div className='h-[200px] w-[250px] bg-black'></div>
      <div className='h-[200px] w-[250px] bg-black'></div>
      <div className='h-[200px] w-[250px] bg-black'></div>
    </div>
    <div className='h-20'></div>
    </div>
  );
};

export default Home;
