import { View, Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'

const TobBar = (props) => {
  return (
    <View style={tw`py-2`}>
      {props.body}
    </View>
  )
}

export default TobBar