import { append, read, remove } from './storage.js';

export function init() {
  document.getElementById('form-add').addEventListener('submit', onSubmitAdd);
  document.getElementById('form-delete').addEventListener('submit', onSubmitDelete);
  document.getElementById('form-delete').addEventListener('change', onChangeDelete);
  render();
}

function onSubmitAdd(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  data.set('id', Date.now());
  const contact = Object.fromEntries(data);
  append(contact);
  render();
}

function onSubmitDelete(event) {
  event.preventDefault();
  const form = event.target; // pe ce a fost adaugat listenerul
  const data = new FormData(form);
  const contacts = read();
  data.getAll('id').forEach(id => {
    const contact = contacts.find(contact => contact.id === id);
    if (contact) {
      remove(contact);
    }
  }); // dupa name-ul lui input
  render();
}

function onChangeDelete(event) {
  const { form } = event.target;
  // const form = event.target.form la fel ca cea de sus
  const data = new FormData(form);
  const hasChecked = data.getAll('id').length > 0;
  form.elements.delete.disabled = !hasChecked;
}

function render() {
  const contacts = read();
  const list = document.getElementById('list');
  const items = contacts.map(
    contact => `
    <li>
      <label>
        <input type="checkbox" name="id" value="${contact.id}"/>
        ${contact.name}
        ${contact.email}
        ${contact.phone}
      </label>
        
    </li>`
  );
  list.innerHTML = items.join('');
  const formDelete = document.getElementById('form-delete');
  formDelete.hidden = contacts.length === 0;
}
