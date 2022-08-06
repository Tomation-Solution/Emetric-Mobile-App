import { ScrollView,View, FlatList, Picker, Text } from 'react-native'
import {List, Portal} from 'react-native-paper'
import React, {useState, useEffect} from 'react'
import tw from 'tailwind-react-native-classnames'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons' 
import FeatherIcon from 'react-native-vector-icons/Feather' 
import SmartPicker from 'react-native-smart-picker'
import moment from 'moment'

import IconCard from '../../../components/card/iconCard'
import IconButton from '../../../components/button/IconButton'
import { TaskCard } from '../../../components/card/TaskCard'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ModalTemplate from '../../../components/modal'
import AddTask from '../../../components/modal/AddTask'
import UploadTask from '../../../components/modal/UploadTask'
import CustomPicker from '../../../components/helpers/Picker'
import ViewTask from '../../../components/modal/task/ViewTask'
import FilterPicker from '../../../components/helpers/filterPicker'
import SubTabButton from '../../../components/button/SubTabButton'
import { TeamTasksLists, TeamTasksByUid, MemberTasks, MemberTasksByEmail } from '../../../actions/actionsTeam'
import Submit from '../../../components/modal/task/Submit'
import Rework from '../../../components/modal/task/Rework'
import Rate from '../../../components/modal/task/Rate'

export default function Individual() {

    const [addTask, setAddTask] = useState(false)
    const [shoePortal, setShowPortal] = useState(false)
    const [uploadTask, setUploadTask] = useState(false)
    const [viewTask, setViewTask] = useState(false)
    const [submitTask, setSubmitTask] = useState(false)
    const [reworkTask, setReworkTask] = useState(false)
    const [rateTask, setRateTask] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [selected,setSelected] =  useState(null)
    const [selectedTab,setSelectedTab] =  useState(1)
    const [teamMembers, setTeamMembers] =useState(null)
    const [dashboardData, setDashboardData] = useState({
        pending:0, active:0, over_due:0,closed:0
    })
    const [expanded, setExpanded] = React.useState(false);
    const [expandedMember, setExpandedMember] = React.useState(false);
    const handlePress = () => setExpanded(!expanded);
    const handleMemberPress = () => setExpandedMember(!expandedMember);
    const [filter, setFilter] = useState(null)
    const [memberEmail, setMemberEmail] = useState(null)
    const [filterMember, setFilterMember] = useState(null)
    const [listData, setListData] = useState(null)
    const [selectedVal, setSelectedVal] = useState('pending')
    const [item, setItem] = useState(null)
    const [reload, setReload] = useState(false)
    const [isFetching, setIsFetching] = useState(false)

    const handleChildPress = (income) => {
        setExpanded(!expanded)
        setFilter(income.name)
    };

    const handleSelection =(id, item)=>{
        if(id==selected){
            setSelected(null)
        }else{
            setSelected(id)
            setItem(item)
        }
    }

    
    const handleChildPressMember = (selectedMember) => {
        setMemberEmail(selectedMember.email)
        setExpandedMember(!expandedMember)
        setFilterMember(selectedMember.first_name+ ' '+selectedMember.last_name )
        
        // console.log(selectedMember.email)
    };

    const data = [
        {id:1, name:'My Pending Task', value:dashboardData.pending},
        {id:2, name:'My Active Task', value:dashboardData.active},
        {id:3, name:'My Overdue Task', value:dashboardData.over_due},
        {id:4, name:'My Completed Task', value:dashboardData.closed}
    ]

    const tabData = [
        {id:1, name:'Pending', value:'pending'},
        {id:2, name:'Active', value:'active'},
        {id:3, name:'Overdue', value:'over_due'},
        {id:4, name:'Awaiting Rating', value:'awaiting_rating'},
        {id:5, name:'Rework', value:'rework'},
        {id:6, name:'Rework Overdue', value:'rework_over_due'},
        {id:7, name:'Closed', value:'closed'}
    ]

    const filterData=[
        {id:1, name:'Day'},
        {id:2, name:'Week'},
        {id:3, name:'Month'},
        {id:4, name:'Quarter'},
        {id:5, name:'Bi-Annual'},
        {id:6, name:'Annual'},
    ]

    let startDate;
    const today = new Date()
    if(!filter || filter =='Day'){
        startDate=moment(today).format('YYYY-MM-DD')
        // console.log(moment(startDate).format('YYYY-MM-DD'))
    }else if(filter=='Week'){
        startDate=moment(today.setDate(today.getDate()+7) ).format('YYYY-MM-DD');
    }else if(filter=='Month'){
        startDate=moment(today.setDate(today.getDate()+30) ).format('YYYY-MM-DD');
    }else if(filter=='Quarter'){
        startDate=moment(today.setDate(today.getDate()+90) ).format('YYYY-MM-DD');
    }else if(filter=='Bi-Annual'){
        startDate=moment(today.setDate(today.getDate()+182) ).format('YYYY-MM-DD');
    }else if(filter=='Annual'){
        startDate=moment(today.setDate(today.getDate()+365) ).format('YYYY-MM-DD');
    }

    useEffect(()=>{
        // TeamTasksLists(callback)
        MemberTasks(dashboardCallback)
        if(memberEmail){
            startDate ?
            MemberTasksByEmail(memberEmail,callback,startDate)
            :
            MemberTasksByEmail(memberEmail,callback)
        }
        
    },[memberEmail,filter, reload])

    const callback = (res)=>{
        console.log(res.data.data)
        setDashboardData({
            pending:res.data.data.filter(e=>e.task_status=='pending').length,
            active: res.data.data.filter(e=>e.task_status=='active').length,
            over_due: res.data.data.filter(e=>e.task_status=='over_due').length,
            closed: res.data.data.filter(e=>e.task_status=='closed').length,
        })
        setListData(res.data.data)
    }

    const dashboardCallback = (res)=>{
        // console.log(res.data.data.map(e=>e.user.first_name))
        setTeamMembers(res.data.data.map(e=>e.user))
    }

    const handleSubTab=(info)=>{
        setSelectedTab(info.id)
        setSelectedVal(info.value)
    }

    const onRefresh = async () => {
        MemberTasks(dashboardCallback)
        if(memberEmail){
            startDate ?
            MemberTasksByEmail(memberEmail,callback,startDate)
            :
            MemberTasksByEmail(memberEmail,callback)
        }
      };
    const HeadButtons =()=>{
        return(
            <View style={tw`flex-row justify-end`}>
                <View style={tw`mx-2`}>
                    <IconButton pressed={()=>setAddTask(true)} text='Add Task' textColor='text-white' bg='bg-blue-900' icon={<MaterialIcon name='add' color='white' size={20}/>}/>
                </View>
                <IconButton pressed={()=>  setUploadTask(true)} text='Upload Task' border='border' borderColor='border-blue-900' textColor='text-blue-900'  icon={<MaterialIcon name='add' color='blue' size={20}/>}/>
            </View>
        )
    }


    const HeadComponent =()=>{
        return(
        <View>
            <View style={tw`flex-row flex-wrap justify-between `}>
                { data.map(e=>
                    <IconCard
                        width={true}
                        key={e.id}
                        amount={e.value}
                        description={e.name}
                        bg='bg-blue-100'
                    />)
                    }
            </View>

                <ScrollView horizontal 
                    alwaysBounceHorizontal  showsHorizontalScrollIndicator={false}
                    style={tw`mb-2 w-full flex-row mt-3 mx-1`}
                >
                    {tabData.map((e,index)=>
                    // <ScrollView horizontal style={tw`w-full`}>
                    <SubTabButton text={e.name}  key={e.id}
                    pressed={()=>handleSubTab(e)} 
                    selected={selectedTab} index={e.id} />
                    // </ScrollView>
                    )}
            
                </ScrollView>
            </View>
        )
    } 

    
  return (
    <View>
        <ModalTemplate visible={addTask}  body={<AddTask setShowToast={setShowToast} setReload={setReload} setVisible={setAddTask}/>}/>
        <ModalTemplate visible={uploadTask}   body={<UploadTask setShowToast={setShowToast} setReload={setReload} setVisible={setUploadTask}/>}/>
        <ModalTemplate visible={viewTask}   body={<ViewTask setShowToast={setShowToast} setReload={setReload} setVisible={setViewTask}/>}/>
        <ModalTemplate visible={submitTask}   body={<Submit setShowToast={setShowToast} setReload={setReload} setVisible={setSubmitTask}/>}/>
        <ModalTemplate visible={reworkTask}   body={<Rework setShowToast={setShowToast} setReload={setReload} setVisible={setReworkTask} id={selected} />}/>
        <ModalTemplate visible={rateTask}   body={<Rate setVisible={setRateTask} setShowToast={setShowToast} setReload={setReload} reload={reload} details={item} id={selected}/>}/>
        {/* <View style={tw`mx-2`}> */}
        <View style={tw`w-11/12 mb-1 mx-3 flex-row justify-between`}>
           
            {/* <List.Section style={tw`bg-red-300 `}
                title='Select Category' collapsable>
                // <View> */}
                <View style={tw`w-4/12`}>
                <List.Accordion style={tw`w-full text-red-900`} expanded={expanded}
                    onPress={handlePress} titleNumberOfLines={1}  title={!filter ?'Filter':filter}>
                   {filterData.map((e)=>
                    <List.Item style={tw`text-red-900 text-xs`} key={e.id} title={e.name} onPress={()=>handleChildPress(e)}/>)}
                    </List.Accordion>
                </View>
            {/* </List.Section> */}
            <View style={tw`w-7/12`}>
                <List.Accordion style={tw`w-full text-xs`} expanded={expandedMember}
        onPress={handleMemberPress} titleStyle={tw`text-blue-800`} titleNumberOfLines={1}  title={!filterMember ?'Select Member':filterMember}>
                   {teamMembers?.map((e)=>
                    <List.Item style={tw` text-xs`} key={e.id} title={e.first_name + ' '+ e.last_name} onPress={()=>handleChildPressMember(e)}/>)}
                    </List.Accordion>
                </View>
            {/* <CustomPicker 
                label='Get Team Member Task'
                options={
                    teamMembers? teamMembers.map(e=>
                    ({id:e.user_id, label:e.first_name, value:e.last_name}))
                :''}
            /> */}
        </View>
        {/* </View> */}
        <FlatList
            data={listData?listData.filter(e=>e.task_status==selectedVal):''}
            keyExtractor={(item)=>item.id}
            ListHeaderComponent={filterMember?<HeadComponent/>:<></>}
            style={tw`p-5 bg-gray-100`}
            onRefresh={onRefresh}
            refreshing={isFetching}
            ListFooterComponent={<View style={tw`h-32`}/>}
            renderItem={
                ({item})=>
                <View style={tw`justify-around w-full `}>
                   

                    <TaskCard name={item.name}
                    time={item.start_date+' '+item.start_time}
                    status={item.task_status}
                    id={item.task_id}
                    selected ={selected} 
                    setSelected ={setSelected} 
                    setView ={setViewTask} 
                    setSubmit ={setSubmitTask} 
                    setRework ={setReworkTask} 
                    setRate ={setRateTask} 
                    item={item}
                    details={item}
                    button1={
                            
                        <TouchableOpacity onPress={()=>handleSelection(item.task_id,item)} style={tw`px-2 rounded-lg w-5/6 border border-blue-900`}>
                            <FeatherIcon size={20} name='more-horizontal'/>
                        </TouchableOpacity>
                    
                    }
                />
                </View>
            }
        />
    </View>
  )
}