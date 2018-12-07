import React, { Component } from 'react';
import {Route,Switch} from 'react-router';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';

import { mailFolderListItems } from './tileData';
import Home from "./home";
import Vehicles from "./vehicles";
import Addvehicle  from "./addvehicle";
const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
    rightToolbar: {
    marginLeft: 'auto',
    marginRight: -12,
  },
  menuButton: {
    marginRight: 16,
    marginLeft: -12,
  },
  menu: {
    width: '180px',
	height: 400,
  },
  appBar: {
    backgroundColor:'#CCC',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class MainLayout extends Component {
	
	
	constructor(props) 
    {
        super(props);
	  this.state = {
		open: false,
		anchorEl: null,
	  };	   
	   this.handleClose=this.handleClose.bind(this);
	   this.handleClick=this.handleClick.bind(this);
	   this.handleDrawerOpen=this.handleDrawerOpen.bind(this);
	   this.handleDrawerClose=this.handleDrawerClose.bind(this);
	}
	
	handleChangeAnchor(event)	
	{
		this.setState({
		anchor: event.target.value,
		});
	}
	 handleClick(event) 
	{
		this.setState({ anchorEl: event.currentTarget });
	}

  handleClose()
  {
    this.setState({ anchorEl: null });
  }

  handleDrawerOpen()
  {
    this.setState({ open: true });
  };
  handleDrawerClose() 
  {
    this.setState({ open: false });
  };
  render() 
  {	  
  const { classes, theme } = this.props;		
    const { open,anchorEl } = this.state;
  return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
            <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
             
            </Typography>
         
		  <section className={classes.rightToolbar}>
		 
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          My Account
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
		 className={classes.menu}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>		  
		  <MenuItem onTouchTap={() => {this.handleClose() }} primaryText="Logout" >
              <Link to="/login" > Logout </Link>
         </MenuItem>
		 
        </Menu>
     
	   </section>
	    </Toolbar>
        </AppBar>
		
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>{mailFolderListItems}</List>
          
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />          
					<Switch>
                        <Route exact path="/home" component={Home}/> 
                        <Route exact path="/vehicles" component={Vehicles}/>         
						<Route exact path="/addvehicle/:id" component={Addvehicle}/> 						
                    </Switch>		   
        </main>
      </div>
    );
  }
}
MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(MainLayout);