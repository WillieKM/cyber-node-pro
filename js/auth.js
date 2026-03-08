function login(){

let email=document.getElementById("email").value
let password=document.getElementById("password").value

firebase.auth()
.signInWithEmailAndPassword(email,password)
.then(()=>{

window.location="dashboard.html"

})
.catch(error=>{

alert(error.message)

})

}
