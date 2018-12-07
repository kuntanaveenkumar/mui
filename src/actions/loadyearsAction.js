import {URL} from '../constants/appConstants';
/*action creaters to send action to reducers*/
export function setLoadYears(years)
{   
    return {type:"LOAD_YEARS",years:years};
}
export function ListYears(makeid,modelid) {
    return dispatch => {

        let formData = { 'modelid': modelid,'makeid':makeid };
        return fetch(URL+'years_by_makeid_modelid', {
            method: 'POST',
            headers: 
            {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + localStorage.getItem("token"),
             },      
             body:JSON.stringify(formData),       
             }).then((response) => response.json())
             .then((responseJson) => 
             {
                dispatch(setLoadYears(responseJson["years"]));
                 return ;
             })
             .catch((error) => {
             console.error(error);
             });

        
       /* let formData = { 'modelid': modelid,'makeid':makeid };
        let self = this;
        $.ajax({
            url: "http://localhost/laravel5.4/api/v1/years_by_makeid_modelid",
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
                var json = $.parseJSON(JSON.stringify(response));               
                dispatch(setLoadYears(json["years"]));  
            }.bind(this),
            error: function (xhr, resp, text) {

            }
        }); */    
    };
}