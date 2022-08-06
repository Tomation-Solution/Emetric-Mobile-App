import { View, FlatList, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import tw from 'tailwind-react-native-classnames'
import moment from 'moment'
import { List } from 'react-native-paper'

import IconCard from '../../../components/card/iconCard'
import { CorporateDashboard, TeamTasksByUid } from '../../../actions/actionsTeam'
import { set } from 'react-native-reanimated'

export default function Corporate() {
    const  [pending, setPending] = useState(0)
    const  [closed, setClosed] = useState(0)
    const [dashValue, setDashValue] = useState({
         cop:0, cjql:0, cjqt:0, ctt:0
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
        CorporateDashboard('pending',callback, startBefore)
        CorporateDashboard('closed',closedCallback, startBefore)
        TeamTasksByUid(taskCallback, startDate)
        }else{
        CorporateDashboard('pending',callback)
        CorporateDashboard('closed',closedCallback)
        TeamTasksByUid(taskCallback)
        }
    },[filter])

    const callback =(res)=>{
        // console.log(res.data.count)
        setPending(res.data.count)
    }
    const closedCallback =(res)=>{
        // console.log(res.data)
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

    console.log(dashValue)

    
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
                amount={item.value && item.value.length>0 ? item.value:0}
                description={item.name}
                bg='bg-blue-100'
                percent={item.percent ? item.percent : 0}
            />
        </View>
    }
/>
)
}