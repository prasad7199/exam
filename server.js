const express = require('express')
const cors = require('cors')

var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'manager',
    database : 'wpt'
});





const app = express()
app.use(cors('*'))

app.get('/', (request, response) => {
  response.send('hello from node ')
})

app.get('/emps', (request, response) => {
    var queryToFire = 'select * from Employee_Tb';
    connection.query(queryToFire, (error, result) => {
        if(error == null){
            var dataInString = JSON.stringify(result);
            response.setHeader("Content-Type", "application/json");
            response.send(dataInString);        
        }
        else{
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.send(error)
        }      
    })

});

app.delete('/emps/:empid', (request, response) => {
    var queryToFire = `delete from Employee_Tb where id = ${request.params.empid}`;
    connection.query(queryToFire, (error, result) => {
        if(error == null){
            console.log(result);
            var dataInString = JSON.stringify(result);
            response.setHeader("Content-Type", "application/json");
            response.send(dataInString);        
        }
        else{
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.send(error)
        }      
    })

});


app.post('/emps', (request, response) => {
    var queryToFire = `insert into Employee_Tb values ( ${request.body.id}, '${request.body.e_name}','${request.body.email}', '${request.body.password}', ${request.body.emp_id}, '${request.body.dname}', '${request.body.doj}' )` ;

    console.log(request.body);

    connection.query(queryToFire, (error, result) => {
        if(error == null){
            console.log(result);
            var dataInString = JSON.stringify(result);
            response.setHeader("Content-Type", "application/json");
            response.send(dataInString);
        }
        else{
            response.setHeader("Content-Type", "application/json");
            response.send(error);
        }
    })
});

app.put('/emps/:idreceived', (request, response) => {
    var queryToFire = `update Employee_Tb set e_name = '${request.body.e_name}', email = '${request.body.email}', password = '${request.body.password}', emp_id = ${request.body.emp_id}, dname = '${request.body.dname}', doj = '${request.body.doj}'where id = ${request.params.idreceived} ` ;
    console.log(request.body);
    console.log(request.params);


    connection.query(queryToFire, (error, result) => {
        if(error == null){
            console.log(result);
            var dataInString = JSON.stringify(result);
            response.setHeader("Content-Type", "application/json");
            response.send(dataInString);
        }
        else{
            response.setHeader("Content-Type", "application/json");
            response.send(error);
        }
    })
});


app.post("/", (request, response) => {
    var query = `insert into Employee_Tb (id, e_name, email, password, emp_id, dname, doj) values (${request.body.id},'${request.body.e_name}','${request.body.email}','${request.body.password}','${request.body.emp_id}','${request.body.dname}','${request.body.doj}');`;
  
    connection.query(query, (error, result) => {
      if (error == null) {
        var data = JSON.stringify(result);
        response.setHeader("Content-Type", "application/json");
        response.send(data);
      } else {
        console.log(error);
        response.setHeader("Content-Type", "application/json");
        response.send(error);
      }
    });
  });











app.listen(4000, '0.0.0.0', () => {
  console.log('server started on port 4000')
})



