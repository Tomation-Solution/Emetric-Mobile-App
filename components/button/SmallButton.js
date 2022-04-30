import { View, TouchableOpacity,Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'

const SmallButton = (props) => {
  return (
    <TouchableOpacity style={tw`${props.color ? 'bg-blue-900':'bg-blue-100'} py-0.5 my-0.5 rounded-lg`} onPress={props.pressed}>
      <Text style={tw`${ props.color ? 'text-white':'text-blue-800'} text-xs`}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default SmallButton