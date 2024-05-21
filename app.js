const SubmitForm = document.querySelector("#Submit-form");
let submitBtn = document.querySelector("#submitBtn")
const CarsSection = document.querySelector("#section-show")
let array = JSON.parse(localStorage.getItem("array")) || []
const search = document.querySelector("#search")
let model = document.querySelector("#model")
let name = document.querySelector("#name")
let year = document.querySelector("#year")
let color = document.querySelector("#color")
let price = document.querySelector("#price")
let img = document.querySelector("#img")
let Stock = document.querySelector("#Stock")
const deleteInput = document.querySelector("#delete")
const submitlistng = document.querySelector("#submit-listing")
const sort = document.querySelector("#Sort")
const Recommend = document.querySelector("#recommend")
const searbar = document.querySelector("#delete-input")
submitlistng.addEventListener("click", () => {
    searbar.style = ("display: block")
    SubmitForm.classList.toggle("show-form")
})

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const obj = {
        id: Math.floor(Math.random() * 1000),
        model: model.value,
        name: name.value,
        year: year.value,
        color: color.value,
        price: price.value,
        img: img.value,
        Stock: Stock.value
    }
    if (obj.model === "" || obj.name === "" || obj.year === "" || obj.color === "" || obj.price === "" || obj.img === "" || obj.Stock === "") {
        alert("Bush qolgan joyni tuldiring")
    }
    model.value = ''
    name.value = ''
    year.value = ''
    color.value = ''
    price.value = ''
    img.value = ''
    Stock.value = ''
    array.push(obj)
    console.log(array);
    localStorage.setItem("array", JSON.stringify(array))
    renderData(array)

})

function renderData(array) {
    CarsSection.innerHTML = ''
    while (CarsSection.firstChild) {
        CarsSection.firstChild.remove()
    }
    array.forEach((element) => {
        const DivFragment = document.createDocumentFragment()
        const div = document.createElement("div")
        const del = document.createElement("button")
        del.addEventListener('click', () => {
            const result = array.filter(item => item.id !== element.id)
            localStorage.setItem("array", JSON.stringify(result))
            renderData(result)


        })
        del.innerHTML = 'Delete'
        del.className = 'delete'
        div.className = 'car-item'
        div.innerHTML = `
        <img  src='${element.img}'/>
        <h3>model: ${element.model}</h3>
        <h2>ISMI: ${element.name}   ID:${element.id}</h2>
        <p>YILI: ${element.year}</p>
        <p>RANGI: ${element.color}</p>
        <p>NARXI: ${element.price}</p>
        <p>SONI: ${element.Stock}</p>
        
        `

        div.appendChild(del)
        DivFragment.appendChild(div)
        CarsSection.appendChild(DivFragment)
    }
    )
}

renderData(array)

search.addEventListener('input', () => {

    console.log(search.value);
    const result = array.filter(item => item.model.toLowerCase().includes(search.value.toLowerCase()))
    if (result.length > 0) {
        renderData(result)
        Recommend.style = "display: none"
    } else if (search.value == 0) {
        Recommend.style = "display: none"
    }
    else {
        Recommend.style = "display: block"
        renderData(array)
    }
    renderData(result)

})

let sortList = false;

sort.addEventListener('click', () => {
    sortedlist();
});

const sortedlist = function () {
    if (!sortList) {
        array.sort((a, b) => a.Stock - b.Stock);
        sortList = true
    } else {
        array.sort((a, b) => b.Stock - a.Stock);
        sortList = false
    }
    renderData(array);
}

