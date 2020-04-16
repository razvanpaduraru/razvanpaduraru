export function read() {
  const data = window.localStorage.getItem('ds-contacts');
  return data === null ? [] : JSON.parse(data);
}

function write(contacts) {
  const data = JSON.stringify(contacts);
  window.localStorage.setItem('ds-contacts', data);
}

export function append(contact) {
  const contacts = read();
  contacts.push(contact);
  write(contacts);
}

export function remove(contact) {
  const contacts = read();
  const index = contacts.findIndex(element => element.id === contact.id);
  if (index !== -1) {
    contacts.splice(index, 1); // sterge un element de la indexul dat
    write(contacts);
  }
}
