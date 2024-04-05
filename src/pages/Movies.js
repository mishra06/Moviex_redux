import React, { useEffect, useState } from "react";
import { fetchApi } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { MoviesSec } from "../slice/movieSlice";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import './Movies.css';
import InfiniteScroll from "react-infinite-scroll-component";

const Movies = () => {
  const [page,setPage] = useState(1);
  const [total,setTotal] = useState(2);

  const MovieSection = useSelector((state) => state.movieSlice.Movies);

  const dispatch = useDispatch();

  async function moviesSection() {
    try {
      const result = await fetchApi(
        "https://api.themoviedb.org/3/discover/movie",
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      );
      dispatch(MoviesSec(result.data.results));
      // setPage((prev)=> prev+1);
      setTotal(result.data.total_page);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    moviesSection();
  }, []);

  async function moviesSectionPage() {
    try {
      const result = await fetchApi(
        `https://api.themoviedb.org/3/discover/movie?page=${page}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      );
      // dispatch(MoviesSec(result.data.results));
      const NewMovieData = [...MovieSection,...result.data.results];
      dispatch(MoviesSec(NewMovieData));
      setPage((prev)=> prev+1);
      setTotal(result.data.total_page);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    moviesSectionPage()
  },[])
  // useEffect(()=>{

  // },[total])

  console.log("MovieSection", MovieSection);

  return (
    <div>
      <Navbar />
      <InfiniteScroll
        dataLength={total} 
        next={moviesSectionPage}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        
      >
        {/* // movies page section  */}

        <div className="movies_collection_display" >
        <div className="content_upper_sec">
          <div className="content_name_sec">
            <span>Explore Movies</span>
          </div>
          <div className="content_filter_section"></div>

          {MovieSection.map((movie) => {
            return (
              <div key={movie.id} className="mmmmm">
                <NavLink style={{ width: "100%", borderRadius: "15px" }} to={`/movie/${movie.id}`}>
                  <Cards movie={movie} />
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>

         {/* end page  */}
      </InfiniteScroll>
      {/* navbar section  */}
      
      
    </div>
  );
};

export default Movies;
