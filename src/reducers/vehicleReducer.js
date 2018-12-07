function vehicleReducer(state={vehicles: []}, action) 
{
    switch(action.type)
    {
        case "GET_EMPTY":     
        return null;
        case "GET_VEHICLES":     
        return action.vehicles?action.vehicles:null;
        break;
        case "GET_TOTAL_VEHICLES":     
        return action.total?action.total:null;
        break;        
        case "GET_VEHICLE":     
        return action.vehicle?action.vehicle:null;
        break;
        case "EDIT_VEHICLE":
        return {...state,vehicles: action.vehicles.filter((vehicle) =>
            state.vehicleId == vehicle.vehicleId)}
        break;
        case "UPDATE_VEHICLE_STATUS":
        return state;
        break;
        default:
        return state;
    }
}
export default vehicleReducer;