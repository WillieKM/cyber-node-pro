async function scanDomain(){

let domain=document.getElementById("domainInput").value;

if(!domain){
alert("Enter a domain first");
return;
}

document.getElementById("results").innerHTML="Scanning...";

try{

let ssl = await fetch(`https://api.ssllabs.com/api/v3/analyze?host=${domain}`);

let securityHeaders = await fetch(`https://securityheaders.com/?q=${domain}&followRedirects=on&hide=on&format=json`);

let sslData = await ssl.json();
let headerData = await securityHeaders.json();

let grade="Unknown";

if(headerData[0]){
grade=headerData[0].grade;
}

document.getElementById("results").innerHTML=

`<h3>Security Report for ${domain}</h3>

<p><strong>Security Headers Grade:</strong> ${grade}</p>

<p><strong>SSL Status:</strong> ${sslData.status}</p>

<p><strong>Recommendation:</strong> Enable strong security headers and perform vulnerability testing.</p>

<button onclick="captureLead()" class="btn-primary">

Get Full Security Report

</button>
`;

}

catch{

document.getElementById("results").innerHTML="Scan failed.";

}

}

function captureLead(){

let email=prompt("Enter email to receive full report");

if(email){

alert("Report will be sent to "+email);

}

}
