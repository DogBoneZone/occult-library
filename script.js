let library = [
    {title: 'Dogwood', author: 'Alex H.', content: 'This story is about a dog lost in the woods. He dies in the end.', read: true},
    {title: 'Asseating Lessons', author: 'You', content: 'This book teaches the graceful art of eating ass.', read: false}
];

function Book(title, author, content, read) {
    this.title = title
    this.author = author
    this.content = content
    this.read = read
}

function createBookList() {
    // Add Index Attribute
    for (let book of library) {
        let element = document.createElement('div')
        element.setAttribute('data-index', library.indexOf(book))
        element.setAttribute('class', 'book')
        element.textContent = `${library[element.dataset.index].title} by ${library[element.dataset.index].author}`
        document.querySelector(".bookList").append(element)
    }
}

function showBookList() {
    let bookList = document.querySelector(".bookList")
    bookList.style.visibility === "visible" ? bookList.style.visibility = "hidden" : bookList.style.visibility = "visible"
}

function addBook() {
    let addBook = document.querySelector("#addBook")
}

function displayActiveContent(book) {
    let windowContent = document.querySelector('.windowContent')
    let bookContent = library[book.dataset.index].content
    let element = document.createElement('div')
    element.setAttribute('id', 'activeContent')
    element.textContent = bookContent
    if (windowContent.childNodes.length > 0) {
        windowContent.removeChild(windowContent.firstChild)
        windowContent.append(element)
    } else {windowContent.append(element)}
}

// Listeners
function addListeners() {
    document.querySelector("#bookListBtn").addEventListener("click", () => {
        showBookList();
    })

    document.querySelector(".windowContent").addEventListener("click", () => {
        showBookList();
    })

    // Set Active Book Class
    let bookList = document.querySelectorAll(".book")
    for (let book of bookList) {
        console.log(book)
        book.addEventListener("click", (e) => {
            let activeBookList = document.querySelectorAll(".activeBook")
            if (activeBookList.length === 0) {
                book.classList.toggle("activeBook")
                displayActiveContent(book)
            } else if (activeBookList.length > 0 && !e.target.classList.contains('activeBook')) {
                document.querySelector(".activeBook").classList.toggle('activeBook')
                book.classList.toggle("activeBook")
                displayActiveContent(book)
            }
        })
    }
}

createBookList()
addListeners()