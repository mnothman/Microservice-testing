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