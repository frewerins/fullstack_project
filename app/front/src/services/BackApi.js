const baseUrl = 'http://127.0.0.1:8000/api/'

// export const create = (data) => {
//     fetch(baseUrl + 'create', {
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify(data)
//     }).then(data => data.json()).then(data=>console.log(data))
// }

export const createPage = (data) => {
    return fetch(baseUrl + 'pages/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then(data => data.json())
}

export const getPages = () => {
    fetch(baseUrl + 'pages/').then(data => data.json())
}

export const deletePageBack = (id) => {
    return fetch(baseUrl + 'pages/' + id, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
    })
}

export const createItem = (data) => {
    return fetch(baseUrl + 'items/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then(data => data.json())
}

export const getItems = () => {
    fetch(baseUrl + 'items/').then(data => data.json())
}

export const deleteItemBack = (id) => {
    return fetch(baseUrl + 'items/' + id, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
    })
}

export const getPageById = (id) => {
    return fetch(baseUrl + 'pages/' + id).then(data => data.json())
}