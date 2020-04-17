import { append, read, remove, write } from './storage.js';

export function init() {
  document.getElementById('form-add').addEventListener('submit', onSubmitAdd);
  document.getElementById('form-delete').addEventListener('submit', onSubmitDelete);
  document.getElementById('form-delete').addEventListener('change', onChangeDelete);
  document.getElementById('form-delete').addEventListener('click', onClickEdit);
  document.getElementById('form-delete').addEventListener('reset', onPressCancel);
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
  const { form } = event.target; // asa se obtine formularul pe care am apelat
  // const form = event.target.form la fel ca cea de sus
  const data = new FormData(form);
  const hasChecked = data.getAll('id').length > 0;
  form.elements.delete.disabled = !hasChecked;
}

let id = '';

function onClickEdit(event) {
  const { form } = event.target;

  if (event.target.name === 'update') {
    // when pressing update
    const elem = 'fieldset' + id;
    const name = form.elements[elem].elements.name.value;
    const email = form.elements[elem].elements.email.value;
    const phone = form.elements[elem].elements.phone.value;

    const contacts = read().map(contact => {
      if (contact.id === id) {
        contact.name = name;
        contact.email = email;
        contact.phone = phone;
        return contact;
      } else {
        return contact;
      }
    });
    write(contacts);
    render();
  } else if (!isNaN(event.target.name)) {
    // when pressing edit
    id = event.target.name;
    const name = 'fieldset' + id;
    form.elements[name].elements.name.readOnly = false;
    form.elements[name].elements.email.readOnly = false;
    form.elements[name].elements.phone.readOnly = false;
    form.elements[name].elements.update.hidden = false;
    form.elements[name].elements.cancel.hidden = false;
  }
}

function onPressCancel(event) {
  const form = event.target;
  const name = 'fieldset' + id;
  form.elements[name].elements.name.readOnly = true;
  form.elements[name].elements.email.readOnly = true;
  form.elements[name].elements.phone.readOnly = true;
  form.elements[name].elements.update.hidden = true;
  form.elements[name].elements.cancel.hidden = true;
}

function render() {
  const contacts = read();
  const list = document.getElementById('list');
  const items = contacts.map(
    contact => `
    <li>
      <fieldset name="${'fieldset' + contact.id}">
        <input type="checkbox" name="id" value="${contact.id}"/>
        <input type="text" id="name" name="name" value="${contact.name}" readonly>
        <input type="text" id="email" name="email" value="${contact.email}" readonly>
        <input type="text" id="phone" name="phone" value="${contact.phone}" readonly>
        <input type="button" id="edit" name ="${contact.id}" value="Edit">
        <input type="button" id="update" name="update" value="Update" hidden>
        <input type="reset" id="cancel" name="${contact.id}" value="Cancel" hidden>
      </fieldset>
    </li>`
  );
  list.innerHTML = items.join('');
  const formDelete = document.getElementById('form-delete');
  formDelete.hidden = contacts.length === 0;
}
