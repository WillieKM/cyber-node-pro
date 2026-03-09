const input = document.getElementById("aiInput")

input.addEventListener("keypress",function(e){

if(e.key==="Enter"){

let question=input.value.toLowerCase()

let response="I recommend performing a full vulnerability assessment."

if(question.includes("ssl")){
response="Ensure TLS 1.2 or higher and disable weak ciphers."
}

if(question.includes("wordpress")){
response="Keep plugins updated and remove unused themes."
}

if(question.includes("firewall")){
response="Use a web application firewall to block malicious traffic."
}

if(question.includes("vulnerability")){
response="Patch outdated software and run penetration testing."
}

let p=document.createElement("p")
p.innerText="AI: "+response

document.getElementById("aiMessages").appendChild(p)

input.value=""

}

})
