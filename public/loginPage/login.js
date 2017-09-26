/**
 * Login user
 */
function login() {
	var link = '/';

	if (!isEmpty(redirectData)) {
		const linkLoginOnly = redirectData.linkLoginOnly,
			dst = 'http://google.com.ua',
			userName = 'T-' + redirectData.macEsc;
		link = linkLoginOnly + '?dst=' + dst + '&username=' + userName;
	}

	var selectedAge = document.getElementById('age').value,
		selectedGender = document.getElementById('gender').value;
	if (selectedAge && selectedGender) {
		sendUserInfo({
			age: selectedAge,
			sex: selectedGender,
			hospitalId: redirectData.hospitalId || 0,
			browserInfo: getBrowserInfo()
		}, link)
	}
}

/**
 * Show/hide login button based on select options
 */
function selectChanged() {
	var selectedAge = document.getElementById('age').value,
		selectedGender = document.getElementById('gender').value;

	document.getElementById('login-button').className = selectedAge && selectedGender ? 'active' : '';
}

/**
 * Send user information using POST
 * @param userInfo - user information to be sent
 * @param link - link to load after response
 */
function sendUserInfo(userInfo, link) {
	postAjax('/addUser', userInfo, () => {
		window.location.href = link;
	})
}

/**
 * POST request to server
 * @param url - request url
 * @param data - request body
 * @param success - function called on successful response
 * @returns {XMLHttpRequest}
 */
function postAjax(url, data, success) {
	var params = typeof data == 'string' ? data : Object.keys(data).map(
		function (k) {
			return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
		}
	).join('&');

	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : window.ActiveXObject("Microsoft.XMLHTTP");
	xhr.open('POST', url);
	xhr.onreadystatechange = function () {
		if (xhr.readyState > 3 && xhr.status == 200) {
			success(xhr.responseText);
		}
	};
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(params);
	return xhr;
}

/**
 * Check if object is empty
 * @param obj
 * @returns {boolean}
 */
function isEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop))
			return false;
	}

	return JSON.stringify(obj) === JSON.stringify({});
}

/**
 * Get browser and OS information
 * @returns {{browserName: string, fullVersion: string, majorVersion: Number, appName: string, userAgent: string, os: string}}
 */
function getBrowserInfo() {
	var nVer = navigator.appVersion;

	var nAgt = navigator.userAgent;
	var browserName = navigator.appName;
	var fullVersion = '' + parseFloat(navigator.appVersion);
	var majorVersion = parseInt(navigator.appVersion, 10);
	var nameOffset, verOffset, ix;

	// In Opera, the true version is after "Opera" or after "Version"
	if ((verOffset = nAgt.indexOf("Opera")) != -1) {
		browserName = "Opera";
		fullVersion = nAgt.substring(verOffset + 6);
		if ((verOffset = nAgt.indexOf("Version")) != -1)
			fullVersion = nAgt.substring(verOffset + 8);
	}
	// In MSIE, the true version is after "MSIE" in userAgent
	else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
		browserName = "Microsoft Internet Explorer";
		fullVersion = nAgt.substring(verOffset + 5);
	}
	// In Chrome, the true version is after "Chrome"
	else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
		browserName = "Chrome";
		fullVersion = nAgt.substring(verOffset + 7);
	}
	// In Safari, the true version is after "Safari" or after "Version"
	else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
		browserName = "Safari";
		fullVersion = nAgt.substring(verOffset + 7);
		if ((verOffset = nAgt.indexOf("Version")) != -1)
			fullVersion = nAgt.substring(verOffset + 8);
	}
	// In Firefox, the true version is after "Firefox"
	else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
		browserName = "Firefox";
		fullVersion = nAgt.substring(verOffset + 8);
	}
	// In most other browsers, "name/version" is at the end of userAgent
	else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
		(verOffset = nAgt.lastIndexOf('/'))) {
		browserName = nAgt.substring(nameOffset, verOffset);
		fullVersion = nAgt.substring(verOffset + 1);
		if (browserName.toLowerCase() == browserName.toUpperCase()) {
			browserName = navigator.appName;
		}
	}
	// trim the fullVersion string at semicolon/space if present
	if ((ix = fullVersion.indexOf(";")) != -1)
		fullVersion = fullVersion.substring(0, ix);
	if ((ix = fullVersion.indexOf(" ")) != -1)
		fullVersion = fullVersion.substring(0, ix);

	majorVersion = parseInt('' + fullVersion, 10);
	if (isNaN(majorVersion)) {
		fullVersion = '' + parseFloat(navigator.appVersion);
		majorVersion = parseInt(navigator.appVersion, 10);
	}

	//get OS
	var OSName = "Unknown OS";
	if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
	if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
	if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
	if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";

	return {
		browserName: browserName,
		fullVersion: fullVersion,
		majorVersion: majorVersion,
		appName: navigator.appName,
		userAgent: navigator.userAgent,
		os: OSName
	};
}