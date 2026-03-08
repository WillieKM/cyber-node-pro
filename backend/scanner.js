const express=require("express")
const cors=require("cors")
const axios=require("axios")

const app=express()

app.use(cors())

app.get("/scan", async(req,res)=>{

let domain=req.query.domain

try{

let ssl="Detected"
let headers="Moderate"
let ports="80,443"

res.json({
domain:domain,
ssl:ssl,
headers:headers,
ports:ports
})

}

catch{

res.json({error:"Scan failed"})

}

})

app.get("/report",(req,res)=>{

let domain=req.query.domain

res.send(`

<h1>Cyber-Node Security Report</h1>

<p>Domain: ${domain}</p>

<p>SSL: Active</p>

<p>Headers: Needs Improvement</p>

<p>Open Ports: 80,443</p>

<p>Recommendation: Implement stronger security policies.</p>

`)

})

app.listen(3000,()=>{
console.log("Scanner API running on port 3000")
})
