import React, { Component } from "react";
import injectSheet from "react-jss";
import { Box, Heading, DropButton, Button, InfiniteScroll } from "grommet";
import { toast } from 'react-toastify';
import { Redirect } from "react-router-dom";

import cookie from "react-cookies";

import { styles } from "./styles";

import { AppBar } from "../../components/AppBar";
import { API_PROTO, API_IP, API_PORT } from "../../settings";

class unstyledViewsheet extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirectLogin: false,
            redirectHome: false,
            signins: [],
            sheetName: "",
            sheetID: ""
        }
    }

    componentDidMount = async () => {

        const loginJWT = await cookie.load("loginJWT");

        if(!loginJWT){
            this.setState({
                "redirectLogin": true
            });
        }else{

            let response = await fetch(API_PROTO + "://" + API_IP + ":" + API_PORT + "/api/getsignins", 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({"jwt": loginJWT, "sheetuuid": this.props.match.params.uuid})
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
                    "signins": responseData
                });
                
            }else{
                toast.error("There was an unexpected error. Please wait and try again");
            }

            let responseInfo = await fetch(API_PROTO + "://" + API_IP + ":" + API_PORT + "/api/getsheetinfo", 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({"jwt": loginJWT, "sheetuuid": this.props.match.params.uuid})
                }
            );

            if(responseInfo.status === 500) {

                toast.error("Unable to authenticate, please log in again");
                cookie.remove("loginJWT");
                this.setState({
                    "redirectLogin": true
                });

            }else if(responseInfo.status === 200) {

                let responseInfoData = await responseInfo.json();

                this.setState({
                    "sheetName": responseInfoData.name,
                    "sheetID": responseInfoData.sheetID
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
                <Redirect to="/login" />
            );
        }else if(this.state.redirectHome){
            return(
                <Redirect to="/home" />
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
                            <Button
                                label="Return"
                                margin={{ "top": "small" , "bottom": "medium", "left": "none", "right": "medium"}}
                                onClick={() => {this.setState({"redirectHome": true})}}
                            />
                            <Heading level="4" margin={{ "top": "medium" }}>Sign Ins to {this.state.sheetName}, use code <strong>{this.state.sheetID}</strong></Heading>
                        </div>
                    </Box>
                    <div className={classes.sheetsInfiniteScroll}>
                        <InfiniteScroll items={this.state.signins}>
                                {
                                    (item) => (
                                        <div className={classes.signinPerson} key={item.id}>
                                            {item.name}
                                        </div>
                                    )
                                }
                        </InfiniteScroll>
                    </div>
                </Box>
            );
        }
    }
}

export const Viewsheet = injectSheet(styles)(unstyledViewsheet);