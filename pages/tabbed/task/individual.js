import { ScrollView,View, FlatList, Picker, Text } from 'react-native'
import {Portal} from 'react-native-paper'
import React, {useState} from 'react'
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
import CustomPicker from '../../../components/helpers/Picker'
import ViewTask from '../../../components/modal/task/ViewTask'
import Rate from '../../../components/modal/task/Rate'
import Rework from '../../../components/modal/task/Rework'
import TabbedButton from '../../../components/button/TabbedButton'
import SubTabButton from '../../../components/button/SubTabButton'

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
    const data = [
        {id:1, name:'My Pending Task', value:2},
        {id:2, name:'My Active Task', value:4},
        {id:3, name:'My Overdue Task', value:5},
        {id:4, name:'My Completed Task', value:3}
    ]

    const tabData = [
        {id:1, name:'Pending', value:2},
        {id:2, name:'Active', value:4},
        {id:3, name:'Overdue', value:5},
        {id:4, name:'Awaiting Rating', value:3},
        {id:5, name:'Rework', value:3},
        {id:6, name:'Rework Overdue', value:3},
        {id:7, name:'Closed', value:3}
    ]

    const cardData = [
        {id:1, name:'Responsibilities For The Day To Day Relationship Managment of Chanel Patners Demo 1@gmail.com', time:'2022- 04-22 08:00:00', status:'Pending'},
        {id:2, name:'Responsibilities For The Day To Day Relationship Managment of Chanel Patners Demo 1@gmail.com', time:'2022- 04-22 08:00:00', status:'Pending'},
        {id:3, name:'Responsibilities For The Day To Day Relationship Managment of Chanel Patners Demo 1@gmail.com', time:'2022- 04-22 08:00:00', status:'Pending'},
        {id:4, name:'Responsibilities For The Day To Day Relationship Managment of Chanel Patners Demo 1@gmail.com', time:'2022- 04-22 08:00:00', status:'Pending'},
        {id:5, name:'Responsibilities For The Day To Day Relationship Managment of Chanel Patners Demo 1@gmail.com', time:'2022- 04-22 08:00:00', status:'Awaiting Rating'},
       
    ]

    // const HeadButtons =()=>{
    //     return(
    //         <View style={tw`flex-row justify-end`}>
    //             <View style={tw`mx-2`}>
    //                 <IconButton pressed={()=>setAddTask(true)} text='Add Task' textColor='text-white' bg='bg-blue-900' icon={<MaterialIcon name='add' color='white' size={20}/>}/>
    //             </View>
    //             <IconButton pressed={()=>  setUploadTask(true)} text='Upload Task' border='border' borderColor='border-blue-900' textColor='text-blue-900'  icon={<MaterialIcon name='add' color='blue' size={20}/>}/>
    //         </View>
    //     )
    // }


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
                    <SubTabButton text={e.name} 
                    pressed={()=>setSelectedTab(e.id)} 
                    selected={selectedTab} index={e.id} />
                    // </ScrollView>
                    )}
            
                </ScrollView>
            </View>
        )
    } 

    const handleSelection =(id)=>{
        if(id==selected){
            setSelected(null)
        }else{
            setSelected(id)
        }
    }
  return (
    <View style={tw`h-full`}>
        <ModalTemplate visible={addTask}  body={<AddTask setVisible={setAddTask}/>}/>
        <ModalTemplate visible={uploadTask}   body={<UploadTask setVisible={setUploadTask}/>}/>
        <ModalTemplate visible={viewTask}   body={<ViewTask setVisible={setViewTask}/>}/>
        <ModalTemplate visible={submitTask}   body={<UploadTask setVisible={setSubmitTask}/>}/>
        <ModalTemplate visible={reworkTask}   body={<Rework setVisible={setReworkTask}/>}/>
        <ModalTemplate visible={rateTask}   body={<Rate setVisible={setRateTask}/>}/>
        {/* <View style={tw`mx-2`}>
            <HeadButtons/>
        </View> */}
        <FlatList
            data={cardData.filter(e=>e.status=='Pending').map(e=>e)}
            keyExtractor={(item)=>item.id}
            ListHeaderComponent={<HeadComponent/>}
            style={tw`p-5 bg-gray-100`}
            ListFooterComponent={<View style={tw`h-10`}/>}
            renderItem={
                ({item})=>
                <View style={tw`justify-around w-full `}>
                   

                    <TaskCard name={item.name}
                    time={item.time}
                    status={item.status}
                    id={item.id}
                    selected ={selected} 
                    setSelected ={setSelected} 
                    setView ={setViewTask} 
                    navigation={navigation}
                    setRework ={setReworkTask} 
                    setRate ={setRateTask} 
                    button1={
                            
                        <TouchableOpacity onPress={()=>handleSelection(item.id)} style={tw`px-2 rounded-lg w-5/6 border border-blue-900`}>
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