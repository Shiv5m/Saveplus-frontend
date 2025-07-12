import { useState } from 'react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('user');
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const endpointMap = {
      user: '/admin/add-user',
      card: '/admin/add-card',
      voucher: '/admin/add-voucher',
      offer: '/admin/add-offer',
    };

    try {
      const res = await fetch(`https://saveplus-production.up.railway.app${endpointMap[activeTab]}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setMessage(data.message || 'Success!');
    } catch (err) {
      setMessage('Error submitting data.');
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'user':
        return (
          <>
            <input type="text" placeholder="User ID" onChange={(e) => setFormData({ ...formData, user_id: e.target.value })} className="w-full p-2 border rounded" />
            <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2 border rounded" />
          </>
        );
      case 'card':
        return (
          <>
            <input type="text" placeholder="User ID" onChange={(e) => setFormData({ ...formData, user_id: e.target.value })} className="w-full p-2 border rounded" />
            <input type="text" placeholder="Card Name" onChange={(e) => setFormData({ ...formData, card_name: e.target.value })} className="w-full p-2 border rounded" />
          </>
        );
      case 'voucher':
        return (
          <>
            <input type="text" placeholder="Platform" onChange={(e) => setFormData({ ...formData, platform: e.target.value })} className="w-full p-2 border rounded" />
            <input type="text" placeholder="Merchant" onChange={(e) => setFormData({ ...formData, merchant: e.target.value })} className="w-full p-2 border rounded" />
          </>
        );
      case 'offer':
        return (
          <>
            <input type="text" placeholder="Merchant" onChange={(e) => setFormData({ ...formData, merchant: e.target.value })} className="w-full p-2 border rounded" />
            <input type="text" placeholder="Offer Description" onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 border rounded" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <div className="flex space-x-2">
        <button onClick={() => setActiveTab('user')} className={`px-4 py-2 rounded ${activeTab === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>User</button>
        <button onClick={() => setActiveTab('card')} className={`px-4 py-2 rounded ${activeTab === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Card</button>
        <button onClick={() => setActiveTab('voucher')} className={`px-4 py-2 rounded ${activeTab === 'voucher' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Voucher</button>
        <button onClick={() => setActiveTab('offer')} className={`px-4 py-2 rounded ${activeTab === 'offer' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Offer</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {renderForm()}
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Submit</button>
      </form>

      {message && <div className="mt-4 text-center text-sm text-blue-600">{message}</div>}
    </div>
  );
}
