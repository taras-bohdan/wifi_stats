export default function renderFullPage(html, preloadedState) {
	return `
    <!doctype html>
    <html>
      <head>
			<meta charSet="UTF-8"/>
			<meta name="google-signin-client_id" content="82541447418-nu74mg8vgk1sr8ovekm3df513lm94u45.apps.googleusercontent.com">
			<title>Wifi usage statistics</title>
			<link rel="stylesheet" type="text/css" href="/style.bundle.css"/>
		</head>
      <body>
        <div id="app">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
		<script src="/bundle.js"></script>
      </body>
    </html>
    `
}