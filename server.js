// importaciones
// creamos aplicacion con express que pasaremos a servidor http
const express = require('express');
const app = express();
const server = require('http').Server(app);
// servidor de websocket
const io = require('socket.io') (server);
// indicamos ruta donde estaran los ficheros estaticos usando middleware | public tiene index y main
app.use(express.static('public'));


// arreglo con los mensajes que queremos mostrar
let messages = [
    { author: "juan", text: "hola, que tal?" },
    { author: "pedro", text: "muy bien" },
    { author: "ana", text: "genial" }
]

// el servidor de websocket este atento a que se realice una conexion
// pasamos mensaje connection
io.on('connection', function(socket){
    console.log('un cliente se ha conectado');
    // enviamos el array de objetos con el evento messages
    socket.emit('messages', messages)

    // socket escucha evento new y cuando llegue trae los datos en data
    socket.on('new-message', function(data){
        // añadimos el nuevo msj que llega en data al array messages con push
        messages.push(data);
        /* usando sokcet.emit creamos una comunicacion 1:1 pero una sala de chat es privada
        por lo que se debe notificar a todos los clientes conectados usando io.sockets.emit*/
        io.sockets.emit('messages', messages)
    })
})

/* hay que configurar el middleware para dejar disponibles las rutas y archivos estáticos.
de esta manera el archivo index.html va a mostrar cuando ingresemos a la página
EL SERVIDOR SE ARRANCA CON HTTP.LISTEN() */


// esta ruta va a cargar el index.html en la raiz
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

// servidor funcionando en puerto 3000
// http.listen(3000, () => console.log('SERVER ON'))

// connection se ejecuta la primera vez que se abre una nueva conexion
// io.on('connection', (socket) => {
//     // solo se imprime la primera vez que se abre la conexion
//     console.log('usuario conectado')
// })

// envio de datos al cliente desde el servidor
io.on('connection', socket => {
    console.log('usuario conectado')
    // el metodo emit permite enviar mensaje desde el servidor al cliente,
    // el primer parametro que recibe es el nombre del evento y el segundo la info que se transmite
    socket.emit('mi mensaje', 'este es mi mensaje desde el servidor');
    // recepcion de datos del servidor desde cliente
    socket.on('mi mensaje', data => {
        alert(data)
        socket.emit('noticacion', 'mensaje recibido exitosamente')
    })
})

// envio de datos a todos los clientes conectados desde servidor
io.on('connection', (socket) => {
    console.log('nuevo cliente conectado');
    // envio mensajes al cliente que se conecto
    socket.emit('mensajes', mensajes);
    // escucho los mensajes enviados por el cliente y se lo propago a todos
    socket.on('mensaje', data => {
        mensajes.push({ socketid: socket.id, mensaje: data })
        // enviamos mensaje global a todos los clientes conectados al canal de websocket
        io.sockets.emit('mensajes', mensajes)
    })
})

// servidor
server.listen(8080, () => {
    console.log('servidor corriendo en http://localhost:8080');
})

