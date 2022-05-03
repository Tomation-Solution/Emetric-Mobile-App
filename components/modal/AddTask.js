import React, {useState, useEffect} from 'react'
import {Text, View, ScrollView, Pressable,ActivityIndicator, SafeAreaView} from 'react-native'
import tw from 'tailwind-react-native-classnames';
import DateTimePicker from '@react-native-community/datetimepicker' 
import Ionicon from 'react-native-vector-icons/Ionicons'
import {Checkbox, List} from 'react-native-paper'

// import {} from 'react-native-paper'
import CustomPicker from '../helpers/Picker';
import Input from '../helpers/Input';
import RoundedButton from '../button/RoundedButton';
import PickDate from '../helpers/datePicker';
import { getTeamInitiatives, MemberTasks } from '../../actions/actionsTeam';
import { CreateTask } from '../../actions/actions';


export default function AddTask(props) {
  const [loading, setLoading] = useState(null)
  const [recurring, setRecurring] = useState(false)

    const cancel=()=>{
   
        props.setVisible(false)
    }
    
    
const [type, setType] =useState(null)
const [selectedInitiative, setSelectedInitiative] =useState(null)
const [expandedMember, setExpandedMember] = React.useState(false);
const [expandInitiative, setExpandInitiative] = React.useState(false);
const [expandTaskType, setExpandTaskType] = React.useState(false);
const handlePress = () => setExpanded(!expanded);
const handleChildPressMember = (member) => {
  setExpandedMember(!expandedMember);
setFilterMember(member)}

const handleSelectTaskType = (task) => {
  setExpandTaskType(!expandTaskType);
setType(task)}

const handleMemberPress = () => setExpandedMember(!expandedMember);
const handleTaskType = () => setExpandTaskType(!expandTaskType);
const handleSelectInitiative = (initiative) => 
{setExpandInitiative(!expandInitiative) 
  setSelectedInitiative(initiative)
  console.log(initiative)
};
const [filterMember, setFilterMember] = useState(null)
const [teamMembers, setTeamMembers] = useState(null)
const [initiatives, setInitiatives] = useState(null)

   const [formInfo, setFormInfo] = useState({
     owner:null, upline_initiative: null, task_name:null,
     task_type:null, tat: null, startDate:null,
     startTime:null, duration: null, routines:null,
     repeatType:null, endDate: null, afterOccurrencie:null,
     startTime:null, duration: null, routines:null,
   })

   useEffect(() => {
      MemberTasks(dashboardCallback)
      getTeamInitiatives(initiativeCallback)
   }, [])

   const dashboardCallback = (res)=>{
    //  console.log(res.data.data)
    // console.log(res.data.data.map(e=>e.user.first_name))
    setTeamMembers(res.data.data.map(e=>e.user))
}

const createTaskCallback=(res)=>{
  console.log(res)
}

const initiativeCallback=(res)=>{
  console.log(res)
  setInitiatives(res)
}

const typeList=[
  {name:'Qualitative', value:'qlt'},
  {name:'Quantitative', value:'qty'},
  {name:'Quantitative & Quantitative', value:'both'},
]

// console

   const data ={
    "name": "task for business headegs assistant",
    "upline_initiative": {
        "initiative_id": selectedInitiative?.initiative_id
    },
    "task_type": "quantitative",
    "target_brief": "target brief",
    "routine_option": "monthly",
    "start_date": "2022-01-03",
    "start_time": "13:00",
    "duration": "00:58:00",
    "repeat_every": "1",
    "occurs_month_day_number": "4",
    "after_occurrence": "3",
    "rework_limit": "0",
    "turn_around_time_target_point": 42,
    "quantity_target_unit": 300,
    "quantity_target_point": 0,
    "quality_target_point": 100
}

// console.log(selectedInitiative?.initiative_id)

let formData = new FormData();

// const submitForm=()=>{
  formData.append("name","youhl")
  formData.append("upline_initiative[initiative_id]",selectedInitiative?.initiative_id)
  formData.append("task_type","qualitative")
  formData.append("start_date","2022-05-03")
  formData.append("start_time", "13:00")
  formData.append("duration", "00:58:00")
  formData.append("after_occurrence", "3")
  formData.append("routine_option", "daily")
  formData.append("end_date","2022-07-03")
  formData.append("rework_limit", "1")
  formData.append("repeat_every", "1")

  // CreateTask(formData,createTaskCallback)
// }
console.log(data)
  return (
    <SafeAreaView style={tw`bg-white w-11/12 m-auto rounded-lg py-3 h-full px-6`}>
        
        <Text style={tw`text-center font-bold text-base my-2`}  >Set up Task</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <CustomPicker label='Choose Owner'/> */}
          <View style={tw`w-full pt-3`}>
            <Text>Choose Owner</Text>
            <List.Accordion style={tw`w-full text-xs`} expanded={expandedMember}
            onPress={handleMemberPress} titleStyle={tw`text-blue-800`} titleNumberOfLines={1}  title={!filterMember ?'Select Member':filterMember.first_name+' '+ filterMember.last_name}>
                {teamMembers? teamMembers?.map((e)=>
                <List.Item style={tw` text-xs`} key={e.id} title={e.first_name + ' '+ e.last_name} onPress={()=>handleChildPressMember(e)}/>):<></>}
                </List.Accordion>
          </View>
          {/* <View style={tw`pt-2 pb-1`}>
            <CustomPicker label='Upline Initiatives'/>
          </View> */}
          <View style={tw`w-full pt-3`}>
            <Text>Upline Initiative</Text>
            <List.Accordion style={tw`w-full text-xs`} expanded={expandInitiative}
            onPress={handleSelectInitiative} titleStyle={tw`text-blue-800`} titleNumberOfLines={1}  title={!selectedInitiative ?'Select Initiative':selectedInitiative.name}>
                {initiatives? initiatives?.map((e)=>
                <List.Item style={tw` text-xs`} key={e.initiative_id} title={e.name} onPress={()=>handleSelectInitiative(e)}/>):''}
                </List.Accordion>
          </View>
          <Input label='Task Name'/>

          <View style={tw`w-full pt-3`}>
            <Text>Upline Initiative</Text>
            <List.Accordion style={tw`w-full text-xs`} expanded={expandTaskType}
            onPress={handleTaskType} titleStyle={tw`text-blue-800`} titleNumberOfLines={1}  title={!type ?'Select Task Type':type.name}>
                {typeList? typeList?.map((e)=>
                <List.Item style={tw` text-xs`} key={e.initiative_id} title={e.name} onPress={()=>handleSelectTaskType(e)}/>):''}
                </List.Accordion>
          </View>
          {/* <View style={tw`pt-2 pb-1`}>
            <CustomPicker label='Task Type' options={[
                  {id:1, label:'Qualitative', value:'qly'},
                  {id:2, label:'Quantitative', value:'qty'},
                  {id:3, label:'Qualitative & Quantitative', value:'both'},
                  ]} setValue={setType}
            />
          </View> */}
          {type?.value =='both' ?  
          <Text>Yoh</Text>:<></>}
          <Input label='Turn Around Target Point'/>
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
          <PickDate />

          
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
             <View style={tw` w-5/12 py-2.5 my-1.5  `}>
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
          
        </ScrollView>
        <View style={tw`flex-row`}>
            <Pressable  onPress={cancel}style={tw`w-3/12 my-auto`}>
              <Text style={tw`my-auto`}>Cancel</Text>
            </Pressable>
            <View style={tw`w-9/12`}>
              <RoundedButton text='Submit' pressed={()=>CreateTask(formData, createTaskCallback)}/>
            </View>
          </View>
  </SafeAreaView>
// </ScrollView>
    // </View>
  )
}
