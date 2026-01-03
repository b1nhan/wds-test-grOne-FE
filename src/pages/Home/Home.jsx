import axios from 'axios';
import {Search,Settings2} from 'lucide-react'
import bannerIMG from '../../assets/banner.jpg'
import { useState,useEffect } from 'react';
import {Card} from '../../components'

const Home = () => {
  
const [products,setProducts] = useState([])
const [isLoading,setLoading] = useState(true)
const [isError,setError] = useState(false)

useEffect(()=> {
  const fetchProducts = async () => {
    try{
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data)
    }catch(e){
      setError(e.message)
    } finally{
      setLoading(false)
    }
  }
  fetchProducts();
},[])

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error: {isError}</div>
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
        <Card key={index} title={item.title} image = {item.image} price = {item.price}></Card>
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
        <Card key={index} title={item.title} image = {item.image} price = {item.price}></Card>
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
