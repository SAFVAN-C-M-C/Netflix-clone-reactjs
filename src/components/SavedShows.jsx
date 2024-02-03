import React, { useEffect, useRef, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import {AiOutlineClose} from 'react-icons/ai'
const SavedShows = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(
      doc(db, "user", `${user?.email}`), (doc) => {
        setMovies(doc.data()?.savedShows);
      }
    );
  }, [user?.email]);

  const sliderRef = useRef(null);
  const slideLeft = () => {
    sliderRef.current.scrollLeft -= 500;
  };
  const slideRight = () => {
    sliderRef.current.scrollLeft += 500;
  };


  const movieRef=doc(db,'user',`${user?.email}`);
  const deleteShow=async(id)=>{
    try {
        const result=movies.filter((movie)=>movie.id!==id)
        await updateDoc(movieRef,{
            savedShows:result
        })
    } catch (error) {
        console.log(error.message);
    }
  }
  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">My shows</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          size={40}
          className="bg-white rounded-full opacity-50 hover:opacity-100 absolute left-0 cursor-pointer z-10 hidden group-hover:block"
        />
        <div
          id={"slider"}
          ref={sliderRef}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((movie, id) => (
            <div key={id} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
              <img
                className="w-full h-auto block"
                src={`https://image.tmdb.org/t/p/w500/${movie?.img}`}
                alt={movie?.title}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full p-2 text-center">
                  {movie?.title}
                </p>
                <p onClick={()=>{deleteShow(movie.id)}} className="absolute text-gray-300 top-4 right-4"><AiOutlineClose/></p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          size={40}
          className="bg-white  rounded-full opacity-50 hover:opacity-100 absolute right-0 cursor-pointer z-10 hidden group-hover:block "
        />
      </div>
    </>
  );
};

export default SavedShows;
