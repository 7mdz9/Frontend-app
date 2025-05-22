// ClientApp/auth/index.js
// This file re-exports all screens in the auth folder.
// So anywhere else, you can do "import { SignUp, Login } from 'auth';"

export { default as Login } from './Login.jsx';
export { default as SignUp } from './SignUp.jsx';
// If you add more auth screens, export them here too
