const chai = require('chai');
const chaiHttp = require('chai-http');
let expect = require('chai').expect;
const { response } = require('express');
const request = require('request');

chai.use(chaiHttp);

describe('Status and content', function() {
    it('test content type', function(done)
    {
        request('http://localhost:8000/user?username=john', () =>
        {
            expect("Content-Type", /json/);
            done();
        });
    });

    it('test url query', function(done)
    {
        chai.request('http://localhost:8000').get('/hubrepo?login=john').query({ login: 'john' }).end(() => {
            done();
        })
    });
});