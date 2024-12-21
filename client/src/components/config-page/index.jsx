"use client"
import React from 'react';
import CircularProgress from "@/components/CircularProgress";
import Button from "@/components/button"
import {pushError, pushSuccess} from "@/components/Toast";
import Tooltip from "@/components/tooltip";
import IcLock from "@/components/config-page/IcLock";

export default function Index() {
    return (
        <div className="mt-10 ml-10 mr-10 mb-10">
            <h4 className="text-lg font-bold mt-8 mb-4">CircularProgress</h4>
            <div className="space-y-4" style={{maxWidth: "300px"}}>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center">
                        <CircularProgress size="sm"/>
                        <span className="text-sm mt-2">Small</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <CircularProgress size="md"/>
                        <span className="text-sm mt-2">Medium</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <CircularProgress size="lg"/>
                        <span className="text-sm mt-2">Large</span>
                    </div>
                </div>
            </div>

            <h4 className="text-lg font-bold mt-8 mb-4">Toastify</h4>
            <div className="flex items-center justify-between" style={{maxWidth: "500px"}}>
                <Button variant="outline-primary" onClick={() => pushSuccess('Show Toast Success !')}>
                    Push success
                </Button>
                <Button variant="outline-danger" onClick={() => pushError('Show Toast Error !')}>
                    Push error
                </Button>
            </div>

            <h4 className="text-lg font-bold mt-8 mb-4">Tooltip</h4>
            <Tooltip text="Lock" position="right">
                <Button variant="outline-primary" size='sm' onClick={() => console.log("you clicked on Tooltip")}>
                    <IcLock/>
                </Button>
            </Tooltip>
        </div>
    );
}