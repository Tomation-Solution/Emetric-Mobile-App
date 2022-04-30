import React, {useState} from 'react'
import {Text, View, ScrollView, Pressable,ActivityIndicator} from 'react-native'
import tw from 'tailwind-react-native-classnames';
import DateTimePicker from '@react-native-community/datetimepicker' 
import Ionicon from 'react-native-vector-icons/Ionicons'
import {Checkbox} from 'react-native-paper'

// import {} from 'react-native-paper'
import CustomPicker from '../helpers/Picker';
import Input from '../helpers/Input';
import RoundedButton from '../button/RoundedButton';


export default function AddTask(props) {
  const [loading, setLoading] = useState(null)
  const [recurring, setRecurring] = useState(false)

    const cancel=()=>{
   
        props.setVisible(false)
    }
    
    
const owner ={}
   
  return (
    <View style={tw`bg-white w-11/12 m-auto rounded-lg py-3 h-full px-6`}>
        
        <Text style={tw`text-center font-bold text-base my-2`}  >Set up Task</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CustomPicker label='Choose Owner'/>
          <View style={tw`pt-2 pb-1`}>
            <CustomPicker label='Upline Initiatives'/>
          </View>
          <Input label='Task Name'/>
          <View style={tw`pt-2 pb-1`}>
            <CustomPicker label='Task Type'/>
          </View>
          <Input label='Tur Around Target Point'/>
          <View style={tw`flex-row justify-between py-2`}>
            <View style={tw`w-5/12`}>
              <Text>Start Date</Text>
              <View style={tw`bg-gray-200 flex-row justify-between w-full py-2.5 my-2 px-2 `}>
                <Text style={tw`text-gray-600`}>Pick Date</Text>
                <Ionicon name='calendar-outline' color='grey' size={18}/>
              </View>
            </View>

            <View style={tw`w-5/12`}>
              <Text style={tw`text-gray-900`}>Start Time</Text>
              <View style={tw`bg-gray-200 flex-row w-full justify-between py-2.5 my-2 px-2 `}>
                <Text style={tw`text-gray-600`}>Pick Time</Text>
                <Ionicon name='time-outline' color='grey' size={18}/>
              </View>
            </View>
          </View>
          
          <Text>Duration</Text>
          <View style={tw`bg-gray-200 flex-row justify-between w-5/12 py-2.5 my-2 px-2 `}>
            <Text style={tw`text-gray-600`}>Duration</Text>
            <Ionicon name='time-outline' color='grey' size={18}/>
          </View>

          <View style={tw`flex-row `}>
            <Text onPress={()=>setRecurring(!recurring)} style={tw`my-auto text-blue-900`}>Recurring Task ?</Text>
            <Checkbox onPress={()=>setRecurring(!recurring)} status={recurring ? 'checked' : 'unchecked'}/>
          </View>
          { recurring ?
          <View>
          <View style={tw`flex-row justify-between my-2`}>  
              <View style={tw`w-5/12`}>   
                <CustomPicker label='Routine Times' options={[
                  {id:1, label:'Daily', value:'daily'},
                  {id:2, label:'Weekly', value:'weekly'},
                  {id:2, label:'monthly', value:'monthly'},
                  
                  ]}/>
                </View>    
                <View style={tw`w-5/12`}>
                  <CustomPicker label='Repeat Every (Days)' options={[
                    {id:1, label:'Daily', value:'daily'},
                    {id:2, label:'Weekly', value:'weekly'},
                    {id:2, label:'monthly', value:'monthly'},
                    
                  ]}/>
                </View>
          </View>
              
          <View style={tw`flex-row justify-between`}>
             <View style={tw` w-5/12 py-2.5 my-1  `}>
              <Text>End Date</Text>
              <View style={tw`bg-gray-200 flex-row justify-between w-full py-2.5 my-2 px-2 `}>
                <Text style={tw`text-gray-600`}>End Date</Text>
                <Ionicon name='time-outline' color='grey' size={18}/>
              </View>
              </View>
              
              <View style={tw` w-5/12 py-2.5 my-2  `}>
              <CustomPicker label='After Occurencies' options={[
                  
                  {id:1, label:'Daily', value:'daily'}                  
                  ]}/>
              </View>
          </View>
        </View>
          :<></>
 }

          {/* <DateTimePicker mode='date' value={new Date()} onChange={()=>setDate()} display='calendar'/> */}
          
        </ScrollView>
        <View style={tw`flex-row`}>
            <Pressable  onPress={cancel}style={tw`w-3/12 y-auto`}>
              <Text style={tw`my-auto`}>Cancel</Text>
            </Pressable>
            <View style={tw`w-9/12`}>
              <RoundedButton text='Submit'/>
            </View>
          </View>
  </View>
// </ScrollView>
    // </View>
  )
}
