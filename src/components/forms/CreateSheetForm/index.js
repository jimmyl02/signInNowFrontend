import React, { Component } from "react";
import injectSheet from "react-jss";
import { Formik, Field as FormikField } from "formik";
import { TextInput, Button } from "grommet";

import { styles } from "./styles";

class unstyledCreateSheetForm extends Component {

    render() {

        const { classes, onSubmit } = this.props;

        return(
            <Formik
                initialValues={{ "sheetname": "" }}    
                onSubmit={onSubmit}
            >
                {
                    props => (
                        <form onSubmit={props.handleSubmit}>
                            <div className={classes.formikField}>
                                <p className={classes.formikFieldChild}>Sheet Name</p>
                                <FormikField
                                    name="sheetname"
                                    render={({ field }) => <TextInput {...field} className={classes.formikFieldChild} placeholder="Sheet Name" />}
                                />
                            </div>
                            <div className={classes.formikFieldChildCreateSubmit}>
                                <Button className={classes.loginSubmit} type="submit" primary={true} label="Create Sheet" >
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

export const CreateSheetForm = injectSheet(styles)(unstyledCreateSheetForm);