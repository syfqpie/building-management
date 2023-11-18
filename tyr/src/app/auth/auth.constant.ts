import { FormMessage } from "../shared/models/base.model"

interface AuthFormType {
	email: FormMessage[],
	password: FormMessage[],
	confirmPassword: FormMessage[],
	uid: FormMessage[],
	token: FormMessage[],
}

export const AuthFormMessage: AuthFormType = {
	'email': [
		{ type: 'required', message: 'Email address is required' },
		{ type: 'email', message: 'Enter a valid email address' }
	],
	'password': [
		{ type: 'required', message: 'Password is required' },
		{ type: 'minlength', message: 'Password must contain at least 8 character' }
	],
	'confirmPassword': [
		{ type: 'required', message: 'Confirm password is required' },
		{ type: 'minlength', message: 'Password must contain at least 8 character' },
		{ type: 'matching', message: 'Passwords must match' }
	],
	'uid': [
		{ type: 'required', message: 'This field is required' }
	],
	'token': [
		{ type: 'required', message: 'This field is required' }
	]
}