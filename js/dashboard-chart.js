let scans = JSON.parse(localStorage.getItem("scans") || "[]")

let labels = scans.map(s=>s.domain)
let scores = scans.map(s=>s.score)

new Chart(document.getElementById("riskChart"),{

type:"line",

data:{

labels:labels,

datasets:[{

label:"Security Score",

data:scores,

borderColor:"#3b82f6",
fill:false

}]

}

})
