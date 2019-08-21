import React, { Component, forwardRef } from 'react'
import { MyList } from "../list/list"
import { MyInput } from '../inputs/input';

/**
 * Permet de filtrer les éléments d'une liste
 */
export default class FilteredList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialItems: props.initialItems,
            items: {},
            key: 0
        }

        this.filterList = this.filterList.bind(this)
        this.getData = this.getData.bind(this)
    }

    /**
     * Mets à jour les élements de la liste en fonction de l'input
     * @param {event} event 
     */
    filterList(event) {
        var updatedList = this.state.initialItems;
        updatedList = updatedList.filter(function (item) {
            if (item.firstName) {
                return item.firstName.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1
            } else {
                return item.name.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1
            }
        });
        this.setState({ items: updatedList });
    }

    componentWillMount() {
        this.setState({ items: this.props.initialItems })
        this.setState({ key: Math.random() });
    }

    componentDidUpdate(prevProps) {
        if (this.props.initialItems !== prevProps.initialItems) {
            this.setState({ items: this.props.initialItems })
            this.setState({ key: Math.random() });
        }
    }

    onSelect = forwardRef((props, ref) => (
        <div ref={ref} onMouseDown={this.getData} {...props} />
    ));

    getData(event) {
        this.props.sendData(event.target.attributes.getNamedItem('data-key').value)
    }

    render() {
        const items = this.state.items
        return (
            <div className="filter-list">
                <MyInput
                    name="Search"
                    onChange={this.filterList}
                />
                <MyList
                    items={items}
                    getData={this.onSelect}
                    key={this.state.key}
                />
            </div>
        );
    }
}