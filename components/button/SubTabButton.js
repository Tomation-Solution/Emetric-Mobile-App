import { View, TouchableOpacity,Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'

const SubTabButton = (props) => {
  return (
    <TouchableOpacity 
        style={props.index==props.selected ? tw`bg-blue-900 py-1 my-2 px-2 rounded-lg mx-1` : tw` bg-blue-100 py-1.5 mx-1 my-2 px-2 rounded-lg`} 
        onPress={props.pressed}
    >
      <Text style={props.index==props.selected ? tw`text-white text-xs text-center` : tw`text-blue-900  text-xs text-center`}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default SubTabButton