import React, { Component } from "react";
import injectSheet from "react-jss";
import { Redirect } from "react-router-dom";
import { toast } from 'react-toastify';

import cookie from "react-cookies";

import { RegisterForm } from "../../components/forms/RegisterForm";

import { styles } from "./styles";

class unstyledRegister extends Component {

    constructor(props){

        super(props);

        this.state = {
            "toHome": false
        }

    }

    handleRegister = async (values, actions) => {

        let response = await fetch("http://localhost:8080/api/register", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"username": values.username, "email": values.email, "password": values.password})
            }
        );

        if(response.status === 405) {
            toast.error("Username is already in use!");
        }else if(response.status === 200) {
            // Save jwt as cookie and send to /home page
            let responseData = await response.json();
            
            cookie.save("loginJWT", responseData.token);
            toast.success("Successfully registered!");
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
                            <h3>Register</h3>
                            <RegisterForm onSubmit={this.handleRegister}/>
                        </div>
                    </div>
                </div>
            );
        }

    }

}

export const Register = injectSheet(styles)(unstyledRegister);