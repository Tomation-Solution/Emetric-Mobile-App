import { View, TouchableOpacity,Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'

const TabbedButton = (props) => {
  return (
    <TouchableOpacity 
        style={props.index==props.selected ? tw`bg-blue-900 py-1 my-2 px-2 rounded-lg` : tw` bg-blue-50 py-1.5 my-2 rounded-lg`} 
        onPress={props.pressed}
    >
      <Text style={props.index==props.selected ? tw`text-white text-center` : tw`text-blue-900 font-bold text-center`}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default TabbedButton