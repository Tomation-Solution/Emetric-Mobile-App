import { ScrollView,View, FlatList,BackHandler, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import tw from 'tailwind-react-native-classnames'
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment'

import IconCard from '../../../components/card/iconCard'
import { GetCurrentOrg, UserDashboard, UserTaskInfo, UserTasksByEmail, UserTasksByStatus} from '../../../actions/actions'
import { List } from 'react-native-paper'
import ModalTemplate from '../../../components/modal';
import Logout from '../../../components/modal/Logout';

export default function Individual() {
    const [modalVisible, setModalVisible] = useState(false)
    const [cumulative, setCumulative] = useState(null)
    const [pending, setPending] = useState(0)
    const [rework, setRework] = useState(0)
    const [awaiting, setAwaiting] = useState(0)
    const [filter, setFilter] = useState(null)
    const [startBefore, setStartBefore] = useState(null)
    const [expanded, setExpanded] = React.useState(false);
    const handlePress = () => setExpanded(!expanded);
    const today = new Date()

    const [stats, setStats] = useState({
        pending:0, active:0, over_due:0, closed:0, 
        rework:0, rework_over_due:0, awaiting_rating:0
    })

    const data = [
        {id:1, name:'My Pending Task', value:pending},
        {id:2, name:'My Active Task', value:stats.active},
        {id:3, name:'My Overdue Task', value:stats.over_due},
        {id:4, name:'My Completed Task', value:stats.closed},
        {id:5, name:'My Rework Task', value:rework},
        {id:6, name:'My Rework OverDue Task', value:stats.rework_over_due},
        {id:7, name:'Task Awaiting Rating', value:awaiting},
        {id:8, name:'My Overall Performance', value:cumulative?cumulative.percentage_cumulative_target_point_achieved:0, percent:true},
        {id:9, name:'My Job Quality Performance', value:cumulative ?cumulative.percentage_quality_target_point_achieved: 0, percent:true},
        {id:10, name:'My Job Quantity Performance', value:cumulative?cumulative.percentage_quantity_target_point_achieved:0, percent:true},
        {id:11, name:'My Turnaround Time Performance', value:cumulative?cumulative.percentage_turn_around_time_target_point_achieved:0, percent:true},
        {id:12, name:'My Contribution To Team', value:cumulative?cumulative.percentage_cumulative_target_point_achieved:0, percent:true}
    ]
    
    const filterData=[
        {id:1, name:'Day',startBefore:moment(today).format('YYYY-MM-DD')},
        {id:2, name:'Week',startBefore: moment(today.setDate(today.getDate()-7) ).format('YYYY-MM-DD')},
        {id:3, name:'Month',startBefore: moment(today.setDate(today.getDate()-31) ).format('YYYY-MM-DD')},
        {id:4, name:'Quarter',startBefore: moment(today.setDate(today.getDate()-92) ).format('YYYY-MM-DD')},
        {id:5, name:'Bi-Annual', startBefore: moment(today.setDate(today.getDate()-180) ).format('YYYY-MM-DD')},
        {id:6, name:'Annual',startBefore: moment(today.setDate(today.getDate()-365) ).format('YYYY-MM-DD')},
    ]
    const callback=(response)=>{
        console.log(response)
        setCumulative(response[0])
    }

    const pendingCallback=(response)=>{setPending(response.data.count)}
    const awaitingCallback=(response)=>{console.log(response.data.count);setAwaiting(response.data.count)}
    const reworkCallback=(response)=>{setRework(response.data.count)}

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

    const handleChildPress = (income) => {
        setExpanded(!expanded)
        setFilter(income)
        // alert(income.startBefore)
    };
    // console.log(filter)

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

    // console.log(moment(today.setDate(today.getDate()-7) ).format('YYYY-MM-DD'))
    useEffect(()=>{
        // GetCurrentOrg()
        if(startDate){
        UserDashboard(callback, filter?.startBefore)
        UserTasksByEmail(taskCallback,filter?.startBefore)
        UserTasksByStatus('pending', pendingCallback)
        UserTasksByStatus('awaiting_rating', awaitingCallback)
        UserTasksByStatus('rework', reworkCallback, startDate)
        }else{
        UserDashboard(callback)
        UserTasksByEmail(taskCallback)
        UserTasksByStatus('pending', pendingCallback)
        UserTasksByStatus('awaiting_rating', awaitingCallback)
        UserTasksByStatus('rework', reworkCallback)
        }
        // UserTaskInfo(taskCallback)
    },[filter,awaiting])

    function useExitOnBack() {
        useFocusEffect(
          React.useCallback(() => {
            const handleBackPress = () => {
              setModalVisible(true)
              // BackHandler.exitApp();
              return true;
            };
            BackHandler.addEventListener('hardwareBackPress', handleBackPress);
            return () =>
              BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
          }, []),
        );
      }
      
       
        useExitOnBack();
    // console.log(localStorage.getItem('uuid'))
    

  return (
    <View>
        <ModalTemplate
            visible={modalVisible}
            body={<Logout setVisible={setModalVisible}/>}
        
        />
    <FlatList
        data={data}
        keyExtractor={(item)=>item.id}
        numColumns={2}
        // contentInset={2}
        ListHeaderComponent={
            <View style={tw`w-5/12`}>
                <List.Accordion style={tw`w-full`} expanded={expanded}
                    onPress={handlePress} titleNumberOfLines={1}  title={!filter ?'Filter':filter.name}>
                {filterData.map((e)=>
                <List.Item key={e.id} title={e.name} onPress={()=>handleChildPress(e)}/>)}
                {/* <List.Item title='Week'/>
                <List.Item title='Month'/>
                <List.Item title='Quarter'/>
                <List.Item title='Bi-Annual'/>
                <List.Item title='Annual'/> */}
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
    </View>
  )
}