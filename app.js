const channels=[
 {name:"General",desc:"General discussion and updates",members:12,icon:"💬",joined:true,popular:true,posts:[["Verity","Welcome to Verity Channels! This is the place to connect, share ideas, and build together."]]},
 {name:"Tech & AI",desc:"AI, technology, and innovation",members:8,icon:"🧠",joined:true,popular:true,posts:[["Verity","Just shared a new guide on using AI productively. Check it out and share your thoughts!"],["Alex","What AI projects is everyone working on?"]]},
 {name:"Productivity",desc:"Tools, tips, and workflows",members:24,icon:"✅",joined:false,popular:true,posts:[["Mia","I found a workflow that makes planning projects much easier."]]},
 {name:"Creative Corner",desc:"Art, writing, design, and more",members:9,icon:"🎨",joined:true,popular:false,posts:[["Sam","Drop your latest creative projects here!"]]},
 {name:"Gaming",desc:"Games, communities, and updates",members:31,icon:"🎮",joined:false,popular:true,posts:[["Jay","Anyone up for a co-op session later?"]]},
 {name:"Project Hub",desc:"Build projects together",members:16,icon:"🚀",joined:true,mine:true,popular:false,posts:[["Verity","Project Hub is ready. Share your goals and collaborate."]]}
];
let current=null, filter="all";

const $=id=>document.getElementById(id);
function render(){
 const q=$("search").value.toLowerCase();
 let list=channels.filter(c=>c.name.toLowerCase().includes(q)||c.desc.toLowerCase().includes(q));
 if(filter==="mine") list=list.filter(c=>c.mine);
 if(filter==="joined") list=list.filter(c=>c.joined);
 if(filter==="popular") list=list.filter(c=>c.popular);
 $("cards").innerHTML=list.map((c,i)=>`<div class="card ${current===c.name?"selected":""}" onclick="openChannel('${c.name.replace(/'/g,"\\'")}')"><div class="avatar">${c.icon}</div><div><h3>${c.name}</h3><p>${c.desc}</p></div><span class="members">${c.members} members</span></div>`).join("");
}
function openChannel(name){
 current=name; const c=channels.find(x=>x.name===name);
 $("panelEmpty").classList.add("hidden"); $("channelView").classList.remove("hidden");
 $("viewIcon").textContent=c.icon; $("viewName").textContent=c.name; $("viewDesc").textContent=c.desc+" • "+c.members+" members";
 $("feed").innerHTML=c.posts.map(p=>`<div class="post"><div class="post-avatar">${p[0]==="Verity"?"V":"•"}</div><div class="post-content"><b>${p[0]}</b><small>now</small><p>${escapeHtml(p[1])}</p></div></div>`).join("");
 render();
 if(innerWidth<=620)$("channelView").closest(".channel-panel").classList.add("mobile-open");
}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function enter(){ $("landing").classList.add("hidden"); $("app").classList.remove("hidden"); render(); }
["joinBtn","heroEnter","learnBtn"].forEach(id=>$(id).addEventListener("click",enter));
$("search").addEventListener("input",render);
document.querySelectorAll(".tab").forEach(t=>t.addEventListener("click",()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));t.classList.add("active");filter=t.dataset.filter;render()}));
$("createBtn").onclick=()=>$("modal").classList.remove("hidden");
$("closeModal").onclick=()=>$("modal").classList.add("hidden");
$("modal").addEventListener("click",e=>{if(e.target.id==="modal")$("modal").classList.add("hidden")});
$("saveChannel").onclick=()=>{
 const name=$("newName").value.trim(), desc=$("newDesc").value.trim();
 if(!name)return;
 channels.unshift({name,desc:desc||"A new Verity community",members:1,icon:$("newIcon").value,joined:true,mine:true,popular:false,posts:[["Verity","Welcome to your new channel."] ]});
 $("newName").value="";$("newDesc").value="";$("modal").classList.add("hidden");render();openChannel(name);
};
$("postBtn").onclick=post;
$("postInput").addEventListener("keydown",e=>{if(e.key==="Enter")post()});
function post(){
 if(!current)return; const input=$("postInput"), text=input.value.trim(); if(!text)return;
 channels.find(c=>c.name===current).posts.push(["You",text]); input.value=""; openChannel(current);
}
$("backBtn").onclick=()=>{document.querySelector(".channel-panel").classList.remove("mobile-open")};
$("signInBtn").onclick=()=>alert("Authentication will be connected to the Verity backend.");
render();