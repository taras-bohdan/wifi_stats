const VKApi = require('node-vkapi');
const {addUserInfoToDB} = require('../db/dbConnector');

const VK = new VKApi({
	app: {
		id: 5924334,
		secret: 'uSFYnLI1wDKeTcgK4ByT'
	}
});

export let login = function (req, res) {
	VK.auth.server().then(token => {
		VK.call('users.get', {
			access_token: req.body.access_token,
			fields: ['first_name', 'last_name', 'sex', 'bdate', 'city', 'country', 'occupation']
		}).then(res => {
			const userInfo = res[0],
				parsedInfo = {
					name: userInfo.first_name + ' ' + userInfo.last_name,
					sex: userInfo.sex === 1 ? 'female' : 'male',
					birthday: userInfo.bdate,
					location: userInfo.city || 'NA'
				};

			parsedInfo.age = userInfo.bdate ? new Date().getYear() - new Date(userInfo.bdate.split('.')[2]).getYear() : 'NA';

			addUserInfoToDB(parsedInfo);
			res.redirect('/');
		}).catch(error => {
			console.log(error);
		});

	}).catch(error => {
		console.log(error);
	});
};