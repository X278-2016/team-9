# team-9
Legal Aid

Using expressjs and mongodb for backend.

MODEL:
	Question: heading, body(required), createDate, creator, lastModDate
	Button: content(required), parentPtr(required), childPtr, createDate, creator, lastModDate

API:
list all questions
GET	/questions
show one question
GET	/questions/id
new one question or update
POST or PUT	/questions
delete one question
DELETE	/questions/id

get all buttons
GET	/buttons
get one button
GET	/buttons/id
add or update a question
POST or PUT	/buttons
delete button
DELETE	/buttons/id

upload file
POST /upload	multipart form: "pdf": pdf file, "questionID": questionID

get file
GET	/file/questionID
