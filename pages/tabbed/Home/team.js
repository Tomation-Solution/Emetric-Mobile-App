import { View, FlatList, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import localStorage from 'react-native-sync-localstorage'
import tw from 'tailwind-react-native-classnames'

import IconCard from '../../../components/card/iconCard'
import { TeamTasksByUid } from '../../../actions/actionsTeam'


export default function Team() {

    const [stats, setStats] = useState({
        tps:0, ttt:0, tjql:0, tjqt:0 
    })
  const data = [
    {id:1, name:'Team Performance Score', value:stats.tps, percent:true},
    {id:2, name:'Team Turnaround Time', value:stats.ttt, percent:true},
    {id:3, name:'Team Job Quality Score', value:stats.tjql, percent:true},
    {id:4, name:'Team Job Quantity Score', value:stats.tjqt, percent:true}
]

useEffect(()=>{
    TeamTasksByUid(callback)
},[])

const callback =(res)=>{
    console.log(res)
    setStats({
        tjql:res.map(e=>e.percentage_cumulative_quality_target_point_achieved),
        ttt:res.map(e=>e.percentage_cumulative_turn_around_time_target_point_achieved),
        tjqt:res.map(e=>e.percentage_cumulative_quantity_target_point_achieved),
        tps:res.map(e=>e.percentage_cumulative_target_point_achieved),

    })
    console.log(res.map(e=>e))
}
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