import express from 'express'
import UserRoute from './routes/user.route.js'
import hewanRoute from './routes/hewan.route.js';
import rekamMedisRoute from './routes/rekammedis.route.js';

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('tes klinik hewan')
})

app.use('/user', UserRoute)
app.use('/hewan', hewanRoute);
app.use('/rekammedis', rekamMedisRoute);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})