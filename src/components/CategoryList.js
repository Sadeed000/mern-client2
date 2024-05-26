import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'
import axios from 'axios'
const CategoryList = () => {
    const [categoryProduct,setCategoryProduct] = useState([])
    const [loading,setLoading] = useState(false)

    const categoryLoading = new Array(13).fill(null)

    const fetchCategoryProduct = async() =>{
        setLoading(true)
        // const response = await fetch(SummaryApi.categoryProduct.url)
        // console.log("====>" + response)
        // const dataResponse = await response.json()
        // console.log("====>" + dataResponse)

        // setLoading(false)
        // setCategoryProduct(dataResponse.data)
        const dataResponse =await  axios.get(`https://mern-backend-0hme.onrender.com/api/get-categoryProduct`)
        // console.log(dataResponse.data.data)
         setCategoryProduct(dataResponse?.data?.data)

      
        // setLoading(false)


    }

    useEffect(()=>{
        fetchCategoryProduct()
    },[])



  return (
    <div className='container mx-auto p-4'>
           <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
           {
            categoryProduct?.map((product,index)=>{
                        {/* console.log("====" + categoryProduct.data) */}
                        return(
                            <Link to={"/product-category?category="+product?.category} className='cursor-pointer' key={product?.category}>
                                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                    <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                                </div>
                                <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                            </Link>
                        )
                    })
           }
           </div>
    </div>
  )
}

export default CategoryList
