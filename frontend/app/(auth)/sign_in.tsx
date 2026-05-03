import React, { useState } from "react";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckBox } from "react-native-elements";
import { AddDevices } from "@/api/device";
import { Predevices } from "@/utils/devices";
import { Feather } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { setLoading, setError } from "@/stores/slices/authSlice";
import { registerAPI, requestOtpAPI } from "@/api/auth";
import { passwordValidator } from "../../helpers/passwordValidator";
import { emailValidator } from "../../helpers/emailValidator";
import { fullnameValidator } from "../../helpers/fullnameValidator";

const SignUpScreen = () => {
  const router = useRouter();
  // State variables
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.auth.user);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // Error states
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Validate full name
  const validateFullName = (text: string) => {
    setFullName(text);
    const error = fullnameValidator(text);
    setFullNameError(error);
    return !error;
  };

  // Validate email
  const validateEmail = (text: string) => {
    setEmail(text);
    const error = emailValidator(text);
    setEmailError(error);
    return !error;
  };

  // Validate password
  const validatePassword = (text: string) => {
    setPassword(text);
    const error = passwordValidator(text);
    setPasswordError(error);

    // Re-validate confirm password if it exists
    if (confirmPassword) {
      validateConfirmPassword(confirmPassword);
    }
    return !error;
  };

  // Validate confirm password
  const validateConfirmPassword = (text: string) => {
    setConfirmPassword(text);
    if (!text) {
      setConfirmPasswordError("Please confirm your password");
      return false;
    } else if (text !== password) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  // Validate terms acceptance
  const validateTerms = () => {
    if (!isChecked) {
      Alert.alert(
        "Terms Required",
        "Please accept the Terms and Conditions to continue",
      );
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    // Validate all fields
    const isFullNameValid = validateFullName(fullName);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    const isTermsAccepted = validateTerms();

    if (
      !isFullNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid
    ) {
      Alert.alert(
        "Validation Error",
        "Please fix all errors before continuing",
      );
      return;
    }

    if (!isTermsAccepted) {
      Alert.alert(
        "Terms Required",
        "Please accept the Terms and Conditions to continue",
      );
      return;
    }
    dispatch(setLoading(true));

    try {
      const name = fullName;
      await registerAPI({
        name,
        email,
        password,
        phoneNumber: "0594617233", // need to be removed from backend
      });
      // Request OTP to be sent to the user's email
      await requestOtpAPI({ email });
      // Navigate to OTP verification screen
      router.push({ pathname: "/(auth)/otp", params: { email } });
    } catch (error: any) {
      const status = error?.response?.status;
      const serverMsg = error?.response?.data?.error;
      if (status === 409) {
        Alert.alert("Sign Up Failed", serverMsg || "Email or phone already in use.");
      } else {
        console.log(error);
        Alert.alert("Sign Up Failed", "An error occurred. Please try again.");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogin = () => {
    router.push("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* App Logo/Title */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.appTitle}>Espira</Text>
          </View>

          {/* Picture Section */}
          <View style={styles.pictureSection}>
            <Image
              source={require("../../assets/images/backround.png")}
              style={styles.picture1}
              contentFit="contain"
            />
          </View>

          {/* Sign Up Form */}
          <View style={styles.formContainer}>
            <Text style={styles.signUpTitle}>Sign Up</Text>

            {/* Full Name Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Feather
                  name="user"
                  size={20}
                  color="#999"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[
                    styles.input,
                    fullNameError ? styles.inputError : null,
                  ]}
                  placeholder="Full Name"
                  placeholderTextColor="#999"
                  value={fullName}
                  onChangeText={validateFullName}
                  editable={!isLoading}
                />
              </View>
              {fullNameError ? (
                <Text style={styles.errorText}>{fullNameError}</Text>
              ) : null}
              <View style={styles.separator} />
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Feather
                  name="mail"
                  size={20}
                  color="#999"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, emailError ? styles.inputError : null]}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={validateEmail}
                  editable={!isLoading}
                />
              </View>
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
              <View style={styles.separator} />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <View style={styles.passwordContainer}>
                <Feather
                  name="lock"
                  size={20}
                  color="#999"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[
                    styles.input,
                    styles.passwordInput,
                    passwordError ? styles.inputError : null,
                  ]}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={validatePassword}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  <Text style={styles.eyeText}>
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </Text>
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
              <View style={styles.separator} />
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <View style={styles.passwordContainer}>
                <Feather
                  name="lock"
                  size={20}
                  color="#999"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[
                    styles.input,
                    styles.passwordInput,
                    confirmPasswordError ? styles.inputError : null,
                  ]}
                  placeholder="Confirm Password"
                  placeholderTextColor="#999"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={validateConfirmPassword}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  <Text style={styles.eyeText}>
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </Text>
                </TouchableOpacity>
              </View>
              {confirmPasswordError ? (
                <Text style={styles.errorText}>{confirmPasswordError}</Text>
              ) : null}
              <View style={styles.separator} />
            </View>

            {/* Terms and Conditions Checkbox */}
            <View style={styles.checkboxContainer}>
              <CheckBox
                checked={isChecked}
                onPress={() => setIsChecked(!isChecked)}
                containerStyle={styles.checkbox}
                textStyle={styles.ContractText}
                title="I accept Terms & conditions and Privacy policy."
                checkedColor="#1F4E20"
                disabled={isLoading}
              />
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[
                styles.signUpButton,
                isLoading && styles.signUpButtonDisabled,
              ]}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              <Text style={styles.signUpButtonText}>
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Text>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={handleLogin} disabled={isLoading}>
                <Text style={styles.loginLink}>Log In</Text>
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
    backgroundColor: "#FFFFFF",
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
    fontWeight: "500",
    color: "#000000",
    marginTop: 8,
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -30,
    marginTop: 50,
  },
  logo: {
    width: 68.12,
    height: 81,
    marginRight: 12,
  },
  appTitle: {
    fontSize: 42,
    fontWeight: "700",
    color: "#1F4E20",
    letterSpacing: 1,
  },
  pictureSection: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    marginLeft: 12,
  },
  picture1: {
    width: "100%",
    height: 200,
  },
  formContainer: {
    flex: 1,
  },
  signUpTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    marginTop: -10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1a1a1a",
    backgroundColor: "#ffffff",
  },
  inputError: {
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 16,
    position: "relative",
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: "absolute",
    right: 16,
    top: 14,
  },
  eyeText: {
    fontSize: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "#E7E3E0",
    marginVertical: 10,
  },
  signUpButton: {
    width: 255,
    height: 65,
    backgroundColor: "#1F4E20",
    borderRadius: 40,
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 5,
    elevation: 4,
    alignSelf: "center",
    marginTop: 10,
  },
  signUpButtonDisabled: {
    backgroundColor: "#95A5A6",
    opacity: 0.7,
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  loginText: {
    fontSize: 14,
    color: "#666",
  },
  loginLink: {
    fontSize: 14,
    color: "#1F4E20",
    fontWeight: "600",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 16,
  },
  checkboxContainer: {
    alignItems: "center",
    marginBottom: 30,
    marginLeft: 30,
  },
  ContractText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "200",
  },
  checkbox: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
  },
});

export default SignUpScreen;
