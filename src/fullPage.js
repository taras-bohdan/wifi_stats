export default function renderFullPage(html, preloadedState, css) {
  return `<!doctype html>
<html>
<head>
    <meta charSet="UTF-8" />
    <title>Wifi usage statistics</title>
    <link type="text/css" rel="stylesheet" href="style.bundle.css">
    <style id="jss-server-side">${css}</style>
</head>
<body>
<div id="app">
    <div>${html}</div>
</div>
<script>
  // WARNING: See the following for security issues around embedding JSON in HTML:
  // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
  window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\\u003c')}
</script>
<script type="text/javascript" src="bundle.js"></script>
</body>
</html>`;
}
