gen:
	(cd kubernetes && make gen)
	(cd rust && make gen)
	(cd typescript && make gen)

dev:
	(cd kubernetes && make start-app-build)