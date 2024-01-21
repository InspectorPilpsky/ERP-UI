import { useCallback, useEffect } from "react";
import { getWarehouse } from "../../../api/Warehouse/test";
// import { getProcesses } from "../../../api/Management/test;

export default function Components() {

    
    const request = useCallback(() => {
        getWarehouse(0, 10)
            .then(res => console.log(res));
    }, [])

    // const request2 = useCallback(() => {
    //     getProcesses()
    //         .then(res => console.log(res));
    // }, [])

    useEffect(() => request(), [request])

    return (
        <div>
            Варехаусе
        </div>
    )
}