import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import startCase from 'lodash/startCase';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
	propLabel: {
		color: theme.palette.primary[500]
	}
});

class UserInfoDialog extends Component {
	constructor(props) {
		super(props);
	}

	handleRequestClose() {
		this.props.onUserInfoDialogClose();
	}

	render() {
		const {classes} = this.props;

		return (
			<div>
				<Dialog open={this.props.open} transition={Slide} onRequestClose={this.handleRequestClose.bind(this)}>
					<DialogTitle>{"User Information"}</DialogTitle>
					<DialogContent>
						{
							this.props.data && Object.keys(this.props.data).map(key => {
								if (key !== '_id') {
									return <DialogContentText key={key}>
										<span className={classes.propLabel}>{startCase(key)}: </span>
										<span>{this.props.data[key]}</span>
									</DialogContentText>
								}
							})
						}
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleRequestClose.bind(this)} color="primary">
							Close
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

UserInfoDialog.propTypes = {
	open: PropTypes.bool,
	data: PropTypes.object,
	classes: PropTypes.object.isRequired,
	onUserInfoDialogClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(UserInfoDialog);