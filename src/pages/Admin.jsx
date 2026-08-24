import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import { useOrders } from "../context/OrdersContext";
import ImageSlider from "../components/ImageSlider";

const CATEGORIES = ["T-Shirts", "Jackets", "Jerseys", "Bottoms", "Jorts", "Hoodies"];
const CONDITIONS = ["Excellent", "Very Good", "Good"];
const MAX_IMAGES = 6;
const MAX_FILE_MB = 2;

const emptyForm = {
  name: "",
  category: CATEGORIES[0],
  price: "",
  oldPrice: "",
  size: "",
  condition: "Excellent",
  images: [],
};

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Admin() {
  const { user, isAuthenticated, isAdmin, getUserCount } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { orders } = useOrders();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  if (!isAuthenticated) {
    return (
      <main className="mx-auto max-w-[700px] px-5 py-24 text-center">
        <h1 className="text-4xl font-black">ADMIN DASHBOARD</h1>
        <p className="mt-6 text-[var(--muted)]">Login with an admin account to continue.</p>
        <Link to="/login" className="mt-6 inline-block bg-[var(--gold)] px-7 py-4 font-black text-black">LOGIN</Link>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="mx-auto max-w-[700px] px-5 py-24 text-center">
        <h1 className="text-4xl font-black">ACCESS DENIED</h1>
        <p className="mt-6 text-[var(--muted)]">This area is only available to admin accounts.</p>
        <Link to="/" className="mt-6 inline-block bg-[var(--gold)] px-7 py-4 font-black text-black">GO HOME</Link>
      </main>
    );
  }

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (files.length === 0) return;

    if (form.images.length + files.length > MAX_IMAGES) {
      setError(`You can add up to ${MAX_IMAGES} photos per product.`);
      return;
    }

    const tooBig = files.find((f) => f.size > MAX_FILE_MB * 1024 * 1024);
    if (tooBig) {
      setError(`"${tooBig.name}" is larger than ${MAX_FILE_MB}MB. Please use a smaller image.`);
      return;
    }

    setUploading(true);
    setError("");
    try {
      const dataUrls = await Promise.all(files.map(readFileAsDataURL));
      setForm((f) => ({ ...f, images: [...f.images, ...dataUrls] }));
    } catch {
      setError("Couldn't read one of the selected images. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (idx) => {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      oldPrice: product.oldPrice ? String(product.oldPrice) : "",
      size: product.size,
      condition: product.condition,
      images: product.images || [],
    });
    setEditingId(product.id);
    setShowForm(true);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this product? This can't be undone.")) {
      deleteProduct(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.price || !form.size) {
      setError("Please fill in name, price and size.");
      return;
    }
    if (form.images.length === 0) {
      setError("Add at least one product photo.");
      return;
    }

    const payload = {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : Number(form.price),
      size: form.size,
      condition: form.condition,
      images: form.images,
    };

    if (editingId) updateProduct(editingId, payload);
    else addProduct(payload);

    resetForm();
  };

  return (
    <main className="mx-auto max-w-[1300px] px-5 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black tracking-[0.3em] text-[var(--gold)]">ADMIN</p>
          <h1 className="mt-1 text-4xl font-black">DASHBOARD</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">Welcome back, {user.name}.</p>
        </div>
        {!showForm && (
          <button
            onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}
            className="bg-[var(--gold)] px-6 py-3 font-black text-black hover:opacity-90"
          >
            + ADD PRODUCT
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          ["PRODUCTS", products.length],
          ["ORDERS", orders.length],
          ["REVENUE", `₹${totalRevenue.toLocaleString("en-IN")}`],
          ["CUSTOMERS", getUserCount()],
        ].map(([label, value]) => (
          <div key={label} className="border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="text-xs font-bold tracking-widest text-[var(--muted)]">{label}</p>
            <p className="mt-2 text-3xl font-black text-[var(--gold)]">{value}</p>
          </div>
        ))}
      </div>

      {/* Add / Edit product form */}
      {showForm && (
        <div className="mt-10 border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black">{editingId ? "EDIT PRODUCT" : "ADD NEW PRODUCT"}</h2>
            <button onClick={resetForm} className="text-sm text-[var(--muted)] hover:text-[var(--red)]">CANCEL ✕</button>
          </div>

          {error && (
            <p className="mt-4 border border-[var(--red)] bg-[var(--red)]/10 px-4 py-3 text-sm text-[var(--red)]">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Product name"
                className="bg-[var(--black)] p-3 outline-none border border-[var(--border)]"
              />
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="bg-[var(--black)] p-3 outline-none border border-[var(--border)]"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <input
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="Price (₹)"
                type="number"
                min="0"
                className="bg-[var(--black)] p-3 outline-none border border-[var(--border)]"
              />
              <input
                value={form.oldPrice}
                onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
                placeholder="Original price (₹) — optional"
                type="number"
                min="0"
                className="bg-[var(--black)] p-3 outline-none border border-[var(--border)]"
              />
              <input
                value={form.size}
                onChange={(e) => setForm({ ...form, size: e.target.value })}
                placeholder="Size (e.g. M, 32, XL)"
                className="bg-[var(--black)] p-3 outline-none border border-[var(--border)]"
              />
              <select
                value={form.condition}
                onChange={(e) => setForm({ ...form, condition: e.target.value })}
                className="bg-[var(--black)] p-3 outline-none border border-[var(--border)]"
              >
                {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Multi-photo upload */}
            <div>
              <label className="text-xs font-bold tracking-widest text-[var(--muted)]">
                PRODUCT PHOTOS ({form.images.length}/{MAX_IMAGES})
              </label>
              <div className="mt-3 flex flex-wrap gap-3">
                {form.images.map((img, i) => (
                  <div key={i} className="relative h-24 w-24 overflow-hidden border border-[var(--border)]">
                    <img src={img} alt="" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-xs text-white hover:bg-[var(--red)]"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {form.images.length < MAX_IMAGES && (
                  <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 border border-dashed border-[var(--border)] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--gold)]">
                    <span className="text-2xl">+</span>
                    <span className="text-[10px] font-bold">{uploading ? "..." : "ADD PHOTO"}</span>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileUpload} disabled={uploading} />
                  </label>
                )}
              </div>
              <p className="mt-2 text-[11px] text-[var(--muted)]">Upload multiple photos so shoppers can browse a slider on the product page. Max {MAX_FILE_MB}MB each.</p>
            </div>

            <button type="submit" className="mt-2 bg-[var(--gold)] p-4 font-black text-black hover:opacity-90">
              {editingId ? "SAVE CHANGES" : "ADD PRODUCT"}
            </button>
          </form>
        </div>
      )}

      {/* Products table */}
      <div className="mt-10">
        <h2 className="text-xl font-black">PRODUCTS</h2>
        <div className="mt-4 grid gap-3">
          {products.map((p) => (
            <div key={p.id} className="flex flex-wrap items-center gap-4 border border-[var(--border)] bg-[var(--surface)] p-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden">
                <ImageSlider images={p.images} emojiSize="text-3xl" showArrows={false} showDots={false} />
              </div>
              <div className="min-w-[160px] flex-1">
                <p className="font-black">{p.name}</p>
                <p className="text-xs text-[var(--muted)]">{p.category} · Size {p.size} · {p.images?.length || 0} photo{(p.images?.length || 0) !== 1 ? "s" : ""}</p>
              </div>
              <p className="font-black text-[var(--gold)]">₹{p.price}</p>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(p)} className="border border-[var(--border)] px-4 py-2 text-xs font-black hover:border-[var(--gold)] hover:text-[var(--gold)]">EDIT</button>
                <button onClick={() => handleDelete(p.id)} className="border border-[var(--red)] px-4 py-2 text-xs font-black text-[var(--red)] hover:bg-[var(--red)] hover:text-white">DELETE</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent orders */}
      <div className="mt-12">
        <h2 className="text-xl font-black">RECENT ORDERS</h2>
        {orders.length === 0 ? (
          <p className="mt-4 text-[var(--muted)]">No orders placed yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] text-left text-[var(--muted)]">
                  <th className="py-3 pr-4 font-bold">ORDER ID</th>
                  <th className="py-3 pr-4 font-bold">CUSTOMER</th>
                  <th className="py-3 pr-4 font-bold">ITEMS</th>
                  <th className="py-3 pr-4 font-bold">TOTAL</th>
                  <th className="py-3 pr-4 font-bold">DATE</th>
                  <th className="py-3 font-bold">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-white/5">
                    <td className="py-3 pr-4 font-bold">{o.id}</td>
                    <td className="py-3 pr-4">{o.name}<br /><span className="text-xs text-[var(--muted)]">{o.email}</span></td>
                    <td className="py-3 pr-4">{o.items.reduce((s, i) => s + i.qty, 0)} items</td>
                    <td className="py-3 pr-4 font-black text-[var(--gold)]">₹{o.total}</td>
                    <td className="py-3 pr-4 text-[var(--muted)]">{new Date(o.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</td>
                    <td className="py-3"><span className="bg-[var(--gold)] px-2 py-1 text-[10px] font-black text-black">{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
