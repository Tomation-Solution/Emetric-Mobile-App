import { ScrollView,View, FlatList, Picker, Text } from 'react-native'
import {List, Portal} from 'react-native-paper'
import React, {useState, useEffect} from 'react'
import tw from 'tailwind-react-native-classnames'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons' 
import FeatherIcon from 'react-native-vector-icons/Feather' 
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
import Rate from '../../../components/modal/task/Rate'
import Rework from '../../../components/modal/task/Rework'
import TabbedButton from '../../../components/button/TabbedButton'
import SubTabButton from '../../../components/button/SubTabButton'
import { setWarningFilter } from 'react-native/Libraries/LogBox/Data/LogBoxData'
import { UserTaskInfo, UserTasksByEmail, UserTasksByStatus } from '../../../actions/actions'
import { or } from 'react-native-reanimated'

export default function Individual({navigation}) {

    const [addTask, setAddTask] = useState(false)
    const [shoePortal, setShowPortal] = useState(false)
    const [uploadTask, setUploadTask] = useState(false)
    const [viewTask, setViewTask] = useState(false)
    const [submitTask, setSubmitTask] = useState(false)
    const [reworkTask, setReworkTask] = useState(false)
    const [rateTask, setRateTask] = useState(false)
    const [selected,setSelected] =  useState(null)
    const [selectedTab,setSelectedTab] =  useState(1)
    const [portalId, setPortalId] =useState(null)
    const [expanded, setExpanded] = React.useState(false);
    const handlePress = () => setExpanded(!expanded);
    const [filter, setFilter] = useState(null)
    const [nPending, setNPending] = useState(0)
    const [overdue, setOverdue] = useState(0)
    const [taskInfo, setTaskInfo] = useState(null)
    const [details, setDetails] = useState(null)
    const [pending, setPending] = useState(0)
    const [status, setStatus] = useState('pending')
    const [statusName, setStatusName] = useState('pending')
    const [refresh, setRefresh] = useState(null)
    const [reload, setReload] = useState(null)
    const [showToast, setShowToast] = useState(null)
    const [isFetching, setIsFetching] = useState(false)

    
    const [stats, setStats] = useState({
        pending:0, active:0, over_due:0, closed:0, 
        rework:0, rework_over_due:0, awaiting_rating:0
    })


    const data = [
        {id:1, name:'My Pending Task', value:nPending},
        {id:2, name:'My Active Task', value:stats.active},
        {id:3, name:'My Overdue Task', value:overdue},
        {id:4, name:'My Completed Task', value:stats.closed}
    ]

    const tabData = [
        {id:1, name:'Pending',status:'pending',  value:2},
        {id:2, name:'Active',status:'active', value:4},
        {id:3, name:'Overdue',status:'over_due', value:5},
        {id:4, name:'Awaiting Rating',status:'awaiting_rating', value:3},
        {id:5, name:'Rework', status:'rework',value:3},
        {id:6, name:'Rework Overdue', status:'rework_over_due', value:3},
        {id:7, name:'Closed', status:'closed',value:3}
    ]

    

    const filterData=[
        {id:1, name:'Day'},
        {id:2, name:'Week'},
        {id:3, name:'Month'},
        {id:4, name:'Quarter'},
        {id:5, name:'Bi-Annual'},
        {id:6, name:'Annual'},
    ]




    const handleChildPress = (income) => {
        setExpanded(!expanded)
        setFilter(income.name)
    };

    const onRefresh = async () => {
        MemberTasks(dashboardCallback)
        if(startDate){
            UserTasksByStatus('over_due', overdueCallback, startDate, moment(today).format('YYYY-MM-DD'))
            UserTasksByStatus('pending', pendingCallback, startDate, moment(today).format('YYYY-MM-DD'))
            // UserDashboard(callback)
            UserTasksByStatus(status,callback, startDate, moment(today).format('YYYY-MM-DD'))
            UserTasksByEmail(taskCallback, startDate, moment(today).format('YYYY-MM-DD'))
        }else{
        UserTasksByStatus('over_due', overdueCallback)
        UserTasksByStatus('pending', pendingCallback)
        // UserDashboard(callback)
        UserTasksByStatus(status,callback)
        UserTasksByEmail(taskCallback)
        
        UserTasksByStatus('active', activeCallback)}

      };

    const callback=(response)=>{
        setTaskInfo(response.data.data)
        // console.log(response.data.data.map(e=>e.task_status=='pending').length)
        setPending(response.data.data.map(e=>e.task_status=='pending').length)
        setStats({...stats, 'pending':response.data.data.map(e=>e.task_status=='pending').length})
    }

    const taskCallback=(response)=>{
        // console.log(response.data.data)
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

const handleStatus =(index, name,status_name)=>{
    setTaskInfo(null)
    setSelectedTab(index)
    setStatusName(status_name)
    setStatus(name)
}

const pendingCallback=(res)=>{
    // console.log(res.data.count)
    setNPending(res.data.count)
}
const activeCallback=(res)=>{
    console.log(res.data.count)
    // set
}
const overdueCallback=(res)=>{
    // console.log(res.data.count)
    setOverdue(res.data.count)
}
    // console.log(taskInfo[0])
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
    console.log(moment(today).format('YYYY-MM-DD'))
    useEffect(()=>{
        if(startDate){
            UserTasksByStatus('over_due', overdueCallback, startDate, moment(today).format('YYYY-MM-DD'))
            UserTasksByStatus('pending', pendingCallback, startDate, moment(today).format('YYYY-MM-DD'))
            // UserDashboard(callback)
            UserTasksByStatus(status,callback, startDate, moment(today).format('YYYY-MM-DD'))
            UserTasksByEmail(taskCallback, startDate, moment(today).format('YYYY-MM-DD'))
        }else{
        UserTasksByStatus('over_due', overdueCallback)
        UserTasksByStatus('pending', pendingCallback)
        // UserDashboard(callback)
        UserTasksByStatus(status,callback)
        UserTasksByEmail(taskCallback)
        
        UserTasksByStatus('active', activeCallback)}

    },[selectedTab, filter, refresh])

    const HeadComponent =()=>{
        return(
        <View>
            <View style={tw`w-5/12`}>
                <List.Accordion style={tw`w-full`} expanded={expanded}
                    onPress={handlePress} titleNumberOfLines={1}  title={!filter ?'Filter':filter}>
                {filterData.map((e)=>
                <List.Item key={e.id} title={e.name} onPress={()=>handleChildPress(e)}/>)}
                {/* <List.Item title='Week'/>
                <List.Item title='Month'/>
                <List.Item title='Quarter'/>
                <List.Item title='Bi-Annual'/>
                <List.Item title='Annual'/> */}
                </List.Accordion>
            </View>
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
                    <SubTabButton text={e.name} key={e.id}
                    pressed={()=>handleStatus(e.id,e.status, e.name)} 
                    selected={selectedTab} index={e.id} />
                    // </ScrollView>
                    )}
            
                </ScrollView>
            </View>
        )
    } 

    const handleSelection =(id, item)=>{
        if(id==selected){
            setSelected(null)
        }else{
            setSelected(id)
            setDetails(item)
        }
    }
    // console.log(org)
  return (
    <View style={tw`h-full`}>
        <ModalTemplate visible={addTask} body={<AddTask setVisible={setAddTask} setShowToast={setShowToast} setReload={setReload}/>}/>
        <ModalTemplate visible={uploadTask} body={<UploadTask setVisible={setUploadTask} setShowToast={setShowToast} setReload={setReload}/>}/>
        <ModalTemplate visible={viewTask}  body={<ViewTask setVisible={setViewTask} details={details}  setShowToast={setShowToast} setReload={setReload}/>}/>
        <ModalTemplate visible={submitTask}   body={<UploadTask setShowToast={setShowToast} setReload={setReload} setVisible={setSubmitTask} id={selected}/>}/>
        <ModalTemplate visible={reworkTask}   body={<Rework setVisible={setReworkTask} setShowToast={setShowToast} setReload={setReload} id={selected} />}/>
        <ModalTemplate visible={rateTask}   body={<Rate setVisible={setRateTask}  setShowToast={setShowToast} setReload={setReload} />}/>
        {/* <View style={tw`mx-2`}>
            <HeadButtons/>
        </View> */}
        <FlatList
            // data={cardData.filter(e=>e.status=='Pending').map(e=>e)}
            data={taskInfo}
            keyExtractor={(item,i)=>i}
            ListHeaderComponent={<HeadComponent/>}
            onRefresh={onRefresh}
            refreshing={isFetching}
            style={tw`p-5 bg-gray-100 `}
            ListFooterComponent={<View style={tw`h-32`}/>}
            renderItem={
                ({item})=>
                <View style={tw`justify-around w-full `}>
                   

                    <TaskCard name={item.name}
                    time={item.start_date + ' ' + item.start_time}
                    status={item.task_status}
                    id={item.task_id}
                    selected ={selected} 
                    setSelected ={setSelected} 
                    setView ={setViewTask} 
                    navigation={navigation}
                    setRework ={setReworkTask} 
                    setRate ={setRateTask} 
                    setRefresh={setRefresh}
                    refresh={refresh}
                    details = {item}
                    isMe={true}
                    button1={
                            
                        <TouchableOpacity onPress={()=>handleSelection(item.task_id, item)} style={tw`px-2 rounded-lg w-5/6 border border-blue-900`}>
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