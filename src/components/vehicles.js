import React from 'react';
import {URL} from '../constants/appConstants';
import { NavLink, withRouter } from 'react-router-dom';
import { Switch as RSwitch, BrowserRouter, Redirect, Route, Link } from "react-router-dom";
import { createStore, applyMiddleware, compose } from 'redux';
import { connect } from 'react-redux';
import store from '../store/store';
import PropTypes from 'prop-types';
import { getVehicles, clearVehicles, getSerachedVehicles,updateStatus } from '../actions/vehicleAction';
/*import { Container, Row, Col } from 'react-bootstrap';
import LoadMakes from "./loadmakes";
import LoadModels from "./loadmodels";
import LoadYears from "./loadyears";
import Pagination from "react-js-pagination";
import {Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
*/
/*********actions***********/
import { ListMakes } from '../actions/loadmakesAction';
import { ListModels } from '../actions/loadmodelsAction';
import { ListYears } from '../actions/loadyearsAction';
/*********actions***********/
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles/';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';

import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import MyTheme from './MyTheme';
/*const theme = createMuiTheme();
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
   root: {
   
	 width: '100%',
	 marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },   
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});*/
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 12
  },
}))(TableCell);

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});
class TablePaginationActions extends React.Component 
{	

constructor(props) {
      super(props);
   
  }
   handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}
TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};
const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

class Vehicles extends React.Component 
{
  constructor(props) 
	{
	super(props);		
        this.state = { activePage: 1,page: 0,rowsPerPage: 4};
        this.FilterVehicles = this.FilterVehicles.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.changeStatus=this.changeStatus.bind(this);  
        store.dispatch(clearVehicles());
        store.dispatch(getVehicles(this.state));
        store.dispatch(ListMakes());
	}	
    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
       
        this.forceUpdate();
    }
    componentDidMount() 
	{
        store.dispatch(getVehicles(this.state));
    }
    changeStatus(event)
    {    
		this.setState({ [name]: event.target.checked });
        store.dispatch(updateStatus(event.target.value));
        event.preventDefault();
    }
    onChangeInput({ target: { value, name } }) {

        this.setState({ [name]: value, });
        if (name == "make") {
            if (value) {
                store.dispatch(ListModels(value));
            }
        }
        if (name == "model") {
            if (value) {
                store.dispatch(ListYears(this.state.make, value));
            }
        }
    }
    FilterVehicles() {
        store.dispatch(getVehicles(this.state));
    }
	handleChangePage = (event, page) => {
    this.setState({ page });
	store.dispatch(getVehicles({ ...this.state, activePage: page+1 }));
    }; 
   handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
	store.dispatch(getVehicles({ ...this.state, rowsPerPage: event.target.value }));
	 
  };
  render() {
    const { classes } = this.props;
    const {  rowsPerPage, page } = this.state;
    const emptyRows = 0;
	
    return (
	<MuiThemeProvider theme={MyTheme}>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
		    <TableHead>
			  <TableRow>            
				<CustomTableCell numeric>Vehicle Id
                                
                </CustomTableCell>
				<CustomTableCell numeric>Make</CustomTableCell>
				<CustomTableCell numeric>Model</CustomTableCell>   
				<CustomTableCell numeric>Year</CustomTableCell> 
				<CustomTableCell numeric>Mileage</CustomTableCell> 			
				<CustomTableCell numeric>antennaName</CustomTableCell> 		
				<CustomTableCell numeric>antennaUUID</CustomTableCell> 		
				<CustomTableCell numeric>antennaMAC</CustomTableCell> 		
				<CustomTableCell numeric>vin</CustomTableCell> 
				<CustomTableCell numeric>Status</CustomTableCell> 
				<CustomTableCell numeric>Action</CustomTableCell> 
			  </TableRow>
			</TableHead>
            <TableBody>				
			{this.props.vehicles && this.props.vehicles.map(vehicle =>
			<TableRow key={vehicle.vehicleId}  style={{height: 10}}>
                    <CustomTableCell component="th" scope="row">
                      {vehicle.vehicleId}
                    </CustomTableCell>
                    <CustomTableCell>{vehicle.makeName}</CustomTableCell>
                    <CustomTableCell>{vehicle.modelName}</CustomTableCell>		
					<CustomTableCell>{vehicle.yearName} </CustomTableCell>
					<CustomTableCell>{vehicle.mileage} </CustomTableCell>
					<CustomTableCell>{vehicle.antennaName} </CustomTableCell>
					<CustomTableCell>{vehicle.antennaUUID} </CustomTableCell>
					<CustomTableCell>{vehicle.antennaMAC} </CustomTableCell>
					<CustomTableCell>{vehicle.vin} </CustomTableCell>
					<CustomTableCell>								
					 <Switch checked={vehicle.status ? "true" : "false"} onChange={this.changeStatus}
					  value="{vehicle.vehicleId}"
					/>		                                 
					</CustomTableCell>
					<TableCell>	
						<Button
                                                color="primary"
                                                to={'/addvehicle/' + vehicle.vehicleId}
                                                component={props => <Link {...props}/>}
                                              >Edit</Button>
						&nbsp;
						<Button variant="fab" mini size="small" disabled aria-label="Delete" className={classes.button}>
						<DeleteIcon />
						</Button>	
                                        
                                                
					</TableCell>								
			</TableRow>)}              			  			  
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={Number.parseInt(this.props.total,10)}
                  rowsPerPage={rowsPerPage}
				  rowsPerPageOptions={[2, 4, 8,10]}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
	    </MuiThemeProvider>
    );
}
}
Vehicles.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        vehicles: state.vehicles ? state.vehicles["vehicles_list"] : "",
        listmakes: state.listmakes,
        listmodels: state.listmodels,
        listyears: state.listyears,
        total: state.vehicles ? state.vehicles["total"] : "",
    }
}
export default compose(
  withStyles(MyTheme, { name: 'Vehicles' }),
  connect(mapStateToProps, null)
)(Vehicles);
