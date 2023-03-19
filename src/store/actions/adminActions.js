import actionTypes from './actionTypes';
import { getAllCodeService, getAllUser, eleteUserService, deleteUserService, editUserService } from '../../services/userService'
import { createNewUserService, getDoctorHomeService} from '../../services/userService'
import { toast } from "react-toastify";
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// })

// fire action là một method
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService('GENDER');
            if (res && res.errCode === 0) {
                // muốn firer một action của thằng redux phải dùng dispatch
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFail());
            }
        } catch (e) {
            //trường hợp Failed gọi tới action Failed
            dispatch(fetchGenderFail());
            console.log('fetchGenderStart error', e);
        }
    }

}

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_POSITION_START
            })
            let res = await (getAllCodeService('POSITION'));
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionFailed error', e);
        }
    }

}

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_ROLE_START
            })
            let response = await getAllCodeService('ROLE');
            if (response && response.errCode === 0) {
                dispatch(fetchRoleSuccess(response.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            console.log('fetchRoleFailed error', e);
        }
    }
}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.message.errCode === 0) {
                toast.success("Create  a new user succeed!");
                dispatch(createUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(createUserFailed);
            }
        } catch (e) {
            dispatch(createUserFailed());
            console.log('createUserFailed error', e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.SAVE_USER_SUCCESS
})

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED
})



export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})


export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})


export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})


export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUser('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                toast.error('Fetch all users error!')
                dispatch(fetchAllUserFailed());
            }
        } catch (e) {
            toast.error('Fetch all users error!')
            dispatch(fetchAllUserFailed());
            console.log('fetchAllUserFailed error', e)
        }
    }
}


export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data 
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete the user succeed!");
                dispatch(deleteAUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Delete the user error!");
                dispatch(deleteAUserFailed());
            }
        } catch (e) {
            toast.error("Delete the user error!"); 
            dispatch(deleteAUserFailed());
            console.log('Delete the user error!', e)
        }
    }
}

export const deleteAUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteAUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Update the user succeed!");
                dispatch(editAUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Update the user error!");
                dispatch(editAUserFailed());
            }
        } catch (e) {
            toast.error("Update the user error!");
            dispatch(editAUserFailed());
            console.log('Update the user error!', e)
        }
    }
}

export const editAUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editAUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
})

export const fetchTopDoctor = () => {
    return async (dispatch,getState) => {
        try {
            let res = await getDoctorHomeService('10')
            if(res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data));
            }else {
                dispatch(fetchTopDoctorFailed());
            }
        } catch(e) {
            console.log('fetchTopDoctorFailed',e)
            dispatch(fetchTopDoctorFailed());
        }
    }
}

export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    dataDoctor:data

})

export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
})


// let res1 = await getDoctorHomeService();
