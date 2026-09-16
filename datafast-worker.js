export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("text/html")) {
      return response;
    }

    return new HTMLRewriter()
      .on("head", {
        element(head) {
          head.append(
            '<script defer data-website-id="dfid_ILGOJScmwXB3t7WkgO5vt" data-domain="laptop.atushhhh6.workers.dev" src="https://datafa.st/js/script.js"></script>',
            { html: true }
          );
        },
      })
      .transform(response);
  },
};
