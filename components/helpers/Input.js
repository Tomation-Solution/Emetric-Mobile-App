import { View, Text, TextInput, Platform } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'

export default function Input(props) {
  return (
    <View style={tw`mt-1`}>
    <Text>{props.label}</Text>
      <TextInput placeholder={props.label} 
      numberOfLines={props.multiline? 3 : 1} 
      multiline={props.multiline} 
      style={tw`w-full px-2 ${Platform.OS=='ios'?'py-4':'py-1'} mt-1 bg-gray-100 rounded-lg`}
      onChangeText={(text)=>props.setValue(text)}
      />
    </View>
  )
}