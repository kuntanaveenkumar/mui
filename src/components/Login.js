import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import {Form, FormGroup, ControlLabel} from 'react-bootstrap'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles/';
import {URL} from '../constants/appConstants';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import logo from '../images/logo_print.png';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
const theme = createMuiTheme();
const variantIcon = { 
  error: ErrorIcon
};
const styles = theme => ({	
   layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },		
   button: {
    margin: theme.spacing.unit,
   },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
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
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },  
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});
MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error']).isRequired,
};
function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];
  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }      
    />
  );
}
const MySnackbarContentWrapper = withStyles(styles)(MySnackbarContent);
class Login extends React.Component 
{
  constructor(props) 
	{
		super(props);
		this.state = 
		{
			username: '',
			password: '',
			showError: false,
		};
		this.onChangeInput = this.onChangeInput.bind(this);
		this.onLogin = this.onLogin.bind(this);
		this.onShowLoginError = this.onShowLoginError.bind(this);
	}
	onChangeInput({ target: { value, name } }) 
	{		
		this.setState({[name]: value,});
		console.log(this.state) 
	}
	onShowLoginError() 
	{
		this.setState({showError: true,});
		console.log(this.state) 
	}
	onLogin(e) 
	{
		e.preventDefault();				
		fetch(URL+'authenticate', {
             method: 'POST',
			 data : this.state,
             headers: 
             {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + localStorage.getItem("token"),
             },   
             body: JSON.stringify(this.state),          
             }).then((response) => response.json())
             .then((responseJson) => 
             {
				if (responseJson['error'] =="")
				{	
					localStorage.setItem("token",responseJson["token"]["token"]);										
					this.props.history.push('/home');
				}
				else
				{  
					this.onShowLoginError();
					console.log(this.state) 
				} 
             })
             .catch((error) => {
            
             });		
	}	
  render() 
  {     
		const { classes } = this.props;	 		
		return  <main className={classes.layout}>
				{ this.state.showError ? <div style={{ color: '#ef3933' }}> <MySnackbarContentWrapper variant="error" className={classes.margin} message="Your login credentials are wrong!"/></div> : '' }
				<MuiThemeProvider theme={theme}>	
				<Paper className={classes.paper}>
				  <div className="logo">
				 <img src={logo} />
				</div>
				 <Typography variant="subheading">Sign In</Typography>	
				<form className={classes.form} noValidate autoComplete="off">
				<FormControl margin="normal" required fullWidth>
					<InputLabel htmlFor="username">Email Address</InputLabel>
					<Input id="username" name="username" autoComplete="username" autoFocus onChange={this.onChangeInput}/>
				</FormControl>			
				
				<FormControl margin="normal" required fullWidth>
					<InputLabel htmlFor="password">Password</InputLabel>
					<Input id="password" type = "password"  name="password" autoComplete="password" autoFocus onChange={this.onChangeInput}/>
				</FormControl>
				<Button variant="contained" color="primary" onClick={this.onLogin} className={classes.button}>Sign in</Button>        
			  </form>
			  </Paper>
			  </MuiThemeProvider>
			  </main>		
  }
}
export default withStyles(styles)(Login);
