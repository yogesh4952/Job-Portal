import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import "./config/instrument.js"

import * as Sentry from "@sentry/node"
import { clerkWebhooks } from './controllers/webhook.js'

//Initialize express

const app = express()

// Connect to database
await connectDB()


// Middlewares
app.use(cors())
app.use(express.json())


//Routes
app.get("/", (req, res) => {
    return res.send("API Working")
})

app.post('/webhooks', clerkWebhooks)


Sentry.setupExpressErrorHandler(app);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);

})