import { ScrollView,View, FlatList, Picker, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import tw from 'tailwind-react-native-classnames'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons' 
import FeatherIcon from 'react-native-vector-icons/Feather' 
import SmartPicker from 'react-native-smart-picker'

import IconCard from '../../../components/card/iconCard'
import IconButton from '../../../components/button/IconButton'
import { TaskCard } from '../../../components/card/TaskCard'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ModalTemplate from '../../../components/modal'
import AddTask from '../../../components/modal/AddTask'
import UploadTask from '../../../components/modal/UploadTask'
import RoundedButton from '../../../components/button/RoundedButton'
import { PerformanceCard } from '../../../components/card/PerformanceCard'
import ViewPerformance from '../../../components/modal/ViewPerformance'
import { TeamTasksByUid, TeamTasksUid } from '../../../actions/actionsTeam'

export default function Team() {

    const [view, setView] = useState(false)
    const [dashboardData, setDashboardData] = useState({
        mop:0, mjql:0, mjqt:0,mttt:0
    })
    const [selectedLog, setSelectedLog] = useState(null)
    const [allData, setAllData] = useState(null)

    useEffect(() => {
        TeamTasksByUid(callback)
        TeamTasksUid(listCallback)
    }, [])

    const listCallback=(response)=>{
        // console.log(response
        setAllData(response)
    }

    const handleView =(data)=>{
        setView(true)
        setSelectedLog(data)
    }

    const callback=(response)=>{
        setDashboardData({
            mop:response.map(e=>e.percentage_cumulative_target_point_achieved),
            mjql:response.map(e=>e.percentage_cumulative_quality_target_point_achieved),
            mjqt:response.map(e=>e.percentage_cumulative_quantity_target_point_achieved),
            mttt:response.map(e=>e.percentage_cumulative_turn_around_time_target_point_achieved),
        })
    }
    // const [uploadTask, setUploadTask] = useState(false)
    const data = [
        {id:1, name:'Overall Performance', value:dashboardData.mop},
        {id:2, name:'Job Quality Performance', value:dashboardData.mjql},
        {id:3, name:'Job Quantity Performance', value:dashboardData.mjqt},
        {id:4, name:'Turnaround Time Performance', value:dashboardData.mttt}
    ]

    const HeadButtons =()=>{
        return(
            <View style={tw`flex-row flex-wrap justify-between `}>
                { data.map(e=>
                    <IconCard
                        width={true}
                        key={e.id}
                        amount={e.value}
                        description={e.name}
                        bg='bg-blue-100'
                        percent={true}
                    />)
                    }
                {/* <View style={tw`mx-2`}>
                    <IconButton pressed={()=>setAddTask(true)} text='Add Task' textColor='text-white' bg='bg-blue-900' icon={<MaterialIcon name='add' color='white' size={20}/>}/>
                </View>
                <IconButton pressed={()=>  setUploadTask(true)} text='Upload Task' border='border' borderColor='border-blue-900' textColor='text-blue-900'  icon={<MaterialIcon name='add' color='blue' size={20}/>}/> */}
            </View>
        )
    }

    const BottomComponents = () =>{
        return(
            <View style={tw`mt-3`}>
        
                { data.map(e=>
                    <PerformanceCard name='Responsibilities For The Day To Day Relationship Managment of Chanel Patners Demo 1@gmail.com' 
                    time='2022- 04-22 08:00:00' 
                    status='awating rating' 
                    button1={
                    <View style={tw`w-14`}>
                        <RoundedButton text='View'/>
                    </View>}
                />)}
            </View>
        )
    }

  return (
    <View>
        <ModalTemplate visible={view}  body={<ViewPerformance data={selectedLog} setVisible={setView}/>}/>
        {/* <ModalTemplate visible={uploadTask}   body={<UploadTask setVisible={setUploadTask}/>}/> */}
        <FlatList
            data={allData?allData:''}
            keyExtractor={(item)=>item.id}
            
            ListHeaderComponent={<HeadButtons/>}
            style={tw`p-5 bg-gray-100`}
            renderItem={
                ({item})=>
                <View style={tw`justify-around`}>
                    <PerformanceCard name={item.name} 
                    time='2022- 04-22 08:00:00' 
                    status='awating rating' 
                    button1={
                    <View style={tw`w-14`}>
                        <RoundedButton pressed={()=>handleView(item)} text='View'/>
                    </View>}
                />
                </View>
            }
        />
    </View>
  )
}