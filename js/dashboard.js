let scans = JSON.parse(localStorage.getItem("scans") || "[]")

scans.forEach(scan=>{

let row = document.createElement("tr")

row.innerHTML=`
<td>${scan.domain}</td>
<td>${scan.score}</td>
<td>${scan.score>85?"Low":"Moderate"}</td>
<td>${scan.date}</td>
`

document.querySelector("table").appendChild(row)

})
