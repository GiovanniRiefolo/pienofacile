'use client'

import {Slider} from "primereact/slider";
import {useContext, useState} from "react";
import {ServiceStationsContext} from "../contexts/service-stations-context";
import {Button} from "primereact/button";
import {InputSwitch} from "primereact/inputswitch";
import {InputText} from "primereact/inputtext";
import {FloatLabel} from "primereact/floatlabel";

export const SearchInputs = () => {
    const {address, setAddress, radius, setRadius, getServiceStations, loadingServiceStations} =
        useContext(ServiceStationsContext);
    const [directAddress, setDirectAddress] = useState(false)
    return (
        <div className="flex flex-column">
            <section className="flex flex-column align-items-center gap-4">
                <div className="flex flex-row align-items-center w-full justify-content-between gap-4">
                    <label className="white-space-nowrap flex-shrink-0"
                           htmlFor="radius">Distanza {radius ? radius : "0"} Km</label>
                    <Slider
                        value={radius}
                        onChange={(e) => setRadius(e.value)}
                        id="radius"
                        min="0"
                        max="10"
                        className="flex-grow-1"
                    />
                    <Button className="flex-shrink-0"
                            size="small"
                            onClick={() => getServiceStations()}
                    loading={loadingServiceStations}>Cerca</Button>
                </div>
                {/*<div className="flex flex-row w-full align-content-center align-items-center gap-2">*/}
                {/*    <InputSwitch htmlId="useAddress" checked={directAddress}*/}
                {/*                 disabled*/}
                {/*                 onChange={(e) => setDirectAddress(e.value)}/>*/}
                {/*    <label htmlFor="useAddress">Inserisci indirizzo</label>*/}
                {/*</div>*/}
            </section>
            {directAddress &&
                <section className="flex flex-row w-full align-content-center justify-content-center">
                    <FloatLabel>
                        <InputText
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            style={{width: "100%"}}
                        />
                        <label htmlFor="address">Indirizzo
                        </label>
                    </FloatLabel>
                    <Button size="small">Cerca</Button>
                </section>
            }
        </div>
    )
}
