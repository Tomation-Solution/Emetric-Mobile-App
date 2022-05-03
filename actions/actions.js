
// import api from '../helpers/api'
import localStorage from 'react-native-sync-localstorage'
import api from '../api/api'


// const response = await api.post('login', { email, password });
export const LoginUser = async(data, org, callback)=>{
    try {
        const response = await api.post(`client/${org}/auth/login/`,data);
       
        if (response.status ==200) {
            localStorage.setItem('token',response.data.data.tokens.access)
            localStorage.setItem('org_name',org)
            
            const user= await api.get(`client/${org}/employee/?user__email=${data.email}`)
            if(user.status==200){
                console.log(user.data.data)
                console.log(user.data.data.map(e=>e.corporate_level.uuid))

                if(user.data.data.map(e=>e.user.user_role)=='team_lead'){
                localStorage.setItem('team_uuid',user.data.data.map(e=>e.corporate_level.uuid))
                }else{localStorage.setItem('team_uuid',null)}
                localStorage.setItem('user_role',user.data.data.map(e=>e.user.user_role))
                localStorage.setItem('user_id',user.data.data.map(e=>e.user.user_id))
                localStorage.setItem('uuid',user.data.data.map(e=>e.uuid))
                localStorage.setItem('first_name', user.data.data.map(e=>e.user.first_name))
                localStorage.setItem('last_name', user.data.data.map(e=>e.user.last_name))
                localStorage.setItem('last_name', user.data.data.map(e=>e.user.last_name))
                localStorage.setItem('email', user.data.data.map(e=>e.user.email))


                callback(response)
                
            }
        
        } else {
          console.log(response.data)
          alert(response.message)
        //   callback(response.data)
        // setLoading(false)
        }
    } catch (error) {
        console.error(error)
        // if(error.code)
        if(error.message.includes('401'||'404')){
            alert('Invalid Login Details')
        }else{
        alert(error.message)
        }
        // setLoading(false)reposn

    }
}

//gets user Tasks by status

export const UserTasksByStatus = async(status,callback, startDate, endDate)=>{
    // console.log(localStorage.getItem('user_id'))
    try {
        const response = startDate ? await api.get(`client/${localStorage.getItem('org_name')}/task/?owner_email=${localStorage.getItem('email')}&task_status=${status}`)
        : await api.get(`client/${localStorage.getItem('org_name')}/task/?owner_email=${localStorage.getItem('email')}&task_status=${status}`);
    //    console.log(localStorage.getItem('uuid')) 
        if (response.status==200) {
            callback(response);
        } else {
          console.log(response.data.status)
          callback(response.data)
        }
    } catch (error) {
        console.error(error)
        // setLoading(false)

    }
}



export const UserTasksByEmail = async(callback, startDate, endDate)=>{
    // &start_date_after=${startDate}&start_date_before=${endDate}
    // console.log(localStorage.getItem('user_id'))
    try {
        const response = !startDate ? await api.get(`client/${localStorage.getItem('org_name')}/task/?owner_email=${localStorage.getItem('email')}`)
        : await api.get(`client/${localStorage.getItem('org_name')}/task/?owner_email=${localStorage.getItem('email')}&start_date_before=${startDate}`)
    //    console.log(localStorage.getItem('uuid')) 
        if (response.status==200) {
            callback(response);
        } else {
          console.log(response.data.status)
          callback(response.data)
        }
    } catch (error) {
        console.error(error)
        // setLoading(false)

    }
}

// await axios.get(`/client/${ORG_NAME}/task/report/user/${loggedinUser.uuid}/?start_date_before=${start_date_before}&start_date_after=${start_date_after}`)
export const MyPerformance = async(callback,startDate)=>{
    try {
        const response = startDate ? await api.get(`client/${localStorage.getItem('org_name')}/task/report/user/${localStorage.getItem('user_id')}/?start_date_before=${start_date_before}&start_date_after=${start_date_after}`)
        : await api.get(`client/${localStorage.getItem('org_name')}/task/report/user/${localStorage.getItem('user_id')}/`)
        //    console.log(localStorage.getItem('uuid')) 
        if (response.status==200) {
            callback(response);
        } else {
          console.log(response.data.status)
          callback(response.data)
        }
    } catch (error) {
        console.error(error)
        // setLoading(false)

    }
}

export const MyPerformanceDash = async(callback,startDate)=>{
    try {
        const response = startDate ? await api.get(`client/${localStorage.getItem('org_name')}/task/report/user/${localStorage.getItem('user_id')}/?start_date_before=${start_date_before}&start_date_after=${start_date_after}`)
        : await api.get(`client/${localStorage.getItem('org_name')}/task/report/user/${localStorage.getItem('user_id')}/?dashboard_report=True`)
        //    console.log(localStorage.getItem('uuid')) 
        if (response.status==200) {
            callback(response);
        } else {
          console.log(response.data.status)
          callback(response.data)
        }
    } catch (error) {
        console.error(error)
        // setLoading(false)

    }
}


// `/client/${ORG_NAME}/task/?owner_email=${loggedinUser.email}&task_status=active
// User Task Dashboard
export const UserTaskInfo = async(callback)=>{
    // console.log(localStorage.getItem('user_id'))
    try {
        const response = await api.get(`client/${localStorage.getItem('org_name')}/task/report/user/${localStorage.getItem('user_id')}/?start_date_after=2022-01-06`);
    //    console.log(localStorage.getItem('uuid')) 
        if (response.status==200) {
            // console.log(response.data.data[0])
            alert('yoh')
            callback(response);
            // localStorage.setItem('token',response.data.token)
            // localStorage.setItem('user',response.data)
            // setLoading(false)
        } else {
          console.log(response.data.status)
          callback(response.data)
        // setLoading(false)
        }
    } catch (error) {
        console.error(error)
        // setLoading(false)

    }
}





// User Task Dashboard
export const UserDashboard = async(callback)=>{
    // console.log(localStorage.getItem('user_id'))
    try {
        const response = await api.get(`client/${localStorage.getItem('org_name')}/task/report/user/${localStorage.getItem('user_id')}/?start_date_after=2022-01-06&dashboard_report=True/`);
    //    console.log(response) 
        if (response.status==200) {
            // console.log(response.data.data[0])
            callback(response.data.data);
            
        } else {
          console.log(response.data.status)
          callback(response.data)
        // setLoading(false)
        }
    } catch (error) {
        console.error(error)
        // setLoading(false)

    }
}

// client/{{ORGANISATION_NAME}}/task/
export const CreateTask = async(data, callback)=>{
    console.log(data)
    try {
        const response = await api.post(`client/${localStorage.getItem('org_name')}/task/`,data);
       
        if (response.status ==201) {
            alert('yeah')
                console.log(response)
                callback(response)
            
        
        } else {
          console.log(response.data)
          alert(response.message)
        //   callback(response.data)
        // setLoading(false)
        }
    } catch (error) {
        console.error(error)
        // if(error.code)
        if(error.message.includes('401'||'404')){
            alert('Invalid Login Details')
        }else{
        alert(error.message)
        }
        // setLoading(false)reposn

    }
}


// Register
export const RegisterUser = async(details, callback, setLoading)=>{
    try {
        const response = await api.post('register', details);
        if (response.data.status) {
            console.log(response)
            callback(response.data);
            // localStorage.setItem('token',response.data.token)
            // localStorage.setItem('user',response.data)
            setLoading(false)
        } else {
          console.log(response.data.status)
          callback(response.data)
        setLoading(false)
        }
    } catch (error) {
        console.error(error)
        setLoading(false)

    }
}


//Update Profile
// users/1
export const UpdateUser = async(id, details, callback, setLoading)=>{
    try {
        // console.log(details.map((e)=>e))
        const response = await api.put(`users/${id}`, details);
        if (response.data.status) {
            console.log(response)
            callback(response.data)
            // localStorage.setItem('token',response.data.token)
            // localStorage.setItem('user',response.data)
            alert('Yes')
            setLoading(false)
        } else {
          console.log(response.data.status)
        //   callback(response.data)
        alert(response.data.message)
        setLoading(false)
        }
    } catch (error) {
        console.error(error)
        setLoading(false)

    }
}

// let link = currentPage ? `hmos?page=${currentPage}&size=${hmosPerPage}` :
//         `hmos?page=${currentPage}&size=${hmosPerPage}`;
//     link = searchText ? `${link}&search=${searchText}` : link;

export const getHmos = async(callback, currentPage, hmosPerPage, searchText)=>{
    console.log(searchText)
    // link = searchText ? `${link}&search=${searchText}` : link;
    try {
        let link = currentPage && hmosPerPage ?  `hmos?page=${currentPage}&size=${hmosPerPage}` :
        `hmos`;
        // link = searchText ? `${link}&search=${searchText}` : link;
        const response = await api.get(searchText ? `${link+'&search='+searchText}`: link);
        if (response.data.status) {
            // console.log(response)
            callback(response.data);
        } else {
        //   console.log(response.data.status)
          callback(response.data)
        }
    } catch (error) {
        console.error(error)
    }
}

export const getHospitals = async(callback, state, lga)=>{
    console.log(lga)
    try {
        const response = await api.get(`/hospitals/with-state?state=${state}&lga=${lga}&page=1&size=10`);
        if (response.data.status) {
            console.log(response)
            callback(response.data);
        } else {
        //   console.log(response.data.status)
          callback(response.data)
        }
    } catch (error) {
        console.error(error)
    }
}

export const getBeneficiaries = async(id, callback)=>{
    try {
        const response = await api.get(`beneficiaries?user_id=${id}`);
        if (response.data.status) {
            // console.log(response)
            callback(response.data);
        } else {
        //   console.log(response.data.status)
          callback(response.data)
        }
    } catch (error) {
        console.error(error)
    }
}

export const getSubscriptions= async(id, callback)=>{
    try {
        const response = await api.get(`hmo-subscriptions?user_id=${id}`);
        if (response.data.status) {
            console.log(response)
            callback(response.data);
        } else {
        //   console.log(response.data.status)
          callback(response.data)
        }
    } catch (error) {
        console.error(error)
    }
}

export const registerPayment = async(payment, hmo_id, callback, setLoading)=>{
    try {
        const response = await api.post(`/payments?hmo_id=${hmo_id}`, payment);
        if (response.data.status) {
            // console.log(response)
            callback(response.data);
            setLoading(false)
        } else {
        //   console.log(response.data.status)
        //   callback(response.data)
        // setLoading(false)
        console.log(response.data)
        alert(response.data.message)
        }
    } catch (error) {
        console.error(error)
        // setLoading(false)
        alert(error)
    }
}

//get user subscriptions
// export const getUserSubs = (id, callback) => async (dispatch) => {
//     await api.get(`reports/subscription_count?user_id=${id}`).then(response => {
//         if (response.data.status) {
//             callback(response.data)
//             // Notification.success('Successfully Sent')
//         } else {
//             Notification.error('An error Occured, try again.')
//         }
//     }).catch(error => Notification.error(error));
// }
// Update Beneficiary
export const updateBeneficiary = async(user_id, subscriber_id, userData, callback) => {
    try{
    const response = await api.put(`beneficiaries/${subscriber_id}?user_id=${user_id}`, userData)
        if (response.data.status) {
            // Notification.success('Updated Successfully!')
            callback(response.data);
            // console.log(response)
        } else {
            // Notification.error('Error Occured')
            // console.log('error')
            // console.log(response.data)
            alert(response.data.message)
        }
    } catch(error){
        alert(error)
    }
    
}


export const addBeneficiary = async(details, user_id, callback)=>{
    try {
        const response = await api.post(`/beneficiaries?user_id=${user_id}`, details);
        if (response.data.status) {
            console.log(response)
            callback(response.data);
            // setLoading(false)
        } else {
          console.log(response.data)
        //   callback(response.data)
        // setLoading(false)
        alert(response.data.status)
        }
    } catch (error) {
        // console.error(error)
        // setLoading(false)
        alert(error)
    }
}

//Delete beneficiary
export const deleteBeneficiary = async (id, user_id, callback)=>{
    try{
        const response = api.delete(`beneficiaries/${id}?user_id=${user_id}`);
        if(response.status){
            callback(response.data)
        }else{
            callback(response.data)
            console.log(response.data)
            
        }
    }catch(error) {
        alert(error)
    }
}

// Upload beneficiaries image
export const uploadCardImage =async (id, imgFile, config ,callback) => {
    try {
    const response = await api.put(`beneficiaries/upload-picture?subscriber_id=${id}`,imgFile,config);
            console.log(imgFile)
            if(response.status){
                // console.log(response)
                alert('yes')
                callback(response.data)
            }
            else {
                console.log('Error Occured')
            }
        }  catch (error) {
        // console.error(error)
        // setLoading(false)
        alert(error)
    }

}

// getHmoPackages
export const getPackages = async (hmo_id,callback)=>{
    try{
    const response = await api.get(`hmo-packages?hmo_id=${hmo_id}`);
        if(response.status){
            callback(response.data)
            console.log(response)
        }
    }catch(error){
        console.log(error)
    }
}

///get PackageBenefits
export const getPackageBenefits = async(hmo_id, package_id, callback)=>{
    try{
        const response = await api.get(`hmo-package-benefits?hmo_id=${hmo_id}&hmopackage_id=${package_id}`);
        if(response.status){
            callback(response.data)
        }else{
            console.log('error Occured')
        }
    }catch(error){
        alert(error)
    }
}

//getHmoHospitals
export const getHmoHospitals = async (hmo_id,page,size,callback)=>{
    try{
    const response = await api.get(`hospitals?hmo_id=${hmo_id}&page=${page}&size=${size}`);
        if(response.status){
            callback(response)
            // console.log(response)
        }
    }catch(error){
        console.log(error)
    }
}

//getTreatments
export const getTreatment = async (user_id,subscriber_id,callback)=>{
    try{
    const response = await api.get(`treatments?subscription_id=${user_id}&subscriber_id=${subscriber_id}`);
        if(response.status){
            callback(response)
            // console.log(response)
        }
    }catch(error){
        console.log(error)
    }
}

//getTreatmentDetails
export const getTreatmentDetails = async (id,callback)=>{
    try{
    const response = await api.get(`treatments/${id}`);
        if(response.status){
            callback(response)
            // console.log(response)
        }
    }catch(error){
        console.log(error)
    }
}


// export const getBenefitLog = (id, callback) => async (dispatch) => {
//     await api.get(`treatments/${id}`).then((response) => {
//         if (response.data.status) {
//             callback(response.data);
//         } else {
//             console.log(Notification.error('Error Occured'))
//         }
//     }).catch(error => Notification.error(error));
// }
