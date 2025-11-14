import React, { useEffect, useState } from 'react'; import axios from 'axios';
export default function Stores(){ const [stores,setStores]=useState<any[]>([]);
useEffect(()=>{ axios.get('http://localhost:4000/api/stores').then(r=>setStores(r.data)).catch(()=>{}); },[]);
return (<div><h2>Stores</h2>{stores.map((s:any,i)=> (<div key={i} style={{border:'1px solid #ccc',padding:8,margin:8}}><h3>{s.store.name}</h3><p>{s.store.address}</p><p>Avg Rating: {s.averageRating}</p></div>))}</div>); }
