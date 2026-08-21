import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

const cats=["T-Shirts","Jackets","Jerseys","Bottoms","Jorts","Hoodies"];

export default function Categories(){return <><PageHeader title="Categories" subtitle="Explore our vintage collections."/><main className="mx-auto grid max-w-[1400px] grid-cols-2 gap-4 px-5 py-12 lg:grid-cols-3">{cats.map((c,i)=><Link to="/shop" key={c} className="flex h-52 items-end bg-[var(--blue)] p-6 border border-[var(--border)] hover:bg-[var(--blue-light)]"><div><p className="text-xs text-[var(--gold)]">COLLECTION 0{i+1}</p><h2 className="mt-2 text-3xl font-black">{c}</h2></div></Link>)}</main></>;}