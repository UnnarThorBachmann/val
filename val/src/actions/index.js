export const ADD_AFANGI = 'ADD_AFANGI';
export const DELETE_AFANGI = 'DELETE_AFANGI';



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

