import React,{useState} from 'react';
import { View, Text, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import tw from 'tailwind-react-native-classnames'
import moment from 'moment'

export default function PickDate(props) {
    // const [date, setDate] = useState(new Date());
    const [show, setShow] =useState(false)
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        props.setDate(currentDate);
      };
    
    //   const showMode = (currentMode) => {
    //     setShow(true);
    //     setMode(currentMode);
    //   };
    const showDatepicker = () => {
        // showMode(props.mode);
        setShow(true)
      };
    
      const showTimepicker = () => {
        // showMode('time');
      };
  return (
    // <View style={tw`bg-red-300 h-10`}>
      <View style={tw`py-3`}>
          <Text style={tw`pb-1 text-xs`}>{props.title}</Text>
        {show &&Platform.OS=='android' && (
            <DateTimePicker
            testID="dateTimePicker"
            value={props.date}
            mode={props.mode}
            is24Hour={true}
            onChange={onChange}
            />
      )}
                {Platform.OS=='android' && (
                <Pressable onPress={showDatepicker} style={tw`py-3 bg-gray-100 rounded-lg px-2`}>
                    <Text>{ props.mode=='date' ? moment(props.date).format('YYYY-MM-DD') : moment(props.date).format('LT')}</Text>
                </Pressable>)}
                
                <View style={tw`w-full justify-between`}>
                {Platform.OS=='ios' && (
                    
                    <DateTimePicker
                    testID="dateTimePicker"
                    style={tw`bg-gray-100 w-1/2 mt-1`}
                    value={props.date}
                    mode={props.mode}
                    is24Hour={true}
                    onChange={onChange}
                    />
                    

                    
                )}<View style={tw`w-2 h-2`}></View></View>
            </View>
    //  </View>
  );
}
