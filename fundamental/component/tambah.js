class NoteForm extends HTMLElement {
  constructor() {
      super();

      const shadow = this.attachShadow({ mode: 'open' });

      const style = document.createElement('style');
      style.textContent = `
      .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 30%;
          margin: 0 auto;
          background-color: #B59F84;
          border: 2px solid black;
          border-radius: 10px;
          padding: 20px;
          margin-top: 40px;
      }

      .delete-button {
        background-color: #FDF4E3;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 50px;position: absolute;
        bottom: 20px; 
        left: 50%;
        transform: translateX(-50%);
      }

      .delete-button:hover {
        background-color: #FDF4E3;
      }

      .content h2 {
          text-align: center;
      }

      form {
          max-width: 400px;
          width: 100%;
          margin-top: 20px;
          font-size: 1.2rem;
      }

      input[type="text"],
      textarea {
          width: 100%;
          padding: 8px;
          margin-top: 6px;
          margin-bottom: 12px;
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
      }

      input[type="submit"] {
          background-color: #FDF4E3;
          color: black;
          padding: 15px 20px;
          border: 2px solid black;
          border-radius: 10px;
          cursor: pointer;
          display: block;
          margin: 0 auto;
          text-align: center;
      }

      input[type="submit"]:hover {
          background-color: #749EB2;
      }
      `;
      shadow.appendChild(style);

      const div = document.createElement('div');
      div.classList.add('content');
      div.innerHTML = `
          <h2>Tambah Catatan</h2>
          <form id="noteForm">
              <label for="title">Judul:</label>
              <input type="text" id="title" name="title"placeholder="Masukan Judul Catatan Anda..." minlength="5" required>
              <p id="titleValidation" class="validation-message"></p>
              <label for="content">Isi Catatan:</label>
              <textarea id="content" name="content" rows="4" placeholder="Masukan Catatan Anda....." required></textarea>

              <input type="submit" value="Simpan">
          </form>
      `;
      shadow.appendChild(div);

      this._form = shadow.querySelector('#noteForm');
      this._titleInput = shadow.querySelector('#title');

      this._titleInput.addEventListener('input', this._handleInput.bind(this));
      this._form.addEventListener('submit', this._handleSubmit.bind(this));
  }

  _handleInput(event) {
      const titleInput = event.target;
      const titleValidation = this.shadowRoot.getElementById('titleValidation');

      if (titleInput.validity.valueMissing) {
          titleValidation.textContent = 'Judul harus diisi.';
          titleValidation.style.color = 'white';
      } else if (titleInput.validity.tooShort) {
          titleValidation.textContent = 'Judul minimal lima karakter.';
          titleValidation.style.color = 'white';
      } else {
          titleValidation.textContent = '';
      }
  }

  _handleSubmit(event) {
      event.preventDefault();
      // untuk validasi form sebelum disubmit
      if (this._form.checkValidity()) {
          const title = this._titleInput.value;
          const content = this.shadowRoot.getElementById('content').value;
          this._saveNote(title, content);
          this._form.reset();
      }
  }
  // untuk menambah data
  _saveNote(title, content) {
      const noteElement = document.createElement("div");
      const noteId = Date.now().toString(); // Buat ID unik untuk setiap catatan
      noteElement.id = noteId;
      noteElement.classList.add("note");
      noteElement.innerHTML = `
          <h2>${title}</h2>
          <p>${content}</p>
      `;
       // Buat tombol hapus untuk catatan yang baru ditambahkan
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Hapus';
    deleteButton.addEventListener('click', () => {
      this._deleteNote(noteId); // Panggil _deleteNote dengan ID catatan sebagai argumen
    });

    // Tambahkan tombol hapus ke elemen catatan
    noteElement.appendChild(deleteButton);

    document.getElementById("app").appendChild(noteElement);
  }

   _deleteNote(noteId) {
    // Hapus elemen catatan dari kontainer aplikasi
    const noteElement = document.getElementById(noteId);
    if (noteElement) {
      noteElement.remove();
    }
  }

}

customElements.define('note-form', NoteForm);
