let library = [];

function Book(title, author, content, read) {
    this.title = title
    this.author = author
    this.content = content
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
        bookText.textContent = `"${library[element.dataset.index].title}" by ${library[element.dataset.index].author}`
        element.append(bookText)

        document.querySelector(".bookList").append(element)

        // Create Delete Book Buttons
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

function addBook(title, author, content, read) {
    const newBook = new Book(title, author, content, read)
    library.push(newBook)
    createBookList()

    let newBookIndex = library.length - 1
    document.querySelector(`[data-index='${newBookIndex}']`).click()
}

function displayNewBookForm() {
    let toggleFormArray = [document.querySelector("#closeForm"), document.querySelector("#addBook")]
    let newBookForm = document.querySelector(".newBookForm")
    for (let btn of toggleFormArray) {
        btn.addEventListener("click", (e) => {
            if (newBookForm.style.visibility === 'visible') {
                newBookForm.style.visibility = "hidden"
                newBookForm.style.display = 'none'
            } else {
                newBookForm.style.visibility = "visible"
                newBookForm.style.display = 'flex'
            }
            if (e.target === document.querySelector('#closeForm')) {document.querySelector('#missingInfo').style.visibility = 'hidden'}
        })
    }
}

function showBookList() {
    let bookList = document.querySelector(".bookList")
    bookList.style.visibility === "visible" ? bookList.style.visibility = "hidden" : bookList.style.visibility = "visible"
}

function displayActiveContent(book) {
    // Prevents error if book has not been added to library yet
    if (!library[book.dataset.index]) {
        console.log('book was deleted')
    } else {

        // Create Book Content
        let readingArea = document.querySelector('.readingArea')
        let bookObject = library[book.dataset.index]
        let bookTitleElement = document.createElement('H1')
        let bookTitleText = document.createTextNode(bookObject.title)
        let bookAuthorDiv = document.createElement('div')
        let hLine = document.createElement('hr')
        bookAuthorDiv.setAttribute('class', 'activeAuthor')
        bookAuthorDiv.textContent = `by ${bookObject.author}`
        bookTitleElement.append(bookTitleText, bookAuthorDiv, hLine)

        // Create Book status tags
        let tagElement = document.createElement('div')
        tagElement.setAttribute('class', 'bookTags')
        let readStatusTag = document.createElement('button')
        readStatusTag.setAttribute('class', 'readStatusButton tagBtn')
        readStatusTag.textContent = bookObject.read ? 'Completed' : 'Unfinished'
        let editContentBtn = document.createElement('button')
        editContentBtn.setAttribute('class', 'editBtn tagBtn')
        editContentBtn.innerHTML = `<i class="fas fa-edit"></i>`
        tagElement.append(readStatusTag, editContentBtn)

        // Create div for Book Content and Tags to go into
        let element = document.createElement('div')
        element.setAttribute('id', 'activeContent')
        element.innerHTML = bookObject.content
        if (readingArea.childNodes.length > 0) {
            while (readingArea.firstChild) {readingArea.removeChild(readingArea.firstChild)}
            readingArea.append(tagElement, bookTitleElement, element)
        } else {readingArea.append(tagElement, bookTitleElement, element)}

        listenReadStatusButton()
        listenEditContent()
        listenUpdateBook()
    }
}

// Listeners

function listenHideListOnClickAway() {
    document.querySelector('.windowContent').addEventListener('click', () => {
        let bookList = document.querySelector('.bookList')
        if (bookList.style.visibility === 'visible') {bookList.style.visibility = 'hidden'}
    })
}

function listenBookListBtn() {
    document.querySelector("#bookListBtn").addEventListener("click", () => {
        showBookList();
    })
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
            document.querySelector('.bookList').style.visibility = 'hidden'
        })
    }
}

function listenReadStatusButton () {
    let readButton = document.querySelector('.readStatusButton')
    let activeBookIndex = document.querySelector('.activeBook').dataset.index
    library[activeBookIndex].read ? readButton.style.backgroundColor = 'lightgreen' : readButton.style.backgroundColor = 'white'
    readButton.addEventListener('click', () => {
        library[activeBookIndex].read === true ? library[activeBookIndex].read = false : library[activeBookIndex].read = true
        readButton.textContent === 'Completed' ? readButton.textContent = 'Unfinished' : readButton.textContent = 'Completed'
        if (library[activeBookIndex].read === true) {
            readButton.style.backgroundColor = 'lightgreen'
        } else {
            readButton.style.backgroundColor = 'white'
        }
    })
}

function listenSubmitBook() {
    document.querySelector("#submitBook").addEventListener("click", () => {
        let title = document.querySelector("#newTitle").value 
        let author = document.querySelector("#newAuthor").value
        let content = tinymce.activeEditor.getContent()
        let read = document.querySelector('#newCompleted').checked

        if (title === ''||author === ''||content === '') {
            document.querySelector('#missingInfo').style.visibility = 'visible'
        } else {
            addBook(title, author, content, read)
            document.querySelector('#missingInfo').style.visibility = 'hidden'
            document.querySelector("#closeForm").click()
        }
    })
}

function listenEditContent() {
    document.querySelector('.editBtn').addEventListener('click', () => {
        let book = library[document.querySelector('.activeBook').dataset.index]
        let title = book.title
        let author = book.author
        let content = book.content
        let read = book.read

        document.querySelector('#addBook').click()

        document.querySelector('#newTitle').value = title
        document.querySelector('#newAuthor').value = author
        tinymce.activeEditor.setContent(content)
        document.querySelector('#newCompleted').checked = read

    })
}

function listenUpdateBook() {
    let book = library[document.querySelector('.activeBook').dataset.index]
    let title = document.querySelector("#newTitle").value 
    let author = document.querySelector("#newAuthor").value
    let content = tinymce.activeEditor.getContent()

    document.querySelector('#updateBook').addEventListener('click', () => {
        if (title === ''||author === ''||content === '') {
            document.querySelector('#missingInfo').style.visibility = 'visible'
        } else {
            book.title = document.querySelector('#newTitle').value
            book.author = document.querySelector('#newAuthor').value
            book.content = tinymce.activeEditor.getContent(content)
            book.read = document.querySelector('#newCompleted').checked
            document.querySelector('#missingInfo').style.visibility = 'hidden'
            displayActiveContent(document.querySelector('.activeBook'))
            createBookList()
            document.querySelector(`[data-index='${library.indexOf(book)}']`).classList.toggle('activeBook')
            document.querySelector("#closeForm").click()
        }
    })
}

// Initial Function Calls
createBookList()
listenBookListBtn()
listenHideListOnClickAway()
listenActiveBook()
listenSubmitBook()
displayNewBookForm()