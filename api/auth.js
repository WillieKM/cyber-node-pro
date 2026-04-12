// api/auth.js
// Vercel serverless function — handles GitHub OAuth for Decap CMS
// ----------------------------------------------------------------
// SETUP:
// 1. Go to github.com/settings/developers → OAuth Apps → New OAuth App
//    Homepage URL:      https://www.cyber-node.com
//    Callback URL:      https://www.cyber-node.com/api/auth
// 2. Copy Client ID and Client Secret
// 3. In Vercel dashboard → your project → Settings → Environment Variables:
//    GITHUB_CLIENT_ID     = your client id
//    GITHUB_CLIENT_SECRET = your client secret
// ----------------------------------------------------------------

const GITHUB_CLIENT_ID     = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const ORIGIN               = 'https://www.cyber-node.com';

export default async function handler(req, res) {
  const { code, state } = req.query;

  // Step 1 — Redirect to GitHub OAuth
  if (!code) {
    const params = new URLSearchParams({
      client_id: GITHUB_CLIENT_ID,
      scope: 'repo,user',
      state: state || '',
    });
    return res.redirect(`https://github.com/login/oauth/authorize?${params}`);
  }

  // Step 2 — Exchange code for access token
  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id:     GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      return res.status(400).send(`
        <script>
          window.opener.postMessage(
            'authorization:github:error:${JSON.stringify(tokenData.error)}',
            '${ORIGIN}'
          );
          window.close();
        </script>
      `);
    }

    // Step 3 — Send token back to CMS popup window
    return res.send(`
      <script>
        window.opener.postMessage(
          'authorization:github:success:${JSON.stringify({ token: tokenData.access_token, provider: 'github' })}',
          '${ORIGIN}'
        );
        window.close();
      </script>
    `);

  } catch (err) {
    return res.status(500).send(`OAuth error: ${err.message}`);
  }
}
