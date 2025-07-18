import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    plugins: [
        react(
            {
            babel: {
                plugins: [
                  ['formatjs', { removeDefaultMessage: true, ast: true }]
                ]
              }
        }
    ),
        svgr({
            include: "**/*.svg",
        }),
    ],
});
