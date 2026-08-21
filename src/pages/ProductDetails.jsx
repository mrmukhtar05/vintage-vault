import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";

export default function ProductDetails(){
  const {id}=useParams();
  const product=products.find(p=>p.id===Number(id));
  if(!product)return <div className="p-20 text-center"><h1 className="text-4xl font-black">Product Not Found</h1></div>;

  return <main className="mx-auto grid max-w-[1200px] gap-10 px-5 py-14 lg:grid-cols-2">
    <div className={`flex h-[550px] items-center justify-center ${product.color}`}><span className="text-[180px]">{product.emoji}</span></div>
    <div className="py-5"><p className="text-xs font-bold text-[var(--gold)]">{product.category}</p><h1 className="mt-3 text-5xl font-black">{product.name}</h1><p className="mt-6 text-3xl font-black text-[var(--gold)]">₹{product.price}</p><p className="mt-5 leading-7 text-[var(--muted)]">A curated vintage piece in {product.condition.toLowerCase()} condition. Size: {product.size}.</p><button className="mt-8 w-full bg-[var(--gold)] px-6 py-4 font-black text-black hover:opacity-90">ADD TO CART</button><Link to="/shop" className="mt-4 block text-center text-sm text-[var(--gold)]">← Continue Shopping</Link></div>
  </main>;
}