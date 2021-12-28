let myLinks = []

const input = document.getElementById('input-el')
const saveBtn = document.getElementById('save-btn')
const ulList = document.getElementById('ul-element')
const deleteBtn = document.getElementById('del-btn')
const tabBtn = document.getElementById('save-tab-btn')

const linksFromLocalStorage =  JSON.parse(localStorage.getItem("database"))

if (linksFromLocalStorage) {
    myLinks = linksFromLocalStorage
    render(myLinks)
}

function render(links) {
    let listItem = ''
    for (let i = 0; i < links.length; i++) {
        //listItem += "<li>" + "<a target='_blank' href='" + myLinks[i] + "'>" + myLinks[i]+ "</a>" + "</li>"
        listItem += `
        <li>
            <a target="_blank" href="${links[i]}">${links[i]}</a>
        </li>
        `
    }
    ulList.innerHTML = listItem
}

tabBtn.addEventListener('click', function() {
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // });
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLinks.push(tabs[0].url)
        localStorage.setItem("database",JSON.stringify(myLinks))
        render(myLinks)
    })
})

deleteBtn.addEventListener('dblclick', function() {
    localStorage.clear()
    myLinks = []
    render(myLinks)
})

saveBtn.addEventListener('click', function() {
    myLinks.push(input.value)
    input.value = ''
    // Localstorge function only use a string
    localStorage.setItem("database",JSON.stringify(myLinks))
    render(myLinks)
})