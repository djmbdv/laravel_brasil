import React, { useState } from "react";
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
} from "mdb-react-ui-kit";
import TabConsultor from "./TabConsultor";
export default function Tabs() {
    const [basicActive, setBasicActive] = useState("tabCo");

    const handleBasicClick = (value) => {
        if (value === basicActive) {
            return;
        }

        setBasicActive(value);
    };

    return (
        <>
            <MDBTabs className="mt-3">
                <MDBTabsItem>
                    <MDBTabsLink
                        onClick={() => handleBasicClick("tabCo")}
                        active={basicActive === "tabCo"}
                    >
                        Por Consultor
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink
                        onClick={() => handleBasicClick("tab2")}
                        active={basicActive === "tabCl"}
                    >
                        Por Cliente
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
                <MDBTabsPane show={basicActive === "tabCo"}>
                    <TabConsultor />{" "}
                </MDBTabsPane>
                <MDBTabsPane show={basicActive === "tabCl"}>
                    Tab 2 content
                </MDBTabsPane>
            </MDBTabsContent>
        </>
    );
}
