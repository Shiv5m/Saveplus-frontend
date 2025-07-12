import { useState } from 'react';
import AdminPage from './AdminPage';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const user_id = 'demo-user-id-123';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('https://saveplus-production.up.railway.app/strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, merchant, amount: parseFloat(amount) }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Request failed' });
    }

    setLoading(false);
  };

  if (showAdmin) {
    return (
      <div className="p-4">
        <button
          onClick={() => setShowAdmin(false)}
          className="mb-4 bg-gray-200 px-4 py-2 rounded"
        >
          ← Back to Main
        </button>
        <AdminPage />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">SavePlus Strategy</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Merchant (e.g., Amazon)"
          value={merchant}
          onChange={(e) => setMerchant(e.target.value)}
          required
        />
        <input
          type="number"
          className="w-full p-2 border rounded"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button
          className="w-full bg-blue-600 text-white p-2 rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Thinking…' : 'Get Strategy'}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded">
          {result.error ? (
            <p className="text-red-500">{result.error}</p>
          ) : (
            <>
              <h2 className="font-semibold">Best Strategy</h2>
              <p>{result.best_strategy}</p>
              <pre className="mt-2 text-sm bg-gray-100 p-2 rounded">
                {JSON.stringify(result.details, null, 2)}
              </pre>
            </>
          )}
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={() => setShowAdmin(true)}
          className="text-sm text-blue-600 underline"
        >
          Admin Panel →
        </button>
      </div>
    </div>
  );
}

export default App;
