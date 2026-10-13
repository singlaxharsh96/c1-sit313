# Firebase setup (very simple)

This project uses Firebase Authentication for passwords and Firestore for user profile details.
It does not use React Context.

## 1. Enable email/password login

1. Open Firebase Console and choose project `task4-9be47`.
2. Open Authentication > Sign-in method.
3. Enable Email/Password and save.

## 2. Publish the required Firestore rule

Firestore web requests cannot save data when rules are absent or deny access. A browser app needs a rule that allows the signed-in user to write to their own profile document.

1. Open Firestore Database > Rules.
2. Copy the entire content of this folder's `firestore.rules` file into the rules editor.
3. Click Publish.

These rules let each authenticated user access their own `users/{uid}` document. They do not allow users to read or change another user's profile.

## 3. Run the website

The `.env` file in this local ZIP already contains the Firebase web configuration you supplied. Do not upload `.env` to GitLab/GitHub; it is excluded by `.gitignore`.

In the terminal, from this folder run:

```bash
npm install
npm run dev
```

Open the localhost URL printed by Vite.

## 4. Test

1. Open Sign up and provide first and last name, email, password, and confirmation.
2. A successful signup creates the user in Authentication, saves the profile in Firestore, signs out, and takes you to Login.
3. In Firebase Console, check Authentication > Users and Firestore Database > Data > users.
4. Log in with that email and password. A successful login redirects to Home.

Passwords are not stored in Firestore. Firebase Authentication manages them.
