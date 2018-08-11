import React from 'react';
import Event from '../eventView/Event';
import { Container, Row, Col } from 'react-grid-system';

import "./FilterView.css"

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
    var value = this.state.value;
    var url ="https://pure-shore-75332.herokuapp.com/events/"+type+"s?"+type+"="+ value;
    console.log(url);
    fetch(url, {
         method: 'GET'
    })
    .then(res => res.json())
    .then((result) => {
        if(result.error !== null){
            console.log(result);
        this.setState({
            loaded: true,
            filtered: result
        });
        alert(result);
        }else {
            this.setState({
                loaded: false,
                filtered: []
            })
        }
    },
    (error) => {
      loaded:false
  });  
}

  
  render() {
    const { filtered, value, type, loaded } = this.state;
    if(loaded){
        return (
            <div className="EventFilter">
            
              <div className="EventFilterForm">
              <h1 id="eventFilterTitle"> Filter events</h1>
                <form onSubmit={this.handleSubmit}>
                <label htmlFor="filterType">Enter the filter type (owner, type, name, date)</label>
    
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
                                    <Event key={filter.event_id} title={filter.name} description={filter.description} date={filter.date}/>
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
                <label htmlFor="filterType">Enter the filter type (owner, type, name, date)</label>
    
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
