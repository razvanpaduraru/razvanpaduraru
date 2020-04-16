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

export function remove(toDeleteContact) {
  let contacts = read();
  contacts = contacts.filter(function (contact) {
    return (
      contact.name !== toDeleteContact.name &&
      contact.email !== toDeleteContact.email &&
      contact.phone !== toDeleteContact.phone
    );
  });
  write(contacts);
}
