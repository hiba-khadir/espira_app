import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { requestOtpAPI, verifyOtpAPI } from "@/api/auth";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setToken } from "@/stores/slices/authSlice";

const otpSlotIds = ["otp-1", "otp-2", "otp-3", "otp-4", "otp-5", "otp-6"];

const OTPScreen = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { email } = useLocalSearchParams<{ email: string }>();
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const inputRefs = useRef<(TextInput | null)[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [resendCooldown, setResendCooldown] = useState(0);

	// Countdown timer for resend cooldown
	useEffect(() => {
		if (resendCooldown <= 0) return;
		const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
		return () => clearTimeout(timer);
	}, [resendCooldown]);

	const handleOtpChange = (value: string, index: number) => {
		// Only accept numbers
		if (value && !/^\d+$/.test(value)) return;

		const newOtp = [...otp];
		// Take the last character in case of paste or fast typing
		newOtp[index] = value.slice(-1);
		setOtp(newOtp);

		// Auto-advance to next input
		if (value !== "" && index < 5) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleKeyPress = (
		e: { nativeEvent: { key: string } },
		index: number,
	) => {
		// Handle backspace to go to previous input
		if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	const handleContinue = async () => {
		const otpCode = otp.join("");
		if (otpCode.length !== 6) {
			Alert.alert("Invalid OTP", "Please enter the full 6-digit code.");
			return;
		}

		if (!email) {
			Alert.alert(
				"Error",
				"Email information is missing. Please go back and try again.",
			);
			return;
		}

		setIsLoading(true);
		try {
			const response = await verifyOtpAPI({ email, otpCode });
			dispatch(setToken(response.token));
			Alert.alert("Success", "Your account has been verified!", [
				{
					text: "Continue",
					onPress: () => router.replace("/(tabs)/statistics"),
				},
			]);
		} catch (error: unknown) {
			const axiosError = error as {
				response?: { status?: number; data?: { error?: string } };
			};
			const status = axiosError.response?.status;
			const serverMsg = axiosError.response?.data?.error;
			if (status === 400 && serverMsg?.includes("Invalid OTP")) {
				Alert.alert(
					"Invalid Code",
					"The OTP code you entered is incorrect. Please try again.",
				);
			} else if (status === 400 && serverMsg?.includes("No OTP")) {
				Alert.alert(
					"OTP Expired",
					"No OTP was found. Please request a new one.",
					[
						{
							text: "Resend OTP",
							onPress: handleResend,
						},
					],
				);
			} else if (status === 404) {
				Alert.alert("Error", "No account found with that email.");
			} else {
				Alert.alert(
					"Verification Failed",
					"An error occurred. Please try again.",
				);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleResend = async () => {
		if (!email) {
			Alert.alert("Error", "Email information is missing.");
			return;
		}
		if (resendCooldown > 0) return;

		try {
			await requestOtpAPI({ email });
			setResendCooldown(60); // 60-second cooldown
			// Clear the current OTP inputs
			setOtp(["", "", "", "", "", ""]);
			inputRefs.current[0]?.focus();
			Alert.alert(
				"OTP Sent",
				"A new verification code has been sent to your email.",
			);
		} catch (error: unknown) {
			const axiosError = error as {
				response?: { status?: number; data?: { error?: string } };
			};
			const serverMsg = axiosError.response?.data?.error;
			Alert.alert(
				"Failed to Resend",
				serverMsg || "Could not send OTP. Please try again.",
			);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" backgroundColor="#f2f8f4" />
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.keyboardView}
			>
				<ScrollView
					contentContainerStyle={styles.scrollContainer}
					showsVerticalScrollIndicator={false}
					bounces={false}
				>
					{/* Header Illustration */}
					<View style={styles.headerSection}>
						<Image
							source={require("../../assets/images/backround.png")}
							style={styles.illustration}
							contentFit="contain"
						/>
					</View>

					{/* Main Content Area */}
					<View style={styles.contentContainer}>
						<Text style={styles.title}>OTP Validation</Text>
						<Text style={styles.subtitle}>
							We have sent an OTP to{"\n"}
							<Text style={styles.emailHighlight}>{email || "your email"}</Text>
						</Text>

						{/* OTP Input Row */}
						<View style={styles.otpContainer}>
							{otp.map((digit, index) => (
								<TextInput
									key={otpSlotIds[index]}
									ref={(ref) => (inputRefs.current[index] = ref)}
									style={[
										styles.otpInput,
										digit ? styles.otpInputFilled : null,
									]}
									value={digit}
									onChangeText={(value) => handleOtpChange(value, index)}
									onKeyPress={(e) => handleKeyPress(e, index)}
									keyboardType="number-pad"
									maxLength={1}
									selectTextOnFocus
								/>
							))}
						</View>

						{/* Continue Button */}
						<TouchableOpacity
							style={[
								styles.continueButton,
								isLoading && styles.continueButtonDisabled,
							]}
							onPress={handleContinue}
							disabled={isLoading}
						>
							<Text style={styles.continueButtonText}>
								{isLoading ? "Verifying..." : "Continue"}
							</Text>
						</TouchableOpacity>

						{/* Resend Link */}
						<View style={styles.resendContainer}>
							<Text style={styles.resendText}>
								Didn&apos;t receive an OTP?{" "}
							</Text>
							<TouchableOpacity
								onPress={handleResend}
								disabled={isLoading || resendCooldown > 0}
							>
								<Text
									style={[
										styles.resendLink,
										resendCooldown > 0 && styles.resendLinkDisabled,
									]}
								>
									{resendCooldown > 0
										? `Resend in ${resendCooldown}s`
										: "Resend OTP"}
								</Text>
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
		backgroundColor: "#f2f8f4", // slight off-white green background matching the top portion of the image
	},
	keyboardView: {
		flex: 1,
	},
	scrollContainer: {
		flexGrow: 1,
	},
	headerSection: {
		alignItems: "center",
		justifyContent: "flex-start",
		paddingTop: 20,
		paddingBottom: 20,
		backgroundColor: "#f2f8f4",
	},
	illustration: {
		width: "100%",
		height: 220,
	},
	contentContainer: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingHorizontal: 24,
		paddingTop: 40,
		paddingBottom: 40,
	},
	title: {
		fontSize: 22,
		fontWeight: "700",
		color: "#2b3034",
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 15,
		color: "#70777e",
		marginBottom: 30,
		lineHeight: 22,
	},
	emailHighlight: {
		fontWeight: "600",
		color: "#2b3034",
	},
	otpContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 40,
	},
	otpInput: {
		width: 45,
		height: 50,
		borderWidth: 1,
		borderColor: "#e8ecef",
		borderRadius: 8,
		fontSize: 20,
		fontWeight: "600",
		color: "#000000",
		textAlign: "center",
		backgroundColor: "#ffffff",
	},
	otpInputFilled: {
		borderColor: "#4cae4f",
	},
	continueButton: {
		width: "80%",
		height: 55,
		backgroundColor: "#4ea53b",
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		marginBottom: 40,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	continueButtonDisabled: {
		opacity: 0.7,
	},
	continueButtonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600",
	},
	resendContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	resendText: {
		fontSize: 14,
		color: "#70777e",
	},
	resendLink: {
		fontSize: 14,
		color: "#424649",
		fontWeight: "700",
	},
	resendLinkDisabled: {
		color: "#aab0b5",
	},
});

export default OTPScreen;
