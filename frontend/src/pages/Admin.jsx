import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Admin() {
  const [sweets, setSweets] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const loadSweets = async () => {
    try {
      const res = await api.get("/sweets");
      setSweets(res.data);
    } catch (error) {
      console.error("Failed to load sweets:", error);
    }
  };

  useEffect(() => {
    loadSweets();
  }, []);

  // ---------------- ADD SWEET ----------------
  const addSweet = async (e) => {
    e.preventDefault();

    try {
      await api.post("/sweets", {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });

      setForm({ name: "", category: "", price: "", quantity: "" });
      loadSweets();
      alert("Sweet added successfully!");
    } catch (error) {
      console.error("Failed to add sweet:", error);
      alert(error.response?.data?.message || "Failed to add sweet");
    }
  };

  // ---------------- EDIT SWEET ----------------
  const startEdit = (sweet) => {
    setEditingId(sweet._id);
    setForm({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
    });
  };

  const updateSweet = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/sweets/${editingId}`, {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });

      setEditingId(null);
      setForm({ name: "", category: "", price: "", quantity: "" });
      loadSweets();
      alert("Sweet updated successfully!");
    } catch (error) {
      console.error("Failed to update sweet:", error);
      alert(error.response?.data?.message || "Failed to update sweet");
    }
  };

  // ---------------- DELETE ----------------
  const remove = async (id) => {
    if (!confirm("Delete this sweet?")) return;

    try {
      await api.delete(`/sweets/${id}`);
      loadSweets();
      alert("Sweet deleted successfully!");
    } catch (error) {
      console.error("Failed to delete sweet:", error);
      alert(error.response?.data?.message || "Failed to delete sweet");
    }
  };

  // ---------------- RESTOCK ----------------
  const restock = async (id) => {
    const amount = prompt("Enter restock quantity");
    if (!amount) return;

    try {
      await api.post(`/sweets/${id}/restock`, { amount: Number(amount) });
      loadSweets();
      alert("Sweet restocked successfully!");
    } catch (error) {
      console.error("Failed to restock:", error);
      alert(error.response?.data?.message || "Failed to restock sweet");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>

      {/* ADD / UPDATE FORM */}
      <form
        onSubmit={editingId ? updateSweet : addSweet}
        className="grid grid-cols-2 gap-4 max-w-xl border p-4 rounded bg-gray-50"
      >
        <h3 className="col-span-2 font-bold">
          {editingId ? "Update Sweet" : "Add New Sweet"}
        </h3>

        <input
          className="border p-2 rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Quantity"
          type="number"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />

        <button className="col-span-2 bg-black text-white p-2 rounded hover:bg-gray-800">
          {editingId ? "Update Sweet" : "Add Sweet"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", category: "", price: "", quantity: "" });
            }}
            className="col-span-2 bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* SWEET LIST */}
      <div className="grid md:grid-cols-3 gap-4">
        {sweets.map((s) => (
          <div key={s._id} className="border p-4 rounded bg-white shadow">
            <h3 className="font-bold text-lg">{s.name}</h3>
            <p className="text-gray-600">{s.category}</p>
            <p className="font-semibold">₹{s.price}</p>
            <p>Stock: {s.quantity}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => startEdit(s)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => restock(s._id)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Restock
              </button>
              <button
                onClick={() => remove(s._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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
