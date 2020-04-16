import { append, read, remove } from './storage.js';

export function init() {
  window.addEventListener('DOMContentLoaded', onLoad);
}

function onLoad() {
  document.getElementById('form-add').addEventListener('submit', onSubmitAdd);
  document.getElementById('form-delete').addEventListener('submit', onSubmitDelete);
  render();
}

function onSubmitAdd(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const contact = Object.fromEntries(data);
  append(contact);
  render();
}

function onSubmitDelete(event) {
  event.preventDefault();

  // get all checkboxes
  const checkboxes = document.getElementsByName('delete');

  // filter the checked checkboxes
  const checkboxesChecked = Array.prototype.slice.call(checkboxes).filter(function (checkedBox) {
    return checkedBox.checked;
  });

  // create elements that have to be deleted
  // and delete them
  if (checkboxesChecked !== []) {
    checkboxesChecked
      .map(checkedBox => checkedBox.parentNode)
      .map(function (parent) {
        return {
          name: parent.querySelector('b[id="name"]').textContent,
          email: parent.querySelector('b[id="email"]').textContent,
          phone: parent.querySelector('b[id="phone"]').textContent,
        };
      })
      .forEach(toDeleteContact => remove(toDeleteContact));

    const deleteButton = document.getElementById('deleteButton');
    deleteButton.hidden = true;
    render();
  }
}

function render() {
  const contacts = read();
  const list = document.getElementById('list');
  const items = contacts.map(
    contact => `
    <li>
        <input type="checkbox" name="delete" />
        <b id="name">${contact.name}</b>
        <b id="email">${contact.email}</b>
        <b id="phone">${contact.phone}</b>
    </li>`
  );
  list.innerHTML = items.join('');
  const formDelete = document.getElementById('form-delete');
  formDelete.hidden = contacts.length === 0;

  // show the delete button only if a checkbox is checked
  const checkedBoxes = document.querySelectorAll('input[type="checkbox"]');
  if (checkedBoxes != null) {
    checkedBoxes.forEach(checkedBox =>
      checkedBox.addEventListener('change', function () {
        const deleteButton = document.getElementById('deleteButton');
        if (this.checked) {
          deleteButton.hidden = false;
        } else {
          deleteButton.hidden = true;
        }
      })
    );
  }
}
