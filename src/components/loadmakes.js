import React, { Component } from 'react';
import { Form,Field, reduxForm } from 'redux-form';
class LoadMakes extends Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {
            makes: []
        }
    }
    handleLangChange = (value) => 
    {             
        this.props.onChangeInput(value);            
    }
    render() 
    {
         return (<select name="make" id="make" className="form-control" onChange={this.handleLangChange} value={this.props.value} form={this.props.form}>
                       <option value="">Select</option>     
                       {this.props.listmakes && this.props.listmakes.map(function (listValue) {                            
                            return <option key={listValue.makeid} value={listValue.makeid}>{listValue.name}</option>;
                        })}                   
                </select>
                )
    }
}
export default LoadMakes;