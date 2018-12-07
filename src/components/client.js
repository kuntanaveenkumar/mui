

import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import store from "../store/store";
import { Form,Field, reduxForm } from 'redux-form';
import SelectInput from './Selectinput.js';
import Select from 'react-select'
export default class Client extends Component {
    constructor(props) {
        super(props);
        this.state = {           
            filterOptions:[],
            multiValue:[],            
        }        
        this.handleClientChange = this.handleClientChange.bind(this);                 
    }   
    componentWillMount() 
    {   
        let formData = { 'utype':'Dealer'};
        let self = this;
        $.ajax({
            url: "http://localhost/laravel5.4/api/v1/clients",
            type: "POST",
            data: formData,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type');
                xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
                xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('Cookie', localStorage.getItem("token"));
            },
            success: function (response) {
                let json = $.parseJSON(JSON.stringify(response));                
                self.setState({ clients: json["clients_list"] });       
                let options_list=[];
                if(json["clients_list"])
                {
                json["clients_list"].forEach(function(element) {
                    options_list.push({value:element.id,label:element.name+' '+element.email});
                });
                self.setState(...self.state,{"filterOptions":options_list});
                }
                var soption=[];              
                self.props.multiValue.forEach(function(element) 
                {
                    var selectedItem;
                    selectedItem = options_list.find(function (item) {              
                        return item.value === element;
                        });
                    if(selectedItem)
                    soption.push({value:element,label:selectedItem.label});
                });
                self.setState({"multiValue":soption});         
            }.bind(this),
            error: function (xhr, resp, text) {
            }
        }); 
    }       
    handleClientChange = (selectedOption) => 
    {          
        this.setState(state => {
            return {
              multiValue: selectedOption
            };
          });

        this.props.handleClientChange(selectedOption);            
    }
   
    render() 
    {   
        return (
            <Select        
            value={this.state.multiValue}
            onChange={this.handleClientChange} isMulti
            options={this.state.filterOptions}         
             name ="client_id"
            />
      )
    }
}
