import React, {Component} from 'react';
import {SERVER_HOST} from '../../../config';


class VkBtn extends Component {
	login() {
		VK.Auth.login(response => {
			if (response.session) {
				VK.Api.call('users.get', {
					fields: ['first_name', 'last_name', 'sex', 'bdate', 'city', 'country', 'occupation']
				}, function (r) {
					if (r.response) {
						parseInfoAndSubmit(r.response[0]);
					}
				});
			} else {
				console.error('not authorised');
			}
		});

		function parseInfoAndSubmit(userInfo) {
			//parse information
			var parsedInfo = {
				name: userInfo.first_name + ' ' + userInfo.last_name,
				sex: userInfo.sex === 1 ? 'female' : 'male',
				birthday: userInfo.bdate
			};

			parsedInfo.age = userInfo.bdate ? new Date().getYear() - new Date(userInfo.bdate.split('.')[2]).getYear() : 'NA';

			sendUserInfo(parsedInfo);
		}

		function sendUserInfo(userInfo) {
			fetch(SERVER_HOST + '/user', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userInfo)
			}).then(response => {
				console.log(response);
			}).catch(error => {
				console.log(error);
			});
		}
	}

	componentDidMount() {
		//VK auth---------------------
		VK.init({
			apiId: 5924334
		});
	}

	render() {
		return (
			<div className="button-login" onClick={this.login}>
				<img className="button-icon" src="/img/vk_img.png"></img>
				Увійти через Vk
			</div>
		)
	}
}

export default VkBtn;