import React, { Component } from "react";
import AutoCompleteText from "./AutoCompleteText";
import "./TextField.css";
import Checkbox from "react-simple-checkbox"

const https = require("https");

class TextField extends Component {
    constructor() {
        super();
        this.state = {
            directions: [{edge_description: "", edge_id:0}],
            edges: [],
            location: [],
            start: 1,
            end: 5,
            textStart: "",
            textEnd: "",
            suggestions: [],
        };
    }

    //update the paragraph of directions when the user clicks "Search" 
    updateText() {
        // initially show loading text
        this.setState({ directions: [] });
        // call API to get route
        https.get(`https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/routes?start=${this.state.start}&end=${this.state.end}`,
            (resp) => {
                let data = "";
                resp.on("data", (chunk) => {
                    data += chunk;
                });
                resp.on("end", () => {
                    //passes an array of string, state changes to array of locations given by the API
                    console.log(`Got directions from ${this.state.start} to ${this.state.end}\n ${data}`);
                    try {
                        this.setState({
                            directions: JSON.parse(data).map((obj) => {
                                return obj;
                            }),
                        });
                    } catch (err) {
                        this.setState({
                            directions: [{edge_description: "There was an error getting the route you wanted. Sorry :(", edge_id: 0}]
                        })
                    }
                });
            }
        );
    }

    // called immediately after this component is loaded
    componentDidMount() {
        https.get("https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/nodes?type=list&key=0",
            (resp) => {
                let data = "";
                resp.on("data", (chunk) => {
                    data += chunk;
                });
                resp.on("end", () => {
                    //passes an array of string, state changes to array of locations given by the API
                    console.log(`Got the list of nodes \n${data}`);
                    try {
                        this.setState({
                            location: JSON.parse(data)
                        });
                    } catch (err) {
                        this.setState({
                            location: ["Error retrieving the locations. Sorry!"]
                        })
                    }

                });
            }
        ).on("error", (err) => {
            console.log(err);
        });
    }

    // render the Directions section
    renderDirections() {
        const { directions } = this.state;
        if (directions.length == 0) {
            return (
                <p>
                <img src="https://64.media.tumblr.com/695ce9a82c8974ccbbfc7cad40020c62/tumblr_o9c9rnRZNY1qbmm1co1_1280.gifv" width="50">  
                </img> 
                <br>
                </br>
                    Loading Directions...
                </p>
            );
        } else if (directions.length == 1){
            return (
                <ul>
                    {directions.map((inst) => (
                        <li>
                            {inst.edge_description}
                        </li>
                    ))}
                </ul>
            );
        }else {
            return (
                <ol>
                    {directions.map((inst) => (
                        <li>{inst.edge_description}<br/><img src={"https://enginavigator-images.s3.amazonaws.com/edge_images/" + inst.edge_id + ".png"} width="400"/></li>
                    ))}
                </ol>
            );
        }
    }

    // update the details of the start and end points
    updateStartPoint(vertex) {
        this.setState({ textStart: vertex.vertex_name, start: vertex.vertex_id });
    }

    updateEndPoint(vertex) {
        this.setState({ textEnd: vertex.vertex_name, end: vertex.vertex_id });
    }

    // render the page
    render() {
        return (
            <div className="TextField">
                <AutoCompleteText
                    data={{
                        location: this.state.location,
                    }}
                    updatePoint={this.updateStartPoint.bind(this)}
                />
                <br />
                <br />
                <AutoCompleteText
                    data={{
                        location: this.state.location,
                    }}
                    updatePoint={this.updateEndPoint.bind(this)}
                />
                <br />
                <br />
                <button onClick={() => {
                    this.updateText();
                }}
                    className="btn btn-primary"
                >
                    Search
                </button>
                {this.renderDirections()}
            </div>
        );
    }
}

export default TextField;
