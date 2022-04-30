import { View, Text, Picker } from 'react-native'
import React from 'react'
import SmartPicker from 'react-native-smart-picker'
import tw from 'tailwind-react-native-classnames'
export default function CustomPicker(props) {
  return (
    <View>
        <Text>{props.label}</Text>
        <View style={tw`border border-gray-300 my-1. rounded-lg  `}>
        <Picker style={tw`h-10`} itemStyle={{height:10}}>
                {props.options ?props.options.map(e=>
                    <Picker.Item key={e.value} label={e.label} value={e.value} />
                ): <Picker.item label='No data' value='no'/>}
            </Picker>
        </View>
    </View>
  )
}