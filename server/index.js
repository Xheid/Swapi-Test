'use strict';

const Hapi = require('@hapi/hapi');
const axios = require('axios');


const users = {
    Luke: {
        username: 'Luke',
        password: 'DadSucks',
    }
};


const validate = async (request, username, password, h) => {

    const user = users[username];
    if (!user) {
        return { credentials: null, isValid: false };
    }

    const isValid = password === user.password;
    const credentials = { message: "Respect your elders Luke. Especially you father ..." };

    return { isValid, credentials };
};



const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register(require('@hapi/basic'));

    server.auth.strategy('simple', 'basic', { validate });
    server.auth.default('simple');

    server.route({
        method: 'GET',
        path: '/{entity}',
        handler: async (request, h) => {

            var url = 'https://swapi.dev/api/' + request.params.entity + '/'

            if (request.query.id) {
                url += request.query.id
            }
            if (request.query.wookiee === "true") {
                url += '?format=wookiee'
            }

            const resp = await axios.get(url)

            return resp.data
        }
    })

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();