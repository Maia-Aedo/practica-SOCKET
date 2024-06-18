// inicializamos una constante
let socket = io.connect() // ya podemos empazar a usar los sockets desde el cliente

// recibimos el mensaje
// socket.on('notificacion', data => {
//     console.log(data)
// })

// data tiene el array de mensajes que envia el servidor 
socket.on('messages', function(data){
    console.log(data)
})

// creamos funcion que se encargara de pintar en el html los mensajes
// esta funcion itera sobre los datos que llegan a traves del socket con funcion map de js
// para cada elemento pinta una plantilla html con el nombre del autor y texto del msj de cada elto
function render(data){
    // index
    var html = data.map(function(elem){
        return(`<div>
                <strong>${elem.author}</strong>:
                <em>${elem.text}</em></div>`)
    }).join("");
    element.getElementById('messages').innerHTML = html;
}
socket.on('messages', function(data){ render(data); });
