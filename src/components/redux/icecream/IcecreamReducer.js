import { BUY_ICECREAM } from "./IcecreamTypes";


const initialValue = {
    numOfIcecreams: 20
}

const IcecreamReducer = (state=initialValue, action) => {
    switch (action.type) {
        case BUY_ICECREAM:
                return {
                    ...state,
                    numOfIcecreams: state.numOfIcecreams - 2
                };
            break;
    
        default:
            return state;
            break;
    }
}

export default IcecreamReducer;