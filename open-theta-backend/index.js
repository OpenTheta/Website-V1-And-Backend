const server =require("./api/server");

const PORT = 80;
server.listen(PORT, () => console.log("server is running on port 80"));
