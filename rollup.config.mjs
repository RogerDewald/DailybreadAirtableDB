import dotenv from "rollup-plugin-dotenv"

export default {
    input: "src/index.js",
    output: {
        format: "iife",
        file: "build/bundle.js"
    },
    plugins:[
        dotenv()
    ],
}
