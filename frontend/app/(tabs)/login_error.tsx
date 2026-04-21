import React, { useState } from 'react';
import {useFonts }from 'expo-font';


import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';

//  import LockIcon from '.../../assets/images/lock.svg';

// import { MdLockOutline } from "react-icons/md";

//wasnt able to change the font
// const [fontsLoaded] = useFonts({
//   'Poppins-SemiBold': require('../../assets/fonts/PoppinsSemibold-8l8n.otf'),
//   'Poppins-Bold': require('../../assets/fonts/PoppinsBold-GdJA.otf'),
// });

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login pressed', { phoneNumber, password });
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic
    console.log('Forgot password pressed');
  };

  const handleSignUp = () => {
    // Handle sign up navigation
    console.log('Sign up pressed');
  };

  return (
    
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Time Display - Top Left */}
          <Text style={styles.timeText}>9:41</Text>

          {/* App Logo/Title */}
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/images/logo.png')} // Your logo image
              style={styles.logo}
                     />
              <Text style={styles.appTitle}>Espira</Text>
          </View>
          {/* Picture - will be below because it's a separate View */}
            <View style={styles.pictureSection}>
            <Image 
               source={require('../../assets/images/backround.png')} // Your image path
                style={styles.picture1}
                resizeMode='contain'
               />
               </View>

            {/* Rest of your login form */}
        
        
          

          {/* Login Form */}
          <View style={styles.formContainer}>
            <Text style={styles.loginTitle}>Log In</Text>

            {/* Phone Number Input */}
            <View style={styles.inputContainer}>
             
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
              {/* Separator Line */}
            <View style={styles.separator} />
            <Text style={styles.error_message}>Phone number incorrect</Text>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>

              <View style={styles.passwordContainer}>
                 
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.eyeText}>
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
                {/* Separator Line */}
                <View style={styles.separator} />
                <Text style={styles.error_message}>Phone number and Password don’t match</Text>
              </View>
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginTop: 8,
    marginBottom: 20,
  },
  // logoContainer: {
  //   alignItems: 'center',
  //   marginBottom: 48,
  //   marginTop: 20,
  // },
   logoContainer: {
    flexDirection: 'row', // Places items horizontally
    alignItems: 'center', // Vertically centers the logo with text
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: 0,
  },
  logo: {
    width: 68.12,
    height: 81,
    marginRight: 12, // Space between logo and text
    resizeMode: 'contain',
  },
  appTitle: {
    fontSize: 42,
    fontWeight: '700',
    color: '#1F4E20',
    letterSpacing: 1,
    // fontFamily:'Poppins-SemiBold',
  },
   pictureSection: {
    alignItems: 'center',     // Centers the picture
    justifyContent: 'center',   
    marginBottom: 5,
  },
  picture1: {
    width: '100%',
    height: 200,
    resizeMode: 'contain', // or 'contain', 'stretch'
  },
  formContainer: {
    flex: 1,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 0,
   // fontFamily:'Poppins-Bold',
  },
  inputContainer: {
    marginBottom: 0,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1a1a1a',
    backgroundColor: '#ffffff',
  },

  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  eyeText: {
    fontSize: 20,
  },

    separator: {
    height: 1,
    backgroundColor: '#E7E3E0',
    marginVertical: 20, // Space above and below the line
  },

    error_message: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF383C',
    letterSpacing: 1,
    // fontFamily:'Poppins-SemiBold',
  },

  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 32,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#4C5F66',
    fontWeight: '500',
    alignSelf: 'center', 

  },
  loginButton: {
    width:255,
    height:65,
    backgroundColor: '#1F4E20',
    borderRadius: 40,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 5,
    elevation: 4, 
    alignSelf: 'center', 
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  signUpText: {
    fontSize: 14,
    color: '#666',
  },
  signUpLink: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
  },
});

export default LoginScreen;
