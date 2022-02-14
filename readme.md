deploy
docker stack deploy -c docker_compose.yaml myapp-stack

scale to 7
docker service scale myapp-stack_myapp=7

scale to 2
docker service scale myapp-stack_myapp=2

remove stack
docker stack rm myapp-stack
