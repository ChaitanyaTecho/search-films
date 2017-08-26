import React, { Component } from 'react';
import Movies from '../movie-data/movie-data';
import './layout.css';

export default class Layout extends Component{
    constructor(){
        super();
        this.rawData = [];
        this.tempMovieData = [];
        this.movieData = [];
    }
    searchMovie = e => {
        //e.preventDefault();
        var value = e.target.value.replace(/  +/g, ' ').split(' ').join('+').trim();
        if(value.length === 9 && isNaN(value.substring(0,2)) && (!(isNaN(value.substring(2,7)))) ){
            this.setUrl('i', value);
        }else{
            if(value.indexOf('+') > -1){
                this.setUrl('s', value);
            }else{
                this.setUrl('i', value);
            }
        }
    }
    setUrl = (term, value) => {
        const API_DOMAIN = "http://www.omdbapi.com/?";
        const API_KEY = "&apikey=e260c91c";
        fetch(`${API_DOMAIN}${term}=${value}${API_KEY}`)
        .then(result => result.json())
        .then(json => this.rawData.push(json))
        this.cleanData();
    }
    cleanData = () => {
        this.rawData.filter(movie => {
            if(movie.Response === 'True'){
                this.tempMovieData.push(movie);
                this.tempMovieData.splice(0, this.tempMovieData.length-1);
                this.movieData = this.tempMovieData[0]['Search'];
            }
            return this.movieData;
        });
     console.log(this.movieData)   
    }
    render(){
        return (
            <div className="app-container">
                <h1>Film Search</h1>
                <div className="search-container">
                    <form>
                        <div className="search-box">
                            <input type="text" id="searchBox" placeholder="E.g, Avengers" onKeyUp={this.searchMovie}/>
                        </div>
                        <div className="sortBox">
                            Sort :
                            <label>
                                <input type="radio" value="Title" name="radioOption" />
                                Title
                            </label>
                            <label>
                                <input type="radio" value="Date" name="radioOption" />
                                Date
                            </label>
                        </div>
                    </form>
                </div>
                <div className="movie-container">
                    {this.movieData.map((m,i) => <Movies {...m} />)}
                </div>
            </div>
        );
    }
}

