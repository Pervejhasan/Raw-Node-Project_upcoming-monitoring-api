// dependencies
// 'string_decoder' is a module and StringDecoder is a class
const { StringDecoder } = require('string_decoder');
const url = require('url');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');

// module scaffolding
const handler = {};
handler.handleReqRes = (req, res) => {
    // res.end(JSON.stringify('Hello world with nodemon by solved error'));
    // request handling
    // get the url and parse it
    const parseUrl = url.parse(req.url, true);
    // console.log(parseUrl);
    const path = parseUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parseUrl.query;
    const headersObject = req.headers;
    let realData = '';
    const requestProperties = {
        parseUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject,
    };
    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    const decoder = new StringDecoder('utf-8');
    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();

        chosenHandler(requestProperties, (statusCodeAsParameter, payloadAsParameter) => {
            const statusCode =
                typeof statusCodeAsParameter === 'number' ? statusCodeAsParameter : 500;
            const payload = typeof payloadAsParameter === 'object' ? payloadAsParameter : {};

            const payloadString = JSON.stringify(payload);
            // return the final response
            res.writeHead(statusCode);
            res.end(payloadString);
        });
        // console.log(realData);
        res.end('hello world');
    });

    // response handle
};
module.exports = handler;
