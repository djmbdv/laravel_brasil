import React from "react";
import ReactDOM from "react-dom";
import Tabs from "./Tabs";
function Main() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <Tabs></Tabs>
            </div>
        </div>
    );
}

export default Main;

if (document.getElementById("app")) {
    ReactDOM.render(<Main />, document.getElementById("app"));
}
