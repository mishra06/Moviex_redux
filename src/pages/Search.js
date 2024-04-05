import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import {fetchApi} from '../utils/api'
import { Searched } from '../slice/movieSlice'
import CardSection from '../components/CardSection'


const Search = () => {

  const searchedMovieList = useSelector((state) => state.movieSlice.SearchSec);

  const { movie } = useParams();
  console.log(movie);

  const dispatch = useDispatch();

  async function searchMovie(){
    try{
      const result = await fetchApi(
        `https://api.themoviedb.org/3/search/multi?query=${movie}&page=1`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      );
      dispatch(Searched(result.data.results));
      console.log(result.data.results);

    } catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    searchMovie()
  },[])

  console.log("searchedMovie", searchedMovieList);


  return (
    <div>
      <Navbar/>
      <div>
      {
                searchedMovieList.map((movie) => {
                    return (
                        <div key={movie.id}>
                            <NavLink to={`/movie/${movie.id}`}>
                                <CardSection movie={movie} />
                            </NavLink>
                        </div>
                    )
                })
            }
      </div>
              
    </div>
  )
}

export default Search
