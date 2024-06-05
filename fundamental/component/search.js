import notesData from "./data.js"

const searchInput = document.getElementById('searchInput');
const data = notesData;

function filterNotes(searchTerm) {
  return data.filter(note => {
    const titleMatch = note.title.toLowerCase().includes(searchTerm.toLowerCase());
    const bodyMatch = note.body.toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || bodyMatch;
  });
}

function handleSearch() {
  const searchTerm = searchInput.value.trim();
  const filteredNotes = filterNotes(searchTerm);
  renderFilteredNotes(filteredNotes);
}

function createNoteElement(note) {
  const noteElement = document.createElement('div');
  noteElement.classList.add('note');

  const titleElement = document.createElement('h2');
  titleElement.textContent = note.title;

  const bodyElement = document.createElement('p');
  bodyElement.textContent = note.body;

  noteElement.appendChild(titleElement);
  noteElement.appendChild(bodyElement);

  return noteElement;
}


function renderFilteredNotes(filteredNotes) {
  const appContainer = document.getElementById('app');
  appContainer.innerHTML = '';

  if (filteredNotes.length === 0) {
    const noResultElement = document.createElement('div');
    noResultElement.textContent = 'No notes found.';
    appContainer.appendChild(noResultElement);
  } else {
    filteredNotes.forEach(note => {
      const noteElement = createNoteElement(note);
      appContainer.appendChild(noteElement);
    });
  }
}

searchInput.addEventListener('input', handleSearch);