let library = [
    {title: 'Dogwood', author: 'Alex H.', content: 'This story is about a dog lost in the woods. He dies in the end.', pageCount: 295, read: false},
    {title: 'Asseating Lessons', author: 'You', content: 'This book teaches the graceful art of eating ass.', pageCount: 450, read: false}
];

function Book(title, author, content, pageCount, read) {
    this.title = title
    this.author = author
    this.content = content
    this.pageCount = pageCount
    this.read = read
}

function createBookList() {
    document.querySelectorAll(".book").forEach((book) => {book.remove()})
    
    for (let book of library) {
        // Create Text in Book List
        let element = document.createElement('div')
        element.setAttribute('data-index', library.indexOf(book))
        element.setAttribute('class', 'book')

        let bookText = document.createElement('div')
        bookText.setAttribute('id', 'bookText')
        bookText.textContent = `${library[element.dataset.index].title} by ${library[element.dataset.index].author}`
        element.append(bookText)

        document.querySelector(".bookList").append(element)

        // Create Edit/Remove Buttons
        let btnRemove = document.createElement('button')
        btnRemove.setAttribute('class', 'removeBook')
        btnRemove.innerHTML = '<i class="fas fa-trash"></i>'
        element.append(btnRemove)
    }

    // Set Remove Book Listener for each Book Element
    document.querySelectorAll('.removeBook').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let element = e.target.parentNode
            let index = Number(element.dataset.index)
            console.log(library)
            console.log(index)
            library.splice(index, 1)
            createBookList()
        })
    })

    // Create Book List Header with Library Book Count
    let bookListHeader = document.querySelector('.bookListHeader')
    bookListHeader.removeChild(bookListHeader.firstChild)

    let libraryHeader = document.createElement('H3')
    let libraryTextHeader = document.createTextNode(`My Library [${library.length}]`)
    libraryHeader.append(libraryTextHeader)
    bookListHeader.insertBefore(libraryHeader, document.querySelector('#addBookDiv'))

    listenActiveBook()
}

function addBook(title, author, content, pageCount, read) {
    const newBook = new Book(title, author, content, pageCount, read)
    console.log(newBook)
    library.push(newBook)
    createBookList()
}

function displayNewBookForm() {
    let toggleFormArray = [document.querySelector("#closeForm"), document.querySelector("#addBook")]
    let newBookForm = document.querySelector(".newBookForm")
    for (let btn of toggleFormArray) {
        btn.addEventListener("click", (e) => {
            newBookForm.style.visibility === "visible" ? newBookForm.style.visibility = "hidden" : newBookForm.style.visibility = "visible"
            if (e.target === document.querySelector('#closeForm')) {document.querySelector('#missingInfo').style.visibility = 'hidden'}
        })
    }
}

// Listeners
function showBookList() {
    let bookList = document.querySelector(".bookList")
    bookList.style.visibility === "visible" ? bookList.style.visibility = "hidden" : bookList.style.visibility = "visible"
}

function listenBookListBtn() {
    document.querySelector("#bookListBtn").addEventListener("click", () => {
        showBookList();
    })
}

function displayActiveContent(book) {
    let readingArea = document.querySelector('.readingArea')
    let bookObject = library[book.dataset.index]
    let bookTitleElement = document.createElement('H1')
    let bookTitleText = document.createTextNode(bookObject.title)
    bookTitleElement.append(bookTitleText)
    let element = document.createElement('div')
    element.setAttribute('id', 'activeContent')
    element.textContent = bookObject.content
    if (readingArea.childNodes.length > 0) {
        while (readingArea.firstChild) {readingArea.removeChild(readingArea.firstChild)}
        readingArea.append(bookTitleElement, element)
    } else {readingArea.append(bookTitleElement, element)}
}
function listenActiveBook() {
    let bookList = document.querySelectorAll(".book")
    for (let book of bookList) {
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

function listenSubmitBook() {
    document.querySelector("#submitBook").addEventListener("click", () => {
        let title = document.querySelector("#newTitle").value 
        let author = document.querySelector("#newAuthor").value
        let content = document.querySelector("#newContent").value
        let pageCount = document.querySelector('#newPageCount').value
        let read = document.querySelector('#newCompleted').checked

        if (title === ''||author === ''||content === ''||pageCount === '') {
            document.querySelector('#missingInfo').style.visibility = 'visible'
        } else {
            addBook(title, author, content, pageCount, read)
            document.querySelector('#missingInfo').style.visibility = 'hidden'
            document.querySelector("#closeForm").click()
        }
    })
}

// Initial Function Calls
createBookList()
listenBookListBtn()
listenActiveBook()
listenSubmitBook()
displayNewBookForm()