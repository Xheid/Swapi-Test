import React from 'react';
import ImageIcon from '@material-ui/icons/Image';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {  Card, CardContent, Typography, Grid } from '@material-ui/core';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	cardRoot: {
		width: 600,
		marginTop: 80,
		height: 400
	}
} 

class SingleCard extends React.Component {
		static propTypes = {
    	location: PropTypes.object.isRequired,
			classes: PropTypes.object.isRequired,
		}
		constructor(props){
			super(props);
			this.state = {
				infos: {},
			}
		}
		componentDidMount(){
			this.getEntityInfos()
		}
		getEntityInfos(){
			let infos = {};
			for (const[key, value] of Object.entries(this.props.location.state.data.value)){
				if (typeof(value) === 'string')	{
					let formatKey = key.split('_').join(' ')
					let formatValue = value.split('_').join(' ')
					infos[formatKey] = formatValue;
				}
			}
			this.setState({infos})
		}
    render() {
			const { classes } = this.props
      return (
				<Grid 
					container
					spacing={0}
					alignItems="center"
					justify="center"
				>
					<Card items xs={3} className={classes.cardRoot}>
						<CardContent>
							<ImageIcon></ImageIcon>
									{Object.entries(this.state.infos).map(([key, value], index) => {
											return (
												<Typography key={key}>
													{key} : {value}
												</Typography>	
											)
										}
									)}
						</CardContent>
					</Card>
				</Grid>
      );
    }
  }

	export default withRouter(connect()(withStyles(styles)(SingleCard)))
