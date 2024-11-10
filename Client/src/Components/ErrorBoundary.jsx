import React, { Component } from 'react';
import PageNotFound from '../Pages/PageNotFound';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null }
    }
    componentDidCatch(error) {
        this.setState({
            error: error
        })
    }
    render() {
        { this }
        if (this.state.error) {
            return (
                <PageNotFound error={this.state.error} />
            )
        }
        return (
            this.props.children
        )
    }
}