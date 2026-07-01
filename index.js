import express from 'express'
import cookieParser from 'cookie-parser';
import UserRoute from './routes/user.route.js'
import hewanRoute from './routes/hewan.route.js';
import rekamMedisRoute from './routes/rekammedis.route.js';
import path from 'path'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.get('/', (req, res) => {
  res.send('tes klinik hewan')
})

app.use('/user', UserRoute)
app.use('/hewan', hewanRoute)
app.use('/rekammedis', rekamMedisRoute)

app.listen(3100, () => {
  console.log('Server started')
})  