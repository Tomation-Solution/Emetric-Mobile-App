import { View, SafeAreaView, ScrollView, Pressable,StatusBar, Platform,Text } from 'react-native'
import React, {useState} from 'react'
import tw from 'tailwind-react-native-classnames'
import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { createStackNavigator } from '@react-navigation/stack';
import localStorage from 'react-native-sync-localstorage'

import DueCard from '../../../components/card/dueCard'
import IconCard from '../../../components/card/iconCard'
import TobBar from '../../../components/helpers/topbar'
import TabbedButton from '../../../components/button/TabbedButton'
import Corporate from './corporate'
import Individual from './individual'
import Team from './team'
import ModalTemplate from '../../../components/modal'
import AddTask from '../../../components/modal/AddTask'
import UploadTask from '../../../components/modal/UploadTask'
 

const Stack = createStackNavigator();

export default function Task({navigation}) {

  const [addTask, setAddTask] = useState(false)
    const [uploadTask, setUploadTask] = useState(false)
  const [selected, setSelected] = useState(0)

  const handletabPress =(index, to)=>{
    // setSelected(index)
    if(index==2 ){
      // setSelected(index)
      setAddTask(true)
      // alert('yo')
    }else if(index==3){
      // setSelected(index)
      setUploadTask(true)
    }else{
      setSelected(index)
      navigation.navigate(to)

    }
  }

  return (
    <SafeAreaView style={tw`h-full`}>
        {Platform.OS == 'android'?
        <StatusBar/>:<></>    
    }
    <ModalTemplate visible={addTask}  body={<AddTask setVisible={setAddTask} navigation={navigation} />}/>
    <ModalTemplate visible={uploadTask}   body={<UploadTask setVisible={setUploadTask}/>}/>

    <TobBar
        body={
            <View style={tw`flex-row justify-between px-2 py-3 bg-gray-100`}>
                <Ionicon name='md-chevron-back' onPress={()=>navigation.navigate('Home')} size={23} />
                <Text style={tw`font-bold`}>My Task Deck</Text>
                <Ionicon name='md-notifications' size={20} />

            </View>
        }
    />

    <View style={tw`flex-row justify-around px-4 mb-1`}>
      <TabbedButton text='My  Tasks' index={0} selected={selected} pressed={()=>handletabPress(0, 'individual-task')}/>
      { localStorage.getItem('user_role') !='team_lead' && localStorage.getItem('user_role') !='admin'?<></>:
      <TabbedButton text='Team Tasks' index={1} selected={selected} pressed={()=>handletabPress(1, 'team-task')} />}
      { localStorage.getItem('user_role') !='team_lead' && localStorage.getItem('user_role') !='admin'?<></>:
      <TabbedButton text='Add Task' index={2} selected={selected} pressed={()=>handletabPress(2, 'corporate')}/>}
      { localStorage.getItem('user_role') !='team_lead' && localStorage.getItem('user_role') !='admin'?<></>:
      <TabbedButton text='Upload Task' index={3} selected={selected} pressed={()=>handletabPress(3, 'corporate')}/>}
    </View>
    {/* <View style={tw`h-20`}> */}
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='individual-task'>
        <Stack.Screen name='individual-task' component={Individual} />
        <Stack.Screen name='team-task' component={Team} />
        <Stack.Screen name='add-task' component={Corporate} />
      </Stack.Navigator>
    
      
    </SafeAreaView>
  )
}