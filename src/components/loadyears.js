import React, { Component } from 'react';
class LoadYears extends Component 
{    
    constructor(props) 
    {
        super(props);
        this.state={"listyears": []}    
    }     
    handleLangChange = (value) => {             
        this.props.onChangeInput(value);            
    }
    render() 
    {                   
        return (<select name="years" id="years" className="form-control" value={this.props.value} onChange={this.handleLangChange}>
                       <option value="">Select</option>     
                            {                                        
                              this.props.listyears && this.props.listyears.map(function (year) {
                                  return <option key={year.vehicleid + year.year} value={year.vehicleid}>{year.year} {year.trim}</option>;
                             })}                                      
                </select>
                )
    }
}
export default LoadYears;