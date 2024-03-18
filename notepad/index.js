// TODO: Declare and initialize all variables

// Get the 'add' button from the document
const addBtn = document.getElementById('add');

// Retrieve notes from local storage and parse the JSON data
const notes = JSON.parse(localStorage.getItem('notes'));

// If there are existing notes, iterate through them and add to the local storage
if (notes) {
    notes.forEach(note => addNewNoteToLS(note));
}

// Add a click event listener to the 'add' button, triggering the addition of a new note
addBtn.addEventListener('click', () => addNewNoteToLS());

// Function to add a new note to local storage
function addNewNoteToLS(text = '') {
    // Create a new 'div' element representing a note
    const note = document.createElement('div');
    note.classList.add('note');

    console.log(note);
    // Set the HTML content of the note with buttons, main content, and textarea
    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `;

    // Retrieve elements within the note
    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    // Set initial values for textarea and main content
    textArea.value = text;
    main.innerHTML = marked(text);

    // Event listener for the delete button, removing the note and updating local storage
    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLS();
    });

    // Event listener for the edit button, toggling visibility of main content and textarea
    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    // Event listener for input changes in the textarea, updating main content and local storage
    textArea.addEventListener('input', (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        updateLS();
    });

    // Append the created note to the body of the document
    document.body.appendChild(note);
}

// Function to update local storage with the content of all text areas
function updateLS() {
    const notesText = document.querySelectorAll('textarea');
    const notes = [];

    // Iterate through text areas and push their values to the notes array
    notesText.forEach(note => notes.push(note.value));

    // Update local storage with the JSON stringified notes array
    localStorage.setItem('notes', JSON.stringify(notes));
}

