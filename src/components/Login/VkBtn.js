import React, {Component} from 'react';
import {SERVER_HOST} from '../../../config';


class VkBtn extends Component {
	login() {
		VK.Auth.login(response => {
			//user is authorised
			if (response.session) {
				fetch(SERVER_HOST + '/vkLogin', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({access_token: response.session.sid})
				})
					.then(response => console.log(response.message))
					.catch(error => console.error(error))
			} else {
				console.error('not authorised');
			}
		});
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