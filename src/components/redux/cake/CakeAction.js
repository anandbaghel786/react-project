import { BUY_CAKE, RESET_INIT_DATA } from "./CakeTypes";

const buyCake = (count=1) => {
    return {
        type: BUY_CAKE,
        payload: count
    }
}

const resetCakeData = () => {
    return {
        type: RESET_INIT_DATA
    }
}



export {
    buyCake,
    resetCakeData
}