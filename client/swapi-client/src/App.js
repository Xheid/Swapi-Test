import React from 'react';
import {
  FormControl, 
  Select, 
  InputLabel, 
  MenuItem, 
  makeStyles, 
  Button} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { update } from './app/entity';
import CustomGrid from './components/custom-grid';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";



import './App.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350,
  },
  button: {
    marginTop: 25,
    width: 100,
    marginBottom: 40,
  },
}));

function App() {

  const dispatch = useDispatch();
  const classes = useStyles();
  const[searchedEntity, setSearchedEntity] = React.useState("");
  const endpoints = [
    'People',
    'Planets',
    'Starships',
    'Vehicles',
    'Species',
    'Films'
  ];
  
  return (
    <div className="App">
      <h1> WELCOME TO SWAPI EXPLORER </h1>
      <FormControl className={classes.formControl}>
        <InputLabel id="label">The StarWars world, discover you have to</InputLabel>
        <Select
          labelId="label"
          defaultValue=""
          onChange={e => setSearchedEntity(e.target.value)}
          value = {searchedEntity}
        >
          {endpoints.map((endpoint, index) => {
						return (
              <MenuItem key={index} value={endpoint}>
                {endpoint}
              </MenuItem>
						)
					})}
        </Select>
      </FormControl>
      <div>
        <Router>
          <Link to={`/search/${searchedEntity}`}>
            <Button variant="outlined" color="primary" className={classes.button} onClick={() => dispatch(update(searchedEntity))}>
              Search
            </Button>
          </Link>
          <Route  path={`/search/${searchedEntity}`} component={() => <CustomGrid></CustomGrid>} />
        </Router>
      </div>
    </div>
  );
}

export default App;
