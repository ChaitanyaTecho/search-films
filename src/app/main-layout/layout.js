import React, { Component } from 'react';
import { applyMiddleware, createStore } from 'redux';
import axios from 'axios';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { Provider } from 'react-redux';
import MoviesLayout from '../movie-layout/movie-layout';

import './layout.css';

export default class Layout extends Component{
    constructor(){
        super();
        this.state = {
            rawData : [],  
        }   
        this.tempMovieData = [],
        this.movieData = []  
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

        const initialState = {
            fetching : false,
            fetched : false,
            movies : this.rawData,
            error : null
        };

        const reducer = (state=initialState, action) => {
            switch (action.type) {
                case 'GET_MOVIES_PENDING':
                    return {...state, fetching : true};
                    break;
        
                case 'GET_MOVIES_REJECTED':
                    return {...state, fetching : false, error: action.payload};
                    break;
        
                case 'GET_MOVIES_FULFILLED':
                    return {...state, fetching : false, fetched : true, movies : action.payload};
                    break;
            }
        }
        const middleWare = applyMiddleware(promise(), thunk, createLogger());
        const movieStore = createStore(reducer, middleWare);

        movieStore.dispatch({
            type : 'GET_MOVIES',
            payload : axios.get(this.getMovies('s',value))
        });
        movieStore.subscribe(() => {
            // When state will be updated(in our case, when items will be fetched), we will update local component state and force component to rerender with new data.
            this.setState({
                rawData: movieStore.getState().movies.data,
            });
            this.tempMovieData = this.state.rawData;
            this.cleanData();
            /* if(this.tempMovieData.Response === 'True'){
                this.tempMovieData.Search = this.movieData;
            }
            console.log('this.state.movieeeeeeeeeeeeeeeeeeee=====>',this.movieData) */
        });
            /* dispatch({type : 'GET_MOVIES_PENDING'});
            axios.get(this.getMovies('s',value))
                 .then(response => {
                    dispatch({type : 'GET_MOVIES_SUCCESS', payload : response.data});
                 })
                 .catch(err => {
                     dispatch({type : 'GET_MOVIES_ERROR', payload : err});
                 })
        }); */
        // this.getMovies('s',value)
        this.setState({}); 
    }

    getMovies = (term, value) => {
        const API_DOMAIN = "http://www.omdbapi.com/?";
        const API_KEY = "&apikey=e260c91c";
        return `${API_DOMAIN}${term}=${value}${API_KEY}`;
        /* fetch(`${API_DOMAIN}${term}=${value}${API_KEY}`)
        .then(result => result.json())
        .then(json => {
            this.rawData.push(json);
            this.cleanData(term);
        }); */
    }

    cleanData = () => {
        if(this.tempMovieData.Response === 'True'){
            this.movieData = this.tempMovieData.Search;
            this.movieData.map(i => {
                if(i.Year.indexOf('–') > -1){
                    i.Year = i.Year.split('–')[0];
                }
                return true;
            }); 
        }
            /* if(this.state.rawData.Response === 'True'){
                console.log('true inside.. data')
                this.state.rawData.Search = this.state.movieData;
                console.log('this.state.movieData---------------->',this.state.rawData.Search)
                this.tempMovieData.push(movie);
                this.tempMovieData.splice(0, this.tempMovieData.length-1);
                this.movieData = this.tempMovieData[0]['Search'];
                this.state.movieData.map(i => {
                    if(i.Year.indexOf('–') > -1){
                        i.Year = i.Year.split('–').pop();
                    }
                    return true;
                }); 
            }
            return this.state.movieData; */
        
     this.setState({});
    }

    sortByDate = e => {
        this.movieData.sort ( (a, b) => {
            return new Date(a.Year) - new Date(b.Year);
        });
        // console.log(this.movieData, 'updated');
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

