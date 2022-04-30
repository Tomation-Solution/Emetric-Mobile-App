import { View, Text, Picker } from 'react-native'
import React from 'react'
import SmartPicker from 'react-native-smart-picker'
import tw from 'tailwind-react-native-classnames'
import Ionicon from 'react-native-vector-icons/Ionicons'

export default function FilterPicker(props) {
  return (
    <View style={tw`flex-row`}>
        <Text>{props.label}</Text>
        <View style={tw`border border-gray-300 my-auto rounded-lg  `}>
        <Picker style={tw`h-6`} itemStyle={{height:6}}>
                {props.options ?props.options.map(e=>
                    <Picker.Item key={e.value} label={e.label} value={e.value} />
                ): <Picker.item label='No data' value='no'/>}
            </Picker>
        </View>
        <Ionicon name='filter' style={tw`  my-auto`} />

    </View>
  )
}