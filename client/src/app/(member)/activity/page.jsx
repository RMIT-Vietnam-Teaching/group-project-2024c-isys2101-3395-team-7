"use client"

import AccountActivity from "@/components/account-activity";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const Activity = () => {
    const searchParams = useSearchParams();
    const [tab, setTab] = useState();

    useEffect(() => {
        const tabParam = searchParams.get('tab');
        setTab(tabParam || "history");
    }, [searchParams]);

    return (
        <div className="h-full">
            <AccountActivity tab={tab} />
        </div>
    );
};

export default Activity