import * as z from "zod"

// Sign up form schema
export const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
})

export type SignUpFormData = z.infer<typeof signUpSchema>

// Sign in form schema
export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

export type SignInFormData = z.infer<typeof signInSchema>

export const DetailSignUpSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  ownerName: z.string().min(2, "Owner name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  serviceType: z.enum(["Venue", "Catering", "Decorations", "Photography"]),
  locationsServed: z.string().min(2, "Please enter at least one location"),
  experience: z.number().min(0, "Experience must be a positive number"),
  certifications: z.any().optional(),
  portfolio: z.any().optional(),
  packagesAndPricing: z.string().optional(),
  teamSize: z.number().optional(),
  registrationNumber: z.string().min(1, "Registration number is required"),
  taxInfo: z.string().optional(),
  paymentDetails: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms and conditions")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export type DetailSignUpFormData = z.infer<typeof DetailSignUpSchema>