export const ADD_AFANGI = 'ADD_AFANGI';
export const DELETE_AFANGI = 'DELETE_AFANGI';
export const CHANGE_BRAUT = 'ChANGE_BRAUT';



export function addAfangi(afangi) {
  
  return {
      type: ADD_AFANGI,
      afangi: {...afangi}
    }
}

export function deleteAfangi(heiti) {
  return {
      type: DELETE_AFANGI,
      heiti: heiti
    }

}

export function changeBraut(braut) {
  return {
      type: CHANGE_BRAUT,
      braut: braut
    }

}

