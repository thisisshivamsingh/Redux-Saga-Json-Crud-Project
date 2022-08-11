import * as types from "./actionTypes";

const initialState = {
    users:[],
    loading:false,
    error:null
}

const usersReducer = (state=initialState,action) =>{
    console.log(action, "reducer");
    switch(action.type){
        case types.LOAD_USERS_START:
            return{
                ...state,
                loading:true,
            }
            case types.LOAD_USERS_SUCCESS:
            return{
                ...state,
                loading:false,
                users:action.payload,
            }
            case types.LOAD_USERS_ERROR:
                return{
                    ...state,
                    loading:false,
                    users:action.payload
                }
        default: 
        return state;
    }
}

export default usersReducer;