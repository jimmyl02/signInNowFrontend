import React, { Component } from "react";
import injectSheet from "react-jss";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { Anchor } from "grommet";

import cookie from "react-cookies";
import { LoginForm } from "../../components/forms/LoginForm";
import { API_PROTO, API_IP, API_PORT } from "../../settings";

import { styles } from "./styles";

class unstyledLogin extends Component {

    constructor(props){

        super(props);

        if(cookie.load("loginJWT")){
            // User is already logged in
            this.state = {
                "toHome": true
            }
        }else{
            this.state = {
                "toHome": false
            }
        }

    }

    handleLogin = async (values, actions) => {

        let response = await fetch(API_PROTO + "://" + API_IP + ":" + API_PORT + "/api/login", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"username": values.username, "password": values.password})
            }
        );

        if(response.status === 401 || response.status === 404) {
            toast.error("Incorrect username / password combination!");
        }else if(response.status === 200) {
            // Save jwt as cookie and send to /home page
            let responseData = await response.json();
            
            cookie.save("loginJWT", responseData.token);
            toast.success("Successfully logged in!");
            this.setState({
                "toHome": true
            });
        }else{
            toast.error("There was an unexpected error. Please wait and try again");
        }
    }

    render() {

        const { classes } = this.props;

        if(this.state.toHome === true){
            return(
                <Redirect to="/home" />
            );
        }else{
            return(
                <div className={ classes.body }>
                    <div className={ classes.signinCenter }>
                        <div className={ classes.signinContainer }>
                            <h3>Login</h3>
                            <LoginForm onSubmit={this.handleLogin}/>
                            <Anchor href="/register" primary label="or Register Now" />
                        </div>
                    </div>
                </div>
            );
        }

    }

}

export const Login = injectSheet(styles)(unstyledLogin);