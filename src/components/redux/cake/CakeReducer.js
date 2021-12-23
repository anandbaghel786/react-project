import { BUY_CAKE, RESET_INIT_DATA } from "./CakeTypes";

const initialValue = {
    numOfCakes: 20
}

const CakeReducer = (state=initialValue, action) => {
    console.log(action.payload, 'jjjjjjjjjjjjjj');
    switch (action.type) {
        case BUY_CAKE:
                return {
                    ...state,
                    numOfCakes: state.numOfCakes - action.payload
                };
            break;

        case RESET_INIT_DATA:
            return {
                ...state,
                numOfCakes: initialValue.numOfCakes
            }
            break;
    
        default:
            return state;
            break;
    }
}

export default CakeReducer;