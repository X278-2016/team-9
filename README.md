# team-9
Legal Aid

Model for user:
lgnName: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	userName: String,
	race: String,
	income: Number,
	age: Date,
	email: String,
	phone: Number,
	county: String,
	hhNum: Number,
	gender: String,
	isDisabled: Boolean,
	isVeteran: Boolean,
	isForeign: Boolean,
	createDate: Date
Model for question:
content: {
		type: String,
		required: true
	},
	yesPtr: Number,
	noPtr: Number,
	createDate: Date,
	creator: String
  
API for user:
1.create a new user
POST ip:3000/users   pass in parameters defined in model
2.update a user
PUT ip:3000/users/_id 
3.delete a user
DELETE ip:3000/users/_id
4.get all users
GET ip:3000/users
5.get a user
GET ip:3000/users/_id

API for question:
Almost the same as the above
