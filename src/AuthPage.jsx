import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function AuthPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('login'); // or 'signup'
  const [error, setError] = useState(null);

  const handleEmailAuth = async () => {
    setLoading(true);
    setError(null);
    const authFn = mode === 'signup' ? supabase.auth.signUp : supabase.auth.signInWithPassword;
    const { data, error } = await authFn({ email, password });
    if (error) setError(error.message);
    else onLogin(data.session);
    setLoading(false);
  };

const handleGoogle = async () => {
  const redirectUrl =
    import.meta.env.MODE === 'development'
      ? 'http://localhost:3000'
      : 'https://saveplus-frontend.vercel.app'; // Replace with your real Vercel URL

 await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'https://saveplus-frontend.vercel.app', // ✅ your Vercel URL
  },
});

};


  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow space-y-4">
      <h1 className="text-xl font-bold">{mode === 'signup' ? 'Sign Up' : 'Log In'}</h1>
      <input
        className="w-full p-2 border rounded"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        className="w-full bg-blue-600 text-white p-2 rounded"
        onClick={handleEmailAuth}
        disabled={loading}
      >
        {loading ? 'Loading...' : mode === 'signup' ? 'Sign Up' : 'Log In'}
      </button>
      <button
        className="w-full bg-gray-100 border border-gray-300 text-sm p-2 rounded"
        onClick={handleGoogle}
      >
        Continue with Google
      </button>
      <p className="text-sm text-center">
        {mode === 'signup' ? 'Already have an account?' : 'New user?'}{' '}
        <button className="text-blue-600 underline" onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}>
          {mode === 'signup' ? 'Log In' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
}
