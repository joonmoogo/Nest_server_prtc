const express = require('express');

const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.send('<h1>Home page</h1>');
});

app.get('/post', (req, res) => {
    res.send('<h1>Post page</h1>');
})

app.get('/user', (req, res) => {
    res.send('<h1>User page</h1>');
})

app.use((req,res)=> {
    res.status(404).send('<h1>404 Page<h1/>')
})

app.listen(port,()=>{
    console.log('server listens 3000')
})

// get.post();
// get.delete();
// get.put();