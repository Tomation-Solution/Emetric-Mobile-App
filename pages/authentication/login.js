import { View, SafeAreaView,Text, Image, TextInput,TouchableOpacity } from 'react-native'
import {useState} from 'react'
import tw from 'tailwind-react-native-classnames'
import RoundedButton from '../../components/button/RoundedButton'
import ModalTemplate from '../../components/button/RoundedButton'
import { LoginUser } from '../../actions/actions'
import Ionicon from 'react-native-vector-icons/Ionicons'


const OwingWidget=()=>{
  const [checked, setChecked] = useState(false)


  return(
    <View style={tw`bg-white mx-10 px-5 py-5 my-auto rounded-2xl`}>
      <Text style={tw`text-center mb-1`}> ACCOUNT LOCKED</Text>
      <Text style={tw`text-xs my-2`}>Pay outstanding fee to gain access to account</Text>
      <View style={tw`flex-row justify-between my-2`}>
        <Text>TOTAL OUTSTANDING: </Text>
        <Text>N 120,000 </Text>
      </View>

      <View style={tw`flex-row justify-between my-4`}>
        <Text style={tw`text-xs `}>Pay partial amount of Total outstanding</Text>
        {checked ? 
        <Ionicon name='checkbox' size={20} onPress={()=>setChecked(!checked)}/> : 
        <Ionicon name='ios-square-outline' size={20} onPress={()=>setChecked(!checked)}/>
      }
      
      </View>
      { checked ?
        <View style={tw`border-b  mb-2`  }> 
        <TextInput 
          placeholder='Enter Amount you want to pay'
        />
      </View>:<></>}
      <View style={tw`w-5/12 mx-auto`}>
        
        <RoundedButton text='Pay'/>
      </View>
      
    </View>
  )
}

export default function Login ({navigation}) {

  const [showPassword, setShowPassword] = useState(false)

  const handleLogin =()=>{
    LoginUser('emmaldini12+janedoe@gmail.com','password')
  }


  return (
    <SafeAreaView style={tw`h-full `}>
      <View style={tw`my-auto`}>
      {/* <ModalTemplate body={<OwingWidget/>} /> */}
      <Image style={tw`mx-auto my-8`} source={require('../../images/Logo/logo.png')}/>
      <View style={tw`mx-10`}>
         <Text style={tw`text-base text-blue-900 font-bold pb-3`}>Login to Your Organization</Text>
          <Text>Input details to get started as admin</Text>
      </View>
       
        <View style={tw`mt-3 mx-5 py-6 bg-white  shadow-sm rounded-3xl px-5`}>
          
          <View>
              <View style={tw`my-3`}>
                <Text >Organization Name</Text>
                <TextInput
                placeholder='Organization Name'
                style={tw`py-2 px-2 bg-gray-200 rounded-lg mt-1.5`}
                />
              </View>

              <View style={tw`my-2`}>
                <Text>Username</Text>
                <TextInput
                placeholder='Username'
                style={tw`py-2 px-2 bg-gray-200 rounded-lg mt-1.5`}
                />
              </View>

              <View style={tw`my-2 `}>
                <Text>Password</Text>
                <View style={tw`flex-row px-1 bg-gray-200 my-2 py-0.5 rounded-lg`}>
                  <TextInput
                  placeholder='Password'
                  style={tw`py-1 w-11/12 px-2 bg-gray-200 rounded-lg mt-1.5`}
                  secureTextEntry={showPassword ? true: false}
                  
                  />
                  <Ionicon onPress={()=>setShowPassword(!showPassword)} name={showPassword ?'eye-off':'eye'} style={tw`my-auto `} size={20}/>
                </View>
              </View>
          </View>
         
              <TouchableOpacity onPress={()=>handleLogin()}>
                <Text style={tw`text-blue-700 font-bold text-right`}> Forgot Password?</Text>
              </TouchableOpacity>
         
          <View style={tw`my-2`}>
            <RoundedButton 
              text='Login'
              pressed={()=>handleLogin()}
            />
          </View>
          {/* <TouchableOpacity onPress={()=>navigation.navigate('forgotPassword')}> 
            <Text style={tw`text-xs`}>Forgot Password?</Text>
          </TouchableOpacity> */}
          
      </View>
      </View>
    </SafeAreaView>
  )
}

// export default Login

