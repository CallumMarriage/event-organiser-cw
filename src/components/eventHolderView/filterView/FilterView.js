import React from 'react';
import Event from '../eventView/Event';
import { Container, Row, Col } from 'react-grid-system';

import "./FilterView.css"
import { getCredentials, getUsername } from '../../../utility';

class EventFilter extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      filtered: [],
      type: '',
      value: '',
      loaded: false
    };

    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  handleTypeChange(event) {
    this.setState({type: event.target.value});
  }

  handleValueChange(event) {
      console.log("changed")
    this.setState({value: event.target.value});
  }

  clearFilter(event){
    this.setState({
        filtered: [],
        loaded: false
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var type = this.state.type;
    var value;

    if(type === 'owner'){
        if(getCredentials() === 'Organiser'){
         value = getUsername();
        } else {
            alert('You dont have the credentials to get events owned by you');
            return
        }
    } else {
         value = this.state.value;
    }

    if(type === 'subscription'){
        if(getCredentials() === 'Student'){
         value = getUsername();
        } else {
            alert('You dont have the credentials to get subscriptions');
            return
        }
    } else {
         value = this.state.value;
    }
    if(getCredentials() === 'Public'){
        alert('You dont have credientials to filter');
        return;
    }
    var url ="https://pure-shore-75332.herokuapp.com/events/"+type+"s?"+type+"="+ value;
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
            <div className="EventFilter">
            
              <div className="EventFilterForm">
              <h1 id="eventFilterTitle"> Filter events</h1>
                <form onSubmit={this.handleSubmit}>
                <label htmlFor="filterType">Enter the filter type (owner, type, name, date, subscription)</label>
    
                <input id="filterType" name="filterType" type="text"  onChange={this.handleTypeChange}/>
    
                <label htmlFor="filterValue">Enter the filter value</label>
                <input id="filterValue" name="filterValue" type="text"  onChange={this.handleValueChange}/>
    
                <button>Get Events</button>
              </form>
              </div>
              <div id="container">
                <div id="allContainer">
                    <ul>
                        <Container id="filtered">
                            <Row>
                                {filtered.map(filter => (
                                <Col sm={4}>
                                    <Event key={filter.event_id} title={filter.name} description={filter.description} date={filter.date} type={filter.type}/>
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
            <div className="EventFilter">
            
              <div className="EventFilterForm">
              <h1 id="eventFilterTitle"> Filter events</h1>
                <form onSubmit={this.handleSubmit}>
                <label htmlFor="filterType">Enter the filter type (owner, type, name, date, subscription)</label>
    
                <input id="filterType" name="filterType" type="text"  onChange={this.handleTypeChange}/>
    
                <label htmlFor="filterValue">Enter the filter value</label>
                <input id="filterValue" name="filterValue" type="text"  onChange={this.handleValueChange}/>
    
                <button>Get Events</button>
              </form>
              </div>
            
            </div>
          );
    }
  }
}

export default EventFilter;
