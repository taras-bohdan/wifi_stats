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

export function sendUserInfo(userInfo, link) {
	postAjax('/addUser', userInfo, () => {
		window.location.href = link;
	})
}