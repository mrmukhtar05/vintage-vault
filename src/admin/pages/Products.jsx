import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import SectionTitle from "../components/SectionTitle";

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

const readFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const wantsNew = new URLSearchParams(location.search).get("new");
    if (wantsNew) openNew();
  }, [location.search]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      `${p.name} ${p.category} ${p.size}`.toLowerCase().includes(q)
    );
  }, [products, query]);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  };

  const edit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      category: product.category || CATEGORIES[0],
      price: String(product.price ?? ""),
      oldPrice: String(product.oldPrice ?? ""),
      size: product.size || "",
      condition: product.condition || "Excellent",
      images: product.images || [],
    });
    setError("");
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = (id) => {
    if (window.confirm("Delete this product?")) deleteProduct(id);
  };

  const uploadImages = async (event) => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";

    if (form.images.length + files.length > MAX_IMAGES) {
      setError(`Maximum ${MAX_IMAGES} photos allowed.`);
      return;
    }

    const oversized = files.find((file) => file.size > MAX_FILE_MB * 1024 * 1024);
    if (oversized) {
      setError(`Each image must be smaller than ${MAX_FILE_MB}MB.`);
      return;
    }

    setUploading(true);
    setError("");

    try {
      const images = await Promise.all(files.map(readFile));
      setForm((prev) => ({ ...prev, images: [...prev.images, ...images] }));
    } catch {
      setError("Could not read the selected image.");
    } finally {
      setUploading(false);
    }
  };

  const save = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.price || !form.size.trim()) {
      setError("Name, price and size are required.");
      return;
    }
    if (!form.images.length) {
      setError("Add at least one product photo.");
      return;
    }

    const payload = {
      ...form,
      name: form.name.trim(),
      size: form.size.trim(),
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : Number(form.price),
    };

    if (editingId !== null) updateProduct(editingId, payload);
    else addProduct(payload);

    closeForm();
  };

  const closeForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setShowForm(false);
  };

  return (
    <div className="admin-page">
      <SectionTitle
        eyebrow="INVENTORY"
        title="Products"
        description={`${products.length} products currently available in your store.`}
        action={<button className="admin-primary-btn" onClick={openNew}>＋ ADD PRODUCT</button>}
      />

      {showForm && (
        <section className="admin-panel admin-form-panel">
          <div className="admin-panel-head">
            <div><span className="admin-eyebrow">PRODUCT</span><h3>{editingId !== null ? "Edit Product" : "Add New Product"}</h3></div>
            <button className="admin-close-text" onClick={closeForm}>CANCEL ×</button>
          </div>

          {error && <div className="admin-error">{error}</div>}

          <form onSubmit={save} className="admin-form">
            <div className="admin-form-grid">
              <input className="admin-input" placeholder="Product name" value={form.name} onChange={(e) => setForm({...form, name:e.target.value})} />
              <select className="admin-input" value={form.category} onChange={(e) => setForm({...form, category:e.target.value})}>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select>
              <input className="admin-input" type="number" min="0" placeholder="Selling price (₹)" value={form.price} onChange={(e) => setForm({...form, price:e.target.value})} />
              <input className="admin-input" type="number" min="0" placeholder="Original price (₹)" value={form.oldPrice} onChange={(e) => setForm({...form, oldPrice:e.target.value})} />
              <input className="admin-input" placeholder="Size (M, L, 32...)" value={form.size} onChange={(e) => setForm({...form, size:e.target.value})} />
              <select className="admin-input" value={form.condition} onChange={(e) => setForm({...form, condition:e.target.value})}>{CONDITIONS.map(c => <option key={c}>{c}</option>)}</select>
            </div>

            <div>
              <label className="admin-upload-label">PRODUCT PHOTOS · {form.images.length}/{MAX_IMAGES}</label>
              <div className="admin-photo-grid">
                {form.images.map((image, index) => (
                  <div className="admin-photo" key={`${image}-${index}`}>
                    <img src={image} alt="" />
                    <button type="button" onClick={() => setForm(f => ({...f, images:f.images.filter((_,i)=>i!==index)}))}>×</button>
                  </div>
                ))}
                {form.images.length < MAX_IMAGES && (
                  <label className="admin-photo-add">
                    <span>＋</span><small>{uploading ? "READING..." : "ADD PHOTO"}</small>
                    <input type="file" accept="image/*" multiple onChange={uploadImages} disabled={uploading} />
                  </label>
                )}
              </div>
              <small className="admin-help">Up to {MAX_IMAGES} images, {MAX_FILE_MB}MB each.</small>
            </div>

            <button className="admin-primary-btn full">SAVE PRODUCT</button>
          </form>
        </section>
      )}

      <section className="admin-panel">
        <div className="admin-list-head">
          <div><h3>All Products</h3><small>{filtered.length} results</small></div>
          <input className="admin-search" placeholder="Search products..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        <div className="admin-product-list">
          {filtered.map((product) => (
            <article className="admin-product-row" key={product.id}>
              <div className="admin-product-image">
                {product.images?.[0] ? <img src={product.images[0]} alt="" /> : <span>□</span>}
              </div>
              <div className="admin-product-info">
                <strong>{product.name}</strong>
                <small>{product.category} · Size {product.size} · {product.condition}</small>
              </div>
              <strong className="gold">₹{Number(product.price || 0).toLocaleString("en-IN")}</strong>
              <div className="admin-row-actions">
                <button onClick={() => edit(product)} className="admin-secondary-btn">EDIT</button>
                <button onClick={() => remove(product.id)} className="admin-danger-btn">DELETE</button>
              </div>
            </article>
          ))}
          {!filtered.length && <div className="admin-empty">No products found.</div>}
        </div>
      </section>
    </div>
  );
}
