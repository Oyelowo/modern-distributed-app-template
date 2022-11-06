export DOCKER_USERNAME=oyelowo
export DOCKER_TOKEN=xxx
kubectl create -n ci secret generic docker-config --from-literal="config.json={\"auths\": {\"ghcr.io\": {\"auth\": \"$(echo -n "$DOCKER_USERNAME:$DOCKER_TOKEN" | base64)\"}}}"
# kubectl create secret generic docker-config --from-literal="config.json={\"auths\": {\"https://index.docker.io/v1/\": {\"auth\": \"$(echo -n $DOCKER_USERNAME:$DOCKER_TOKEN|base64)\"}}}"

