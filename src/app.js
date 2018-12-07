import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LoginLayout from "./components/LoginLayout";
import MainLayout from "./components/MainLayout";
import { Switch,BrowserRouter,Redirect, Route, Link } from "react-router-dom";
class App extends Component 
{	
  render() 
  {          
     return (    
      <BrowserRouter>
      <Switch>      	     
			<Route exact path="/" component={LoginLayout}/>
			<Route exact path="/login" component={LoginLayout}/>
			<Route exact path="/home" component={MainLayout}/>
			<Route exact path="/vehicles" component={MainLayout}/>
			<Route exact path="/addvehicle/:id" component={MainLayout}/> 
      </Switch>
      </BrowserRouter>       
    );
  }
}
export default App;
