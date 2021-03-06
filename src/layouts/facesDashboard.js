import React, {Component} from 'react'
import { Grid, Image, Icon, Header, Container, Divider, Button, Loader} from 'semantic-ui-react'
import {FaceToLabel, FacesLabeled, FacesInferred, FaceStatistics, FaceTableLabeled, FaceTableInferred} from '../components/faces'
import  FaceClusterScatter  from '../components/faceClusterGraph'
import { connect } from "react-redux";
import {trainFaces, clusterFaces} from '../actions/facesActions';
          
// <Icon name='id badge' circular />

export class FacesDashboard extends Component {
  componentWillMount() {
    this.props.dispatch(clusterFaces())
  }

  trainHandler = e => {
    this.props.dispatch(trainFaces())
  }

  render() {
    return (
      <Container fluid>
        <Header dividing as='h2' icon textAlign='center'>
            <Icon size='small' name='user'/>Face Dashboard
            <Header.Subheader>Label faces and train a face classifier!</Header.Subheader>
        </Header>

        <Grid stackable columns={2}>
        	<Grid.Column width={6}>
        	<FaceToLabel/>
        	<Divider/>
        	<Button loading={this.props.training} color='blue' fluid onClick={this.trainHandler}>
            <Icon name='lightning'/>Train
          </Button>
        	</Grid.Column>

        	<Grid.Column width={10}>
	        	<FaceClusterScatter/>
        	</Grid.Column>
        </Grid>

        <Divider/>

        <Header as='h3'>Inferred <Loader size='mini' inline active={this.props.fetchingInferredFaces}/></Header>
				<FaceTableInferred/>      
        <Header as='h3'>Labeled <Loader size='mini' inline active={this.props.fetchingLabeledFaces}/></Header>
				<FaceTableLabeled/>      
      </Container>
    )
  }
}


FacesDashboard = connect((store)=>{
  return {
    facesVis: store.faces.facesVis,
    training: store.faces.training,
    trained: store.faces.trained,
    fetchingLabeledFaces: store.faces.fetchingLabeledFaces,
    fetchedLabeledFaces: store.faces.fetchedLabeledFaces,
    fetchingInferredFaces: store.faces.fetchingInferredFaces,
    fetchedInferredFaces: store.faces.fetchedInferredFaces,
  }
})(FacesDashboard)



