function loadyearReducer(state={ years: []}, action)
{
    switch(action.type)
    {
        case "LOAD_YEARS":     
            return {...state,listyears: action.years};
        break;
        default:
            return state;
    }
}
export default loadyearReducer;