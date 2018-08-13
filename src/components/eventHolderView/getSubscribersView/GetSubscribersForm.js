import React from 'react';
import Subscriber from './SubscriberView/Subscriber';
import { Container, Row, Col } from 'react-grid-system';

import { getCredentials, getUsername } from '../../../utility';

class GetSubsribersForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      filtered: [],
      name: '',
      loaded: false
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  clearFilter(event){
    this.setState({
        filtered: [],
        loaded: false
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var name = this.state.name;

    if(getCredentials() !== 'Organiser'){
        alert('You dont have credientials to filter');
        return;
    }
    var url ="https://pure-shore-75332.herokuapp.com/events/"+name+"/subscriptions";
    console.log(url);
    fetch(url, {
         method: 'GET'
    })
    .then(res => res.json())
    .then((result) => {
        if(result.error !== null){
            if(result !== undefined){
                this.setState({
                    loaded: true,
                    filtered: result
                });
            } else {
                alert('Invalid filter');
            }
        }else {
            this.setState({
                loaded: false,
                filtered: []
            })
        }
    },
    );  
}

  
  render() {
    const { filtered, loaded } = this.state;
    
    if(loaded){
       
       return (
            <div className="GetSubsribersForm">
            
              <div className="GetSubForm">
              <h1 id="getSubscribersTitle"> Get subscribers by event</h1>
                <form onSubmit={this.handleSubmit}>
                <label htmlFor="filterName">Enter the name of the event</label>
    
                <input id="filterName" name="filterName" type="text"  onChange={this.handleNameChange}/>
    
  
                <button>Get Subscribers</button>
              </form>
              </div>
              <div id="container">
                <div id="allContainer">
                    <ul>
                        <Container id="filtered">
                            <Row>
                                {filtered.map(filter => (
                                <Col sm={4}>
                                    <Subscriber key={filter.user_id} title={filter.full_name} email={filter.email}/>
                                </Col>
                                ))}
                            </Row>
                        </Container>
                    </ul>
                </div>

                <button onClick={this.clearFilter}>Clear filter</button>
              </div>
            </div>
          );
    } else {
        return (
            <div className="GetSubsribersForm">
            
              <div className="GetSubForm">
              <h1 id="getSubscribersTitle"> Get subscribers by event</h1>
                <form onSubmit={this.handleSubmit}>
                <label htmlFor="filterName">Enter the name of the event</label>
    
                <input id="filterName" name="filterName" type="text"  onChange={this.handleNameChange}/>
    
  
                <button>Get Subscribers</button>
              </form>
              </div>
            
            </div>
          );
    }
  }
}

export default GetSubsribersForm;
