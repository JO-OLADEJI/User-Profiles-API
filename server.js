const express = require('express');
const app = express();
const dbConnect = require('./models/dbConnect.js');



dbConnect();
app.use(express.json());


app.get('/', (req, res) => res.send('Welcome back to Profiles. Please login or signup to access your profile !'));
app.use('/api/user/register', require('./routes/register.js'));
app.use('/api/user/login', require('./routes/login.js'));
app.use('/api/user/profile', require('./routes/profile.js'));

app.get('*', (req, res) => res.status(404).send('404: Page not found !'));
app.post('*', (req, res) => res.status(404).send('404: Page not found !'));



const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));