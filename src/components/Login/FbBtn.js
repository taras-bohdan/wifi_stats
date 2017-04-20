import React, {Component} from 'react';


class FbBtn extends Component {
	login(){
		window.location.href = "/fbLogin";
	}

	render() {
		return (
			<div className="button-login" onClick={this.login}>
				<img className="button-icon" src="/img/fb_img.png"></img>
				Увійти через Facebook
			</div>
		)
	}
}

export default FbBtn;