import React, { Component } from "react";
import injectSheet from "react-jss";
import { Formik, Field as FormikField } from "formik";
import { TextInput, Button } from "grommet";

import { styles } from "./styles";

class unstyledLoginForm extends Component {

    render() {

        const { classes, onSubmit } = this.props;

        return(
            <Formik
                initialValues={{ "username": "", "password": "" }}    
                onSubmit={onSubmit}
            >
                {
                    props => (
                        <form onSubmit={props.handleSubmit}>
                            <div className={classes.formikField}>
                                <p className={classes.formikFieldChild}>Username</p>
                                <FormikField
                                    name="username"
                                    render={({ field }) => <TextInput {...field} className={classes.formikFieldChild} placeholder="Username" />}
                                />
                            </div>
                            <div className={classes.formikField}>
                                <p className={classes.formikFieldChild}>Password</p>
                                <FormikField
                                    name="password"
                                    render={({ field }) => <TextInput {...field} className={classes.formikFieldChild} type="password" placeholder="Password" />}
                                />
                            </div>
                            <div className={classes.formikFieldChildLoginSubmit}>
                                <Button className={classes.loginSubmit} type="submit" primary={true} label="Login" >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    )
                }
            </Formik>
        );

    }

}

export const LoginForm = injectSheet(styles)(unstyledLoginForm);