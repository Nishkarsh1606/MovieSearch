import React, { useState, useEffect } from "react";
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';
import './App.css'

const App=()=>{
    const [movies, setMovies] = useState([])
    const [searchTerm,setSearchTerm]=useState('')
    useEffect(()=>{
        searchMovies('spider-man')
    },[])
    const searchMovies=async (title)=>{
        try {
            const response= await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=f364ebcf&s=${title}`)
            const data=await response.json()
            setMovies(data.Search)
        } catch (e) {
            console.log(`An error occurred`)
        }
    }
    
    return(
        <div className='app'>
            <h1>MovieSearch</h1>
            <div className="search">
                <input type="text" name="" id="" value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                placeholder="Search for movies  eg: 'Spiderman' " />
                <img src={SearchIcon} alt="search icon" 
                onClick={()=>searchMovies(searchTerm)}
                />
            </div>
            {
                movies?.length>0 ? (<div className="container">
                    {movies.map((movie)=>(<MovieCard movie={movie}/>))}
                </div>)
                :( //else
                <div className="empty"> <h2>No movies found</h2></div>
                )
            }

        </div>
    )
}

export default App