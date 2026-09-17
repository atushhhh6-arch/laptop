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
            `<style>
              /* Current sponsors: scattered logo wall */
              .sponsorList.sponsorWallReady {
                position: relative !important;
                display: block !important;
                min-height: 610px !important;
                margin-top: 38px !important;
                overflow: hidden !important;
                border: 1px solid rgba(23,23,23,.13) !important;
                border-radius: 34px !important;
                background:
                  radial-gradient(circle at 18% 18%, rgba(255,255,255,.72), transparent 28%),
                  radial-gradient(circle at 82% 70%, rgba(210,170,114,.16), transparent 32%),
                  linear-gradient(135deg, rgba(255,255,255,.46), rgba(255,255,255,.20)) !important;
                box-shadow: inset 0 0 70px rgba(126,89,45,.045) !important;
              }

              .sponsorList.sponsorWallReady::after {
                content: "CLICK A LOGO TO OPEN ITS PROFILE";
                position: absolute;
                left: 22px;
                bottom: 17px;
                font-size: 10px;
                letter-spacing: 1.4px;
                font-weight: 900;
                color: rgba(23,23,23,.42);
                pointer-events: none;
              }

              .sponsorList.sponsorWallReady .sponsorCard {
                --r: 0deg;
                --s: 1;
                position: absolute !important;
                left: var(--x) !important;
                top: var(--y) !important;
                width: 104px !important;
                height: 104px !important;
                display: block !important;
                padding: 0 !important;
                margin: 0 !important;
                border: 0 !important;
                border-radius: 23px !important;
                background: transparent !important;
                box-shadow: 0 15px 28px rgba(61,42,21,.18) !important;
                transform: rotate(var(--r)) scale(var(--s)) !important;
                transform-origin: center !important;
                cursor: pointer !important;
                overflow: visible !important;
                z-index: 2;
                transition: transform .18s ease, filter .18s ease, z-index 0s !important;
              }

              .sponsorList.sponsorWallReady .sponsorCard::before {
                content: "";
                position: absolute;
                z-index: 4;
                left: 50%;
                top: -8px;
                width: 42px;
                height: 16px;
                transform: translateX(-50%) rotate(-2deg);
                border-radius: 3px;
                background: rgba(239,224,193,.82);
                border: 1px solid rgba(112,87,54,.12);
                box-shadow: 0 2px 5px rgba(0,0,0,.05);
                pointer-events: none;
              }

              .sponsorList.sponsorWallReady .sponsorCard:hover {
                transform: rotate(var(--r)) scale(calc(var(--s) + .10)) translateY(-4px) !important;
                filter: brightness(1.03);
                z-index: 8;
              }

              .sponsorList.sponsorWallReady .sponsorCard > div:not(.avatar) {
                display: none !important;
              }

              .sponsorList.sponsorWallReady .sponsorCard .avatar {
                width: 100% !important;
                height: 100% !important;
                min-width: 100% !important;
                border-radius: 23px !important;
                overflow: hidden !important;
                background: #fff !important;
                border: 2px solid rgba(255,255,255,.92) !important;
                box-shadow: inset 0 0 0 1px rgba(23,23,23,.05) !important;
              }

              .sponsorList.sponsorWallReady .sponsorCard .avatar img {
                width: 100% !important;
                height: 100% !important;
                display: block !important;
                object-fit: cover !important;
                border-radius: 20px !important;
              }

              @media (max-width: 760px) {
                .sponsorList.sponsorWallReady {
                  min-height: auto !important;
                  display: grid !important;
                  grid-template-columns: repeat(3, 1fr) !important;
                  gap: 20px 12px !important;
                  padding: 30px 18px 58px !important;
                }
                .sponsorList.sponsorWallReady .sponsorCard {
                  position: relative !important;
                  left: auto !important;
                  top: auto !important;
                  width: 88px !important;
                  height: 88px !important;
                  justify-self: center !important;
                  transform: rotate(var(--r)) scale(.96) !important;
                }
                .sponsorList.sponsorWallReady .sponsorCard:hover {
                  transform: rotate(var(--r)) scale(1.04) translateY(-3px) !important;
                }
              }
            </style>
            <script>
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

                const wallPositions = [
                  [6,12,-8,1.08],[24,6,5,.92],[42,17,-4,1.02],[60,8,7,.90],[78,16,-6,1.06],
                  [12,40,6,.94],[30,33,-8,1.10],[48,43,4,.92],[66,35,-3,1.00],[82,45,7,.88],
                  [5,68,-5,.96],[22,61,8,1.04],[39,73,-7,.91],[56,64,5,1.09],[73,70,-4,.95],
                  [84,76,6,.86],[32,84,3,.84],[61,84,-6,.82]
                ];

                function layoutSponsorWall() {
                  const wall = document.getElementById('sponsorList');
                  if (!wall) return;

                  const cards = Array.from(wall.querySelectorAll('.sponsorCard'));
                  const sponsorCards = cards.filter(card => card.querySelector('.avatar'));

                  wall.classList.toggle('sponsorWallReady', sponsorCards.length > 0);
                  if (!sponsorCards.length) return;

                  sponsorCards.forEach((card, i) => {
                    const p = wallPositions[i % wallPositions.length];
                    card.style.setProperty('--x', p[0] + '%');
                    card.style.setProperty('--y', p[1] + '%');
                    card.style.setProperty('--r', p[2] + 'deg');
                    card.style.setProperty('--s', String(p[3]));

                    const img = card.querySelector('.avatar img');
                    const hiddenText = card.querySelector('div:not(.avatar)');
                    if (img) {
                      img.alt = hiddenText?.querySelector('strong')?.textContent || 'Sponsor logo';
                    }
                    card.setAttribute('aria-label', (hiddenText?.textContent || 'Open sponsor profile').trim());
                  });
                }

                function startEnhancements() {
                  linkSponsorX();
                  layoutSponsorWall();

                  const bodyObserver = new MutationObserver(() => {
                    linkSponsorX();
                  });
                  bodyObserver.observe(document.body, {
                    childList: true,
                    subtree: true,
                    characterData: true
                  });

                  const wall = document.getElementById('sponsorList');
                  if (wall) {
                    const wallObserver = new MutationObserver(layoutSponsorWall);
                    wallObserver.observe(wall, { childList: true });
                  }
                }

                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', startEnhancements);
                } else {
                  startEnhancements();
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
