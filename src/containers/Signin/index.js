import React, { Component } from "react";
import injectSheet from "react-jss";
import { Button } from "grommet";
import { Redirect } from "react-router-dom";
import { toast } from 'react-toastify';

import cookie from "react-cookies";
import { SignInForm } from "../../components/forms/SignInForm";
import { API_PROTO, API_IP, API_PORT } from "../../settings";

import { styles } from "./styles";

class unstyledSignin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirectLogin: false
        }
    }

    handleSignIn = async (values, actions) => {

        let signedInRooms = cookie.load("signins");

        if(signedInRooms) {
            // Cookie exists and assume it is an array
            for(let i = 0; i < signedInRooms.length; i++){
                if(signedInRooms[i] === values.signincode){
                    toast.error("This device has already been signed in!");
                    return;
                }
            }
        }else{
            signedInRooms = [];
        }

        if(values.name === "") {
            toast.error("The name can not be blank!");
            return;
        }
        
        let response = await fetch(API_PROTO + "://" + API_IP + ":" + API_PORT +"/api/signin", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"sheetid": values.signincode, "name": values.name})
            }
        );

        if(response.status === 404) {
            toast.error("The sign in code was not found!");
        }else if(response.status === 200) {
            signedInRooms.push(values.signincode);
            cookie.save("signins", signedInRooms);
            toast.success("Successfully signed in!");
        }else{
            toast.error("There was an unexpected error. Please wait and try again");
        }
    }

    render() {

        const { classes } = this.props;

        if(this.state.redirectLogin){
            return(
                <Redirect push to="/login" />
            );
        }else{
            return(
                <div className={ classes.body }>
                    <div className={ classes.loginRight }>
                        <Button 
                            className={ classes.loginSubmit }
                            color="dark-1"
                            label="Login"
                            onClick={() => {this.setState({ "redirectLogin": true });}}
                        />
                    </div>
                    <div className={ classes.signinCenter }>
                        <div className={ classes.signinContainer }>
                            <div className={ classes.logoBoundingBox }/>
                            <SignInForm onSubmit={this.handleSignIn}/>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export const Signin = injectSheet(styles)(unstyledSignin);