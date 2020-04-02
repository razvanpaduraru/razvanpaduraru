// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(response => response.json())
//     .then(json => console.log(json[0].userId, json[0].title));

// fetch('https://jsonplaceholder.typicode.com/posts/2')
//     .then(response => response.json())
//     .then(json => console.log(json));

fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: 'Test',
            body: 'Test',
            userId: 2,
        }),
    })
    .then(response => response.json())
    .then(json => console.log(json));

fetch('https://jsonplaceholder.typicode.com/posts/2', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: 'Test',
        }),
    })
    .then(response => response.json())
    .then(json => console.log(json));