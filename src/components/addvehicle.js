import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {connect} from "react-redux";
import {Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles/';
import {URL} from '../constants/appConstants';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
const theme = createMuiTheme();
import { Field, reduxForm } from 'redux-form'; 
import Paper from '@material-ui/core/Paper';
import LoadMakes from "./loadmakes";
import MyTheme from './MyTheme';
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
   
class Addvehicle extends React.Component 
{

        constructor(props) 
	{
		super(props);
                this.state = {
                    vehicleId:'',
                    make: '',
                    model: '',
                    years: '',
                    vin: '',
                    vehicleName: '',
                    vehicleRegistrationNo: '',
                    sclient_id: [],
                    client_id: [],
                    msg: '',
                    data:'',
                    isValidated: false,
                    selectedClient:""
                }
                this.handleSubmit=this.handleSubmit.bind(this);                
	}
        handleSubmit(event)
        {
            
        }
	render() 
	{            
            /* if(this.props.match.params.id!=undefined)
            {            
                if (!this.state.data) 
                {
                    return <div />
                }
            }  
            */               
            const { handleSubmit, valid, submitting,shandleSubmit } = this.props;
            const { classes } = this.props;	 		
	    return  <MuiThemeProvider theme={MyTheme}>
                    <Paper className={classes.root}>
                    <div className="form-group" id="make">
                        <label className="col-md-2 control-label">Make<span className="asterisk">*</span></label>
                        <div className="col-md-9">                                                    
                            <LoadMakes listmakes={this.props.listmakes.listmakes} onChangeInput={this.logChange} value={this.state.make} form="AddVehicle"/>
                        </div>
                    </div>
                    </Paper>
                    </MuiThemeProvider>
	}
}

function validateInput(form) 
{
    const errors = {};  
    if (!form.make) 
    {
      errors.make = "Please Select Make";
    }     
    return errors;
}  
 const mapStateToProps = (state) => {
    return {
        vehicles:  state.vehicles,
        listmakes: state.listmakes,        
        listmodels: state.listmodels,
        listyears: state.listyears,
    }
}
/*export default AddVehicle = reduxForm({
    form: 'AddVehicle',validate: validateInput,mapStateToProps
  })(AddVehicle);*/


  // Decorate with reduxForm(). It will read the initialValues prop provided by connect()
  Addvehicle = reduxForm({
    form: 'AddVehicle',validate: validateInput // a unique identifier for this form
  })(Addvehicle) 

  // You have to connect() to any reducers that you wish to connect to yourself
  Addvehicle = connect(
    mapStateToProps,
    state => ({
      initialValues: {
        make: '',
        msg: '',
        data:'',
        isValidated: false
    },
      enableReinitialize: true,
    }) // bind account loading action creator
  )(Addvehicle)
  
  export default Addvehicle;