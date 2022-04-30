import { ScrollView,View, FlatList, Picker, Text } from 'react-native'
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
import RoundedButton from '../../../components/button/RoundedButton'
import { PerformanceCard } from '../../../components/card/PerformanceCard'
import ViewPerformance from '../../../components/modal/ViewPerformance'

export default function Individual() {

    const [view, setView] = useState(false)
    // const [uploadTask, setUploadTask] = useState(false)
    const data = [
        {id:1, name:'My Overall Performance', value:'2 %'},
        {id:2, name:'My Job Quality Performance', value:'45 %'},
        {id:3, name:'My Job Quantity Performance', value:'5 %'},
        {id:4, name:'My Turnaround Time Performance', value:'3 %'}
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
        <ModalTemplate visible={view}  body={<ViewPerformance setVisible={setView}/>}/>
        {/* <ModalTemplate visible={uploadTask}   body={<UploadTask setVisible={setUploadTask}/>}/> */}
        <FlatList
            data={data}
            keyExtractor={(item)=>item.id}
            
            ListHeaderComponent={<HeadButtons/>}
            style={tw`p-5 bg-gray-100`}
            renderItem={
                ({item})=>
                <View style={tw`justify-around`}>
                    <PerformanceCard name='Responsibilities For The Day To Day Relationship Managment of Chanel Patners Demo 1@gmail.com' 
                    time='2022- 04-22 08:00:00' 
                    status='awating rating' 
                    button1={
                    <View style={tw`w-14`}>
                        <RoundedButton pressed={()=>setView(true)} text='View'/>
                    </View>}
                />
                </View>
            }
        />
    </View>
  )
}