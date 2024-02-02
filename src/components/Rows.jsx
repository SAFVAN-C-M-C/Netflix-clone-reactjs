import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Movie from "./Movie";
import {MdChevronLeft,MdChevronRight} from 'react-icons/md'
function Rows({ title, fetchURL }) {

    const sliderRef=useRef(null);
  const [movies, seetMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((res) => {
      seetMovies(res.data.results);
    });
  }, [fetchURL]);


  const slideLeft=()=>{
    sliderRef.current.scrollLeft -= 500;
  }
  const slideRight=()=>{
    sliderRef.current.scrollLeft += 500;
  }
  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft onClick={slideLeft} size={40} className="bg-white rounded-full opacity-50 hover:opacity-100 absolute left-0 cursor-pointer z-10 hidden group-hover:block"/>
        <div id={"slider"} ref={sliderRef}  className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
          {movies.map((movie, id) => (
            <Movie movie={movie} key={id} />
          ))}
        </div>
        <MdChevronRight onClick={slideRight} size={40} className="bg-white  rounded-full opacity-50 hover:opacity-100 absolute right-0 cursor-pointer z-10 hidden group-hover:block "/>
      </div>
    </>
  );
}

export default Rows;
