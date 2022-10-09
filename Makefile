#############
## STANDARD
#############
setup:
	chmod +x ./install-tools.sh
	./install-tools.sh

install:
	chmod +x ./install-tools.sh
	./install-tools.sh

upgrade:
	(cd kubernetes && make upgrade)
	(cd rust && make upgrade)
	(cd typescript && make upgrade)

sync:
	(cd kubernetes && make sync)
	(cd rust && make sync)
	(cd typescript && make sync)

dev:
	(cd kubernetes && make dev)

format:
	(cd kubernetes && make format)
	(cd rust && make format)
	(cd typescript && make format)
	
check:
	(cd kubernetes && make check)
	(cd rust && make check)
	(cd typescript && make check)

test:
	(cd kubernetes && make test)
	(cd rust && make test)
	(cd typescript && make test)
