import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export class NotFound extends Component {

    render() {

        return(
            <Redirect to="/" />
        );
    }
}