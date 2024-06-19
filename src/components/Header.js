import React, { useEffect, useState } from 'react';
import {AppBar,Autocomplete,IconButton,Tab,Tabs,TextField, Toolbar} from "@mui/material";
import {Box} from "@mui/system";
import {useDispatch,useSelector} from "react-redux";

import MovieIcon from '@mui/icons-material/Movie';
import { getAllMovies } from '../api-helpers/api-helpers';
import { Link } from 'react-router-dom';
//const dummyArray=["Joker","Avatar"];
import { adminActions, userActions } from "../store";

const Header = () => {
  const dispatch = useDispatch();
  const isAdminLoggedIn=useSelector((state)=>state.admin.isLoggedIn);
  const isUserLoggedIn=useSelector((state)=>state.user.isLoggedIn);
  const [value,setValue]=useState(0);
  const [movies,setMovies]=useState([]);
useEffect(()=>{
getAllMovies()
.then((data) => setMovies(data.movies))
.catch((err) => console.log(err));
},[]);

const logout = (isAdmin) => {
  dispatch(isAdmin ? adminActions.logout() : userActions.logout());
};

  return (
    <AppBar position='sticky' sx={{bgcolor:"#2b2d42"}}>
      <Toolbar>
            <Box width={"20%"}>
              <IconButton LinkComponent={Link} to="/">
              <MovieIcon />
              </IconButton>
                
            </Box>
            <Box width={"30%"} margin="auto">
            <Autocomplete
        
        freeSolo
        options={movies &&  movies.map((option) => option.title)}
        renderInput={(params) => 
        <TextField 
         sx={{input:{color:"white"}}}
          variant='standard' {...params} 
          placeholder="Search" />}
      />
            </Box>
            <Box display={"flex"}>
                <Tabs textColor='inherit' indicatorColor='secondary' value={value} onChange={(e,val)=>setValue(val)} >
                <Tab LinkComponent={Link} to="/movies" label="Movies" />
                {!isAdminLoggedIn && !isUserLoggedIn && (
                  <>
                      <Tab LinkComponent={Link} to="/admin"  label="Admin" />
                    <Tab LinkComponent={Link} to="/auth"  label="Auth" />
              
                  </>
                )}

                { isUserLoggedIn && (
                  <>
                      <Tab LinkComponent={Link} to="/user"  label="Profile" />
                    <Tab onClick={()=>logout(false)} LinkComponent={Link} to="/"  label="Logout" />
              
                  </>
                )}
                 { isAdminLoggedIn && (
                  <>
                      <Tab LinkComponent={Link} to="/add"  label="Add movie" />
                      <Tab LinkComponent={Link} to="/user-admin"  label="Profile" />
                      <Tab onClick={()=>logout(true)}  LinkComponent={Link} to="/"  label="Logout" />
              
                  </>
                )}


                    </Tabs>
            </Box>
        </Toolbar>
        </AppBar>
  );
}

export default Header
