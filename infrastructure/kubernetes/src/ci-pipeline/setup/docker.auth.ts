/* 
export DOCKER_USERNAME=oyelowo
export DOCKER_TOKEN=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
kubectl create -n ci secret generic docker-config --from-literal="config.json={\"auths\": {\"ghcr.io\": {\"auth\": \"$(echo -n "$DOCKER_USERNAME:$DOCKER_TOKEN" | base64)\"}}}"
# kubectl create secret generic docker-config --from-literal="config.json={\"auths\": {\"https://index.docker.io/v1/\": {\"auth\": \"$(echo -n $DOCKER_USERNAME:$DOCKER_TOKEN|base64)\"}}}"


# {"auths": {"https://index.gcr.io/v1/": {"auth": "b3llbG93bzpkYXlv"}}}


# BASE64_AUTH=`echo -n "$CI_REGISTRY_USER:$CI_REGISTRY_PASSWORD" | base64`
# mkdir -p ~/.docker
# echo "{\"auths\": {\"$CI_REGISTRY\": {\"auth\": \"$BASE64_AUTH\"}}}" > ~/.docker/config.json



# {"
# auths": {
#     "https://ghcr.io": 
#          {
#             "auth": "LW4gb3llbG93bzpnaXRodWJfcGF0XzExQUhSWUZTQTB6NFp2VjYzeHFtR0NfYjNkVmRTZ1EyaFFrRTJRcUp4ckd1ZWxOVERWNmpESEZ6VmpITW5oNDg0ZDY0V1RGVUE0aDM3WXdBN1UK"
#         }
#     }
# }

# {"auths": {"ghcr.io": {"auth": "b3llbG93bzpnaXRodWJfcGF0XzExQUhSWUZTQTB6NFp2VjYzeHFtR0NfYjNkVmRTZ1EyaFFrRTJRcUp4ckd1ZWxOVERWNmpESEZ6VmpITW5oNDg0ZDY0V1RGVUE0aDM3WXdBN1U="}}}

# {"auths": {"ghcr.io": {"auth": "b3llbG93bzpnaHBfV2pQTFdHdk5KOE9LUnY5VERuTmVUN1FwWko0S24zMEVzMjlw"}}}


b5b85aa2ea18a4ba58d903301a8b351d7856684c

# https://github.com/Oyelowo/modern-distributed-app-template
# error, failure, pending, success
curl \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer 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" \
  https://api.github.com/repos/Oyelowo/modern-distributed-app-template/statuses/b5b85aa2ea18a4ba58d903301a8b351d7856684c \
  -d '{"state":"pending","target_url":"https://example.com/build/status","description":"The build succeeded!","context":"continuous-integration/jenkins"}'

# curl \
#   -X POST \
#   -H "Accept: application/vnd.github+json" \
#   -H "Authorization: Bearer <YOUR-TOKEN>" \
#   https://api.github.com/repos/OWNER/REPO/statuses/SHA \
#   -d '{"state":"success","target_url":"https://example.com/build/status","description":"The build succeeded!","context":"continuous-integration/jenkins"}'
*/
