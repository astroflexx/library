const myLibrary = [];
const books = document.querySelector('.books');
const submitButton = document.querySelector('.btn');
const bookName = document.querySelector('.bookname');
const bookAuthor = document.querySelector('.bookauthor');
const numberOfPages = document.querySelector('.numberofpages');
const addNewBook = document.querySelector('.addNewBook');
const form = document.querySelector('form');

addNewBook.addEventListener('click', function () {
    form.classList.toggle('visible');
});

function Book(name, author, numberofpages) {
    this.name = name;
    this.author = author;
    this.numberofpages = numberofpages;
}

function createBook(bookDetails) {
    let book = document.createElement('div');
    book.classList.add('book');

    book.style.height = 'auto';
    book.style.marginBottom = '10px';

    let p = document.createElement('p');
    p.style.display = 'inline';
    p.textContent = `"${bookDetails.name}" by ${bookDetails.author}, ${bookDetails.numberofpages}`;

    let readornot = document.createElement('button');
    readornot.classList.add('readornot');
    readornot.textContent = 'Not read';

    let removebook = document.createElement('button');
    removebook.classList.add('removebook');
    removebook.textContent = 'Remove';

    book.setAttribute('data-attribute', `${myLibrary.length - 1}`);
    removebook.setAttribute('data-attribute', `${myLibrary.length - 1}`);

    readornot.style.height = '25px';
    removebook.style.height = '25px';

    readornot.addEventListener('click', function (e) {

        const btn = e.target;

        btn.classList.toggle('read');

        if (btn.classList.contains('read')) {
            btn.textContent = 'Read';
        }

        else {
            btn.textContent = 'Not read';
        }
    });

    removebook.addEventListener('click', function (e) {
        let attr = e.target.getAttribute('data-attribute');
        let booktoremove = document.querySelector(`[data-attribute="${attr}"]`);

        myLibrary.splice(attr, 1);
        books.removeChild(booktoremove);
        updateattributes();
    });

    readornot.style.marginLeft = '20px';
    readornot.style.marginRight = '20px';

    book.appendChild(p);
    book.appendChild(readornot);
    book.appendChild(removebook);

    books.appendChild(book);
}

function updateattributes() {
    const bookElements = document.querySelectorAll('.book');
    const removeButtons = document.querySelectorAll('.removebook');

    for (let i = 0; i < bookElements.length; i++) {
        bookElements[i].setAttribute('data-attribute', i);
        removeButtons[i].setAttribute('data-attribute', i);
    }
}

submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    let name = bookName.value;
    let author = bookAuthor.value;
    let numberofpages = numberOfPages.value;

    let bookDetails = new Book(name, author, numberofpages);
    myLibrary.push(bookDetails);
    createBook(bookDetails);
    form.classList.toggle('visible');

    let formFields = document.querySelectorAll('input');

    formFields.forEach(field => {
        field.value = '';
    });
});