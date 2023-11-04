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

  const obj = {
    inTime,
    outTime,
    numberPlate,
  };
  console.log(obj);

  $.ajax("/view", {
    type: "POST", // http method
    data: { obj }, // data to submit
    success: function (data, status, xhr) {
      $("p").append("status: " + status + ", data: " + data);
    },
    error: function (jqXhr, textStatus, errorMessage) {
      $("p").append("Error" + errorMessage);
    },
  });
  //   axios.post("http://localhost:3000/view", obj).then((res) => {
  //     console.log(res);
  //   });
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
  //   //   document.getElementById("MallNumber").setAttribute("value", "1");
  document.getElementById("SubmitForm").click();
  // //   await sleep(1000);
  //   //   console.log(3);
  //   $(document).ready(function (e) {
  //     // $(".pay-form2").submit(function (e) {
  //       e.preventDefault();

  //       var formData = $(this).serialize();

  //       $.ajax({
  //         url: "/createOrder",
  //         type: "POST",
  //         data: formData,
  //         success: function (res) {
  //           if (res.success) {
  //             var options = {
  //               key: "" + "rzp_test_a1bgTfOzP7ZaC4" + "",
  //               amount: "" + res.amount + "",
  //               currency: "INR",
  //               //"name": ""+res.product_name+"",
  //               description: "" + res.description + "",
  //               //"image": "https://dummyimage.com/600x400/000/fff",
  //               order_id: "" + res.order_id + "",
  //               handler: function (response) {
  //                 alert("Payment Succeeded");
  //                 // window.open("/","_self")
  //               },
  //               prefill: {
  //                 contact: "" + res.contact + "",
  //                 name: "" + res.name + "",
  //                 email: "" + res.email + "",
  //               },
  //               notes: {
  //                 description: "" + res.description + "",
  //               },
  //               theme: {
  //                 color: "#2300a3",
  //               },
  //             };
  //             var razorpayObject = new window.Razorpay(options);
  //             razorpayObject.on("payment.failed", function (response) {
  //               alert("Payment Failed");
  //             });
  //             razorpayObject.open();
  //             e.preventDefault();
  //           } else {
  //             alert(res.msg);
  //           }
  //         },
  //       });
  //   });
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
