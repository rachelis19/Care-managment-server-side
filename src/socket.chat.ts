const SocketIO = require('socket.io')



export const mySocket =  (app)=>{
    
 
    
    const io = SocketIO(app)

    io.on('connection', socket => {
  

        // just like on the client side, we have a socket.on method that takes a callback function
        socket.on('message', (message) => {
          // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
          // we make use of the socket.emit method again with the argument given to use from the callback function above
          console.log('message: ', message)
          io.sockets.emit('message', message)
        })
      
        // disconnect is fired when a client leaves the server
        socket.on('disconnect', () => {
          
        })
      })
      
      

}