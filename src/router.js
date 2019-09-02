import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { Signin } from "./containers/Signin";
import { Login } from "./containers/Login";
import { Register } from "./containers/Register";
import { Home } from "./containers/Home";
import { Viewsheet } from "./containers/Viewsheet";
import { CreateSheet } from "./containers/CreateSheet";
import { NotFound } from "./containers/NotFound";

export class RootRouter extends Component {

    render() {

        return(
            <React.Fragment>
                <ToastContainer />
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Signin} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/home" component={Home} />
                        <Route path="/viewsheet/:uuid" component={Viewsheet} />
                        <Route path="/createsheet" component={CreateSheet} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </React.Fragment>
        );

    }

}