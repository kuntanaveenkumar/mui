import {URL} from "../constants/appConstants";
export function setVehicles(vehicles)
{
    return {type:"GET_VEHICLES",vehicles};
}
export function settotalVehicles(total)
{
    return {type:"GET_TOTAL_VEHICLES",total};
}
export function setVehicle(vehicle)
{
    return {type:"GET_VEHICLE",vehicle};
}
export function clearVehicles()
{
    return {type:"GET_EMPTY"};
}
export function editvehicle(vehicle) {
    return { type: "EDIT_VEHICLE", vehicle};
}
export function updateVehicleStatus(vehicle){
    return { type: "UPDATE_VEHICLE_STATUS", vehicle};
}
export function updateStatus(id)
{
   /* return dispatch => {             
        $.ajax({
            url: URL+"/vehicles",
            type: "POST",
            data: ({id:id}),          
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type');
                xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
                xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('Cookie', localStorage.getItem("token"));
            },
            success: function (response) {               
                var json = $.parseJSON(JSON.stringify(response));               
                dispatch(updateVehicleStatus(json["result"]));  
                
            }.bind(this),
            error: function (xhr, resp, text) {

            }
        });           
    };*/
}
export function getSerachedVehicles(data)
{        
  /*  return dispatch => {             
        $.ajax({
            url: URL+"/vehicles",
            type: "POST",
            data: (data),          
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type');
                xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
                xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('Cookie', localStorage.getItem("token"));
            },
            success: function (response) {               
                var json = $.parseJSON(JSON.stringify(response));               
                dispatch(setVehicles(json["result"]));  
                
            }.bind(this),
            error: function (xhr, resp, text) {

            }
        });           
    };*/
}
export function getVehicle(id)
{   
   /* return dispatch => {             
        $.ajax({
            url: URL+"/vehicles",
            type: "POST",
            data: { "vehicle_id": id },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type');
                xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
                xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('Cookie', localStorage.getItem("token"));
            },
            success: function (response) {
               
                var json = $.parseJSON(JSON.stringify(response));               
                dispatch(setVehicle(json["result"]["vehicles_list"][0]));  
            }.bind(this),
            error: function (xhr, resp, text) {

            }
        });           
    };*/
}
export function getVehicles(data) 
{ 
  return dispatch => 
   {             
            return fetch(URL+'vehicles', {
                   method: 'POST',
                   headers: 
                   {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    },
                    body: JSON.stringify({limit:data.rowsPerPage,offset:(data.activePage-1)*data.rowsPerPage,make:data.make,model:data.model,year:data.year,antennaUUID:data.antennaUUID,vin:data.vin})
                    }).then((response) => response.json())
                    .then((responseJson) => 
                    {
                        dispatch(setVehicles(responseJson["result"]));
                        return responseJson.success;
                    })
                    .catch((error) => {
                    console.error(error);
                    });
    
    };
}