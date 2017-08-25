import React, { Component } from 'react';
import './layout.css';

export default class Layout extends Component{
    
    searchMovie = e => {
        var value = e.target.value.trim().replace(/  +/g, ' ').split(' ').join('+');
        if(value.length === 9 && isNaN(value.substring(0,2)) && (!(isNaN(value.substring(2,7)))) ){
            this.setUrl('i', value);
        }else{
            if(value.indexOf('+') > -1){
                this.setUrl('t', value);
            }else{
                this.setUrl('i', value);
            }
        }
    }
    setUrl = (term, value) => {
        const API_DOMAIN = "http://www.omdbapi.com/?";
        const API_KEY = "&apikey=e260c91c";
        fetch(`${API_DOMAIN}${term}=${value}${API_KEY}`)
        .then(result => console.log(result.json()))
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
                    <ul>
                
                    </ul>
                </div>
            </div>
        );
    }
}

