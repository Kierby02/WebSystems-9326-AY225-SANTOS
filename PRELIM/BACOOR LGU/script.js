const departments = [
"Mayor’s Office","Health Office","Engineering",
"Social Welfare","Business Permit","DRRM Office"
];

const services = [
"Business Permit","Barangay Clearance",
"Health Certificate","Building Permit"
];

const news = [
{title:"Vaccination Drive", body:"Free vaccines at City Hall Saturday."},
{title:"Road Repair", body:"Main Ave closed Feb 5–8."}
];

function render(list,id){
  const ul=document.getElementById(id);
  ul.innerHTML="";
  list.forEach(x=>{
    const li=document.createElement("li");
    li.textContent=x;
    li.onclick=()=>openModal("Details",x);
    ul.appendChild(li);
  });
}

render(departments,"deptList");
render(services,"serviceList");

deptSearch.oninput=e=>{
  render(departments.filter(d=>d.toLowerCase().includes(e.target.value.toLowerCase())),"deptList");
};

serviceSearch.oninput=e=>{
  render(services.filter(d=>d.toLowerCase().includes(e.target.value.toLowerCase())),"serviceList");
};

news.forEach(n=>{
  const c=document.createElement("div");
  c.className="card";
  c.textContent=n.title;
  c.onclick=()=>openModal(n.title,n.body);
  newsContainer.appendChild(c);
});

function openModal(t,b){
  modal.style.display="block";
  modalTitle.textContent=t;
  modalBody.textContent=b;
}

closeModal.onclick=()=>modal.style.display="none";

inquiryForm.onsubmit=e=>{
  e.preventDefault();
  if(!name.value||!email.value||!message.value){
    formMsg.textContent="Please complete form";
    return;
  }
  formMsg.textContent="Submitted successfully";
};

const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll("nav a");

window.onscroll=()=>{
  let current="";
  sections.forEach(s=>{
    if(pageYOffset>=s.offsetTop-120) current=s.id;
  });
  navLinks.forEach(a=>{
    a.classList.remove("active");
    if(a.getAttribute("href")==="#"+current) a.classList.add("active");
  });
};
