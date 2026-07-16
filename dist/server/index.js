export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const originalPath = url.pathname;

    if (url.pathname === "/wapm") {
      url.pathname = "/wapm.html";
    }

    let response = await env.ASSETS.fetch(new Request(url, request));

    if (response.status === 404 && !originalPath.includes(".")) {
      const htmlUrl = new URL(request.url);
      htmlUrl.pathname = `${originalPath.replace(/\/$/, "")}.html`;
      response = await env.ASSETS.fetch(new Request(htmlUrl, request));
    }

    if (response.status === 404) {
      const indexUrl = new URL(request.url);
      indexUrl.pathname = "/index.html";
      response = await env.ASSETS.fetch(new Request(indexUrl, request));
    }

    return response;
  },
};
