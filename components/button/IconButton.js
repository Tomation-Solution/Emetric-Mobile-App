import { View, TouchableOpacity,Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'

const IconButton = (props) => {
  return (
    <TouchableOpacity style={tw`${props.bg} p-1.5 flex-row my-2 ${props.border} ${props.borderColor} rounded-lg`} onPress={props.pressed}>
      {props.icon}
      <Text style={tw`${props.textColor}`}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default IconButton