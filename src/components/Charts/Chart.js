import {Component} from 'react';
import tip from 'd3-tip';
import {select} from 'd3';


class Chart extends Component {
	constructor(props) {
		super(props);
	}


	componentDidMount() {
		this.svg = select(this.node);

		/* Initialize tooltip */
		this.tooltip = tip().attr('class', 'd3-tip').html((d) => d);

		/* Invoke the tip in the context of your visualization */
		this.svg.call(this.tooltip);
	}

}

export default Chart;