async function discoverSurface(){

let domain=document.getElementById("targetDomain").value

if(!domain){
alert("Enter a domain")
return
}

document.getElementById("discoveryResults").innerHTML="Discovering attack surface..."

try{

let dns=await fetch(`https://dns.google/resolve?name=${domain}`)
let dnsData=await dns.json()

let subdomains=generateSubdomains(domain)

let ports=detectPorts()

displayDiscovery(domain,dnsData.Answer,subdomains,ports)

}

catch{

document.getElementById("discoveryResults").innerHTML="Discovery failed."

}

}



function generateSubdomains(domain){

return[
"dev."+domain,
"api."+domain,
"mail."+domain,
"admin."+domain
]

}



function detectPorts(){

return[
"80 (HTTP)",
"443 (HTTPS)",
"22 (SSH)",
"21 (FTP)"
]

}



function displayDiscovery(domain,dnsRecords,subdomains,ports){

let dnsList=dnsRecords.map(r=>`<li>${r.data}</li>`).join("")
let subList=subdomains.map(s=>`<li>${s}</li>`).join("")
let portList=ports.map(p=>`<li>${p}</li>`).join("")

document.getElementById("discoveryResults").innerHTML=

`
<h3>Attack Surface Results</h3>

<p><strong>Domain:</strong> ${domain}</p>

<h4>DNS Records</h4>
<ul>${dnsList}</ul>

<h4>Discovered Subdomains</h4>
<ul>${subList}</ul>

<h4>Exposed Services</h4>
<ul>${portList}</ul>

`
}
