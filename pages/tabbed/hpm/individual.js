import { ScrollView,View, FlatList, Picker, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import tw from 'tailwind-react-native-classnames'
import localStorage from 'react-native-sync-localstorage'

import IconCard from '../../../components/card/iconCard'
import ModalTemplate from '../../../components/modal'
import RoundedButton from '../../../components/button/RoundedButton'
import { PerformanceCard } from '../../../components/card/PerformanceCard'
import ViewPerformance from '../../../components/modal/ViewPerformance'
import { MyPerformance, MyPerformanceDash } from '../../../actions/actions'
import { setSelectedLog } from 'react-native/Libraries/LogBox/Data/LogBoxData'

export default function Individual() {

    const [view, setView] = useState(false)
    const [dashboardData, setDashboardData] = useState({
        mop:0, mjql:0, mjqt:0,mttt:0
    })
    const [selectedLog, setSelectedLog] = useState(null)
    const [allData, setAllData] = useState(null)
    useEffect(()=>{
        MyPerformance(callback)
        MyPerformanceDash(dashCallback)
    },[])

    const dashCallback=(response)=>{
        console.log(response)
        setDashboardData({
            mop:response.data.data.map(e=>e.percentage_cumulative_target_point_achieved),
            mjql:response.data.data.map(e=>e.percentage_cumulative_quality_target_point_achieved),
            mjqt:response.data.data.map(e=>e.percentage_cumulative_quantity_target_point_achieved),
            mttt:response.data.data.map(e=>e.percentage_cumulative_turn_around_time_target_point_achieved),
        })
    }
    const callback =(res)=>{
        // console.log(res)
        
        setAllData(res.data.data)
    }

    console.log(dashboardData)
    // const [uploadTask, setUploadTask] = useState(false)
    const data = [
        {id:1, name:'My Overall Performance', value:dashboardData.mop, percent:true},
        {id:2, name:'My Job Quality Performance', value:dashboardData.mjql, percent:true},
        {id:3, name:'My Job Quantity Performance', value:dashboardData.mjqt, percent:true},
        {id:4, name:'My Turnaround Time Performance', value:dashboardData.mttt, percent:true}
    ]

    const handleView =(data)=>{
        setView(true)
        setSelectedLog(data)
    }

    const HeadButtons =()=>{
        return(
            <View style={tw`flex-row flex-wrap justify-between `}>
                { data.map(e=>
                    <IconCard
                        width={true}
                        key={e.id}
                        amount={e.value && e.value.length>0 ? e.amount : 0}
                        percent={e.percent ? e.percent :0}
                        description={e.name}
                        bg='bg-blue-100'
                    />)
                    }
                {/* <View style={tw`mx-2`}>
                    <IconButton pressed={()=>setAddTask(true)} text='Add Task' textColor='text-white' bg='bg-blue-900' icon={<MaterialIcon name='add' color='white' size={20}/>}/>
                </View>
                <IconButton pressed={()=>  setUploadTask(true)} text='Upload Task' border='border' borderColor='border-blue-900' textColor='text-blue-900'  icon={<MaterialIcon name='add' color='blue' size={20}/>}/> */}
            </View>
        )
    }

  return (
    <View>
        <ModalTemplate visible={view}  body={<ViewPerformance setVisible={setView} data={selectedLog}/>}/>
        {/* <ModalTemplate visible={uploadTask}   body={<UploadTask setVisible={setUploadTask}/>}/> */}
        <FlatList
            data={allData ? allData : ''}
            keyExtractor={(item)=>item.id}
            
            ListHeaderComponent={<HeadButtons/>}
            style={tw`p-5 bg-gray-100`}
            renderItem={
                ({item})=>
                <View style={tw`justify-around`}>
                    <PerformanceCard name={item.name} 
                    
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