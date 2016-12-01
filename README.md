# Team-9 Legal Aid

## Using expressjs and mongodb for backend.

## MODEL:
### Question: heading, body(required), createDate, creator, lastModDate
### Button: content(required), parentPtr(required), childPtr, createDate, creator, lastModDate

## API:
### Question
|    **Method**    | **Route** | **Params** |
|----------------|------------|-----------|
| GET  | /questions | no params |
| GET      | /questions/id   | id(question id)|
| POST or PUT | /questions  | body required|
| DELETE | /questions/id  | id |

### Button
|    **Method**    | **Route** | **Params** |
|----------------|------------|-----------|
| GET  | /buttons | no params |
| GET      | /buttons/id  | id(button id) |
| POST or PUT | /buttons  | content, parentPtr required|
| DELETE | /buttons/id  | id |
### File
|    **Method**    | **Route** | **Params** |
|----------------|------------|-----------|
| POST  | /upload | multipart form: "questionID": questionID, pdf|
| GET      | /file/id  | id(questionID)|
