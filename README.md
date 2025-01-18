Gateway builds in ./Gatway and maps port 3000 from container to 3000 on host <br/>

Users-services builds from ./Users-services and maps port from 3001 in container to 3001 in host <br/>

Orders-services builds from ./Orders-services and maps port 3002 in container to 3002 in host <br/>

depends_on ensures that gateway container only starts after users-services & orders-services are up (does not guarentee it is ready -> need proper health check strategy OR wait-for mechanism) <br/>

<br/>

#1 Build images for gateway, user, and order services <br/>


```bash
docker compose build
```

#2 Start containers <br/>


```bash
docker compose up
```

<br/>


Test gateway <br/>

```bash
curl http://localhost:3000
```

{ "message": "API Gateway is up and running." } <br/>


Test users service <br/>

```bash
curl http://localhost:3000/users
```

[ <br/>
  { "id": 1, "name": "Alice", "email": "alice@example.com" }, <br/>
  { "id": 2, "name": "Bob", "email": "bob@example.com" } <br/>
] <br/>


Test orders service <br/>

```bash
curl http://localhost:3000/orders
```

[ <br/>
  { "id": 1, "userId": 1, "product": "Laptop" }, <br/>
  { "id": 2, "userId": 2, "product": "Headphones" } <br/>
] <br/>
