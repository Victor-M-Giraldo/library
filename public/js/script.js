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
