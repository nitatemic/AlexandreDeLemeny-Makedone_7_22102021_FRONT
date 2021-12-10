import React from 'react';
import {Link} from "react-router-dom";
import darkTheme from "./global";
import {AppBar, Stack, createTheme, Toolbar, Typography, ThemeProvider} from '@mui/material';


function Banner() {
	return(
			<AppBar position="static" color="primary" enableColorOnDark>
				<p>Coucou</p>
			</AppBar>
	)}

export default Banner;
