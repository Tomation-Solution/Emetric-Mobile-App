import { ScrollView,View, FlatList, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import tw from 'tailwind-react-native-classnames'
import localStorage from 'react-native-sync-localstorage'

import IconCard from '../../../components/card/iconCard'
import { UserDashboard, UserTaskInfo, UserTasksByEmail, UserTasksByStatus} from '../../../actions/actions'

export default function Individual() {
    const [cumulative, setCumulative] = useState(null)
    const [pending, setPending] = useState(0)
    const [stats, setStats] = useState({
        pending:0, active:0, over_due:0, closed:0, 
        rework:0, rework_over_due:0, awaiting_rating:0
    })
    const data = [
        {id:1, name:'My Pending Task', value:stats.pending},
        {id:2, name:'My Active Task', value:stats.active},
        {id:3, name:'My Overdue Task', value:stats.over_due},
        {id:4, name:'My Completed Task', value:stats.closed},
        {id:5, name:'My Rework Task', value:stats.rework},
        {id:6, name:'My Rework OverDue Task', value:stats.rework_over_due},
        {id:7, name:'Task Awaiting Rating', value:stats.awaiting_rating},
        {id:8, name:'My Overall Performance', value:'12 %'},
        {id:9, name:'My Job Quality Performance', value:cumulative ?cumulative.percentage_quality_target_point_achieved: 0, percent:true},
        {id:10, name:'My Job Quantity Performance', value:cumulative?cumulative.percentage_quantity_target_point_achieved:0, percent:true},
        {id:11, name:'My Turnaround Time Performance', value:cumulative?cumulative.percentage_turn_around_time_target_point_achieved:0, percent:true},
        {id:12, name:'My Contribution To Team', value:cumulative?cumulative.percentage_cumulative_target_point_achieved:0, percent:true}
    ]
    const callback=(response)=>{
        // console.log(response)
        setCumulative(response[0])
    }

    const pendingCallback=(response)=>{
        console.log(response.data.count)
        // setCumulative(response[0])
        setPending(response.data.count)
    }

    const taskCallback=(response)=>{ 
        // console.log(response.data.data.filter(e=>e.task_status=='pending').length)   
      setStats({
        pending: response.data.data.filter(e=>e.task_status=='pending').length,
        active: response.data.data.filter(e=>e.task_status=='active').length,
        awaiting_rating: response.data.data.filter(e=>e.task_status=='awaiting_rating').length,
        over_due: response.data.data.filter(e=>e.task_status=='over_due').length,
        closed: response.data.data.filter(e=>e.task_status=='closed').length,
        rework: response.data.data.filter(e=>e.task_status=='rework').length,
        rework_over_due: response.data.data.filter(e=>e.task_status=='rework_over_due').length,

       }) 
    }   

    useEffect(()=>{
        UserDashboard(callback)
        UserTasksByEmail(taskCallback)
        UserTasksByStatus('pending', pendingCallback)
        // UserTaskInfo(taskCallback)
    },[])

    // console.log(localStorage.getItem('uuid'))
    

  return (

    <FlatList
        data={data}
        keyExtractor={(item)=>item.id}
        numColumns={2}
        // contentInset={2}
        style={tw`p-5`}
        ListFooterComponent={<View style={tw`h-10`}></View>}
        renderItem={
            ({item})=>
            <View style={tw`justify-around w-1/2`}>
                <IconCard
                    amount={item.value}
                    description={item.name}
                    percent={item.percent}
                    bg='bg-blue-100'
                />
            </View>
        }
    />
  )
}