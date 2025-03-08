const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./todo.proto');
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const todoPackage = grpcObject.todoPackage;

const server =new grpc.Server();
server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        console.error("Server binding failed:", error);
        return;
    }
    console.log(`gRPC server running on port ${port}`);
});

server.addService(todoPackage.Todo.service, {
    "createTodo": createTodo,
    "readTodo": readTodo,
});

const todos = []

function createTodo(call, callback) {
    const todoItem =   {
        id : todos.length + 1,
        text : call.request.text,
    }
    todos.push(todoItem);
    callback(null, todoItem);
}

function readTodo(call, callback) {
    console.log("readTodo", call.request);
    callback(null, {items: todos});
}