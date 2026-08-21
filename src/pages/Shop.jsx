import { useState } from "react";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function Shop() {
  const [category,setCategory]=useState("All");
  const categories=["All","T-Shirts","Jackets","Jerseys","Bottoms","Jorts","Hoodies"];
  const filtered=category==="All"?products:products.filter(p=>p.category===category);

  return <><PageHeader title="Shop" subtitle="Find your next vintage grail."/><main className="mx-auto max-w-[1400px] px-5 py-10"><div className="mb-8 flex flex-wrap gap-2">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={`px-4 py-2 text-xs font-black ${category===c?"bg-[var(--gold)] text-black":"border border-[var(--border)]"}`}>{c}</button>)}</div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{filtered.map(p=><ProductCard key={p.id} product={p}/>)}</div></main></>;
}