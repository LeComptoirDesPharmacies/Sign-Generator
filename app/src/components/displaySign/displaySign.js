import React, { Component } from 'react'
import './displaySign.scss'
var fs = require('fs');

export default class DisplaySign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            htmlFile: ''
        }
    }

    componentDidUpdate(prevProps) {
        this.displaySign(prevProps)
    }

    async displaySign(prevProps) {
        if (!this.props.fileName) {
            if (this.props.fileName !== prevProps.fileName) {
                this.setState({ htmlFile: '' })
                return;
            }
        }
        if (this.props.fileName !== prevProps.fileName) {
            let htmlFile = fs.readFileSync(this.props.fileName, 'utf8')
            this.setState({ htmlFile: htmlFile })
        }
    }

    render() {
        return (
            <div>
                <div dangerouslySetInnerHTML={{ __html: this.state.htmlFile }} />
            </div>
        );
    }
}