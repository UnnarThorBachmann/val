import {
 SET_LAUNAFLOKKUR,
 SET_THREP,
 SET_VINNUSKYLDA,
 SET_ONNUR_STORF,
 SET_STARFSHLUTFALL,
 ADD_AFANGI,
 DELETE_AFANGI,
 FULLT_STARF,
 LAUN,
 SET,
 REFRESH
} from '../actions';
import {vinnuskylda,
  kennsluafslattur,
  Synidaemi,
  addProps,
  launatafla,
  extendState,
  initialState} from '../helpers';



export default function reducerinn(state={...initialState},action) {
  switch(action.type) {
      case  SET_LAUNAFLOKKUR:
        
        return {
            ...state,
          	launaflokkur: action.launaflokkur,
            grunnlaun: launatafla[action.launaflokkur][state.threp]
          }
      case SET_THREP:
        
        return {
            ...state,
          	threp: action.threp,
            grunnlaun: launatafla[state.launaflokkur][action.threp]
          }
      case SET_VINNUSKYLDA:
        
        return {
          ...state,
          aldur: action.aldur,
          vinnuskylda: vinnuskylda(action.aldur),
          kennsluafslattur: kennsluafslattur(action.aldur)
        }
      case SET_ONNUR_STORF:
        
        return {
          ...state,
          timar: action.timar
        }
      case SET_STARFSHLUTFALL:
        
        return {
          ...state,
          starfshlutfall: action.starfshlutfall,
        }
      case FULLT_STARF:
        
        return {
          ...state,
          fulltStarf: action.fulltStarf
        }
      case LAUN:
        
        return {
          ...state,
          laun: action.laun
        }
      case ADD_AFANGI:
        const afangiExtended = addProps(action.afangi,Synidaemi[action.afangi.synidaemi]);
        return {
          ...state,
          afangar: {
            ...state.afangar,
            [action.afangi.heiti]: {
              ...afangiExtended
            }
          }
        }
      case DELETE_AFANGI:
        const nyr_afangar = {...state.afangar};
        delete nyr_afangar[action.nafn];
        
        return {
          ...state,
          afangar: {
            ...nyr_afangar
          }
          
        }
      case SET:
        return {
          ...action.state,
          ...extendState(action.state.afangar,Synidaemi)
        }
      case REFRESH:
        return {
        ...initialState
      }

      default:
        return state;
  }
}