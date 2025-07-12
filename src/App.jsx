import { useState } from 'react';

function App() {
  const [userId, setUserId] = useState('');
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://saveplus-production.up.railway.app/strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, merchant, amount: parseFloat(amount) })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Request failed' });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">SavePlus Strategy Finder</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} required />
        <input className="w-full p-2 border rounded" placeholder="Merchant (e.g., Amazon)" value={merchant} onChange={(e) => setMerchant(e.target.value)} required />
        <input type="number" className="w-full p-2 border rounded" placeholder="Amount (₹)" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <button className="w-full bg-blue-600 text-white p-2 rounded" type="submit" disabled={loading}>
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
              <pre className="mt-2 text-sm bg-gray-100 p-2 rounded">{JSON.stringify(result.details, null, 2)}</pre>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
