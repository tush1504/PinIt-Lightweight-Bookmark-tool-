let myarr = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const arrFromLocalStorage = JSON.parse( localStorage.getItem("myarr") )
const tabBtn = document.getElementById("tab-btn")

if (arrFromLocalStorage) {
    myarr = arrFromLocalStorage
    render(myarr)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myarr.push(tabs[0].url)
        localStorage.setItem("myarr", JSON.stringify(myarr) )
        render(myarr)
    })
})

function render(arr) {
  let listItems = ""
  for (let i = 0; i < arr.length; i++) {
    listItems += `
      <li>
        <a target='_blank' href='${arr[i]}'>${arr[i]}</a>
        <button class="delete-entry" data-index="${i}">🗑️</button>
      </li>
    `
  }
  ulEl.innerHTML = listItems

  const deleteButtons = document.querySelectorAll(".delete-entry")
  deleteButtons.forEach(button => {
    button.addEventListener("click", function() {
      const index = this.getAttribute("data-index")
      deleteLead(Number(index))
    })
  })
}

function deleteLead(index) {
    myarr.splice(index, 1)
    localStorage.setItem("myarr", JSON.stringify(myarr)) 
    render(myarr) 
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myarr = []
    render(myarr)
})

inputBtn.addEventListener("click", function() {
    const trimmedValue = inputEl.value.trim();  
    if (trimmedValue) {
        myarr.push(trimmedValue);               
        localStorage.setItem("myarr", JSON.stringify(myarr)); 
        render(myarr);                        
    }
    inputEl.value = "";                     
});