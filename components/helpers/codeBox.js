import { View, Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'

const CodeBox = (props) => {
  return (
    <View style={tw`border border-gray-500 p-3`}>
      <Text>{props.value}</Text>
    </View>
  )
}

export default CodeBox