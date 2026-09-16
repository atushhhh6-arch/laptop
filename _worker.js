export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const type = response.headers.get('content-type') || '';

    if (!type.includes('text/html')) return response;

    return new HTMLRewriter()
      .on('head', {
        element(head) {
          head.append(`
            <style>
              .grid4 {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                grid-template-rows: repeat(2, minmax(0, 1fr)) !important;
                gap: 10px !important;
                padding: 14px !important;
              }
              .grid4 .slot {
                min-width: 0 !important;
                min-height: 0 !important;
              }
              .grid4 .slotName {
                max-width: 120px !important;
              }
              @media (max-width: 600px) {
                .grid4 {
                  gap: 7px !important;
                  padding: 9px !important;
                }
              }
            </style>
          `, { html: true });
        }
      })
      .transform(response);
  }
};
