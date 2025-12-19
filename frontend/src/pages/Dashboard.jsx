import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    api.get("/sweets").then((res) => setSweets(res.data));
  }, []);

  const search = async () => {
    const res = await api.get(`/sweets/search?name=${query}`);
    setSweets(res.data);
  };

  const purchase = async (id) => {
    await api.post(`/sweets/${id}/purchase`);
    setSweets((prev) =>
      prev.map((s) => (s._id === id ? { ...s, quantity: s.quantity - 1 } : s))
    );
  };

  return (
    <div className="p-6">
      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 flex-1"
          placeholder="Search sweets..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={search} className="bg-black text-white px-4 rounded">
          Search
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {sweets.map((s) => (
          <div key={s._id} className="border p-4 rounded">
            <h3 className="font-bold">{s.name}</h3>
            <p>₹{s.price}</p>
            <p>Qty: {s.quantity}</p>
            <button
              disabled={s.quantity === 0}
              onClick={() => purchase(s._id)}
              className="mt-2 w-full bg-green-600 text-white p-2 rounded disabled:bg-gray-400"
            >
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
