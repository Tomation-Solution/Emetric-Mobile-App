import { View, FlatList, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import tw from 'tailwind-react-native-classnames'

import IconCard from '../../../components/card/iconCard'
import { CorporateDashboard, TeamTasksByUid } from '../../../actions/actionsTeam'
import { set } from 'react-native-reanimated'

export default function Corporate() {
    const  [pending, setPending] = useState(0)
    const  [closed, setClosed] = useState(0)
    const [dashValue, setDashValue] = useState({
         cop:0, cjql:0, cjqt:0, ctt:0
    })

    useEffect(()=>{
        CorporateDashboard('pending',callback)
        CorporateDashboard('closed',closedCallback)
        TeamTasksByUid(taskCallback)
    },[])

    const callback =(res)=>{
        setPending(res.data.count)
    }
    const closedCallback =(res)=>{
        // console.log(res.data.count)
        setClosed(res.data.count)
        // setDashValue({...dashValue, 'closed':res.data.count})
        
    }

    const taskCallback =(res)=>{
        console.log(res)
        setDashValue({...dashValue, 
            'cop':res.map(e=>e.percentage_cumulative_target_point_achieved),
            'cjql':res.map(e=>e.percentage_cumulative_quality_target_point_achieved),
            'cop':res.map(e=>e.percentage_cumulative_quantity_target_point_achieved),
            'cop':res.map(e=>e.percentage_cumulative_turn_around_time_target_point_achieved),
        
        })
        
    }

    
  const data = [
    {id:1, name:'Corporate Pending Objectives', value:pending},
    {id:2, name:'Corporate Closed Objectives', value:closed},
    {id:3, name:'Corporate Overall Performance', value:dashValue.cop, percent:true},
    {id:4, name:'Corporate Job Quality Performance', value:dashValue.cjql, percent:true},
    {id:5, name:'Corporate Job Quantity Performance', value:dashValue.cjqt, percent:true},
    {id:6, name:'Corporate Turnaround Time Performance', value:dashValue.ctt, percent:true},
]
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
                bg='bg-blue-100'
                percent={item.percent}
            />
        </View>
    }
/>
)
}