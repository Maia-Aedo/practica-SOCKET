// importaciones
const express = require('express');
const io = require('socket.io');

// inicializamos express
const app = express();
// importamos http para que los sockets funcionen
// http recibe la constante de express
const http = require('http').Server(app);
// io recibe la constante de http
const io = require('socket.io') (http);

/* hay que configurar el middleware para dejar disponibles las rutas y archivos estáticos.
de esta manera el archivo indes.html va a mostrar cuando ingresemos a la página
EL SERVIDOR SE ARRANCA CON HTTP.LISTEN() */

// indicamos que queremos cargar los archivos estáticos
app.use(express.static('./public'));
// esta ruta va a cargar el index.html en la raiz
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname})
})

// servidor funcionando en puerto 3000
http.listen(3000, () => console.log('SERVER ON'))

// connection se ejecuta la primera vez que se abre una nueva conexion
io.on('connection', (socket) => {
    // solo se imprime la primera vez que se abre la conexion
    console.log('usuario conectado')
})

// envio de datos al cliente desde el servidor
io.on('connection', socket => {
    console.log('usuario conectado')
    // el metodo emit permite enviar mensaje desde el servidor al cliente,
    // el primer parametro que recibe es el nombre del evento y el segundo la info que se transmite
    socket.emit('mi mensaje', 'este es mi mensaje desde el servidor')
})

// recepcion de datos del servidor desde cliente
socket.on('mi mensaje', data => {
    alert(data)
    socket.emit('noticacion', 'mensaje recibido exitosamente')
})

// recibimos el mensaje
socket.on('notificacion', data => {
    console.log(data)
})

// envio de datos a todos los clientes conectados desde servidor
io.on('connection', socket =>{
    console.log('nuevo cliente conectado');
    // envio mensajes al cliente que se conecto
    socket.emit('mensajes', mensajes);
    // escucho los mensajes enviados por el cliente y se lo propago a todos
    socket.on('mensaje', data => {
        mensajes.push({socketid: socket.id, mensaje: data})
        // enviamos mensaje global a todos los clientes conectados al canal de websocket
        io.sockets.emit('mensajes', mensajes)
    })
})

