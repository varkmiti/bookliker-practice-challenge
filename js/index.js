URL = "http://localhost:3000/books"
const listPanel = document.querySelector("#list-panel")
const showPanel = document.querySelector("#show-panel")

fetch(URL)
.then(res => res.json())
.then(displayAllBooks)

function displayAllBooks(booksArray) {
    booksArray.forEach(book => listBook(book))
}

function listBook(book){
    const bookListing = document.createElement("li")

    bookListing.innerText = book.title

    bookListing.dataset.id = book.id

    bookListing.addEventListener("click", event => {
        showPanel.dataset.id = book.id

        const showPanelId = showPanel.dataset.id

        fetch(`${URL}/${showPanel.dataset.id}`)
        .then(res => res.json())
        .then(book => addUsers(book))


        showPanel.innerHTML = `<image src = ${book.img_url}><h2>${book.title}</h2>
        <h3>${book.author}</h3><p>${book.description}</p>`

        function addUsers(bookObj) {
            bookObj.users.forEach(user => {
                listUser = document.createElement("li")
                listUser.innerText = user.username
                showPanel.appendChild(listUser)
            })
        }

        const likeButton = document.createElement("button")
        likeButton.innerText = "LIKE"
        likeButton.setAttribute("id", "like-book")
        showPanel.appendChild(likeButton)

        likeButton.addEventListener("click", event => {
            
            if (likeButton.innerText == "LIKE") {
                likeButton.innerText = "UNLIKE"
                const yourUser = document.createElement("li")
                yourUser.setAttribute("id", "your-user")
                yourUser.innerText = "pouros"
                showPanel.appendChild(yourUser)
            } else {
                likeButton.innerText = "LIKE"
                const yourUser = document.querySelector('#your-user')
                yourUser.remove()
            }

        
        })

    })

    listPanel.appendChild(bookListing)
}