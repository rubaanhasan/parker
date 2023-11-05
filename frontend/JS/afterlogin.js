// let elem=document.getElementById("Start1")
// let yourDate = new Date().toLocaleDateString('en-CA')
// elem.setAttribute("value",yourDate)
// elem.setAttribute("min",yourDate)
// elem.setAttribute("max",yourDate)

// elem=document.getElementById("Start2")
// yourDate = new Date().toLocaleDateString('en-CA')
// elem.setAttribute("value",yourDate)
// elem.setAttribute("min",yourDate)
// elem.setAttribute("max",yourDate)

// elem=document.getElementById("Start3")
// yourDate = new Date().toLocaleDateString('en-CA')
// elem.setAttribute("value",yourDate)
// elem.setAttribute("min",yourDate)
// elem.setAttribute("max",yourDate)

// elem=document.getElementById("Start4")
// yourDate = new Date().toLocaleDateString('en-CA')
// elem.setAttribute("value",yourDate)
// elem.setAttribute("min",yourDate)
// elem.setAttribute("max",yourDate)

// const axios = require("axios");

document.getElementById("Form1").addEventListener("click", function () {
  console.log("react");
  const inTime = document.getElementById("InTime").value;
  const outTime = document.getElementById("OutTime").value;
  const numberPlate = document.getElementById("NumberPlate").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  if(inTime==="" || outTime==="" || numberPlate==="")
  {
    let elem = document.getElementById("Availability1");
    let prevH1 = elem.innerHTML;
    elem.innerText="Invalid Input";
      setTimeout(function () {
        elem.innerHTML = prevH1;
      }, 2000);
    return;
  }
  const obj = {
    username,
    email,
    inTime,
    outTime,
    numberPlate,    
  };
  console.log(obj);

  $.ajax("/view", {
    type: "POST", 
    data:  obj ,
    success: function (data, status, xhr) {
      document.getElementById("Availability1").innerText=data.msg;
    },
    error: function (jqXhr, textStatus, errorMessage) {
      alert("jqxh = ", jqXhr, "error=", errorMessage);
    },
  });
});
document.getElementById("Form2").addEventListener("click", function () {
  console.log("react");
  const inTime = document.getElementById("InTime").value;
  const outTime = document.getElementById("OutTime").value;
  const numberPlate = document.getElementById("NumberPlate").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  if(inTime==="" || outTime==="" || numberPlate==="")
  {
    let elem = document.getElementById("Availability2");
    let prevH1 = elem.innerHTML;
    elem.innerText="Invalid Input";
      setTimeout(function () {
        elem.innerHTML = prevH1;
      }, 2000);
    return;
  }
  const obj = {
    username,
    email,
    inTime,
    outTime,
    numberPlate,    
  };
  console.log(obj);

  $.ajax("/view", {
    type: "POST",
    data: obj,
    success: function (data, status, xhr) {
      document.getElementById("Availability2").innerText = data.msg;
    },
    error: function (jqXhr, textStatus, errorMessage) {
      alert("jqxh = ", jqXhr, "error=", errorMessage);
    },
  });
});
document.getElementById("Form3").addEventListener("click", function () {
  console.log("react");
  const inTime = document.getElementById("InTime").value;
  const outTime = document.getElementById("OutTime").value;
  const numberPlate = document.getElementById("NumberPlate").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  if(inTime==="" || outTime==="" || numberPlate==="")
  {
    let elem = document.getElementById("Availability2");
    let prevH1 = elem.innerHTML;
    elem.innerText="Invalid Input";
      setTimeout(function () {
        elem.innerHTML = prevH1;
      }, 2000);
    return;
  }
  const obj = {
    username,
    email,
    inTime,
    outTime,
    numberPlate,    
  };
  console.log(obj);

  $.ajax("/view", {
    type: "POST",
    data: obj,
    success: function (data, status, xhr) {
      document.getElementById("Availability3").innerText = data.msg;
    },
    error: function (jqXhr, textStatus, errorMessage) {
      alert("jqxh = ", jqXhr, "error=", errorMessage);
    },
  });
});
document.getElementById("Form4").addEventListener("click", function () {
  console.log("react");
  const inTime = document.getElementById("InTime").value;
  const outTime = document.getElementById("OutTime").value;
  const numberPlate = document.getElementById("NumberPlate").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  if(inTime==="" || outTime==="" || numberPlate==="")
  {
    let elem = document.getElementById("Availability2");
    let prevH1 = elem.innerHTML;
    elem.innerText="Invalid Input";
      setTimeout(function () {
        elem.innerHTML = prevH1;
      }, 2000);
    return;
  }
  const obj = {
    username,
    email,
    inTime,
    outTime,
    numberPlate,    
  };
  console.log(obj);

  $.ajax("/view", {
    type: "POST",
    data: obj,
    success: function (data, status, xhr) {
      document.getElementById("Availability4").innerText = data.msg;
    },
    error: function (jqXhr, textStatus, errorMessage) {
      alert("jqxh = ", jqXhr, "error=", errorMessage);
    },
  });
});
// document.getElementById("Form1").addEventListener("click", function (e) {
//   document
//     .getElementById("AForm")
//     .setAttribute("action", "http://localhost:3000/view");
//   document.getElementById("MallNumber").setAttribute("value", "1");
//   document.getElementById("SubmitForm").click();
// });
// document.getElementById("Form2").addEventListener("click", function (e) {
//   document.getElementById("AForm").setAttribute("action", "http://localhost:3000/view");

//   document.getElementById("MallNumber").setAttribute("value", "2");
//   document.getElementById("SubmitForm").click();
// });
// document.getElementById("Form3").addEventListener("click", function (e) {
//   document.getElementById("AForm").setAttribute("action", "http://localhost:3000/view");

//   document.getElementById("MallNumber").setAttribute("value", "3");
//   document.getElementById("SubmitForm").click();
// });
// document.getElementById("Form4").addEventListener("click", function (e) {
//   document.getElementById("AForm").setAttribute("action", "http://localhost:3000/view");

//   document.getElementById("MallNumber").setAttribute("value", "4");
//   document.getElementById("SubmitForm").click();
// });
document.getElementById("Form5").addEventListener("click", function (e) {
  document.getElementById("SubmitForm").click();
});
document.getElementById("Form6").addEventListener("click", function (e) {
  document.getElementById("SubmitForm").click();
});
document.getElementById("Form7").addEventListener("click", function (e) {
  document.getElementById("SubmitForm").click();
});
document.getElementById("Form8").addEventListener("click", function (e) {
  document.getElementById("SubmitForm").click();
});
// document.getElementById("Form6").addEventListener("click", function (e) {
//   document.getElementById("MallNumber").setAttribute("value", "2");
//   document.getElementById("SubmitForm").click();
// });
// document.getElementById("Form7").addEventListener("click", function (e) {
//   document.getElementById("MallNumber").setAttribute("value", "3");
//   document.getElementById("SubmitForm").click();
// });
// document.getElementById("Form8").addEventListener("click", function (e) {
//   document.getElementById("MallNumber").setAttribute("value", "4");
//   document.getElementById("SubmitForm").click();
// });
