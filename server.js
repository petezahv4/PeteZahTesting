import { createBareServer } from "@tomphttp/bare-server-node";

const bareServer = createBareServer("/bare/");
app.use(express.static(pubDir));

app.get("/uv/config.js", (req, res) => {
        res.sendFile(path.join(pubDir, "uv/config.js"));
});

app.use("/uv/", express.static(uvPath));
app.use("/epoxy/", express.static(epoxyPath));
app.use("/libcurl/", express.static(libcurlPath));
app.use("/baremux/", express.static(baremuxPath));

app.use((req, res) => {
        res.status(404).sendFile(path.join(pubDir, "404.html"));
});

server.on("request", async (req, res) => {
  // Listen for request abort events on the underlying request object
  req.on("aborted", () => {
    console.warn("Underlying request aborted:", req.url);
  });
  try {
    if (bareServer.shouldRoute(req)) {
      bareServer.routeRequest(req, res);
    } else {
      app(req, res);
    }
  } catch (error) {
    if (error.message && error.message.includes("aborted")) {
      console.warn("Request aborted by client during processing:", error);
      return;
    }
    console.error("Request error:", error);
    res.statusCode = 500;
    res.write(String(error));
    res.end();
  }
});

server.listen(port, "0.0.0.0", () => {
        const address = server.address();
        console.log(startup_msg)
});
