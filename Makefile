BUILD_DIR=build/
SRC_DIR=src/
STYLE_DIR=style/
SRC_MAIN=$(SRC_DIR)Main.js

all: install build

install:
	npm install

build: build-sprites build-src build-style

build-src:
	touch $(BUILD_DIR)all.js
	browserify $(SRC_MAIN) -o $(BUILD_DIR)all.js -d

build-style:
	touch $(BUILD_DIR)all.css
	cat $(STYLE_DIR)*.css > $(BUILD_DIR)all.css

build-sprites:
	touch $(BUILD_DIR)sprites.json
	node src/pre/sprites.js
