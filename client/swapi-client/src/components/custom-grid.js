import React from 'react';
import { Grid } from '@material-ui/core';
import GridCard from './grid-card';
import axios from 'axios';
import { connect } from 'react-redux';
import { 
	Link, 
	Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import SingleCard from './single-card';




class CustomGrid extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: [],
		}
	}
	componentDidMount() {
		this.getEntities();
	}	
	getEntities() {
		const entity = this.props.entity.toLowerCase()
		const url = `http://localhost:8080/` + entity

		const username = "Luke"
		const password = "DadSucks"


		axios.get(url, {
			auth: {
				username: username,
				password: password
			}
		})
		.then(res => {
			const data = res.data.results;
			this.setState({ data });
			console.log(this.state.data)
		})
	}
	render() {
		if (this.state.data.length > 0) {
			return (
				<div>
					<Router>
					<Grid container spacing={3} xs={12}>
						<Grid item xs={12}>
							<Grid container justify="center" spacing={5} xs={12} >
							{this.state.data.map((value, index) => {
								return (
										<Grid key={index} item>
												<Link to={{
													pathname: `/${ this.props.entity}/${index}`,
													state: {
														data: {value}
													},
												}}>
													<GridCard key={index} name={value.name} />
												</Link>																						
										</Grid>
								)
							})}
							</Grid>
						</Grid>
					</Grid>
						<Route path={`/${this.props.entity}/:id`} component={() => <SingleCard key={window.location.pathname}></SingleCard>}/>  
					</Router>		
				</div>
			);
		} else {
			return (
				<p>No data found.</p>
			);
		}
	}
}

const mapStateToProps = function(state) {
	return {
		entity: state.entity.value
	}
}

export default connect(mapStateToProps)(CustomGrid);
