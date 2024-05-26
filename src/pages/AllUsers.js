import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Paginations from './Pagination';
const AllUsers = () => {
    const [allUser,setAllUsers] = useState([])
    const [search,setSearch] = useState("");
    const [role,setRole] = useState("All");
    const [sort ,setSort ] =useState("new")
    const [page,setPage] = useState(1);
    const [pageCounts,setPageCounts] = useState(0);
      // pagination
    // handle prev btn

    const handlePrevious = ()=>{
      setPage(()=>{
        if(page === 1) return page;
        return page - 1
      })
    }
  
    // handle next btn
    const handleNext = ()=>{
      setPage(()=>{
        if(page === pageCounts) return page;
        return page + 1
      })
    }

    const [openUpdateRole,setOpenUpdateRole] = useState(false)
    const [updateUserDetails,setUpdateUserDetails] = useState({
        email : "",
        name : "",
        role : "",
        _id  : "",
    })

    const fetchAllUsers = async() =>{
        const fetchData = await fetch(`http://localhost:8080/api/all-user?search=${search}&role=${role}&sort=${sort}&page=${page}`,{
            method : SummaryApi.allUser.method,
            credentials : 'include'
        })

        const dataResponse = await fetchData.json()
        if(dataResponse.success){
            setAllUsers(dataResponse.data)
            // setPageCount(dataResponse?.Paginations?.pageCount)
   setPageCounts(dataResponse?.Pagination?.pageCount)
        }

        if(dataResponse.error){
            toast.error(dataResponse.message)
        }

    }

    useEffect(()=>{
        fetchAllUsers()
    },[search,role,sort,page])

  return (
    <div className='container '>
        <div className="main_div ">
        <div className="search_add ">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className=""
                  aria-label="Search"
                  onChange={(e)=>setSearch(e.target.value)}
                />
                <Button  className=' bg-primary' style = {{outline:'none',borderRadius:'none'}}>Search</Button>
              </Form>
            </div>
            

            
            {/* short by value */}
            <div className="filter_newold all_user_section">
              <h2>Sort By Value</h2>
              <Dropdown className='text-center '>
                <Dropdown.Toggle className='dropdown_btn bg-primary' id="dropdown-basic">
                  <i class="fa-solid fa-sort"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={()=>setSort("new")}>New User</Dropdown.Item>
                  <Dropdown.Item onClick={()=>setSort("old")}>Old User</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="filter_gender all_user_section">
              <div className="filter">
                <h2 className='text-2xl'>Filter By role</h2>
                <div className="gender d-flex gap-2 cursor-pointer">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="Role"
                    value={"All"}
                    onChange={(e)=>setRole(e.target.value)}
                    defaultChecked
                    
                  />
                  <Form.Check
                    type={"radio"}
                    label={`ADMIN`}
                    name="Role"
                    value={"ADMIN"}
                    onChange={(e)=>setRole(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`GENERAL`}
                    name="Role"
                    value={"GENERAL"}
                    onChange={(e)=>setRole(e.target.value)}
                  />
                </div>
              </div>
            </div>


          
          </div>
        <div className='bg-white pb-4'>
        <table className='w-full userTable'>
            <thead>
                <tr className='bg-black text-white'>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody className=''>
                {
                    allUser.map((el,index) => {
                        return(
                            <tr>
                                <td>{index+1 +(page - 1)*4 }</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.role}</td>
                                <td>{moment(el?.createdAt).format('LL')}</td>
                                <td>
                                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                                    onClick={()=>{
                                        setUpdateUserDetails(el)
                                        setOpenUpdateRole(true)

                                    }}
                                    >
                                        <MdModeEdit/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>

        {
            openUpdateRole && (
                <ChangeUserRole     
                    onClose={()=>setOpenUpdateRole(false)} 
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )      
        }
    </div>
        </div>

       <div className='d-flex justify-content-end'>
       <Paginations handlePrevious={handlePrevious}
                                    handleNext={handleNext}
                                    page={page}
                                    pageCounts={pageCounts}
                                    setPage={setPage}  />
       </div>

    </div>
   
  )
}

export default AllUsers