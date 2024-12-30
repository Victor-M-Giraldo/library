const openModal = document.querySelector("#add-book");
const closeModal = document.querySelector("#close-modal");
const modal = document.querySelector("#dialog");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
const libraryContainer = document.querySelector(".library");

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
    }

    toggleReadStatus() {
        this.read = !this.read;
    }
}

const library = [
    new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, true),
    new Book('To Kill a Mockingbird', 'Harper Lee', 281, false),
    new Book('1984', 'George Orwell', 328, true),
    new Book('Pride and Prejudice', 'Jane Austen', 279, false),
    new Book('The Catcher in the Rye', 'J.D. Salinger', 214, true),
];

library.forEach((book) => addBookToDom(book));


openModal.addEventListener('click', (e) => {
    modal.showModal();
});

closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.close();
    if (title.value !== '' && author.value !== '' && pages.value !== '') {
        const book = new Book(title.value, author.value, parseInt(pages.value), read.checked);
        addBookToLibrary(book);
        resetForm();
    }
});

function addBookToLibrary(book) {
    if (!(book instanceof Book)) {
        throw new Error('Book must be an instance of Book');
    }
    library.push(book);
    addBookToDom(book);
}

function resetForm() {
    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
}

function addBookToDom(book) {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    const bookTitle = document.createElement('h2');
    bookTitle.classList.add('book-title');
    bookTitle.textContent = book.title;
    const bookAuthor = document.createElement('h3');
    bookAuthor.classList.add('book-author');
    bookAuthor.textContent = `By: ${book.author}`;
    const bookPages = document.createElement('p');
    bookPages.classList.add('book-pages');
    bookPages.textContent = `${book.pages} pages.`;
    const bookRead = document.createElement('button');
    bookRead.classList.add('book-read');
    bookRead.textContent = book.read ? 'Read' : 'Not Read';
    if (book.read) {
        bookRead.classList.add('read');
    } else {
        bookRead.classList.add('not-read');
    }
    bookRead.addEventListener('click', (e) => {
        book.toggleReadStatus();
        bookRead.textContent = book.read ? 'Read' : 'Not Read';
        if (book.read) {
            bookRead.classList.remove('not-read');
            bookRead.classList.add('read');
        } else {
            bookRead.classList.remove('read');
            bookRead.classList.add('not-read');
        }
    });
    const bookRemove = document.createElement('button');
    bookRemove.textContent = 'Remove';
    bookRemove.classList.add('book-remove');

    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(bookPages);
    bookDiv.appendChild(bookRead);
    bookDiv.appendChild(bookRemove);
    libraryContainer.appendChild(bookDiv);
    bookRemove.addEventListener('click', (e) => {
        library.splice(library.indexOf(book), 1);
        libraryContainer.removeChild(bookDiv);
    });
}
