import React  from 'react';

const MoviesLayout = movie =>
    <div className="movie-box">
        <h3>{movie.Title}</h3>
        <img src={movie.Poster} alt=""/>
        <p>Year of Release : {movie.Year}</p>
    </div>;

export default MoviesLayout;