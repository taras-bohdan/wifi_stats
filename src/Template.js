import React from 'react';
import {Route, Link} from 'react-router-dom'

const Template = function (props) {
	return (
		<html>
		<head>
			<title>Wifi usage statistics</title>
			<link rel="stylesheet" type="text/css" href="/style.bundle.css"/>
		</head>
		<body>
		<div id="app" dangerouslySetInnerHTML={{__html: props.children}}/>
		<script src="//vk.com/js/api/openapi.js"></script>
		<script src="/bundle.js"></script>
		</body>
		</html>
	);
};

module.exports = Template;