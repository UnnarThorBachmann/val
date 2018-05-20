import {
 
 ADD_AFANGI,
 DELETE_AFANGI,
 CHANGE_BRAUT,
 CHANGE_MAL
} from '../actions';




export default function reducerinn(state={afangar:{}, braut: 'Félagsfræðibraut', mal: 'Franska'},action) {
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
      case CHANGE_MAL:
        return {
          ...state,
          mal: action.mal
        }
      default:
        return state;
  }
}