const http = require("http");

const PORT = process.env.PORT || 3000;

const accounts = [
  { id: "101", customer: "Customer A", balance: 25000 },
  { id: "102", customer: "Customer B", balance: 50000 },
  { id: "103", customer: "Customer C", balance: 12000 }
];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/health" && req.method === "GET") {
    res.writeHead(200);
    return res.end(JSON.stringify({
      status: "UP",
      service: "accounts-api"
    }));
  }

  if (req.url === "/accounts" && req.method === "GET") {
    res.writeHead(200);
    return res.end(JSON.stringify(accounts));
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Endpoint not found" }));
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Accounts API running on port ${PORT}`);
});
