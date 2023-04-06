import axios from "../axios"
const handleLogginApi = (userEmail, userPassword) => {
    return axios.post('/api/login',
        { email: userEmail, password: userPassword });
}

const getAllUser = (inputId) => {
    //template string
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`) 

}

const getAllDoctors = () => {
    return axios.get('/api/get-all-doctors') 

}

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-info-doctors',data) 

}

const getDetailInfoDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}
export {
    handleLogginApi,
    getAllUser,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService,
    getDetailInfoDoctor,
}
