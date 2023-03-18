import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
    genders: [],
    roles: [],
    positions: [],
    users:[],    

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            state.isLoadingGender = false;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAIDED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_START:
            let copyState1 = { ...state };
            copyState1.isLoadingPosition = true;
            return {
                ...copyState1,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data
            state.isLoadingPosition = false;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.isLoadingPosition = false;
            state.positions = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_START:
            let copyState2 = { ...state };
            copyState2.isLoadingRole = true;
            return {
                ...copyState2,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data
            console.log('action', action);
            state.isLoadingRole = false;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.isLoadingRole = false;
            state.roles = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USER_FAILED:
            state.users = [];
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;