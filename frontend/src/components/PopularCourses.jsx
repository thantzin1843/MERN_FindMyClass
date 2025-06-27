
import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import CourseCard from './CourseCard';

function PopularCourses() {
    const [courses, setCourses] = useState([])
       const fetchCourses = async() =>{
           try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/course`);
                const data = await res.json();
                console.log(data);
                setCourses(data);
            } catch (error) {
               toast.error(error.message)
            }
       }
    
       useEffect(()=>{
          fetchCourses()
       },[])
    // for scroll indicator
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft , setScrollLeft] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const scroll = (direction) =>{
        const scrollAmount = direction==='left' ? -500 : 500;
        scrollRef.current.scrollBy({left:scrollAmount, behavior:"smooth"})
    }

    const updateScrollbuttons = () =>{
        const container = scrollRef.current;
        if(container){
            const leftScroll = container.scrollLeft;
            const rightScroll = container.scrollWidth - (container.scrollLeft+container.clientWidth) > 0;
            // console.log((container.scrollWidth - (container.scrollLeft+container.clientWidth)) > 0)
            setCanScrollLeft(leftScroll > 0);
            setCanScrollRight(rightScroll)
        }
    }

    const handleMouseDown = (e) =>{
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    }
    const handleMouseMove = (e) =>{
        if(!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    }
     const handleMouseUpOrLeave = () =>{
        setIsDragging(false);

    }
    useEffect(()=>{
        const container = scrollRef.current;
        if(container){
            container.addEventListener('scroll',updateScrollbuttons);
            updateScrollbuttons()
        }
    },[])


  return (
    <section className=' md:px-0 my-5'>
        <div className="container  mx-auto text-center mb-15 relative">
            <h2 className="text-3xl font-bold">Latest Courses</h2>
            {/* scroll button */}
            <div className='absolute right-0 bottom-[-45px] flex space-x-2'>
                <button disabled={!canScrollLeft} onClick={()=>scroll("left")} className={`p-2 rounded border bg-white text-black ${canScrollLeft ? "bg-white text-black": "bg-gray-200 text-gray-400"}`}>
                    <FiChevronLeft className='text-2xl'/>
                </button>

                <button disabled={!canScrollRight} onClick={()=>scroll("right")} className={`p-2 rounded border bg-white text-black ${canScrollRight ? "bg-white text-black": "bg-gray-200 text-gray-400"}`}>
                    <FiChevronRight className='text-2xl'/>
                </button>

            </div>
        </div>

        {/* Scrollable contents */}
        {
            courses?.length > 0 ? (
                <div 
                        onMouseDown={handleMouseDown} 
                        onMouseMove={handleMouseMove} 
                        onMouseUp={handleMouseUpOrLeave}
                        onMouseLeave={handleMouseUpOrLeave}
                        ref={scrollRef} className={`hideIndi container px-5 md:px-12 mx-auto overflow-x-scroll flex space-x-3 relative ${isDragging ? " cursor-grabbing": "cursor-grab"}`}>
                            {
                                courses?.map((course,index)=>(
                                    <CourseCard course={course} key={index}/>
                                ))
                            }

                            <div className='relative min-w-[100%] sm:min-w-[35%] lg:min-w-[25%] border border-gray-300 bg-gray-200 flex justify-center items-center'>
                                <Link to={'/courses'} className='bg-black py-2 px-5 rounded-md text-white'>Explore!</Link>
                            </div>
                            
                        </div>
            ):(
                <div className='text-gray-600 text-md text-center'>No latest course yet!</div>
            )
        }
       

        
        
    </section>
  )
}

export default PopularCourses