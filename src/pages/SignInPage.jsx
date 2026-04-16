import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';

const SignInPage = () => {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // Navigation handled by onAuthStateChanged listener in App.jsx
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="text-center p-10 bg-white rounded-2xl shadow-lg border border-green-300 max-w-md w-full">
        <img
          src="public/km logo.jpg"
          alt="Kishan Mitra Logo"
          className="h-24 w-24 mx-auto mb-6 rounded-full border-4 border-yellow-400 shadow-sm"
        />
        <h1 className="text-4xl font-extrabold text-green-800 mb-3 tracking-wide select-none">
          Welcome to Krishi Mitras
        </h1>
        <p className="text-green-700 mb-8 text-lg font-medium">
          Your trusted partner in modern farming.
        </p>
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full px-5 py-3 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold rounded-full shadow-md transition-colors duration-300 select-none"
          aria-label="Sign in with Google"
        >
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 01-5.279-5.28 5.27 5.27 0 015.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 00-8.934 8.934 8.908 8.908 0 008.934 8.934c4.955 0 8.642-3.533 8.642-8.934 0-.538-.048-1.074-.137-1.604z"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
