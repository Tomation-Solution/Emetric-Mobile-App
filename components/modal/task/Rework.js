import React,  {useState} from 'react';
import { View, Text, Pressable,Platform, ScrollView,TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import Ionicon from 'react-native-vector-icons/Ionicons'
// import DatePicker from 'react-native-date-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'

import RoundedButton from '../../button/RoundedButton';
import Input from '../../helpers/Input';
import { Checkbox, List, TextInput } from 'react-native-paper';
import CustomPicker from '../../helpers/Picker';
import { ReworkTask } from '../../../actions/actions';


export default function Rework(props) {
const [visible, setVisible] = useState(true)
const [action, setAction] = useState(0)
const navigation = useNavigation()
const [document, setDocument] =useState(null)
const [adopt, setAdopt] = useState(false)
// const [date, setDate] = useState(new Date())
const [open, setOpen] = useState(false)
const [date, setDate] = useState(new Date());
const [mode, setMode] = useState('date');
const [show, setShow] = useState(false);
const [expandedMember, setExpandedMember] = React.useState(false);
const [filterMember, setFilterMember] = useState(null)
const [remark, setRemark] = useState(null);
const handleChildPressMember = (member) => {
    setExpandedMember(!expandedMember);
  setFilterMember(member)}

const handleMemberPress = () => setExpandedMember(!expandedMember);


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

const cancel=()=>{
    // navigation.goBack()
    // navigation.navigate('login')
    props.setVisible(false)
}

const timeData = [
    {label:'00:00', value:'00:00'},  {label:'00:30', value:'00:30' }, {label:'01:00', value:'01:00'},
    {label:'01:30', value:'01:30'}, {label:'02:00', value:'02:00'}, {label:'02:30', value:'02:00'},
    {label:'03:00',value:'03:00'}, {label:'03:30', value:'03:30'}, {label:'04:30', value:'04:30'},
    {label:'05:00', value:'05:00'}, {label:'05:30', value:'05:30'}, {label:'06:00', value:'06:00'},
    {label:'06:30', value:'06:30'}, {label:'07:00', value:'07:00'}, {label:'07:30', value:'07:30'},
    {label:'08:00',value:'08:00' },  {label:'08:30', value:'08:30'}, {label:'09:00', value:'09:00'},
    {label:'09:30', value:'09:30'}, {label:'10:00', value:'10:00'}, {label:'10:30', value:'10:30'},
    {label:'11:00', value:'11:00'}, {label:'11:30', value:'11:30'}, {label:'12:00', value:'12:00'},
    {label:'12:30', value:'12:30'}, {label:'13:00', value:'13:00'}, {label:'13:30', value:'13:30'},
    {label:'14:00', value:'14:00'}, {label:'14:30', value:'14:30'}, {label:'15:00', value:'15:00'},
    {label:'15:30', value:'15:30'}, {label:'16:00', value:'16:00'}, {label:'16:30', value:'16:30'}, 
    {label:'17:00', value:'17:00'}, {label:'17:30', value:'17:30'}, {label:'18:00', value:'18:00'}, 
    {label:'18:30', value:'18:30'}, {label:'19:00', value:'19:00'}, {label:'19:30', value:'19:30'}, 
    {label:'20:00', value:'20:00'}, {label:'20:30', value:'20:30'}, {label:'21:00', value:'21:00'},
    {label:'21:30', value:'21:30'}, {label:'22:00', value:'22:00'}, {label:'22:30', value:'22:30'}, 
    {label:'23:00', value:'23:00'}, {label:'23:30', value:'23:30'},
]
// const handleChange=(text)=>{
//     alert(text)
//     console.log(text)
// }
console.log(props.id)

const handleRework=()=>{
    ReworkTask(props.id,callback,{"rework_remark": remark,
    "rework_end_date":moment(date).format('YYYY-MM-DD'),"rework_end_time":filterMember.label} )
}

const callback =(res)=>{
    console.log(res)

}

  return (
            <View style={tw`m-auto bg-white rounded-xl w-10/12 px-4`}>
            <View style={tw`border-b border-green-300 my-3 mx-5`}>
                <Text style={tw`font-bold text-base text-center py-3 text-blue-800`}>Rate Task</Text>
            </View>
            {/* <Button title="Open" onPress={() => setOpen(true)} /> */}
        
      {/* <Text>selected: {date.toLocaleString()}</Text> */}
      {show &&Platform.OS=='android' && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}


            <Input label='Remark' setValue={setRemark} multiline={true} />
            <View style={tw`py-3`}>
                <Text>Rework End Date</Text>
                {Platform.OS=='android' && (
                <Pressable onPress={showDatepicker} style={tw`py-3 bg-gray-100 rounded-lg px-2`}>
                    <Text>{moment(date).format('YYYY-MM-DD')}</Text>
                </Pressable>)}
                
                <View style={tw`w-full justify-between`}>
                {Platform.OS=='ios' && (
                    
                    <DateTimePicker
                    testID="dateTimePicker"
                    style={tw`bg-gray-100 w-1/2 mt-1`}
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                    />
                    

                    
                )}<View style={tw`w-2 h-2`}></View></View>
            </View>
            <Text>Rework End Time</Text>

                {/* <ScrollView></ScrollView> */}
            <List.Accordion style={tw`w-full text-xs`} expanded={expandedMember}
                onPress={handleMemberPress} titleStyle={tw`text-blue-800`} titleNumberOfLines={1}  title={!filterMember ?'Select Member':filterMember.label}>
                <ScrollView style={tw`${expandedMember? 'h-2/6':''} flex bg-white relative`}>
                
                {timeData? timeData?.map((e)=>
                
                    <List.Item style={tw` text-xs`} key={e.label} title={e.label} onPress={()=>handleChildPressMember(e)}/>):<></>}
                </ScrollView>
                
                </List.Accordion>
            {/* x */}
            <View style={tw`px-5 flex-row my-4 justify-around `}>
                <Pressable   style={tw`bg-blue-100 h-10 w-5/12 my-auto rounded-xl`} onPress={()=>cancel()}>
                    <Text style={tw`my-auto text-center`}>Close</Text>
                </Pressable>
                <View style={tw`w-5/12`}>
                    <RoundedButton text='Submit' pressed={handleRework}/>
                </View>
                
            </View>
        </View>
  );
}
