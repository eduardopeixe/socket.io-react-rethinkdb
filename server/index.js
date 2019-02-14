const io = require('socket.io')()
const r = require('rethinkdb')
const port = 8000

function createDrawing({ connection, name }) {
  r.table('drawings')
    .insert({
      name,
      timestamp: new Date()
    })
    .run(connection)
    .then(() => console.log('created a drawing with name', name))
}

function subscribeToDrawings({ client, connection }) {
  r.table('drawings')
    .changes({ include_initial: true })
    .run(connection)
    .then(cursor => {
      cursor.each((err, drawingRow) =>
        client.emit('drawing', drawingRow.new_val)
      )
    })
}

r.connect({
  host: 'localhost',
  port: 28015,
  db: 'whiteboard'
}).then(connection => {
  io.on('connection', client => {
    client.on('createDrawing', ({ name }) => {
      createDrawing({ connection, name })
    })

    client.on('subscribeToDrawings', () => {
      subscribeToDrawings({ client, connection })
    })
  })
})

io.listen(port)
console.log('socket io server running on port', port)
