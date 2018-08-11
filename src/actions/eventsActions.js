import axios from "axios"

export function fetchEvents(){
    return function(dispatch){
        axios.get("https://intense-everglades-54619.herokuapp.com/events")
        .then((response) => {
               dispatch({type: "FETCH_EVENTS_FULFILLED", payload: response.data})
            })
        .catch((err) => {
                dispatch({type: "FETCH_EVENTS_REGECTED", payload: err.data})
        })

    }
}