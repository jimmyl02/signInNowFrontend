import React, { Component } from "react";
import injectSheet from "react-jss";
import { Box, Heading, DropButton, Button, InfiniteScroll } from "grommet";
import { toast } from 'react-toastify';
import moment from "moment";
import { Link, Redirect } from "react-router-dom";

import cookie from "react-cookies";

import { styles } from "./styles";

import { AppBar } from "../../components/AppBar";
import { API_PROTO, API_IP, API_PORT } from "../../settings";

class unstyledHome extends Component {

    constructor(props) {
        
        super(props);

        this.state = {
            "redirectLogin": false,
            "redirectCreateSheet": false,
            "sheets": []
        }

    }

    async componentDidMount() {

        const loginJWT = await cookie.load("loginJWT");

        if(!loginJWT){
            this.setState({
                "redirectLogin": true
            });
        }else{
            let response = await fetch(API_PROTO + "://" + API_IP + ":" + API_PORT + "/api/getsheets", 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({"jwt": loginJWT})
                }
            );

            if(response.status === 500) {

                toast.error("Unable to authenticate, please log in again");
                cookie.remove("loginJWT");
                this.setState({
                    "redirectLogin": true
                });

            }else if(response.status === 200) {

                let responseData = await response.json();

                this.setState({
                    "sheets": responseData
                });
                
            }else{
                toast.error("There was an unexpected error. Please wait and try again");
            }
        }
    }

    logout = async () => {
        await cookie.remove("loginJWT");
        this.setState({
            "redirectLogin": true
        });
        toast.success("Successfully signed out");
    }

    render() {

        const { classes } = this.props;

        if(this.state.redirectLogin){
            return(
                <Redirect to="/login"/>
            );
        }else if(this.state.redirectCreateSheet){
            return(
                <Redirect to="/createsheet"/>
            );
        }else{
            return(
                <Box fill>
                    <AppBar>
                        <Heading level="3" margin="none">Sign In Now</Heading>
                        <DropButton
                            label="My Account"
                            dropAlign={{ "top": "bottom", "right": "right" }}
                            dropContent={
                                <Box pad="medium">
                                    <Button 
                                        label="Sign Out"
                                        color="accent-4"
                                        onClick={() => {this.logout()}}
                                    />
                                </Box>
                            }
                        />
                    </AppBar>
                    <Box direction="column" pad={{ "left": "medium", "right": "medium"}}>
                        <div className={classes.yourSheetsHeader}>
                            <Heading level="4">Your Sign In Sheets</Heading>
                            <Button
                                label="Create new sheet"
                                margin={{ "top": "small" , "bottom": "medium", "left": "medium"}}
                                onClick={() => {this.setState({"redirectCreateSheet": true})}}
                            />
                        </div>
                    </Box>
                    <div className={classes.sheetsInfiniteScroll}>
                        <InfiniteScroll items={this.state.sheets}>
                                {
                                    (item) => (
                                        <Link to={"/viewsheet/"+ item.UUID} key={item.name} className={classes.sheetLink}>
                                            <Box
                                                direction="row"
                                                elevation="medium"
                                                margin={{ "left": "medium", "right": "medium", "top": "medium" }}
                                            >
                                                <Box
                                                    margin={{ "left": "large", "right": "large" }}
                                                >
                                                    <Heading level="6">{item.name} <br />Created: {moment(item.startTime).format("MMM Do YY")}</Heading>
                                                </Box>
                                            </Box>
                                        </Link>
                                    )
                                }
                        </InfiniteScroll>
                    </div>
                </Box>
            );
        }
    }
}

export const Home = injectSheet(styles)(unstyledHome);