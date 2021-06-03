import React from 'react';
import {  Card, CardContent, Typography } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
 


export default class GridCard extends React.Component {
  constructor(props) {
    super(props);
  }
    render() {
      return (
        <Card>
          <CardContent>
            <ImageIcon></ImageIcon>
            <Typography>
              {this.props.name}
            </Typography>
          </CardContent>
        </Card>
      );
    }
  }

