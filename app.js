const Hapi = require("hapi");
const Joi = require("joi");

const server = new Hapi.Server();

server.connection({ 
    "host": "localhost", 
    "port": 3000 
});

server.route({
    method: "GET",
    path: "/contacts/:id}",
    handler: (request, response) => {
        var accountMock = {};
        if(request.params.username == "JohnDoe") {
            accountMock = {
                "id": "1",
                "name": "John Doe",
                "email": "john@example.com",
                "phone": "1234567890"
              }
        }
        response(accountMock);
    }
});
server.route({
    method: "POST",
    path: "/account",
    config: {
        validate: {
            payload: {
                firstname: Joi.string().required(),
                lastname: Joi.string().required(),
                timestamp: Joi.any().forbidden().default((new Date).getTime())
            };
            query: (
                alert: Joi.boolean().default(false)
            )
        }
    },
    handler: (request, response) => {
        response(request.payload);
    }
});
const Employee = {
    firstname: 'John',
    lastname: 'Doe'
  };
  
  console.log(Employee.firstname); 
  delete Employee.firstname;
  console.log(Employee.firstname);

server.start(error => {
    if(error) {
        throw error;
    }
    console.log("Listening at " + server.info.uri);
});
