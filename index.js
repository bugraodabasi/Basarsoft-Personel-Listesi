const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const connection = require('./database/connection');

const PORT = process.env.PORT | 3600

app.set("view engine", "ejs");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", (req, res) => {

    connection.query(`SELECT * FROM personel`, (err, rows, fields) => {

        var specialArr = Object.values(JSON.parse(JSON.stringify(rows)));

        res.render('home', { data: specialArr });
    });


});


app.post('/', (req, res) => {
    console.log(req.body);
    const name = req.body.Isim;
    const surname = req.body.Soyisim;
    const gender = req.body.Cinsiyet;
    const job = req.body.Meslek;
    const salary = req.body.Maas;
    const position = req.body.Pozisyon;


    var sql = `INSERT INTO personel (isim,soyisim,cinsiyet,meslek,maas,pozisyon) VALUES ('${name}', '${surname}', '${gender}','${job}','${salary}','${position}')`;
    connection.query(sql, function(err, result) {
        if (err) throw err;
        res.redirect("/");
    });



})




app.get("/update/:id", (req, res) => {

    connection.query(`SELECT * FROM personel WHERE id = ${req.params.id}`, (err, rows, fields) => {

        var specialArr = Object.values(JSON.parse(JSON.stringify(rows)));

        res.render('update', { data: specialArr });
    });

});

app.post("/update/:id", (req, res) => {
    var sql = `UPDATE personel SET isim = '${req.body.Isim}',soyisim='${req.body.Soyisim}',cinsiyet='${req.body.Cinsiyet}',meslek='${req.body.Meslek}',maas='${req.body.Maas}',pozisyon='${req.body.Pozisyon}' WHERE id =${req.params.id}`;
    // var sql = "UPDATE personel set isim =?,soyisim=?,cinsiyet=?,meslek=?,maas=?,pozisyon=?,WHERE id = ?";
    connection.query(sql, function(err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
        res.redirect('/');
    });

});


app.get("/delete/:id", (req, res) => {

    var sql = ` DELETE FROM personel WHERE id = ${req.params.id}`;
    connection.query(sql, function(err, result) {
        if (err) throw err;
        res.redirect('/')

    });

});




app.listen(PORT, () => {
    console.log('server Listenining');
})