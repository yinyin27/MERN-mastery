import "./style.css";

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
const txnName = document.querySelector("#txn-name");
const txnAmount = document.querySelector("#txn-amt");
const timestamp = document.querySelector("#timestamp");
const addtxnForm = document.querySelector("#add-txn-form");
// const showBalance = document.querySelector("#showBalance");
// const showBalBtn = document.querySelector("#balBtn");
const transactionList = document.querySelector("#txn-list");

// save function
function saveTxns() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// render function
function renderTxns() {
  const listContainer = document.getElementById("txn-list-container");

  if (transactions.length === 0) listContainer.classList.add("vanish");
  else listContainer.classList.remove("vanish");

  transactionList.innerHTML = "";
  const expenseList = transactions;
  expenseList.forEach((txn, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div 
        class="w-full relative text-md font-bold lg:font-semibold font-mono tracking-wider py-4 pb-6 border border-gray-100 rounded-2xl px-5 flex flex-1 justify-between items-center bg-linear-to-br from-20% from-white via-50% via-gray-100 to-gray-200 to-100% hover:cursor-default hover:-translate-y-0.5 hover:shadow-sm transition-transform"
    >
        <p class="txn-title text-sm xl:text-lg truncate w-30 xl:w-48">${txn.expense}</p>
        <div class="flex justify-center items-center gap-2.5">
        <p  class="amt tracking-wide ${txn.type === "credit" ? "text-green-600" : "text-red-600"} xl:text-lg">₹${txn.amount.toLocaleString("en-IN")}/-</p> 
        <button class="delete-txn-btn active:text-shadow-sm text-shadow-red-600 lg:hover:translate-y-0.5 lg:hover:animate-pulse active:animate-click transition-all" data-index="${index}"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,255.9978,255.9978">
<g fill="#14007d" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(8.53333,8.53333)"><path d="M14.98438,2.48633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v0.5h-5.5c-0.26757,-0.00363 -0.52543,0.10012 -0.71593,0.28805c-0.1905,0.18793 -0.29774,0.44436 -0.29774,0.71195h-1.48633c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h18c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-1.48633c0,-0.26759 -0.10724,-0.52403 -0.29774,-0.71195c-0.1905,-0.18793 -0.44836,-0.29168 -0.71593,-0.28805h-5.5v-0.5c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212zM6,9l1.79297,15.23438c0.118,1.007 0.97037,1.76563 1.98438,1.76563h10.44531c1.014,0 1.86538,-0.75862 1.98438,-1.76562l1.79297,-15.23437z"></path></g></g>
</svg></button>
        </div>
        <div class="absolute bottom-0.5 right-0.5 pr-2.5 pb-0.5 pt-2"><p class="text-xs font-light
        tracking-widest font-mono text-gray-700">${txn.date}</p></div>
    </div>
    `;
    transactionList.appendChild(li);
  });
}

function getToday() {
  const d = new Date();
  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  );
}

// function to add transactions
function addTxn() {
  txnName.value = txnName.value.trim();
  const txnType = document.querySelector('input[name="expenseType"]:checked');
  if (txnName.value) {
    transactions.push({
      expense: txnName.value,
      amount: parseFloat(txnAmount.value),
      type: txnType.value,
      date: timestamp.value || getToday(),
    });
    saveTxns();
    renderTxns();
    addtxnForm.reset();
  }
}

addtxnForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTxn();
});

// function to delete transactions

transactionList.addEventListener("click", (e) => {
  const btn = e.target.closest(".delete-txn-btn");
  if (btn) {
    const index = btn.dataset.index;
    transactions.splice(index, 1);
    saveTxns();
    renderTxns();
  }
});

// initial render
renderTxns();
