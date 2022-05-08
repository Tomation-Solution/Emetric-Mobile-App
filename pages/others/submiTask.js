import { View,SafeAreaView, FlatList, TouchableOpacity,StatusBar,Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import tw from 'tailwind-react-native-classnames'
import Ionicon from 'react-native-vector-icons/Ionicons'
import FeatherIcon from 'react-native-vector-icons/Feather'

import TobBar from '../../components/helpers/topbar'
import RoundedButton from '../../components/button/RoundedButton'
import ModalTemplate from '../../components/modal'
import ViewTask from '../../components/modal/task/ViewTask'
import UploadTask from '../../components/modal/UploadTask'
import Rework from '../../components/modal/task/Rework'
import Rate from '../../components/modal/task/Rate'
import { TaskCard } from '../../components/card/TaskCard'
import { SubmitTaskCard } from '../../components/card/SubmitTaskCard '
import ViewSubmittedTask from '../../components/modal/task/ViewSubmittedTask'
import Submit from '../../components/modal/task/Submit'
import { Snackbar } from 'react-native-paper'
import { getTaskBid, SubmitTask } from '../../actions/actions'

export default function SubmiTask({navigation, route}) {

    const [status, setStatus] = useState(0)
    const [showToast, setshowToast] = useState(false)
    
    const [viewTask, setViewTask] = useState(false)
    const [submittedData, setSubmittedData] = useState(null)
    const [submitTask, setSubmitTask] = useState(false)
    const [reworkTask, setReworkTask] = useState(false)
    const [rateTask, setRateTask] = useState(false)
    const [selected,setSelected] =  useState(null)
    const [value,setValue] =  useState(null)
    const cardData = [
        {id:1, name:'Responsibilities For The Day To Day Relationship Managment of Chanel Patners Demo 1@gmail.com', time:'2022- 04-22 08:00:00', status:'Pending'},
        {id:2, name:'Responsibilities For The Day To Day Relationship Managment of Chanel Patners Demo 1@gmail.com', time:'2022- 04-22 08:00:00', status:'Pending'},
        {id:3, name:'Responsibilities For The Day To Day Relationship Managment of Chanel Patners Demo 1@gmail.com', time:'2022- 04-22 08:00:00', status:'Pending'},
        {id:4, name:'Responsibilities For The Day To Day Relationship Managment of Chanel Patners Demo 1@gmail.com', time:'2022- 04-22 08:00:00', status:'Pending'},
        {id:5, name:'Responsibilities For The Day To Day Relationship Managment of Chanel Patners Demo 1@gmail.com', time:'2022- 04-22 08:00:00', status:'Pending'},
        {id:6, name:'Responsibilities For The Day To Day Relationship Managment of Chanel Patners Demo 1@gmail.com', time:'2022- 04-22 08:00:00', status:'Pending'},
        {id:7, name:'Responsibilities For The Day To Day Relationship Managment of Chanel Patners Demo 1@gmail.com', time:'2022- 04-22 08:00:00', status:'Pending'},
       
    ]

    const handleSelection =(id)=>{
        if(id==selected){
            setSelected(null)
        }else{
            setSelected(id)
        }
    }
    console.log(route.params.task_id)

    useEffect(()=>{
        getTaskBid(route.params.task_id, callback)
    },[])

    const callback =(res)=>{
        // console.log(res.data.data.map(e=>e))
        setSubmittedData(res.data.data)
    }

    // const handleSubmit=()=>{
    //     const data ={'task[task_id]'}
    // }

  return (
    <SafeAreaView style={tw`h-full`}>
        <StatusBar style={tw`bg-blue-900`}/>
        <Snackbar 
            visible={showToast}
            onDismiss={()=>setshowToast(false)}
            style={tw`bg-green-700`}
            action={{label:'Ok', onPress:()=>setshowToast(false)}}
        >
            task Submitted Successfully
        </Snackbar>
        
        <ModalTemplate visible={viewTask}   body={<ViewSubmittedTask id={route.params.task_id} setVisible={setViewTask}/>}/>
        <ModalTemplate visible={submitTask}   body={<Submit setValue={setValue} details={route.params.details} id={route.params.task_id} setVisible={setSubmitTask} setshowToast = {setshowToast}/>}/>
        <ModalTemplate visible={reworkTask}   body={<Rework setVisible={setReworkTask}/>}/>
        <ModalTemplate visible={rateTask}   body={<Rate setVisible={setRateTask}/>}/>

        <TobBar
        body={
            <View style={tw`flex-row justify-between px-2 py-3 bg-gray-100`}>
                <Ionicon name='arrow-back' onPress={()=>navigation.toggleDrawer()} size={23} />
                <Text style={tw`font-bold`}>Debo's Submitted Tasks</Text>
                <Ionicon name='md-notifications' size={20} />

            </View>
        }
    />
      <Text style={tw`mx-5 font-bold text-blue-900`}>Submitted Tasks</Text>
      <View style={tw`flex-row justify-end px-6 w-full`}>
        <View style={tw`w-5/12`}> 
          <RoundedButton text='Submit Task' pressed={()=>setSubmitTask(true)}/>
        </View>
      </View>
      <FlatList
            data={submittedData}
            keyExtractor={(item)=>item.id}
            // ListHeaderComponent={<HeadComponent/>}
            style={tw`p-5 bg-gray-100`}
            // ListFooterComponent={<BottomComponents/>}
            renderItem={
                ({item})=>
                <View style={tw`justify-around w-full `}>
                   
                  {   item ?
                    <SubmitTaskCard name={item.name}
                    time={item.start_date + ' ' + item.start_time}
                    status={item.task_status}
                    id={item.task_id}
                    selected ={selected} 
                    setSelected ={setSelected} 
                    setView ={setViewTask} 
                    navigation={navigation}
                    setRework ={setReworkTask} 
                    setRate ={setRateTask} 
                    setSubmit ={setSubmitTask} 
                    details={item}
                    button1={
                            
                        <TouchableOpacity onPress={()=>handleSelection(item.id)} style={tw`px-2 rounded-lg w-5/6 border mx-auto border-blue-900`}>
                            <FeatherIcon size={20} style={tw`text-center`} name='more-horizontal'/>
                        </TouchableOpacity>
                    
                    }
                />:<Text style={tw`text-gray-600 h-full`}>No Subbmission yet</Text>}
               </View>
            }
        />
                {/* </View> */}
    </SafeAreaView>
  )
}