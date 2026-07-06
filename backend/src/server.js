const app = require('./app')
const prisma = require('./prisma/client')
const PORT = 5000

async function startServer() {
    try {
        await prisma.$connect()
        console.log('Database connected')

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error('Failed to connect to database:', error)
        process.exit(1)
    }
}

startServer()
