export default function SweetCard({ sweet, onPurchase }) {
  return (
    <div className="border p-4 rounded-xl shadow-sm bg-white">
      <h3 className="font-bold text-lg">{sweet.name}</h3>
      <p className="text-sm text-gray-500">{sweet.category}</p>
      <p className="mt-1">₹{sweet.price}</p>
      <p>Qty: {sweet.quantity} </p>

      <button
        disabled={sweet.quantity}
        onClick={() => onPurchase(sweet._id)}
        className="mt-2 w-full bg-green-600 text-white py-1 rounded disabled:bg-gray-400"
      >
        Purchase
      </button>
    </div>
  );
}
