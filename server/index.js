const io = requier('socket.io')()
const port = 8000

io.on('connection', client => {
  client.on('subscribeToTimer', interval => {
    console.log('client is subscribing to timer with interval', interval)
    setInterval(() => {
      client.emit('timer', new Date())
    }, interval)
  })
})

io.listen(port)
console.log('socket io server running on port', port)
