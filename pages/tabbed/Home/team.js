import { View, FlatList, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import localStorage from 'react-native-sync-localstorage'
import tw from 'tailwind-react-native-classnames'
import moment from 'moment'
import {List} from 'react-native-paper'

import IconCard from '../../../components/card/iconCard'
import { TeamTasksByUid } from '../../../actions/actionsTeam'


export default function Team() {

    const [stats, setStats] = useState({
        tps:0, ttt:0, tjql:0, tjqt:0 
    })
    const [filter, setFilter] = useState(null)
    const [startBefore, setStartBefore] = useState(null)
    const [expanded, setExpanded] = React.useState(false);
    const handlePress = () => setExpanded(!expanded);
    const handleChildPress = (income) => {
        setExpanded(!expanded)
        setFilter(income)
        // alert(income.startBefore)
    };
    const today = new Date()
  const data = [
    {id:1, name:'Team Performance Score', value:stats.tps?stats?.tps:0, percent:true},
    {id:2, name:'Team Turnaround Time', value:stats?.ttt?stats?.ttt:0, percent:true},
    {id:3, name:'Team Job Quality Score', value:stats?.tjql?stats?.tjql:0, percent:true},
    {id:4, name:'Team Job Quantity Score', value:stats?.tjqt?stats?.tjqt:0, percent:true}
]

const filterData=[
    {id:1, name:'Day',startBefore:moment(today).format('YYYY-MM-DD')},
    {id:2, name:'Week',startBefore: moment(today.setDate(today.getDate()-7) ).format('YYYY-MM-DD')},
    {id:3, name:'Month',startBefore: moment(today.setDate(today.getDate()-31) ).format('YYYY-MM-DD')},
    {id:4, name:'Quarter',startBefore: moment(today.setDate(today.getDate()-92) ).format('YYYY-MM-DD')},
    {id:5, name:'Bi-Annual', startBefore: moment(today.setDate(today.getDate()-180) ).format('YYYY-MM-DD')},
    {id:6, name:'Annual',startBefore: moment(today.setDate(today.getDate()-365) ).format('YYYY-MM-DD')},
]

let startDate;
// let startBefore;

if(!filter || filter.name =='Day'){
    startDate=moment(today).format('YYYY-MM-DD')
    // setStartBefore(moment(today).format('YYYY-MM-DD'))
    // console.log(moment(startDate).format('YYYY-MM-DD'))
}else if(filter.name=='Week'){
    startDate=moment(today.setDate(today.getDate()+7) ).format('YYYY-MM-DD')
    // setStartBefore(moment(today.setDate(today.getDate()-7) ).format('YYYY-MM-DD'))
}else if(filter.name=='Month'){
    startDate=moment(today.setDate(today.getDate()+30) ).format('YYYY-MM-DD')
    // setStartBefore(moment(today.setDate(today.getDate()-30) ).format('YYYY-MM-DD'))
}else if(filter.name=='Quarter'){
    startDate=moment(today.setDate(today.getDate()+90) ).format('YYYY-MM-DD');
    // setStartBefore(moment(today.setDate(today.getDate()-90) ).format('YYYY-MM-DD'))
}else if(filter.name=='Bi-Annual'){
    startDate=moment(today.setDate(today.getDate()+182) ).format('YYYY-MM-DD');
    // setStartBefore(moment(today.setDate(today.getDate()-182) ).format('YYYY-MM-DD'))
}else if(filter.name=='Annual'){
    startDate=moment(today.setDate(today.getDate()+365) ).format('YYYY-MM-DD');
    // setStartBefore(moment(today.setDate(today.getDate()-365) ).format('YYYY-MM-DD'))
}

useEffect(()=>{
    if(startDate){
    TeamTasksByUid(callback, filter?.startBefore)
}else{
    TeamTasksByUid(callback)
}
},[filter])

const callback =(res)=>{
    console.log(res)
    setStats({
        tjql:res?res.map(e=>e.percentage_cumulative_quality_target_point_achieved):0,
        ttt:res?res.map(e=>e.percentage_cumulative_turn_around_time_target_point_achieved):0,
        tjqt:res?res.map(e=>e.percentage_cumulative_quantity_target_point_achieved):0,
        tps:res?res.map(e=>e.percentage_cumulative_target_point_achieved):0,

    })
    console.log(res.map(e=>e))
}
return (

<FlatList
    data={data?data:[]}
    keyExtractor={(item)=>item.id}
    numColumns={2}
    // contentInset={2}
    ListHeaderComponent={
        <View style={tw`w-5/12`}>
                <List.Accordion style={tw`w-full`} expanded={expanded}
                    onPress={handlePress} titleNumberOfLines={1}  title={!filter ?'Filter':filter.name}>
                {filterData.map((e)=>
                <List.Item key={e.id} title={e.name} onPress={()=>handleChildPress(e)}/>)}
                </List.Accordion>
            </View>
    }
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