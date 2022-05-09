import localStorage from 'react-native-sync-localstorage'
import api from '../api/api'

// `/client/${org_name}/task/report/team/${Team.uuid}/?start_date_before=${start_date_before}&start_date_after=${start_date_after}&dashboard_report=True`
//team dashboard details
export const TeamTasksByUid = async(callback, startTime)=>{
    // console.log(localStorage.getItem('user_id'))
    try {
      const response =  startTime ? await api.get(`client/${localStorage.getItem('org_name')}/task/report/team/${localStorage.getItem('team_uuid')}/?start_date_after=${startTime}&dashboard_report=True`)
        :await api.get(`client/${localStorage.getItem('org_name')}/task/report/team/${localStorage.getItem('team_uuid')}/?dashboard_report=True`);
       
            //    console.log(localStorage.getItem('uuid')) 
            if (response.status==200) {
        // console.log(response)

            callback(response.data.data);
        } else {
          console.log(response.data.status)
          callback(response.data)
        }
    } catch (error) {
        console.error(error)
        // setLoading(false)

    }
}


export const TeamTasksUid = async(callback, startTime)=>{
    // console.log(localStorage.getItem('user_id'))
    try {
      const response =  startTime ? await api.get(`client/${localStorage.getItem('org_name')}/task/report/team/${localStorage.getItem('team_uuid')}/?start_date_before=${start_date_before}&start_date_after=${start_date_after}&dashboard_report=True`)
        :await api.get(`client/${localStorage.getItem('org_name')}/task/report/team/${localStorage.getItem('team_uuid')}/`);
       
            //    console.log(localStorage.getItem('uuid')) 
            if (response.status==200) {
        // console.log(response)

            callback(response.data.data);
        } else {
          console.log(response.data.status)
          callback(response.data)
        }
    } catch (error) {
        console.error(error)
        // setLoading(false)

    }
}

// /client/{{ORGANISATION_NAME}}/task/report/team-initiative/:team_id/?start_date_before=2022-01-25&page=2

//team dashboard details
export const TeamTasksLists = async(callback, startTime)=>{
    // console.log(localStorage.getItem('user_id'))
    try {
      const response =  startTime ? await api.get(`client/${localStorage.getItem('org_name')}/task/report/team/${localStorage.getItem('team_uuid')}/?start_date_before=${start_date_before}&start_date_after=${start_date_after}`)
        :await api.get(`client/${localStorage.getItem('org_name')}/task/report/team/${localStorage.getItem('team_uuid')}`);
       
            //    console.log(localStorage.getItem('uuid')) 
            if (response.status==200) {
        // console.log(response)

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


// /client/${org_name}/employee/?upline__email=${getLoggedin_userEmail()}

export const MemberTasks = async(callback, startTime)=>{
    // console.log(localStorage.getItem('user_id'))
    try {
      const response =  startTime ? await api.get(`client/${localStorage.getItem('org_name')}/task/report/team/${localStorage.getItem('team_uuid')}/?start_date_before=${start_date_before}&start_date_after=${start_date_after}`)
        :await api.get(`client/${localStorage.getItem('org_name')}/employee/?upline__email=${localStorage.getItem('email')}`);
       
            //    console.log(localStorage.getItem('uuid')) 
            if (response.status==200) {
        // console.log(response)

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


export const MemberTasksByEmail = async(email,callback, startDate)=>{
    // console.log(localStorage.getItem('user_id'))
    try {
        const response = startDate? await api.get(`client/${localStorage.getItem('org_name')}/task/?owner_email=${email}&start_date_before=${startDate}`)
        : await api.get(`client/${localStorage.getItem('org_name')}/task/?owner_email=${email}`)
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

// User Task Dashboard
export const MemberDashboard = async(user_id,callback)=>{
    // console.log(localStorage.getItem('user_id'))
    try {
        const response = await api.get(`client/${localStorage.getItem('org_name')}/task/report/user/${user_id}/?dashboard_report=True`);
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

// client/demo1/objective/?objective_status=pending&start_date_before=2023-05-03&start_date_after=2022-05-03
// User Task Dashboard
export const CorporateDashboard = async(status,callback,startDate)=>{
    // console.log(localStorage.getItem('user_id'))
    try {
        const response = startDate ? await api.get(`client/${localStorage.getItem('org_name')}/objective/?objective_status=${status}&start_date_after=${startDate}&dashboard_report=True`)
        : await api.get(`client/${localStorage.getItem('org_name')}/objective/?objective_status=${status}`);
    //    
        if (response.status==200) {
            // console.log(response.data.data[0])
            callback(response);
            
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



// /client/{{ORGANISATION_NAME}}/task/report/team-initiative/:team_id/
export const getTeamInitiatives = async(callback,startDate)=>{
    // console.log(localStorage.getItem('user_id'))
    try {
        const response = startDate ? await api.get(`client/${localStorage.getItem('org_name')}/objective/?objective_status=pending&start_date_after=2022-01-06&dashboard_report=True/`)
        : await api.get(`client/${localStorage.getItem('org_name')}/initiative/?owner_email=${localStorage.getItem('email')}`);
    //    
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

// client/{{ORGANISATION_NAME}}/task/:task_id/rate/

export const RateTask = async(taskId,callback,formdata,config)=>{
    // console.log(localStorage.getItem('user_id'))
    console.log(formdata)
    try {
        const response = await api.put(`client/${localStorage.getItem('org_name')}/task/${taskId}/rate/`, formdata);  
        if (response.status==200) {
            // console.log(response.data.data[0])
            callback(response);
            
        } else {
          console.log(response.data.status)
          callback(response.data)
        // setLoading(false)
        }
    } catch (error) {
        console.error(error)
        alert(error.response.data.errors[0].message)

        // setLoading(false)

    }
}

// ,{width:props.width ? '45%':'93%'}
// /client/{{ORGANISATION_NAME}}/task/bulk-add/
export const UploadBulkTask = async(callback,formdata, setLoading)=>{
    // console.log(localStorage.getItem('user_id'))
    console.log(formdata)
    try {
        const response = await api.post(`client/${localStorage.getItem('org_name')}/task/bulk-add/`, formdata);  
        if (response.status==200 ||response.status==201 ) {
            console.log(response)
            setLoading(false)
            callback(response.data.data);
            
        } else {
          console.log(response.data.status)
          setLoading(false)
          callback(response.data)
        // setLoading(false)
        }
    } catch (error) {
        setLoading(false)
        console.error(error.response.data.errors[0].message.map(e=>e.message))
        alert(error.response.data.errors[0].message.map(e=>'Line ' +e.line+' '+e.message))

    }
}