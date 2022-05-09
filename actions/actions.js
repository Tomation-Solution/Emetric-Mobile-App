
// import api from '../helpers/api'
import { set } from 'react-native-reanimated';
import localStorage from 'react-native-sync-localstorage'
import api from '../api/api'


// const response = await api.post('login', { email, password });
export const LoginUser = async(data, org, callback, setLoading)=>{
    try {
        const response = await api.post(`client/${org}/auth/login/`,data);
       
        if (response.status ==200) {
            localStorage.setItem('token',response.data.data.tokens.access)
            localStorage.setItem('org_name',org)
            
            const user= await api.get(`client/${org}/employee/?user__email=${data.email}`)
            // const org= await api.get(`client/${org}/employee/?user__email=${data.email}`)
            if(user.status==200){
                const org= await api.get(`client/${localStorage.getItem('org_name')}/organisation/current/`)
                if(org.status=200){
                    // console.log(org.data.company_logo)
                localStorage.setItem('company_logo',org.data.company_logo)

                }
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
                localStorage.setItem('password', data.password)


                callback(response)
                
            }
        
        } else {
          console.log(response.data)
          alert(response.message)
        //   callback(response.data)
        setLoading(false)
        }
    } catch (error) {
        console.error(error.message)
        // if(error.code)
        setLoading(false)
        if(error.message.includes('401')||error.message.includes('404')){
            alert('Invalid Login Details.')
        }else{
            // alert(error.response.data.errors[0].message)
        alert(error.message)
        // console.log(error.response.data.message)
        }
        // setLoading(false)reposn

    }
}

//gets user Tasks by status

export const UserTasksByStatus = async(status,callback, startDate, endDate)=>{
    // console.log(localStorage.getItem('user_id'))
    try {
        const response = startDate ? await api.get(`client/${localStorage.getItem('org_name')}/task/?owner_email=${localStorage.getItem('email')}&task_status=${status}&start_date_before=${startDate}`)
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
export const UserDashboard = async(callback, startDate)=>{
    // console.log(localStorage.getItem('user_id'))
    console.log(startDate)
    try {
        const response = startDate ? await api.get(`client/${localStorage.getItem('org_name')}/task/report/user/${localStorage.getItem('user_id')}/?start_date_after=${startDate}&dashboard_report=True`)
            : await api.get(`client/${localStorage.getItem('org_name')}/task/report/user/${localStorage.getItem('user_id')}/?dashboard_report=True`)
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
export const CreateTask = async(data, callback, setLoading)=>{
    console.log(data)
    try {
        const response = await api.post(`client/${localStorage.getItem('org_name')}/task/`,data);
       
        if (response.status ==201) {
            alert('yeah')
                console.log(response)
                callback(response)
            setLoading(false)
        
        } else {
          console.log(response.data)
          alert(response.message)
          setLoading(false)

        //   callback(response.data)
        // setLoading(false)
        }
    } catch (error) {
        console.error(error)
        setLoading(false)

        // if(error.code)
        alert(error.response.data.errors[0].message +' '+error.response.data.errors[0].field)
        
        // alert(error.message)
        
        // setLoading(false)reposn

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



// client/{{ORGANISATION_NAME}}/task/:task_id/

export const getTaskBid = async(taskId, callback)=>{
    console.log(taskId)
    try {
        const response = await api.get(`client/${localStorage.getItem('org_name')}/task/${taskId}/task-submission`);
       
        if (response.status ==200) {
            // alert('yeah')
                // console.log(response)
                callback(response)
            
        
        } else {
        //   console.log(response.data)
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


export const SubmitTask = async(data, callback, config, setLoading)=>{
    console.log(data)
    // console.log(taskId)
    try {
        const response = await api.post(`client/${localStorage.getItem('org_name')}/task-submission/`, data);
       
        if (response.status ==201) {
            alert('yeah')
                // console.log(response)
                callback(response)
                setLoading(false)
            
        
        } else {
        //   console.log(response.data)
          alert(response.status)
          setLoading(false)
        //   callback(response.data)
        // setLoading(false)
        }
    } catch (error) {
        console.error(error)
        setLoading(false)
        // if(error.code)
        if(error.message.includes('401'||'404')){
            alert('Invalid Login Details')
        }else{
        alert(error.message)
        alert(error.response.data.errors[0].message)
        console.log(error.response.data.errors)
        }
        // setLoading(false)reposn

    }
}

// /task/:task_id/rework/
export const ReworkTask = async(task_id, callback, data, setLoading )=>{
    console.log(data)
    // console.log(taskId)
    try {
        const response = await api.put(`client/${localStorage.getItem('org_name')}/task/${task_id}/rework/`, data);
       console.log(data)
        if (response.status ==201 || response.status ==200) {
            alert('yeah')
            callback(response)
            setLoading(false)
        } else {
            setLoading(false)

          alert(response.status)
        }
    } catch (error) {
        console.error(error)
        setLoading(false)

        // if(error.code)
        if(error.message.includes('401'||'404')){
            alert('Invalid Login Details')
        }else{
        // alert(error.message)
        alert(error.response.data.errors[0].message)
        console.log(error.response.data.errors)
        }
        // setLoading(false)reposn

    }
}

// client/{{ORGANISATION_NAME}}/organisation/current/

export const GetCurrentOrg = async(callback )=>{

    try {
        const response = await api.get(`client/${localStorage.getItem('org_name')}/organisation/current/`);
        if (response.status ==201 || response.status ==200) {
            // alert('yeah')
            callback(response)
        } else {
          alert(response.status)
        }
    } catch (error) {
        console.error(error)
        // alert(error.response.data.errors[0].message)
        console.log(error.response.data.errors)
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
