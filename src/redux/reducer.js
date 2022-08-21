import * as types from "./actionTypes";

const initialState = {
  users: [],
  loading: false,
  error: null,
  pageLimit: 4,
  currentPage: 0,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_USERS_START:
    case types.CREATE_USER_START:
    case types.DELETE_USER_START:
    case types.UPDATE_USER_START:
    case types.SEARCH_USER_START:
    case types.FILTER_USER_START:
    case types.SORT_USER_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOAD_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case types.SEARCH_USER_SUCCESS:
    case types.FILTER_USER_SUCCESS:
    case types.SORT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case types.CREATE_USER_SUCCESS:
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((item) => item.id !== action.payload),
      };
    case types.LOAD_USERS_ERROR:
    case types.CREATE_USER_ERROR:
    case types.DELETE_USER_ERROR:
    case types.UPDATE_USER_ERROR:
    case types.SEARCH_USER_ERROR:
    case types.FILTER_USER_ERROR:
    case types.SORT_USER_ERROR:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
