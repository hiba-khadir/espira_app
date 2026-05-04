import type { Request, Response } from "express";
import {
	loginModel,
	requestOtpModel,
	signUpModel,
	verifyOtpModel,
} from "../models/auth.model";
import { generateAccessToken } from "../utils/generateToken";

// ─────────────────────────────────────────────
// POST /api/auth/sign-up
// Body: { name, phoneNumber, email, password }
// ─────────────────────────────────────────────
export async function signUp(req: Request, res: Response): Promise<void> {
	const { name, phoneNumber, password, email } = req.body;

	if (!name || typeof name !== "string" || name.trim() === "") {
		res.status(400).json({ error: "name is required" });
		return;
	}
	if (!phoneNumber || typeof phoneNumber !== "string") {
		res.status(400).json({ error: "phoneNumber is required" });
		return;
	}
	// email is now required — OTP will be sent to it
	if (!email || typeof email !== "string" || !email.includes("@")) {
		res.status(400).json({ error: "a valid email is required" });
		return;
	}
	if (!password || typeof password !== "string" || password.length < 8) {
		res.status(400).json({ error: "password must be at least 8 characters" });
		return;
	}

	try {
		const user = await signUpModel({
			name: name.trim(),
			phoneNumber,
			email,
			password,
		});
		const token = generateAccessToken(user.id); // temporarely for test
		res.status(201).json({
			message: "User created. Please verify your account via email.",
			user,
			token,
		});
	} catch (err: unknown) {
		if (
			typeof err === "object" &&
			err !== null &&
			"code" in err &&
			(err as { code?: string }).code === "P2002"
		) {
			const field =
				typeof (err as { meta?: { target?: unknown[] } }).meta?.target?.[0] ===
				"string"
					? (err as { meta?: { target?: unknown[] } }).meta?.target?.[0]
					: "field";
			res.status(409).json({ error: `${field} already in use` });
			return;
		}
		res.status(500).json({ error: "Internal server error" });
	}
}

// ─────────────────────────────────────────────
// POST /api/auth/request-otp
// Body: { email }
// ─────────────────────────────────────────────
export async function requestOtp(req: Request, res: Response): Promise<void> {
	const { email } = req.body;

	if (!email || typeof email !== "string" || !email.includes("@")) {
		res.status(400).json({ error: "a valid email is required" });
		return;
	}

	try {
		await requestOtpModel(email);
		res.status(200).json({ message: "OTP sent to your email address" });
	} catch (err: unknown) {
		console.error("[request-otp error]", err);
		const msg = err instanceof Error ? err.message : undefined;
		if (msg === "USER_NOT_FOUND") {
			res.status(404).json({ error: "No account found with that email" });
		} else if (msg === "EMAIL_SEND_FAILED") {
			res.status(502).json({
				error: "Unable to send OTP email right now. Please try again.",
			});
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	}
}

// ─────────────────────────────────────────────
// POST /api/auth/verify-otp
// Body: { email, otpCode }
// ─────────────────────────────────────────────
export async function verifyOtp(req: Request, res: Response): Promise<void> {
	const { email, otpCode } = req.body;

	if (!email || typeof email !== "string" || !email.includes("@")) {
		res.status(400).json({ error: "valid email is required" });
		return;
	}
	if (!otpCode || typeof otpCode !== "string") {
		res.status(400).json({ error: "otpCode is required" });
		return;
	}

	try {
		const result = await verifyOtpModel(email, otpCode);
		res
			.status(200)
			.json({ message: "Account verified successfully", token: result.token });
	} catch (err: unknown) {
		const msg = err instanceof Error ? err.message : undefined;
		if (msg === "USER_NOT_FOUND") {
			res.status(404).json({ error: "No account found with that email" });
		} else if (msg === "OTP_NOT_REQUESTED") {
			res.status(400).json({ error: "No OTP was requested for this account" });
		} else if (msg === "INVALID_OTP") {
			res.status(400).json({ error: "Invalid OTP code" });
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	}
}

// ─────────────────────────────────────────────
// POST /api/auth/login
// Body: { email, password }
// ─────────────────────────────────────────────
export async function login(req: Request, res: Response): Promise<void> {
	const { email, password } = req.body;

	if (!email || typeof email !== "string" || !email.includes("@")) {
		res.status(400).json({ error: "a valid email is required" });
		return;
	}
	if (!password || typeof password !== "string") {
		res.status(400).json({ error: "password is required" });
		return;
	}

	try {
		const result = await loginModel(email, password);
		res.status(200).json({ message: "Login successful", token: result.token });
	} catch (err: unknown) {
		console.error("[login error]", err);
		const msg = err instanceof Error ? err.message : undefined;
		if (msg === "INVALID_CREDENTIALS") {
			res.status(401).json({ error: "Invalid email or password" });
		} else if (msg === "NOT_VERIFIED") {
			res.status(403).json({
				error: "Account not verified. Please check your email for the OTP.",
			});
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	}
}

// ─────────────────────────────────────────────
// POST /api/auth/logout  (protected)
// ─────────────────────────────────────────────
export async function logout(_req: Request, res: Response): Promise<void> {
	res.status(200).json({ message: "Logged out successfully" });
}
