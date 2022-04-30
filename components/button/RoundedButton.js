import { View, TouchableOpacity,Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'

const RoundedButton = (props) => {
  return (
    <TouchableOpacity style={tw`bg-blue-900 py-2.5 my-2 rounded-lg`} onPress={props.pressed}>
      <Text style={tw`text-white text-center`}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default RoundedButton