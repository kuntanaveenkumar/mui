import React, { Component } from 'react';
class LoadModels extends Component 
{
    constructor(props) 
    {
        super(props);
        this.state={"listmodels": []}        
        
    }  
    handleLangChange = (value) => {             
        this.props.onChangeInput(value);            
    }
    render() 
    {                   
        return (<select name="model" id="model" className="form-control"  onChange={this.handleLangChange} value={this.props.value}>
                       <option value="">Select</option>     
                            {                                        
                              this.props.listmodels && this.props.listmodels.map(function (model) {
                                  return <option key={model.modelid + model.name} value={model.modelid}>{model.name}</option>;
                             })}                                      
                </select>
                )
    }
}
export default LoadModels;