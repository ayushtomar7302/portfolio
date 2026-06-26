const btn = document.querySelector(".theme-btn");

btn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

btn.innerHTML="☀ Light";

}

else{

btn.innerHTML="🌙 Dark";

}

});