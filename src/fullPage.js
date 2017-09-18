export default function renderFullPage(html, preloadedState) {
	return `
    <!doctype html>
    <html>
      <head>
			<meta charSet="UTF-8"/>
			<title>Wifi usage statistics</title>
			<link type="text/css" rel="stylesheet" href="style.bundle.css">
		</head>
      <body>
        <div id="app">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
		<script type="text/javascript" src="bundle.js"></script>
      </body>
    </html>
    `
}