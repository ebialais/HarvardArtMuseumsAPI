import React, { Component } from 'react';
import axios from 'axios';
import TablePag from '../Components/Table/Table'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            page: 0,
        };
    }

    componentDidMount() { 
        const Key = 'DJSMWWb3Ire4KJmZFdkAmo5FGS116cCj';
        axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=BE&apikey=`+Key+`&size=100&page=${this.state.page}`)
        .then(
        (result) => {
            const items = this.state.items
            items.push(result.data._embedded.events)
            this.setState({
            isLoaded: true,
            items: items
            });
        },
        (error) => {
            this.setState({
            isLoaded: true,
            error
            });
        }
        )
    }

    render (){
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <TablePag 
                    items={this.state.items[0]} 
                />
            )
        }
    }
}