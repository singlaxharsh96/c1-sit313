# C1 New Post — Quick guide

## How it works

1. `postType` is React state. It is either `question` or `article`.
2. The radio buttons update `postType`.
3. A conditional expression renders the matching form fields.
4. Each input has its own `useState` value, so React keeps track of what the user types.
5. When the form is submitted, `handleSubmit` checks the selected form's required fields.
6. If any field is invalid, `window.alert()` displays an error and the form is not treated as successful.
7. If everything is valid, a success popup appears. The page does not save or publish the post because the task brief says that feature is for a future task.

## Validation rules

### Question
- Title: 5–120 characters.
- Problem description: 10–5000 characters.
- Tags: optional, up to 3 tags, separated by commas; each tag can be at most 30 characters.

### Article
- Title: 5–120 characters.
- Abstract: 10–500 characters and one paragraph.
- Article text: 20–10000 characters.
- Tags: optional, up to 3 tags, separated by commas; each tag can be at most 30 characters.

## Example tests

1. Choose Question and press Post with all fields empty. An error popup should appear.
2. Enter a valid question title and description, then press Post. A confirmation popup should appear.
3. Choose Article. The abstract and article text fields should appear, while the question-description field should disappear.
4. Enter an abstract with two paragraphs. The form should show a validation error.
5. Enter four comma-separated tags. The form should show a validation error.
6. Enter valid article details and press Post. A confirmation popup should appear.

## Important

The current C1 page demonstrates React state, hooks, conditional rendering and validation. Posts are not saved to Firebase or another database in this task.
