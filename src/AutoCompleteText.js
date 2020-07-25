import React, { Component } from "react";
import "./AutoCompleteText.css";

class AutoCompleteText extends Component {
    constructor() {
        super();
        this.state = {
            text: "",
            id: 0,
            suggestions: [],
        };
    }

    // runs when the text in the field changes upon user input
    onTextChanged = (e) => {
        const value = e.target.value; 
        let suggestionsNew = [];
        // searching functionality with regex
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, "i");
            suggestionsNew = this.props.data.location
                .filter((v) => regex.test(v.vertex_name));
        }
        this.setState({
            text: value,
            suggestions: suggestionsNew,
        });
    };

    // runs when a suggested location is selected
    suggestionSelected(value) {
        this.setState({
            text: value.vertex_name,
            id: value.vertex_id,
            suggestions: [], //wipe the suggestions list when the user selects an item
        });
    }

    // render the list of suggestions
    renderSuggestions() {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => (
                    <li
                        onClick={() => {
                            this.suggestionSelected(item); // call function above
                            this.props.updatePoint(item); // function passed in from parent component
                        }}
                    >
                        {item.vertex_name}
                    </li>
                ))}
            </ul>
        );
    }

    // render the suggestions field
    render() {
        const { text } = this.state;
        return (
            <div className="AutoCompleteText">
                <input
                    value={text}
                    onChange={this.onTextChanged}
                    type="text"
                    placeholder="Enter Location"
                    onFocus="inputFocus(this)"
                    onBlur="inputBlur(this)"
                />
                {this.renderSuggestions()}
            </div>
        );
    }
}

export default AutoCompleteText;
