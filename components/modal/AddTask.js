import React, {useState, useEffect} from 'react'
import {Text, View, ScrollView, Pressable, ActivityIndicator, SafeAreaView} from 'react-native'
import tw from 'tailwind-react-native-classnames';
import DateTimePicker from '@react-native-community/datetimepicker' 
import Ionicon from 'react-native-vector-icons/Ionicons'
import {Checkbox, List, RadioButton} from 'react-native-paper'
import {TimePicker, ValueMap} from 'react-native-simple-time-picker';

import moment from 'moment'
import Input from '../helpers/Input';
import RoundedButton from '../button/RoundedButton';
import PickDate from '../helpers/datePicker';
import { getTeamInitiatives, MemberTasks } from '../../actions/actionsTeam';
import { CreateTask, GetCurrentOrg } from '../../actions/actions';
import { or } from 'react-native-reanimated';
import ModalTemplate from '.';
import Success from './Success';


export default function AddTask(props) {
  const [loading, setLoading] = useState(null)
  const [taskName, setTaskName] = useState(null)
  const [recurring, setRecurring] = useState(false)

    const cancel=()=>{
   
        props.setVisible(false)
    }
    
    
const [type, setType] =useState(null)
const [selectedInitiative, setSelectedInitiative] =useState(null)
const [expandedMember, setExpandedMember] = React.useState(false);
const [expandInitiative, setExpandInitiative] = React.useState(false);
const [expandRoutine, setExpandRoutine] = React.useState(false);
const [expandDays, setExpandDays] = React.useState(false);
const [expandWeek, setExpandWeek] = React.useState(false);
const [expandprefix, setExpandprefix] = React.useState(false);
const [expandRepeatDays, setExpandRepeatDays] = React.useState(false);
const [expandOccurence, setExpandOccurrence] = React.useState(false);
const [expandTaskType, setExpandTaskType] = React.useState(false);
const [startDate, setStartDate] = useState(new Date())
const [endDate, setEndDate] = useState(new Date())
const [startTime, setStartTime] = useState(new Date())
const handleMemberPress = () => setExpandedMember(!expandedMember);
const handleTaskType = () => setExpandTaskType(!expandTaskType);
const [filterMember, setFilterMember] = useState(null)
const [filterDays, setFilterDays] = useState(null)
const [filterWeek, setFilterWeek] = useState(null)
const [filterPrefix, setFilterPrefix] = useState(null)
const [filterRoutineOptions, setFilterRoutineOptions] = useState(null)
const [filterRepeatDays, setFilterRepeatDays] = useState(null)
const [filterOccurrence, setFilterOccurrence] = useState(null)
const [teamMembers, setTeamMembers] = useState(null)
const [initiatives, setInitiatives] = useState(null)
const [org, setOrg] = useState(null)
const [qtp, setQtp] = useState(null)
const [qttp, setQttp] = useState(null)
const [reworkLimit, setReworkLimit] = useState(null)
const [tat, setTat] = useState(null)
const [qtu, setQtu] = useState(null)
// const [org, setOrg] = useState(null)
const [occurs, setOccurs] = useState(0)
const [endPeriod, setEndPeriod] = useState(0)
const [picked, setPicked] = useState([])
const [showSuccess,setShowSuccess] = useState(false)
const [value, setValue] = useState({
  hours: 1,
  minutes: 0,
  seconds: 0,
});
const handleChange = (newValue) => {
  setValue(newValue);
  console.log(newValue)
};

const handlePress = () => setExpanded(!expanded);
const handlePrefix = (pref) => {
  setExpandprefix(!expandprefix);
setFilterPrefix(pref)}

const handleDay = (day) => {
  setExpandDays(!expandDays);
setFilterDays(day)}

const handleWeek = (week) => {
  setExpandWeek(!expandWeek);
setFilterWeek(week)}

const handleChildPressMember = (member) => {
  setExpandedMember(!expandedMember);
setFilterMember(member)}

const handleRoutinePressMember = (routine) => {
  setExpandRoutine(!expandRoutine);
setFilterRoutineOptions(routine)}

const handleRepeatPress = (day) => {
  setExpandRepeatDays(!expandRepeatDays);
setFilterRepeatDays(day)}

const handleOccurence = (day) => {
  setExpandOccurrence(!expandOccurence);
setFilterOccurrence(day)}

const handleSelectTaskType = (task) => {
  setExpandTaskType(!expandTaskType);
setType(task)}


const handleSelectInitiative = (initiative) => 
{setExpandInitiative(!expandInitiative) 
  setSelectedInitiative(initiative)
};

const handlePickDays =(day)=>{
  if(picked?.includes(day)){
  setPicked(picked.filter(e=>e!==day))
}else{
  setPicked([...picked, day])

}
console.log(picked)
}


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
      GetCurrentOrg(orgCallback)
   }, [])

   const dashboardCallback = (res)=>{
      setTeamMembers(res.data.data.map(e=>e.user))
}

const createTaskCallback=(res)=>{
  // console.log(res)
  setShowSuccess(true)
  cancel()
  props.setVisible(false)

  // props.setIsAdded(true)
  
}

const orgCallback=(res)=>{
  // console.log(res)
  setOrg(res)
}

const initiativeCallback=(res)=>{
  setInitiatives(res)
}

const showDays=(num)=>{
  switch(num){
    case 0 : return 'Mon';
    case 1 : return 'Tue';
    case 2 : return 'Wed';
    case 3 : return 'Thu';
    case 4 : return 'Fri';
    case 5 : return 'Sat';
    case 6 : return 'Sun';
  }
}

const typeList=[
  {name:'Qualitative', nickName:'qualitative', value:'qlt'},
  {name:'Quantitative', nickName:'quantitative',value:'qty'},
  {name:'Quantitative & Quantitative', nickName:'quantitative_and_qualitative', value:'both'},
]

const routineOptions=[
  {name:'Daily', value:'day'},
  {name:'Weekly', value:'week'},
  {name:'Monthly', value:'month'},
]

const repeatList =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
const occurrenceList =[1,2,3,4,5,6,7]
const weekList =[{name:'Monday', value:'0'},
{name:'Tuesday', value:'1'},
{name:'Wednesday', value:'2'},
{name:'Thursday', value:'3'},
{name:'Friday', value:'4'},
{name:'Saturday', value:'5'},
{name:'Sunday', value:'6'},
]
const prefixList =[
  {name:'first', value:0},
  {name:'second', value:1},
  {name:'forth', value:2},
  {name:'last', value:3},
]
const daysList =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
// console.log(org.data.work_days)

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
const duration = `${'0'+value.hours+':'+'0'+value.minutes+':'+'0'+value.seconds}`

// console.log(selectedInitiative?.initiative_id)

let formData = new FormData();

// const submitForm=()=>{
  formData.append("name",taskName)
  formData.append("upline_initiative[initiative_id]",selectedInitiative?.initiative_id)
  formData.append("task_type",type?.nickName)
  formData.append("turn_around_time_target_point",tat)
  formData.append("start_date",startDate?moment(startDate).format("YYYY-MM-DD"):'')
  formData.append("start_time", startTime?moment(startTime).format('HH:mm'):'')
  formData.append("duration", value ?duration:'')

  if(type?.name == 'Qualitative' || type?.value == 'both' ){
  formData.append("rework_limit", reworkLimit?reworkLimit:'')
  formData.append("quality_target_point", qtp?qtp:'')
  // formData.append("rework_limit", reworkLimit)
  
  }
  formData.append('end_date',endDate?moment(endDate).format('YYYY-MM-DD'):'')
  if(type?.name == 'Quantitative' || type?.value == 'both' ){
    formData.append("quantity_target_point", qttp?qttp:'')
    formData.append("quantity_target_unit", qtu?qtu:'')
    // formData.append("rework_limit", reworkLimit)
    
    }

    if(recurring){
      formData.append('routine_option', filterRoutineOptions?.name.toLowerCase())
      if(filterRoutineOptions?.name=='Weekly'){
      formData.append('occurs_days', picked?picked:'')
      }

      if(filterRoutineOptions?.name=='Monthly'){
        if(occurs ==0){
          formData.append('occurs_month_day_number', filterDays?filterDays:'')
        }else if(occurs==1){
          formData.append('occurs_month_day_position',filterPrefix?.name)
          formData.append('occurs_month_day', filterWeek?filterWeek.value:'')
        }
        
        if(endPeriod==0){
        formData.append('end_date',endDate?moment(endDate).format('YYYY-MM-DD'):'')
        }else{
          formData.append('after_occurrence', filterOccurrence?filterOccurrence:'')
        }
        
        
        
      }

 formData.append('repeat_every', filterRepeatDays ?filterRepeatDays:'')

    }

  

  return (
    <SafeAreaView style={tw`bg-white w-11/12 m-auto h-full rounded-lg py-3 px-4`}>
      <ModalTemplate 
        setVisible={setShowSuccess}
        visible={showSuccess}
        body={
          <Success setVisible={setShowSuccess} title='Task Creation Successful'
          body='Congrats! You have successfully created a task.'
          bgColor='bg-blue-800'
          to='individual-task'
          />
        }
      />
        
        <Text style={tw`text-center font-bold text-base my-2`}  >Set up Task</Text>
        <ScrollView showsVerticalScrollIndicator={false} style={tw`px-3`}>
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
          <Input label='Task Name' setValue={setTaskName} />

          <View style={tw`w-full pt-3`}>
            <Text>Task Type</Text>
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
          
          <View>
            
            
              {
              type?.value=='qty' || type?.value == 'both'?
              <View>
               <Input setValue={setQttp} label='Quantity Target Point'/>
               <Input setValue={setQtu} label='Quantity Target Unit'/>
              </View>
               :<></>}
               {type?.value=='qlt' || type?.value == 'both'?
               <View>
                <Input setValue={setQtp} label='Quality Target Point'/>
                <Input setValue={setReworkLimit} label='Rework Limit'/>
               </View>:
               <></>}
          </View>

          <Input setValue={setTat} label='Turn Around Target Point'/>

          
          <View style={tw`flex-row justify-between `}>
            <View style={tw`w-5/12`}>
              <PickDate mode='date' title='Start Date' setDate={setStartDate} date={startDate}/>
            </View>

            <View style={tw`w-6/12`}>
              <PickDate mode='time' title='Start Time' setDate={setStartTime} date={startTime}/>
            </View>
          </View>
          
          <Text>Duration</Text>
          <View style={tw`w-11/12`}>
            <View style={tw`w-11/12 flex-row justify-around`}>
              <Text style={tw`text-xs`}>Hours</Text>
              <Text style={tw`text-xs`}>Minutes</Text>
              <Text style={tw`text-xs`}>Seconds</Text>
            </View>
          <TimePicker pickerShows={["hours", "minutes", "seconds"]} value={value} onChange={handleChange} />
          </View>
          <View style={tw`flex-row `}>
            <Text onPress={()=>setRecurring(!recurring)} style={tw`my-auto text-blue-900`}>Recurring Task ?</Text>
            <Checkbox onPress={()=>setRecurring(!recurring)} status={recurring ? 'checked' : 'unchecked'}/>
          </View>
          { recurring ?
          <View>

  
          <View style={tw`flex-row justify-between my-2`}>  
              <View style={tw`w-5/12 pt-3`}>
                <Text style={tw`text-xs`}>Routine Options</Text>
                <List.Accordion style={tw`w-full h-10 rounded-lg text-xs`} expanded={expandRoutine} 
                onPress={()=>setExpandRoutine(!expandRoutine)} titleStyle={tw`text-blue-800 mt-1  h-6 text-sm p-0`} titleNumberOfLines={1}  title={!filterRoutineOptions?'Select Routine':filterRoutineOptions.name}>
                    {routineOptions? routineOptions?.map((e)=>
                    <List.Item titleStyle={tw`text-sm -my-2`} style={tw` w-full`} key={e.id} title={e.name} onPress={()=>handleRoutinePressMember(e)}/>):<></>}
                    </List.Accordion>
              </View>
              <View style={tw`w-5/12 pt-3`}>
                <Text style={tw`text-xs`}>Repeat Every (Days)</Text>
                <List.Accordion style={tw`w-full h-10 rounded-lg text-xs`} expanded={expandRepeatDays} 
                onPress={()=>setExpandRepeatDays(!expandRepeatDays)} titleStyle={tw`text-blue-800 mt-1  h-6 text-sm p-0`} titleNumberOfLines={1}  title={!filterRepeatDays?'Pick Day':filterRepeatDays}>
                   <ScrollView style={tw`h-20`}>  
                     {repeatList? repeatList?.map((e)=>    
                      <List.Item titleStyle={tw`text-sm -my-2`} style={tw` w-full`} key={e} title={e} onPress={()=>handleRepeatPress(e)}/>):<></>}
                    </ScrollView>
                    </List.Accordion>
              </View>
                
          </View>
          <View style={tw`px-1 py-1.5`}>
            {filterRoutineOptions?.name == 'Weekly' ?
            <Text style={tw`text-xs`}>Work Days</Text>:<></>}
            <View style={tw`flex-row`}>
            {filterRoutineOptions?.name == 'Weekly'?
            org.data ? org.data.work_days.map(e=>
              <Pressable style={tw`flex-row`} onPress={()=>handlePickDays(e)}>
                <Ionicon style={tw`my-auto pl-2 pr-1 text-base text-blue-800`} name={picked.includes(e)?'ios-checkbox':'ios-square-outline'}/>
                <Text style={tw`my-auto`}>{showDays(e)}</Text>
              </Pressable>
            ):<></>:filterRoutineOptions?.name == 'Monthly' ?
            <View style={tw`w-full`}>
                <Text style={tw`w-2/12 my-auto`}>Occurs</Text>

              <View style={tw` flex-row ${occurs ==1 ? 'opacity-50':''}`}>
                {/* <RadioButton style={tw`bg-red-800`}/> */}
                <Ionicon onPress={()=>setOccurs(0)} name={!occurs==0?'radio-button-off-sharp':'radio-button-on'} style={tw`text-lg text-blue-800 my-2 mr-1`}/>
                {/* <Text style={tw`w-2/12 my-auto`}>Occurs</Text> */}
                <View style={tw`w-6/12 pr-2`}>
                <List.Accordion style={tw`h-10 rounded-lg text-xs`} expanded={occurs ==0 ? expandDays:''} 
                onPress={()=>setExpandDays(!expandDays)} titleStyle={tw`text-blue-800 mt-1  h-6 text-sm p-0`} titleNumberOfLines={1}  title={!filterDays?'Pick Day':filterDays}>
                   <ScrollView style={tw`h-20 w-full`}>  
                     {daysList? daysList?.map((e)=>    
                      <List.Item titleStyle={tw`text-sm -my-2 w-full`} style={tw` w-full`} key={e} title={e} onPress={()=>handleDay(e)}/>):<></>}
                    </ScrollView>
                    </List.Accordion>
                    </View>
                    <Text style={tw`my-2`}>of the Month</Text>
              </View>
              <View style={tw` flex-row mt-2 ${occurs ==0 ? 'opacity-50':''}`}>
              <Ionicon onPress={()=>setOccurs(1)} name={!occurs==1?'radio-button-off-sharp':'radio-button-on'} style={tw`text-lg text-blue-800 my-2 mr-1`}/>

                {/* <Text style={tw`w-2/12 my-auto`}>Occurs</Text> */}
                <View style={tw`w-4/12 mr-2`}>
                <List.Accordion  style={tw`h-10 rounded-lg text-xs`} expanded={occurs==1? expandprefix:false} 
                onPress={()=>setExpandprefix(!expandprefix)} titleStyle={tw`text-blue-800 mt-1  h-6 text-sm p-0`} titleNumberOfLines={1}  title={!filterPrefix?'Pick Day':filterPrefix.name}>
                   <ScrollView style={tw`h-20 w-full bg-gray-50`}>  
                     {prefixList? prefixList?.map((e)=>    
                      <List.Item titleStyle={tw`text-sm -my-2`} style={tw` w-full`} key={e.value} title={e.name} onPress={()=>handlePrefix(e)}/>):<></>}
                    </ScrollView>
                    </List.Accordion>
                    </View>

                    {/* <View style={tw` flex-row mt-2`}>
                <Text style={tw`w-2/12 my-auto`}>Occurs</Text> */}
                <View style={tw`w-4/12 mr-2`}>
                <List.Accordion style={tw`h-10 rounded-lg text-xs`} expanded={occurs==1 ? expandWeek :false} 
                onPress={()=>setExpandWeek(!expandWeek)} titleStyle={tw`text-blue-800 mt-1  h-6 text-sm p-0`} titleNumberOfLines={1}  title={!filterWeek?'Pick Day':filterWeek.name}>
                   <ScrollView style={tw`h-24 w-full bg-gray-50`}>  
                     {weekList.map(e=>
                      <List.Item titleStyle={tw`text-sm -my-2`} style={tw` w-full`} key={e.value} title={e.name} onPress={()=>handleWeek(e)}/>)}
                    </ScrollView>
                    </List.Accordion>
                    </View>
                    
                    <Text style={tw`my-auto`}>of the Month</Text>
              </View>
            </View>
            :<></>}</View>
            </View>
          <View style={tw`flex-row justify-between pl-1`}>
          <Ionicon onPress={()=>setEndPeriod(0)} name={!endPeriod==0?'radio-button-off-sharp':'radio-button-on'} style={tw`text-lg text-blue-800 my-8 mr-1`}/>

             <View style={tw` w-5/12 ${endPeriod==1 ? 'opacity-50':''}`}>
             {endPeriod==0 ? 
              <PickDate mode='date' title='End Date' setDate={setEndDate} date={endDate}/>:<View style={tw`bg-gray-300 w-10/12 px-2 py-2.5 rounded-md my-auto`}><Text>{moment(startTime).format('YYYY/MM/DD')}</Text></View>}
              </View>
              
              {/* <View style={tw` w-5/12 py-2.5 my-2  `}> */}
          <Ionicon onPress={()=>setEndPeriod(1)} name={!endPeriod==1?'radio-button-off-sharp':'radio-button-on'} style={tw`text-lg text-blue-800 my-8 mr-1`}/>
              
              <View style={tw`w-5/12 pt-3 ${endPeriod==0?'opacity-50':''}`}>
                <Text style={tw`text-xs`}>After Occurrencies</Text>
                <List.Accordion style={tw`w-full h-10 rounded-lg text-xs`} expanded={endPeriod==1 ?expandOccurence:''} 
                onPress={()=>setExpandOccurrence(!expandOccurence)} titleStyle={tw`text-blue-800 mt-1  h-6 text-sm p-0`} titleNumberOfLines={1}  title={!filterOccurrence?'Select Option':filterOccurrence}>
                   <ScrollView style={tw`h-20`}>  
                    {occurrenceList? occurrenceList?.map((e)=>
                    <List.Item titleStyle={tw`text-sm -my-2`} style={tw` w-full`} key={e} title={e} onPress={()=>handleOccurence(e)}/>):<></>}
                    </ScrollView>
                    </List.Accordion>
              </View>
              {/* </View> */}
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
              <RoundedButton text='Submit' pressed={()=> CreateTask(formData, createTaskCallback)
}/>
             {/* CreateTask(formData, createTaskCallback) */}
            </View>
          </View>
  </SafeAreaView>
// </ScrollView>
    // </View>
  )
}
