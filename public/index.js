// PARTE CLIENTE
// conectamos el cliente con el servidor y escuchamos evento messages
let socket = io.connect();

// recibimos el mensaje
// socket.on('notificacion', data => {
//     console.log(data)
// })

// function para mostrar en html los mensajes
// data contiene array de mensajes que envia el servidor
function render(data) {
    // map itera sobre cada objeto del arreglo y ejecuta la funcion en ellos
    var html = data.map(function(elem) {
        return (`<div>
                    <strong>${elem.author}</strong>:
                    <em>${elem.text}</em>
                </div>`)
    // join lo que hace es separar los elementos del array por un espacio
    }).join (" ");
    // se inserta el template en el div de html
    document.getElementById('messages').innerHTML = html;
}
socket.on('messages', function(data) { render(data); });

// definimos funcion addMessage llamada en form
function addMessage(e) {
    var mensaje = {
        // recog valor de los inputs
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    // los envia por el socket pata que lo escuche el servidor
    socket.emit('new-message', mensaje);
    return false;
}
