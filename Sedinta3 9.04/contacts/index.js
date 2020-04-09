import { append, read } from './storage.js';

export function init() {
    window.addEventListener('DOMContentLoaded', onLoad)
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
    // sa apara butonul de delete cand e selectat un contact
}

function render() {
    const contacts = read();
    const list = document.getElementById('list');
    const items = contacts.map(contact => `
    <li>
        <input type="checkbox" name="delete" />
        ${contact.name} &lt;${contact.email}&gt; (${contact.phone})
    </li>`);
    list.innerHTML = items.join('');
    const formDelete = document.getElementById('form-delete');
    formDelete.hidden = contacts.length === 0;
}