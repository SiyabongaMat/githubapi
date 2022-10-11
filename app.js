const express = require('express');
const app = express();
const helmet = require('helmet');
const fetch = require('node-fetch');        //node-fetch package is installed to deal with the fetch request used by node
const port = process.env.PORT || 8000;

app.use(helmet());

app.get('/user', (req, res) => 
{
    let name = req.query.username;
    //the username query is extracted from the url

    //the promise all method is used to simultaneously execute the fetch requests and return it as one array to the frontend
    Promise.all([
        fetch(`https://api.github.com/users/${name}`),
        fetch(`https://gitlab.com/api/v4/users?username=${name}`)
    ]).then(function (responses) {
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }).then(function (data) {
        res.send(data);
    });
});

app.get('/hubrepos', (req, res) => 
{
    let login = req.query.login;
    //login query is extracted from the url string
    if (login)
    {
        fetch(`https://api.github.com/users/${login}/repos`).then(res => res.json()).then(data => res.send(data));
        //fetch api to get the repos of the github user
    }
});

app.get('/labrepos', (req, res) => 
{
    let login = req.query.login;
    //login query is extracted from the url string
    if (login)
    {
        fetch(`https://gitlab.com/api/v4/users/${login}/projects`).then(res => res.json()).then(data => res.send(data));
        //fetch api to get the repos of the gitlab user
    }
});

app.listen(port, () => console.log("Server started!"));