// ES5

// book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// ui Constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    // Create TR Element
    const row = document.createElement('tr');
    // insert Cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>`;

    list.appendChild(row);
}

// show alertts
UI.prototype.showAlert = function (message, className) {
    // CREATE DIV
    const div = document.createElement('div');
    // add classes
    div.className = `alert ${className}`;
    // Add Text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // insert alert
    container.insertBefore(div, form);

    // time out after 3 seconds
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
}

// Delete book 
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// Clear Fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}


// Event Listeners for Adding book
document.getElementById('book-form').addEventListener('submit',
    function (e) {
        // get form values
        const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value

        //instantiate Book
        const book = new Book(title, author, isbn);

        //instantiate ui
        const ui = new UI();

        // validate
        if (title === '' || author === '' || isbn === '') {
            // error alert 
            ui.showAlert('Please fill in all fields', 'error');
        } else {
            // Add Book to list
            ui.addBookToList(book);

            // Show Succes
            ui.showAlert('Book Added!', 'success')

            // Clear fields
            ui.clearFields();
        }

        e.preventDefault();
    });

// EVENT LISTNER FOR DELETE
document.getElementById('book-list').addEventListener('click', function (e) {
    //instantiate ui
    const ui = new UI();
    // delete book
    ui.deleteBook(e.target);

    // show alert message
    // this is the original code that displayed the 'book removed' message when clicking anywhere in the <tr> element
    // -------- ui.showAlert('Book Removed!', 'success');---------

    // new code that removes the message and only displays when clicking the X
    if (e.target.className !== 'delete') {
        //here we do nothing
    } else {
        // now we show the message
        ui.showAlert('Book Removed!', 'success');
    }
    e.preventDefault();
});