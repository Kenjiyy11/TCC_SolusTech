const API_URL=(import.meta.env.VITE_API_URL||'http://localhost:3000/api').replace(/\/$/,'');
export function getToken(){return sessionStorage.getItem('solustech_token')}
export function getUser(){try{return JSON.parse(sessionStorage.getItem('solustech_usuario')||'null')}catch{return null}}
export function clearSession(){sessionStorage.removeItem('solustech_token');sessionStorage.removeItem('solustech_usuario')}
function saveSession(token,user){sessionStorage.setItem('solustech_token',token);sessionStorage.setItem('solustech_usuario',JSON.stringify(user))}
export async function api(path,options={}){
 const headers={'Content-Type':'application/json',...(options.headers||{})},token=getToken();
 if(token)headers.Authorization=`Bearer ${token}`;
 let response;
 try{response=await fetch(`${API_URL}${path}`,{...options,headers})}catch{throw new Error(`Não foi possível conectar à API (${API_URL}). Confira se o back-end está rodando.`)}
 if(response.status===204)return null;
 const type=response.headers.get('content-type')||'',data=type.includes('application/json')?await response.json():await response.text();
 if(!response.ok){if(response.status===401){clearSession();window.dispatchEvent(new Event('solustech:unauthorized'))}throw new Error(data?.erro||data?.message||`Erro HTTP ${response.status}`)}
 return data;
}
export async function login(email,senha){const d=await api('/auth/login',{method:'POST',body:JSON.stringify({email,senha})});saveSession(d.token,d.usuario);return d.usuario}
export async function cadastro(payload){return api('/auth/cadastro',{method:'POST',body:JSON.stringify(payload)})}
