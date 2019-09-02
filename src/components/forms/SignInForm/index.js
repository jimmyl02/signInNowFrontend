import React, { Component } from "react";
import injectSheet from "react-jss";
import { Formik, Field as FormikField } from "formik";
import { TextInput, Button } from "grommet";

import { styles } from "./styles";

class unstlyedSignInForm extends Component {

    render() {

        const { classes, onSubmit } = this.props;

        return(
            <Formik
                initialValues={{ "signincode": "", "name": "" }}    
                onSubmit={onSubmit}
            >
                {
                    props => (
                        <form onSubmit={props.handleSubmit}>
                            <div className={classes.formikField}>
                                <FormikField
                                    name="signincode"
                                    render={({ field }) => <TextInput {...field} className={classes.formikFieldChild} placeholder="Sign In Code" />}
                                />
                            </div>
                            <div className={classes.formikField}>
                                <FormikField
                                    name="name"
                                    render={({ field }) => <TextInput {...field} className={classes.formikFieldChild} placeholder="Name" />}
                                />
                            </div>
                            <div className={classes.formikFieldChildSigninSubmit}>
                                <Button className={classes.signinSubmit} type="submit" primary={true} label="Sign In" >
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

export const SignInForm = injectSheet(styles)(unstlyedSignInForm);