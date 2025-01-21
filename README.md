Gateway builds in ./Gatway and maps port 3000 from container to 3000 on host <br/>

Users-services builds from ./Users-services and maps port from 3001 in container to 3001 in host <br/>

Orders-services builds from ./Orders-services and maps port 3002 in container to 3002 in host <br/>

depends_on ensures that gateway container only starts after users-services & orders-services are up (does not guarentee it is ready -> need proper health check strategy OR wait-for mechanism) <br/>


Need Minikube for clusters and kubectl

## Prerequisites
- Install Minikube: [Official Documentation](https://minikube.sigs.k8s.io/docs/start/)
- Install kubectl: [Official Documentation](https://kubernetes.io/docs/tasks/tools/install-kubectl/)



Install Minikube:

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

Start a cluster:

```bash
minikube start
```

Verify the cluster is running:

```bash
kubectl cluster-info
```


Project workflow
1. Development
-Dockerfiles in microservices: gateway, users-services, orders-services

-Ensure using Minikube for Docker daemon:

```bash

eval $(minikube docker-env)
```

-Build dockerfiles using Minikube's Docker daemon:

```bash
cd gateway/
docker build -t gateway:v1 -f Dockerfile.gateway .
cd ../users-service/
docker build -t users-service:v1 -f Dockerfile.users-service .
cd ../orders-service/
docker build -t orders-service:v1 -f Dockerfile.orders-service .
```

-Verify images in root dir

```bash
docker images
```
=> Should see: gateway, users-services, orders-services

2. Apply Kubernetes Secrets:

```bash
cd Secrets
kubectl apply -f orders-secrets.yaml
kubectl apply -f users-db-secrets.yaml
kubectl apply -f gateway-secrets.yaml
```

Verify the secrets were created:

```bash
kubectl get secrets
```

=> Output
NAME                 TYPE     DATA   AGE
orders-secrets       Opaque   1      10s
users-db-secrets     Opaque   1      10s
gateway-secrets      Opaque   1      10s


3. Deployment stage:

-Apply Kubernetes Deployment and Services:
```bash
cd k8s/
kubectl apply -f gateway-deployment.yaml
kubectl apply -f users-deployment.yaml
kubectl apply -f orders-deployment.yaml
```

-Verify Deployments and Services:

```bash
# ensure pods are running
kubectl get pods

# check if services are exposed correctly:
kubectl get services

```

### Horizontal Scaling
Each deployment needs cpu and memory requests and limits in container specs for HPA to work

1. Ensure k8s metrics server is running

```bash
kubectl get apiservices | grep metrics
```

If not installed:

```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

2. Apply each HPA configuration

```bash
cd HPA
kubectl apply -f gateway-hpa.yaml
```

verify:
```bash
kubectl get hpa
```

3. Monitoring
```bash
kubectl get pods
```

detailed status:
```bash
kubectl describe hpa gateway-hpa
```

resource usage:
```bash
kubectl top pods
```


Liveness and Readiness probes in deployment files: gateway-deployment, orders-deployment, users-deployment
-> Liveness ensures container is alive, Kubernetes restarts container if probe fails, /health endpoint returns 200 OK when running
-> Readiness ensures container ready to serve traffic, if probe fails then Kubernetes removes Pod from service's endpoints, /ready returns 200 OK when fully initialized










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
