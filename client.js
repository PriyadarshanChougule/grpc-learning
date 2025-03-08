const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./todo.proto');
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo("localhost:40000", grpc.credentials.createInsecure());

client.createTodo({id: 1, text: "Do Laundary"}, (error, response) => {
    if (error) {
        console.error("Error:", error);
        return;
    }
    console.log("Response:", JSON.stringify(response));
});

client.readTodo({}, (error, response) => {
    if (error) {
        console.error("Error:", error);
        return;
    }
    console.log("Response:", JSON.stringify(response));
});