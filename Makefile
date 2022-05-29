setup:
	chmod +x ./install-tools.sh
	./install-tools.sh

gen:
	(cd kubernetes && make gen)
	(cd rust && make gen)
	(cd typescript && make gen)

dev:
	(cd kubernetes && make dev)

mergekubeconfig:
	# E.g Usage: `make mergekubeconfig file=./test-cluster-kubeconfig.yml`
	echo "Merging config: $(file)"
	cp ~/.kube/config ~/.kube/config.bak && KUBECONFIG=~/.kube/config:$(file) kubectl config view --flatten > /tmp/config && mv /tmp/config ~/.kube/config

	echo "Successfully merged configs. See new config!!!!!! 🎉"
	cat ~/.kube/config

