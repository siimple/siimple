.PHONY: build test docs

# Node binaries path
NODE_BIN=../../node_modules/.bin

# Output files
OUTPUT_CSS=./dist/siimple-icons.css
OUTPUT_CSS_MIN=./dist/siimple-icons.min.css
OUTPUT_SVG=./dist/siimple-icons.svg
OUTPUT_FONTS=./dist/fonts
OUTPUT_FONTS_SVG=${OUTPUT_FONTS}/siimple-icons.font.svg
OUTPUT_FONTS_TTF=${OUTPUT_FONTS}/siimple-icons.font.ttf
OUTPUT_FONTS_WOFF=${OUTPUT_FONTS}/siimple-icons.font.woff
OUTPUT_FONTS_WOFF2=${OUTPUT_FONTS}/siimple-icons.font.woff2

# Build the fonts and the css files
build: 
	@# Compile SCSS templates
	node ./scripts/templates.js --source scss
	node ./scripts/templates.js --source test
	@# Compile CSS files
	mkdir -p ${OUTPUT_FONTS}
	${NODE_BIN}/sass -I ../../node_modules/ index.scss ${OUTPUT_CSS} 
	#node ./scripts/header.js > ./dist/header.txt
	#cat ./dist/header.txt ${OUTPUT_CSS} > ${OUTPUT_CSS}.temp
	#rm ./dist/header.txt
	#rm ${OUTPUT_CSS}
	#mv ${OUTPUT_CSS}.temp ${OUTPUT_CSS}
	@# Autoprefix and clean the generated CSS file
	${NODE_BIN}/postcss --use autoprefixer --config ./postcss.config.js --map false --output ${OUTPUT_CSS} ${OUTPUT_CSS}
	${NODE_BIN}/cleancss --compatibility "*" --level 2 --output ${OUTPUT_CSS_MIN} ${OUTPUT_CSS}
	@# Generate SVG sprites
	node ./scripts/build-svg-sprites.js --output ${OUTPUT_SVG}
	@# Generate fonts
	node ./scripts/build-svg-font.js --output ${OUTPUT_FONTS_SVG}
	${NODE_BIN}/svg2ttf ${OUTPUT_FONTS_SVG} ${OUTPUT_FONTS_TTF}
	${NODE_BIN}/ttf2woff ${OUTPUT_FONTS_TTF} ${OUTPUT_FONTS_WOFF}
	${NODE_BIN}/woff2_compress.js ${OUTPUT_FONTS_TTF} ${OUTPUT_FONTS_WOFF2}

# Run tests
test:
	@# TODO

# Publish the package
publish:
	npm publish --access public

