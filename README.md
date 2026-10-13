# DEV@Deakin — P4 + C1 Reference Project

A beginner-friendly React/Vite/Tailwind project continuing the DEV@Deakin home page and P4 Login/Sign-up pages, with the C1 New Post feature added.

## Run the project

1. Make sure Node.js is installed.
2. A local `.env` file is included for convenience using the Firebase web-app configuration you supplied. It is ignored by Git. Do not commit `.env`; for another Firebase project, copy `.env.example` to `.env` and use that project’s Web App settings.
3. Open a terminal in this folder.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open the localhost link shown by Vite.

## C1 New Post feature

- Open **Post** in the navbar to visit `/post`.
- Select Question or Article.
- The form changes based on the selected type using React state and conditional rendering.
- Question requires a title and problem description.
- Article requires a title, one-paragraph abstract and article text.
- Tags are optional and limited to three comma-separated items.
- Form values are checked before submission.
- Invalid input opens an error popup; valid input opens a success popup.
- As required for this task, the post is not written to a backend or database.

## Important files

- `src/pages/NewPost.jsx` — C1 form, state, conditional rendering and validation.
- `src/components/Navbar.jsx` — shared navbar; Post opens the New Post page.
- `src/components/Footer.jsx` — shared footer across routes.
- `src/App.jsx` — React routes.
- `src/firebase.js` — Firebase configuration from environment variables.
- `firestore.rules` — minimum rules for each user to access their own profile document.
- `C1_GUIDE.md` — summary of how the C1 code works.
- `C1_TASK_CHECKLIST.md` — task checklist.

## Firebase and Git notes

- Enable Email/Password in Firebase Authentication if you are testing P4 Login/Sign-up.
- To save P4 user profiles to Firestore, publish the rules from `firestore.rules` in your Firebase Console.
- Keep `.env` and `node_modules/` out of Git. Both are ignored by `.gitignore`.
- Never place Firebase Admin SDK keys or service-account credentials in a frontend project.

## What the C1 post button does

The brief asks for a popup and says actual post publishing will be implemented in a future task. Therefore, valid data is confirmed with a popup only; no post is saved.
