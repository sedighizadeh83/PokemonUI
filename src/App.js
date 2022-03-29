import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {variables} from './Variables.js';

function App() {
  const [search, setSearch] = useState("pune");
  const [pokemonData, setpokemonData] = useState({});
  const [loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true);
    axios
        .get(
            variables.API_URL+`pokemon/${search}`
        )
        .then(response => {
            setpokemonData(response.data);
            setLoading(false);
          })
        .catch(error => {
            setLoading(false);
            console.log("error", error);
        });
};

useEffect(() => {
    getData();
  }, [search]);

  return(
    <div className="app container">
        <h3 className="d-flex justify-content-center m-3">
           Pokemon Frontend
         </h3>

        <div class="row mt-5">
          <div class="col-lg-6 col-lg-offset-6 col-centered">
            <div class="input-group">
            <input className="form-control" 
              type="text" 
              onBlur={e => setSearch(e.target.value)} 
              placeholder="search pokemon by name" />
              <span class="input-group-btn">
                  <button class="btn btn-light btn-outline-primary" onClick={getData}>Search</button>
              </span>
            </div>
          </div>
        </div>
        
        <div className="row mt-5">
          <div class="col-lg-6 col-lg-offset-6 col-centered">
              <h5>{pokemonData?.Description}</h5>
          </div>
        </div>
    </div>
  );
}

export default App;
