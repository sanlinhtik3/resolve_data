const product_name = document.getElementById("product");
const price = document.getElementById("price");
const quantity = document.getElementById("quantity");

let products_DB = [];
const LS = () => {
  localStorage.setItem("prodcut", JSON.stringify(products_DB));
};

const calculateTotalCost = () => {
  const total_price = products_DB.map((value) => value.total);
  let total = 0;
  for (const val of total_price) {
    total += val;
  }
  document.getElementById("total-cost").innerHTML = total;
  console.log(total);
};

const addToTable = (prodcut) => {
  const tr = document.createElement("tr");
  for (const value of Object.values(prodcut)) {
    const td = document.createElement("td");
    td.innerText = value;
    tr.appendChild(td);
    // console.log(tr);
  }
  console.log(document.getElementById("list").appendChild(tr));
};

const frmClear = () => {
  document.getElementById("product").value = "";
  document.getElementById("price").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("product").focus();
};

// document.getElementById("frm").onsubmit = (e) => {
//   e.preventDefault();
//   const total = quantity.value * price.value;
//   const rowNo = products_DB.length + 1 + ".";
//   const product = {
//     rowNo,
//     product_name: product_name.value,
//     price: Number(price.value),
//     quantity: Number(quantity.value),
//     total,
//   };
//   products_DB.push(product);
//   addToTable({ ...product });
//   frmClear();
//   calculateTotalCost();
//   LS();
// };

document.getElementById("frm").addEventListener('submit', (e) => {
    // e.preventDefault();
    const total = quantity.value * price.value;
    const rowNo = products_DB.length + 1 + ".";
    const product = {
      rowNo,
      product_name: product_name.value,
      price: Number(price.value),
      quantity: Number(quantity.value),
      total,
    };
    products_DB.push(product);
    addToTable({ ...product });
    frmClear();
    calculateTotalCost();
    LS();
})

document.addEventListener("DOMContentLoaded", () => {
  const LS_Data = JSON.parse(localStorage.getItem("prodcut"));

  // console.log(LS_Data);

  if (LS_Data) {
    LS_Data.forEach(({ rowNo, product_name, price, quantity, total }) => {
      const newProduct = { rowNo, product_name, price, quantity, total };
      // console.log(newProduct);
      // const td=document.createElement("td")
      // td.innerText=newProduct;
      const tr = addToTable(newProduct);
      // console.log(tr);
      // console.log(document.getElementById('list').appendChild(tr))
      products_DB.push({ rowNo, product_name, price, quantity, total });
      calculateTotalCost();

      // Test
      console.log(products_DB.map((apv) => apv.product_name));

      let myChart = document.getElementById("myChart").getContext("2d");
      let barChart = new Chart(myChart, {
        type: "bar",
        data: {
          labels: products_DB.map((apv) => apv.product_name),
          datasets: [
            {
              label: "Best Seller",
                data: products_DB.map((apv) => apv.quantity),
            },
          ],
        },
      });
    });
  }
});
