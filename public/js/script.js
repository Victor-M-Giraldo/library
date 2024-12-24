const openModal = document.querySelector("#add-book");
const closeModal = document.querySelector("#close-modal");
const modal = document.querySelector("#dialog");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");

const library = [];

function Book(title, author, pages, read) {
    if (typeof title !== 'string' || title === '') {
        throw new Error('Title must be a non-empty string');
    }

    if (typeof author !== 'string' || author === '') {
        throw new Error('Author must be a non-empty string');
    }

    if (typeof pages !== 'number' || pages <= 0) {
        throw new Error('Pages must be a positive number');
    }

    if (typeof read !== 'boolean') {
        throw new Error('Read must be a boolean');
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
}

openModal.addEventListener('click', (e) => {
    modal.showModal();
});

closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.close();
    if (title.value !== '' && author.value !== '' && pages.value !== '') {
        const book = new Book(title.value, author.value, parseInt(pages.value), read.checked);
        library.push(book);
        // Add book to the DOM.
    }
});
