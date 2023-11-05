document.addEventListener('DOMContentLoaded', function () {
$.ajax("/user", {
  type: "GET",
  success: function(data) {
    console.log(data)
      const tbody = $("#data-output"); 
      tbody.empty();
      data.forEach(item => {
          const row = $("<tr>");
          row.html(`
              <td>${item.username}</td>
              <td>${item.email}</td>
              <td>${item.inTime}</td>
              <td>${item.outTime}</td>
              <td>${item.NumberPlate}</td>
              <td>${item.PayableAmount}</td>
          `);
          tbody.append(row);
      });
  },
  error: function(jqXHR, textStatus, errorThrown) {
      console.error("Error: " + errorThrown);
  }
});
})
// document.addEventListener('DOMContentLoaded', function () {
  // let p = fetch('http://localhost:3000/user')
  //     p.then((response) =>{ return response})
  //     .then(data => {
  //         // const tbody = document.querySelector('#data-output');
  //         console.log(data)
  //         // Loop through the JSON data and create table rows
  //         data.forEach(item => {
  //             const row = document.createElement('tr');
  //             row.innerHTML = `
  //                 <td>${item.username}</td>
  //                 <td>${item.email}</td>
  //                 <td>${item.number_plate}</td>
  //                 <td>${item.in_time}</td>
  //                 <td>${item.out_time}</td>
  //             `;
  //             tbody.appendChild(row);
          // });
      // })
      // .catch(error => {
      //     console.error('Error fetching data:', error);
      // });
// });

// // $.ajax("/view", {
// //   type: "POST",

// // fetch("products.json")
// // .then(function(response){
// //    return response.json();
// // })
// // .then(function(products){
// //    let placeholder = document.querySelector("#data-output");
// //    let out = "";
// //    for(let product of products){
// //       out += `
// //          <tr>
// //             <td> <img src='${product.image}'> </td>
// //             <td>${product.name}</td>
// //             <td>${product.price}</td>
// //             <td>${product.inventory}</td>
// //             <td>${product.productCode}</td>
// //          </tr>
// //       `;
// //    } 
// //    placeholder.innerHTML = out;
// // });