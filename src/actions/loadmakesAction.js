import {URL} from '../constants/appConstants';
/*action creaters to send action to reducers*/
export function setLoadMakes(makes)
{   
    return {type:"LOAD_MAKES",makes:makes};
}
export function ListMakes() {
    return dispatch => {
        return fetch(URL+'makes', {
            method: 'GET',
            headers: 
            {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + localStorage.getItem("token"),
             },             
             }).then((response) => response.json())
             .then((responseJson) => 
             {
                dispatch(setLoadMakes(responseJson["makes"]));
                 return responseJson.success;
             })
             .catch((error) => {
             console.error(error);
             });
    };
}