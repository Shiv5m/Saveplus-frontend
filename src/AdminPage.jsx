import { useState } from 'react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('user');
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const endpointMap = {
    user: '/admin/add-user',
    card: '/admin/add-card',
    voucher: '/admin/add-voucher',
    offer: '/admin/add-offer',
  };

  const requiredFields = {
    user: ['user_id', 'name'],
    card: ['user_id', 'card_name'],
    voucher: ['platform', 'merchant'],
    offer: ['merchant', 'description'],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Validation
    const missing = requiredFields[activeTab].filter(
      (field) => !formData[field]?.trim()
    );
    if (missing.length > 0) {
      setError(`Please fill in: ${missing.join(', ')}`);
      return;
    }

    try {
      const res = await fetch(
        `https://saveplus-production.up.railway.app${endpointMap[activeTab]}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (data.status === 'success') {
        setMessage(data.message || 'Success!');
        setFormData({});
      } else {
        setError(data.message || 'Error submitting form.');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  const handleInput = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'user':
        return (
          <>
            <input placeholder="User ID" value={formData.user_id || ''} onChange={(e) => handleInput('user_id', e.target.value)} className="w-full p-2 border rounded" />
            <input placeholder="Name" value={formData.name || ''} onChange={(e) => handleInput('name', e.target.value)} className="w-full p-2 border rounded" />
          </>
        );
      case 'card':
        return (
          <>
            <input placeholder="User ID" value={formData.user_id || ''} onChange={(e) => handleInput('user_id', e.target.value)} className="w-full p-2 border rounded" />
            <input placeholder="Card Name" value={formData.card_name || ''} onChange={(e) => handleInput('card_name', e.target.value)} className="w-full p-2 border rounded" />
          </>
        );
      case 'voucher':
        return (
          <>
            <input placeholder="Platform" value={formData.platform || ''} onChange={(e) => handleInput('platform', e.target.value)} className="w-full p-2 border rounded" />
            <input placeholder="Merchant" value={formData.merchant || ''} onChange={(e) => handleInput('merchant', e.target.value)} className="w-full p-2 border rounded" />
          </>
        );
      case 'offer':
        return (
          <>
            <input placeholder="Merchant" value={formData.merchant || ''} onChange={(e) => handleInput('merchant', e.target.value)} className="w-full p-2 border rounded" />
            <input placeholder="Offer Description" value={formData.description || ''} onChange={(e) => handleInput('description', e.target.value)} className="w-full p-2 border rounded" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

      <div className="flex space-x-2 mb-4">
        {['user', 'card', 'voucher', 'offer'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setFormData({});
              setMessage('');
              setError('');
            }}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {tab[0].toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {renderForm()}
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
          Submit
        </button>
      </form>

      {error && <div className="mt-4 text-red-500">{error}</div>}
      {message && <div className="mt-4 text-green-600">{message}</div>}
    </div>
  );
}
