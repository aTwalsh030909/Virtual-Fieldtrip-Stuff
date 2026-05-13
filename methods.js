const password = "NASA1958";

async function checkPassword() {
    const userPassword = document.getElementById("password").value.toUpperCase();
    const goodText = document.getElementById("text");
    const badge = document.getElementById("badge");

    if (userPassword == password) {
        const params = new URLSearchParams(window.location.search);

        const visitorId = params.get('visitorId');
        const urlSlug = params.get('urlSlug');
        const assetId = params.get('assetId');
        const interactiveNonce = params.get('interactiveNonce');
        const interactivePublicKey = params.get('interactivePublicKey');

        const payload = {
            visitorId,
            urlSlug,
            assetId,
            interactiveNonce,
            interactivePublicKey,
            dataObject: {
                itemId: {
                    value: "25c246fe-78b1-491c-95c6-b571390158ee"
                },
            },
        };

        try {
            const r = await fetch(
                'https://highways-rendering-lafayette-muze.trycloudflare.com/webhook/grant-inventory-item',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!r.ok) {
                throw new Error(`reward-emote HTTP ${r.status}`);
            }

            const data = await r.json();
            console.log(data);

        } catch (err) {
            console.error('serverRewards failed:', err);
            return null;
        }

        goodText.style.display = "block";
        badge.style.display = "block";
    } else {
        goodText.style.display = "none";
        badge.style.display = "none";
    }
}