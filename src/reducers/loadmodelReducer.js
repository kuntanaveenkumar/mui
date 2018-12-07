function loadmodelReducer(state={ makes: []}, action)
{
    switch(action.type)
    {
        case "LOAD_MODELS":     
            return {...state,listmodels: action.models};
        break;
        default:
            return state;
    }
}
export default loadmodelReducer;