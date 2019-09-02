import React, { Component } from "react";
import injectSheet from "react-jss";
import { Formik, Field as FormikField } from "formik";
import { TextInput, Button } from "grommet";

import { styles } from "./styles";

class unstyledRegisterForm extends Component {

    render() {

        const { classes, onSubmit } = this.props;

        return(
            <Formik
                initialValues={{ "username": "","email": "", "password": "" }}    
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
                                <p className={classes.formikFieldChild}>Email</p>
                                <FormikField
                                    name="email"
                                    render={({ field }) => <TextInput {...field} className={classes.formikFieldChild} placeholder="Email" />}
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
                                <Button className={classes.loginSubmit} type="submit" primary={true} label="Register" >
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

export const RegisterForm = injectSheet(styles)(unstyledRegisterForm);