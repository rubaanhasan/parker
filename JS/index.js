// let elem=document.getElementById("Start1")
// let yourDate = new Date().toLocaleDateString('en-CA')
// elem.setAttribute("value",yourDate)
// elem.setAttribute("max",yourDate)
// elem.setAttribute("min",yourDate)

// elem=document.getElementById("Start2")
// yourDate = new Date().toLocaleDateString('en-CA')
// elem.setAttribute("value",yourDate)
// elem.setAttribute("max",yourDate)
// elem.setAttribute("min",yourDate)

// elem=document.getElementById("Start3")
// yourDate = new Date().toLocaleDateString('en-CA')
// elem.setAttribute("value",yourDate)
// elem.setAttribute("max",yourDate)
// elem.setAttribute("min",yourDate)

// elem=document.getElementById("Start4")
// yourDate = new Date().toLocaleDateString('en-CA')
// elem.setAttribute("value",yourDate)
// elem.setAttribute("max",yourDate)
// elem.setAttribute("min",yourDate)

let elem3=document.getElementById("Availability5");
const prevHTML=elem3.innerHTML;
document.getElementsByClassName("prebook")[0].addEventListener('click',function(e){
let elem=document.getElementById("Availability5");    
elem.innerHTML="<b>Please Login before you Prebook!</b>";
setTimeout(function(){
    elem.innerHTML=prevHTML;
},2000)
})
document.getElementsByClassName("prebook")[1].addEventListener('click',function(e){
    let elem=document.getElementById("Availability6");    
    elem.innerHTML="<b>Please Login before you Prebook!</b>";
    setTimeout(function(){
        elem.innerHTML=prevHTML;
    },2000)
})
document.getElementsByClassName("prebook")[2].addEventListener('click',function(e){
    let elem=document.getElementById("Availability7");    
    elem.innerHTML="<b>Please Login before you Prebook!</b>";
    setTimeout(function(){
        elem.innerHTML=prevHTML;
    },2000)
})
document.getElementsByClassName("prebook")[3].addEventListener('click',function(e){
    let elem=document.getElementById("Availability8");    
    elem.innerHTML="<b>Please Login before you Prebook!</b>";
    setTimeout(function(){
        elem.innerHTML=prevHTML;
    },2000)
})
