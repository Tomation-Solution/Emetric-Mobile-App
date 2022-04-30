import { View, TextInput } from 'react-native'
import React from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'
import tw from 'tailwind-react-native-classnames'

export default function Search(props) {
  return (
    <View style={tw`bg-gray-50  rounded-lg flex-row px-2 py-1.5 my-2 mx-5`}>
        <Ionicon name='search' size={20} style={tw`my-auto`}/>  
        <TextInput placeholder='Search' style={tw`mx-2 w-11/12`}/> 
    </View>
  )
}