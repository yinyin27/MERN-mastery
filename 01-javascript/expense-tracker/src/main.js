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
  const txnList = document.querySelector("#txn-list");
  txnList.innerHTML = "";
  const expenseList = transactions;
  expenseList.forEach((txn) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div 
        class="w-full text-md font-bold lg:font-semibold font-mono tracking-wider py-2 border border-gray-100 rounded-2xl px-5 flex flex-1 justify-between items-center bg-linear-to-br from-20% from-white via-50% via-gray-100 to-gray-200 to-100% hover:cursor-default hover:-translate-y-0.5 hover:shadow-sm active:animate-click transition-transform"
    >
        <p class="txn-title">${txn.expense}</p>
        <p class="amt">₹${txn.amount}</p>
    </div>
    `;
    transactionList.appendChild(li);
  });
}

function addTxn() {
  txnName.value = txnName.value.trim();
  const txnType = document.querySelector('input[name="expenseType"]:checked');

  if (txnName.value) {
    transactions.push({
      expense: txnName.value,
      amount: txnAmount.value,
      type: txnType.value,
      timestamp: timestamp.value,
    });
    renderTxns();
    addtxnForm.reset();
  }
}

addtxnForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTxn();
});

// initial render
renderTxns();
