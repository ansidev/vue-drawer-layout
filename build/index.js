const rm = require("rimraf"),
    rollup = require("rollup"),
    babel = require("rollup-plugin-babel"),
    nodeResolve = require("rollup-plugin-node-resolve"),
    vue = require("rollup-plugin-vue").default,
    commonjs = require("rollup-plugin-commonjs"),
    terser = require("rollup-plugin-terser").terser;
const pkg = require("../package");
const buildOption = {
    input: {
        input: "src/index.js",
        plugins: [
            nodeResolve({
                jsnext: true,
                main: true,
                browser: true,
                extensions: [".vue", ".js", ".json"]
            }),
            commonjs(),
            vue({
                css: true
            }),
            babel({
                exclude: "node_modules/**",
                runtimeHelpers: true
            }),
            terser()
        ]
    },
    output: {
        file: `./dist/${pkg.name}.js`,
        format: "umd",
        name: "DrawerLayout"
    }
};

async function build() {
    const bundle = await rollup.rollup(buildOption.input);
    await bundle.write(buildOption.output);
}

build();
