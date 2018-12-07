import {URL} from '../constants/appConstants';
/*action creaters to send action to reducers*/
export function setLoadModels(models)
{   
    return {type:"LOAD_MODELS",models:models};
}
export function ListModels(makeid) {
    return dispatch => {
        return fetch(URL+'model_by_makeid_year', {
            method: 'POST',
            headers: 
            {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + localStorage.getItem("token"),
             },   
             body: JSON.stringify({makeid:makeid}),          
             }).then((response) => response.json())
             .then((responseJson) => 
             {
                dispatch(setLoadModels(responseJson["models_list"]));
                 return responseJson.success;
             })
             .catch((error) => {
             console.error(error);
             });
        /*$.ajax({
            url: "http://localhost/laravel5.4/api/v1/model_by_makeid_year",
            type: "POST",
            data: {makeid:makeid},
            
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
                dispatch(setLoadModels(json["models_list"]));  
            }.bind(this),
            error: function (xhr, resp, text) {

            }
        });  */     
    };
}