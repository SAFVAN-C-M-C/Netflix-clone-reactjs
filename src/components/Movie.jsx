import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, arrayUnion, updateDoc, onSnapshot } from "firebase/firestore";
function Movie({ movie }) {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, "user", `${user?.email}`);
  useEffect(() => {
    onSnapshot(
      doc(db, "user", `${user?.email}`), (doc) => {
        const res=doc.data()?.savedShows;
        if(res){
          for(const item of res){
            if(item.id===movie.id){
              setLike(true)
            }
          }
        }
      }
    );
  }, [user?.email]);

  const saveShow = async () => {
    if (user?.email) {
      if (!like) {
        setLike(true);
        setSaved(true);
        await updateDoc(movieID, {
          savedShows: arrayUnion({
            id: movie.id,
            title: movie.title,
            img: movie.backdrop_path,
          }),
        });
      }
    } else {
      alert("Please log in to continue");
    }
  };

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
        alt={movie?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full p-2 text-center">
          {movie?.title}
        </p>
        <p onClick={saveShow}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-400" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-400" />
          )}
        </p>
      </div>
    </div>
  );
}

export default Movie;
