import React, { Component } from "react";
import injectSheet from "react-jss";
import { Box, Heading, DropButton, Button } from "grommet";
import { toast } from 'react-toastify';
import { Redirect } from "react-router-dom";

import cookie from "react-cookies";

import { styles } from "./styles";

import { AppBar } from "../../components/AppBar";
import { CreateSheetForm } from "../../components/forms/CreateSheetForm";
import { API_PROTO, API_IP, API_PORT } from "../../settings";

class unstyledCreateSheet extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirectLogin: false,
            redirectHome: false,
            redirectSheet: false
        }
    }

    handleCreation = async (values, actions) => {

        const loginJWT = await cookie.load("loginJWT");

        if(!loginJWT){
            this.setState({
                "redirectLogin": true
            });
        }else{

            let response = await fetch(API_PROTO + "://" + API_IP + ":" + API_PORT + "/api/createsheet", 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({"sheetname": values.sheetname, "jwt": loginJWT})
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
                // Get responseData.sheetuuid and send the user there
                await this.setState({
                    "newSheetUUID": responseData.sheetuuid
                });

                this.setState({
                    "redirectSheet": true
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
        }else if(this.state.redirectSheet){
            return(
                <Redirect to={"/viewsheet/" + this.state.newSheetUUID} />
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
                        </div>
                    </Box>
                    <div className={ classes.body }>
                        <div className={ classes.signinCenter }>
                                <div className={ classes.signinContainer }>
                                    <h3>Create Sheet</h3>
                                    <CreateSheetForm onSubmit={this.handleCreation}/>
                                </div>
                            </div>
                        </div>
                </Box>
            );
        }
    }
}

export const CreateSheet = injectSheet(styles)(unstyledCreateSheet);