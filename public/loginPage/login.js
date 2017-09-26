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
			hospitalId: redirectData.hospitalId || 0
		}, link)
	}
}

function selectChanged() {
	var selectedAge = document.getElementById('age').value,
		selectedGender = document.getElementById('gender').value;

	document.getElementById('login-button').className = selectedAge && selectedGender ? 'active' : '';
}

function sendUserInfo(userInfo, link) {
	postAjax('/addUser', userInfo, () => {
		window.location.href = link;
	})
}

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

function isEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop))
			return false;
	}

	return JSON.stringify(obj) === JSON.stringify({});
}