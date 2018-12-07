function loadmakeReducer(state={ makes: []}, action)
{
    switch(action.type)
    {
        case "LOAD_MAKES":            
            return {...state,listmakes: action.makes};
        break;
        default:
            return state;
    }
}
export default loadmakeReducer;