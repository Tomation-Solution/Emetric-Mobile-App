import React from 'react';
import { View, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import tw from 'tailwind-react-native-classnames'

export default function PickDate(props) {
  return (
    <View style={tw`bg-red-300 h-10`}>
      {/* <Text>{props.title}</Text> */}
      <DateTimePicker mode='date'  value={new Date()} onChange={()=>props.setDate()}   display='calendar'/>

     </View>
  );
}
