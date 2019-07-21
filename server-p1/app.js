//var crate = require('node-crate');
//crate.connect('localhost', 4200);
// or crate.connect ('http://localhost:4200')
// to use multiple nodes in round robin crate.connect ('http://host1:4200 http://host2:4200')
// to use https crate.connect ('https://host1:4200 https://host2:4200')
// crate.execute("select * from tweets where text like ? and retweed=? limit 1", ['Frohe Ostern%', true]).then((res) => {
    // res.json is an array with JSON object, with column names as properties, TIMESTAMP is converted to Date for crate V0.38+
    // res.cols are column names
    // res.rows values as array of arrays
    // res.duration execution time of query
    // res.rowcount number of rows
    // res.col_types type of column, e.g. res.col_types[i] == crate.type.TIMESTAMP
//    console.log('Success', res.json, res.duration, res.rowcount, res.cols, res.rows)
//})

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const body = "<html><h1>HELLO</h1>kjsdkjfdsjfhkdsj</html>"
    res.send(body)
});
app.get('/genkey', (req, res) => res.send('ABCD'));

app.post('/sgn', (req, res) => res.send(""))


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
