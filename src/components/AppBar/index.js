import React, { Component } from "react";
import { Box } from "grommet";

export class AppBar extends Component {

    render() {

        return(
            <Box 
                as="header"
                direction="row"
                align="center"
                justify="between"
                pad={{ "left": "medium", "right": "small", "vertical": "small"}}
                elevation="medium"
                style={{ "zIndex": "1" }}
                {...this.props}
            />
        );

    }
}