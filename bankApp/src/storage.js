export function read() {
  const data = window.localStorage.getItem('logged');
  return data === null ? [] : JSON.parse(data);
}

export function write(todos) {
  const data = JSON.stringify(todos);
  window.localStorage.setItem('logged', data);
}

export function append(user) {
  const logged = read();
  logged.push(user);
  write(logged);
}

export function remove(user) {
  const logged = read();
  const index = logged.findIndex(
    element => element.username == user.username && element.password == user.password
  );
  if (index !== -1) {
    logged.splice(index, 1);
    write(logged);
  }
}
