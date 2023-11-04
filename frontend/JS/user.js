fetch("/JS/user2.json")
    .then(function(response){
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(function(products){
        let placeholder = document.querySelector("#data-output2");
        let out = "";
        for(let product of products){
            out += `
            <tr>
            <td>${product.numberplate}</td>
            <td>${product.in-time}</td>
            <td>${product.out-time}</td>
            <td>${product.date}</td>
            <td>${product.status}</td>
            </tr>
            `;
        }

        placeholder.innerHTML = out;
    })
    .catch(function(error) {
        console.error('There was a problem with the fetch operation:', error);
    });