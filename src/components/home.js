import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles/';
import {URL} from '../constants/appConstants';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
const theme = createMuiTheme();
const styles = theme => ({	
   button: {
    margin: theme.spacing.unit,
   },	
  container: {
    display: 'flex',
    flexWrap: 'row wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});
class Home extends React.Component 
{
  constructor(props) 
	{
		super(props);
		
	}
	render() 
	{     
		const { classes } = this.props;	 		
		return  <div>Home </div>		
	}
}
export default withStyles(styles)(Home);
