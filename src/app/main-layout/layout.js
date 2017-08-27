import React, { Component } from 'react';
import MoviesLayout from '../movie-layout/movie-layout';

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
        /* if(value.length === 9 && isNaN(value.substring(0,2)) && (!(isNaN(value.substring(2,7)))) ){
            this.getMovies('i', value);
        }else{
            if(value.indexOf('+') > -1){
                this.getMovies('s', value);
            }else{
                this.getMovies('i', value);
            }
        } */
        this.getMovies('s',value)
    }

    getMovies = (term, value) => {
        const API_DOMAIN = "http://www.omdbapi.com/?";
        const API_KEY = "&apikey=e260c91c";
        fetch(`${API_DOMAIN}${term}=${value}${API_KEY}`)
        .then(result => result.json())
        .then(json => {
            this.rawData.push(json);
            this.cleanData(term);
        });
    }

    cleanData = (term) => {
        console.log(term);
        this.rawData.filter(movie => {
            if(movie.Response === 'True'){
                this.tempMovieData.push(movie);
                this.tempMovieData.splice(0, this.tempMovieData.length-1);
                if(term === 'i'){
                    console.log('inside')
                    this.movieData = this.tempMovieData;
                }else{
                    this.movieData = this.tempMovieData[0]['Search'];
                    this.movieData.map(i => {
                        if(i.Year.indexOf('–') > -1){
                            i.Year = i.Year.split('–').pop();
                        }
                        return true;
                    });
                }
            }
            return this.movieData;
        });
     console.log(this.movieData);
     //
     this.setState({});
    }

    sortByDate = e => {
        this.movieData.sort ( (a, b) => {
            return new Date(a.Year) - new Date(b.Year);
        });
        console.log(this.movieData, 'updated');
        this.setState({});
    }

    sortByTitle = e => {
        this.movieData.sort(function(a, b){
            if(a.Title < b.Title) return -1;
            if(a.Title > b.Title) return 1;
            return 0;
        });
        this.setState({});
    }
    render(){
        return (
            <div className="app-container">
                <h1>Film Search</h1>
                <div className="search-container">
                    <form>
                        <div className="search-box">
                            <input type="text" id="searchBox" placeholder="E.g, Avengers" onChange={this.searchMovie}/>
                        </div>
                        <div className="sortBox">
                            Sort :
                            <label>
                                <input type="radio" value="Title" name="radioOption" onClick={this.sortByTitle} />
                                Title
                            </label>
                            <label>
                                <input type="radio" value="Date" name="radioOption" onClick={this.sortByDate} />
                                Date
                            </label>
                        </div>
                    </form>
                </div>
                <div className="movie-container">
                    {this.movieData.map((m,i) => <MoviesLayout key={i} {...m} /> )}
                </div>
            </div>
        );
    }
}

