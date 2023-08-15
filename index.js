// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');
const data = require('./lib/data');
// app object - module scaffolding
const app = {};
// testing file system
// @TODo: pore muche debo
// data.create('test', 'newFile', { name: 'Bangladesh', language: 'Bangla' }, (err) => {
//     console.log('error was', err);
// });
// data.read('test', 'newFile', (err, dataAsParameter) => {
//     console.log('Data=> ', JSON.parse(dataAsParameter), 'Error=>', err);
// });

// data.update('test', 'newFile', { name: 'England', language: 'English' }, (err) => {
//     console.log('error was', err);
// });
data.delete('test', 'newFile', (err) => {
    console.log('error was', err);
});
//  create server
app.createServer = () => {
    console.log(environment);
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log(`listening to port ${environment.port}`);
    });
};
// handle request and response
app.handleReqRes = handleReqRes;
// start the server
app.createServer();
