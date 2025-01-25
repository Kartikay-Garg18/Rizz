import { z } from 'zod'

export const usernameValidation = z.string().min(2, "Username must be atleast 2 characters")
                                .max(20, "Username must be upto 20 characters")
                                .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters")

export const passwordValidation = z.string().min(8, {message : "Password must be of minimum length 8"})
.regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, "Password must contain atleast 1 uppercase, 1 lowercase, 1 number and 1 special character")

export const signUpSchema = z.object({
    username : usernameValidation,
    email : z.string().email({message: "Invalid email address"}),
    password : passwordValidation
})