let labels=["Subdomains","Open Ports","DNS Records","Services"]

let data=[4,3,5,2]

new Chart(document.getElementById("surfaceChart"),{

type:"radar",

data:{
labels:labels,
datasets:[{
label:"Attack Surface",
data:data,
backgroundColor:"rgba(59,130,246,0.3)",
borderColor:"#3b82f6"
}]
}

})
