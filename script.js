const slots=[
  {id:1,date:"22/08/2026",time:"19:30",label:"Aula ao vivo — Fundamentos"},
  {id:2,date:"25/08/2026",time:"20:00",label:"Aula ao vivo — Passos básicos"},
  {id:3,date:"29/08/2026",time:"19:30",label:"Aula ao vivo — Coreografia"},
  {id:4,date:"01/09/2026",time:"20:00",label:"Aula ao vivo — Prática"}
];

const slotsEl=document.getElementById("slots");
function renderSlots(){
  const booked=JSON.parse(localStorage.getItem("moveDanceBooked")||"[]");
  slotsEl.innerHTML=slots.map(s=>{
    const isBooked=booked.includes(s.id);
    return `<div class="slot"><div><strong>${s.label}</strong><small>${s.date} às ${s.time}</small></div><button class="${isBooked?"booked":""}" onclick="bookSlot(${s.id})">${isBooked?"Agendado":"Agendar"}</button></div>`;
  }).join("");
}
window.bookSlot=function(id){
  const booked=JSON.parse(localStorage.getItem("moveDanceBooked")||"[]");
  if(!booked.includes(id)) booked.push(id);
  localStorage.setItem("moveDanceBooked",JSON.stringify(booked));
  renderSlots();
  alert("Aula agendada! Para a versão de produção, conecte este agendamento ao seu banco de dados e sistema de notificações.");
};
renderSlots();

document.getElementById("menuBtn").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));

const modal=document.getElementById("modal");
document.querySelectorAll(".preview").forEach(btn=>btn.addEventListener("click",()=>{
  document.getElementById("modalTitle").textContent=btn.dataset.video;
  modal.classList.add("show");
}));
document.getElementById("closeModal").onclick=()=>modal.classList.remove("show");
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("show")});

document.getElementById("notifyBtn").addEventListener("click",async()=>{
  const status=document.getElementById("notifyStatus");
  if(!("Notification" in window)){status.textContent="Seu navegador não oferece notificações.";return}
  const permission=await Notification.requestPermission();
  if(permission==="granted"){
    status.textContent="Notificações ativadas neste dispositivo.";
    new Notification("MoveDance",{body:"Você receberá avisos quando novas aulas forem disponibilizadas."});
  }else status.textContent="As notificações não foram autorizadas.";
});

document.getElementById("buyBtn").addEventListener("click",()=>{
  alert("Pronto para integrar seu checkout. Substitua este botão pelo link de pagamento do Mercado Pago, Stripe, Hotmart ou outro gateway.");
});

document.getElementById("whatsapp").addEventListener("click",e=>{
  e.preventDefault();
  window.open("https://wa.me/5500000000000?text=Olá!%20Quero%20saber%20mais%20sobre%20o%20curso%20de%20dança.","_blank");
});