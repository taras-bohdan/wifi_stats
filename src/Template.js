import React from 'react';

const Template = function (props) {
	return (
		<html>
		<head>
			<meta charSet="UTF-8"/>
			<title>Wifi usage statistics</title>
			<link rel="stylesheet" type="text/css" href="/style.bundle.css"/>
		</head>
		<body>
		<div id="app" dangerouslySetInnerHTML={{__html: props.children}}/>
		<script src="//vk.com/js/api/openapi.js"></script>
		<script src="/bundle.js"></script>
		{/*Can use data.initialState here inside script tags*/}
		</body>
		</html>
	);
};

module.exports = Template;