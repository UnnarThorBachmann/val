import {
 
 ADD_AFANGI,
 DELETE_AFANGI,
 CHANGE_BRAUT
} from '../actions';




export default function reducerinn(state={afangar:{}, braut: 'Félagsfræðibraut'},action) {
  switch(action.type) {
      case ADD_AFANGI:
       
        return {
          ...state,
          afangar: {
            ...state.afangar,
            [action.afangi.heiti]: {
              ...action.afangi
            }
          }
        }
      case DELETE_AFANGI:
        const nyr_afangar = {...state.afangar};
        delete nyr_afangar[action.heiti];
        
        return {
          ...state,
          afangar: {
            ...nyr_afangar
          }
          
        }
      case CHANGE_BRAUT:
      return {
        ...state,
        braut: action.braut
      }
      default:
        return state;
  }
}