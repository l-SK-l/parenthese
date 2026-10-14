.PHONY: help images images-local check-namespace

# Docker Hub images of the API and the front end, the ones docker-compose.yml runs.
#
#   make images         build for amd64 and arm64 and push to Docker Hub (needs `docker login`)
#   make images-local   build for this machine only, tag `local`, no push
#
# The Docker Hub namespace is IMAGE_NAMESPACE: from the command line or the environment
# (make images IMAGE_NAMESPACE=someone-else), otherwise from .env, the value docker compose uses.
# Each push gets two tags: `latest` and `sha-<commit>`, the same ones the Images workflow uses.

IMAGE_NAMESPACE ?= $(shell sed -n 's/^IMAGE_NAMESPACE=//p' .env 2>/dev/null | tail -n 1)
PLATFORMS       ?= linux/amd64,linux/arm64
SHA             := $(shell git rev-parse --short=7 HEAD)
API_IMAGE       := $(IMAGE_NAMESPACE)/parenthese-api
WEB_IMAGE       := $(IMAGE_NAMESPACE)/parenthese-web

help:             ## list the targets
	@grep -E '^[a-z-]+:.*## ' $(MAKEFILE_LIST) | sed 's/:.*## /\t/'

check-namespace:
	@test -n "$(IMAGE_NAMESPACE)" || { echo "IMAGE_NAMESPACE is not set: add it to .env (see .env.example)"; exit 1; }

images: check-namespace ## build and push both images to Docker Hub, for amd64 and arm64
	@# The sha tag must describe what is inside the image: no uncommitted changes.
	@if [ -n "$$(git status --porcelain)" ]; then \
		echo "uncommitted changes: commit them first, the images are tagged sha-$(SHA)"; exit 1; \
	fi
	@docker buildx inspect parenthese >/dev/null 2>&1 || docker buildx create --name parenthese
	docker buildx build --builder parenthese --platform $(PLATFORMS) \
		-t $(API_IMAGE):sha-$(SHA) -t $(API_IMAGE):latest --push backend
	docker buildx build --builder parenthese --platform $(PLATFORMS) -f Dockerfile.web \
		-t $(WEB_IMAGE):sha-$(SHA) -t $(WEB_IMAGE):latest --push .
	@echo "on Docker Hub: $(API_IMAGE) and $(WEB_IMAGE), tags latest and sha-$(SHA)"

images-local: check-namespace ## build both images for this machine, tag `local`, no push
	docker build -t $(API_IMAGE):local backend
	docker build -f Dockerfile.web -t $(WEB_IMAGE):local .
	@echo 'run the stack on them:'
	@echo '  IMAGE_TAG=local docker compose up -d'
	@echo 'the environment variable wins over .env: keep IMAGE_TAG=latest there,'
	@echo 'a server pulling the `local` tag from Docker Hub would get "not found"'
