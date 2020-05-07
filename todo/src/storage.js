export function read() {
  const data = window.localStorage.getItem('ds-todos');
  return data === null ? [] : JSON.parse(data);
}

export function write(todos) {
  const data = JSON.stringify(todos);
  window.localStorage.setItem('ds-todos', data);
}

export function append(todo) {
  const todos = read();
  const index = todos.findIndex(element => element.todo == todo.todo.trim());
  if (index === -1) {
    todos.push(todo);
    write(todos);
  }
}

export function remove(todo) {
  const todos = read();
  const index = todos.findIndex(element => element.id == todo.iden);
  if (index !== -1) {
    todos.splice(index, 1);
    write(todos);
    return todos;
  }
}
