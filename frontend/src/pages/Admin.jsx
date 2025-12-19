import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Admin() {
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {
    const res = await api.get("/sweets");
    setSweets(res.data);
  };

  const addSweet = async (e) => {
    e.preventDefault();
    await api.post("/sweets", {
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
    });
    setForm({ name: "", category: "", price: "", quantity: "" });
    loadSweets();
  };

  const restock = async (id) => {
    const amount = prompt("Enter restock quantity");
    if (!amount) return;
    await api.post(`/sweets/${id}/restock`, { amount: Number(amount) });
    loadSweets();
  };

  const remove = async (id) => {
    if (!confirm("Delete this sweet?")) return;
    await api.delete(`/sweets/${id}`);
    loadSweets();
  };

  return (
    <div className="p-6 space-y-8">
      <form onSubmit={addSweet} className="grid grid-cols-2 gap-4 max-w-xl">
        <input
          placeholder="Name"
          className="border p-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Category"
          className="border p-2"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          placeholder="Price"
          className="border p-2"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          placeholder="Quantity"
          className="border p-2"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />
        <button className="col-span-2 bg-black text-white p-2 rounded">
          Add Sweet
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-4">
        {sweets.map((s) => (
          <div key={s._id} className="border p-4 rounded">
            <h3 className="font-bold">{s.name}</h3>
            <p>{s.category}</p>
            <p>₹{s.price}</p>
            <p>Qty: {s.quantity}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => restock(s._id)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Restock
              </button>
              <button
                onClick={() => remove(s._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
