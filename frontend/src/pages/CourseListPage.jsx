
import { FaMagnifyingGlass } from 'react-icons/fa6'
import CourseCard from '../components/CourseCard'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function CourseListPage() {
     const [courses, setCourses] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
     const [searchText, setSearchText] = useState(searchQuery || "")
       const fetchCourses = async() =>{
           try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/course?search=${encodeURIComponent(searchText)}`);
                const data = await res.json();
                console.log(data);
                setCourses(data);
            } catch (error) {
               toast.error(error.message)
            }
       }
    
       useEffect(()=>{
          fetchCourses()
       },[searchText])

        const handleSearch = async(e) =>{
            e.preventDefault()
            fetchCourses()
       }

       const handleSearchText = (text) =>{
            setSearchText(text)
            setSearchParams({ search: text });
       }
  return (
    <div className='px-10 md:px-20'>

        <div className="flex justify-between items-center flex-wrap my-10">
            <div>
                Search results for: <span className='font-semibold'>{searchText}</span>
            </div>
            <form onSubmit={handleSearch} className='flex items-center space-x-1  w-full md:w-1/3'>
                <input onChange={(e)=>handleSearchText(e.target.value)} value={searchText} type="text" className='p-2 border rounded-md w-full' placeholder='Search Courses'/>
                <button type='submit' className='bg-black text-white p-3 rounded-md'><FaMagnifyingGlass/> </button>
            </form>

        </div>
        
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 space-x-5 space-y-5">
            {
                courses?.map((course,index)=>(
                    <CourseCard course={course} key={index}/>
                ))
             }
        </div>
    </div>
  )
}

export default CourseListPage