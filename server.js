const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const root = path.resolve(__dirname);
const port = Number(process.env.PORT) || 3000;
const contentTypes = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".js": "text/javascript; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".webp": "image/webp"
};

http.createServer((request, response) => {
    if (request.method !== "GET" && request.method !== "HEAD") {
        response.writeHead(405, { Allow: "GET, HEAD" });
        response.end("Method not allowed");
        return;
    }

    let pathname;
    try {
        pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    } catch {
        response.writeHead(400);
        response.end("Bad request");
        return;
    }

    const relativePath = path.normalize(pathname === "/" ? "index.html" : pathname.replace(/^[/\\]+/, ""));
    const isPageAsset = ["index.html", "styles.css", "script.js"].includes(relativePath);
    const isImageAsset = relativePath.startsWith(`images${path.sep}`)
        && [".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"].includes(path.extname(relativePath).toLowerCase());
    if (!isPageAsset && !isImageAsset) {
        response.writeHead(404);
        response.end("Not found");
        return;
    }

    const filePath = path.resolve(root, relativePath);
    if (filePath !== root && !filePath.startsWith(root + path.sep)) {
        response.writeHead(403);
        response.end("Forbidden");
        return;
    }

    fs.stat(filePath, (error, stats) => {
        if (error) {
            if (error.code !== "ENOENT" && error.code !== "ENOTDIR") {
                console.error(`Unable to read ${filePath}:`, error);
                response.writeHead(500);
                response.end("Internal server error");
                return;
            }

            response.writeHead(404);
            response.end("Not found");
            return;
        }

        if (!stats.isFile()) {
            response.writeHead(404);
            response.end("Not found");
            return;
        }

        response.writeHead(200, {
            "Content-Length": stats.size,
            "Content-Type": contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
            "X-Content-Type-Options": "nosniff"
        });

        if (request.method === "HEAD") {
            response.end();
            return;
        }

        const stream = fs.createReadStream(filePath);
        stream.on("error", (streamError) => {
            console.error(`Unable to stream ${filePath}:`, streamError);
            response.destroy(streamError);
        });
        stream.pipe(response);
    });
}).listen(port, "0.0.0.0", () => {
    console.log(`SMART KIDZZ website listening on port ${port}`);
});
