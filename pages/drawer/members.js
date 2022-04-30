import { View,SafeAreaView, FlatList, Platform, StatusBar,Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import DueCard from '../../components/card/dueCard'
import TobBar from '../../components/helpers/topbar'
import Search from '../../components/helpers/search'
import { MemberCard } from '../../components/card/TaskCard'
import IconButton from '../../components/button/IconButton'


const data =[
    {id:'1', name:'Chigozie Nwacukwu', department:'Accounting', Year:'2009'},
    {id:'2',name:'Chigozie Nwacukwu', department:'Accounting', Year:'2009'},
    {id:'3',name:'Chigozie Nwacukwu', department:'Accounting', Year:'2009'},
    {id:'4',name:'Chigozie Nwacukwu', department:'Accounting', Year:'2009'},
    {id:'5',name:'Chigozie Nwacukwu', department:'Accounting', Year:'2009'},
    {id:'6',name:'Chigozie Nwacukwu', department:'Accounting', Year:'2009'},
    {id:'7',name:'Chigozie Nwacukwu', department:'Accounting', Year:'2009'},
]

export default function Members() {
  return (
    <View style={tw`h-full`}>
         {Platform.OS == 'android'?
        <StatusBar/>:<></>    
    }
    <TobBar
        body={
            <View style={tw`flex-row justify-between px-2 py-3 bg-gray-100`}>
                <Ionicon name='ios-arrow-back' size={20} />
                <Text>Members Directory</Text>
                <Ionicon name='md-notifications' size={20} />

            </View>
        }
    />

        <View style={tw`w-7/12 mx-auto py-4`}>
            <DueCard 
                description='Total Members' 
                text={true}
                
                amount='2,900'
                bg='bg-blue-100'
            />
        </View>

        <View>
            <Search/>
        </View>

        <View>
            {/* <FlatList
                data={data}
                // key
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>(
                    <MemberCard 
                        name ={item.name} 
                        dept={item.department}
                        year={item.Year}
                        
                        button1={<IconButton bg='bg-gray-100' icon={  <MaterialIcon style={tw`my-auto px-1 text-base text-blue-500`}  name='mode-edit'/>}/>}
                        button2={<IconButton bg='bg-gray-50' icon={  <Ionicon style={tw`my-auto px-1 text-base text-red-800`}  name='trash'/>}/>}
                        />
                )
                }
            /> */}
        </View>
      {/* <Text>Ms</Text> */}
    </View>
  )
}