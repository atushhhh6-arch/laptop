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
          head.append(
            `<script>
              (function () {
                function linkSponsorX() {
                  const profileBy = document.getElementById('profileBy');
                  if (!profileBy) return;
                  const bold = profileBy.querySelector('b');
                  if (!bold || bold.querySelector('a')) return;
                  const handle = (bold.textContent || '').trim();
                  if (!/^@[A-Za-z0-9_]{1,15}$/.test(handle)) return;
                  const username = handle.slice(1);
                  const link = document.createElement('a');
                  link.href = 'https://x.com/' + encodeURIComponent(username);
                  link.target = '_blank';
                  link.rel = 'noopener';
                  link.textContent = handle;
                  link.style.color = '#fff';
                  link.style.fontWeight = '700';
                  link.style.textDecoration = 'underline';
                  link.style.textDecorationColor = 'rgba(255,255,255,.35)';
                  link.style.textUnderlineOffset = '3px';
                  bold.textContent = '';
                  bold.appendChild(link);
                }

                function startSponsorXLinker() {
                  linkSponsorX();
                  const observer = new MutationObserver(linkSponsorX);
                  observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                    characterData: true
                  });
                }

                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', startSponsorXLinker);
                } else {
                  startSponsorXLinker();
                }
              })();
            </script>`,
            { html: true }
          );
        },
      })
      .transform(response);
  },
};
