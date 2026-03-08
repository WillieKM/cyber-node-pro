const input=document.getElementById("chat-input");

if(input){

input.addEventListener("keypress",function(e){

if(e.key==="Enter"){

let msg=input.value;

let response="Cyber-Node recommends enabling MFA, monitoring threats and running regular vulnerability scans.";

let p=document.createElement("p");

p.innerText=response;

document.getElementById("chat-body").appendChild(p);

input.value="";

}

});

}
