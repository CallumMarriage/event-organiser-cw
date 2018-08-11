export default function reducer(state= {
    events: [],
    fetching: false,
    fetched: null,
    error: null,
}, action) {
    switch (action.type){
        case "FETCH_EVENTS" : {
            return {
                ...state, 
                fetching: true
            }
        }
        case "FETCH_EVENTS_REJECTED" : {
            return {
                ...state, 
                fetching: false, 
                error: action.payload
            }
        }
        case "FETCH_EVENTS_FULFILLED" : {
            return {
                ...state, 
                fetching: false, 
                fetched: true, 
                events: action.paylod 
            }
        }
        case "ADD_EVENT" : {
            return {
                ...state,
                events: [
                    ...state.tweets,
                    action.payload
                ]
            }
        }
        case "UPDATE_EVENT" : {
            const {id, text} = action.paylod
            const newTweets = [...state.tweets] 
            const tweetUpdates = newTweets.findIndex(tweet => tweet.id === id)
            newTweets[tweetUpdates] = action.paylod;
            
            return{
                ...state, 
                tweets: newTweets
            }
        }

        case "DELETE_EVENT" : {
            return{
                ...state,
                tweets: state.tweets.filter(tweet => tweet.id !== action.payload),
            }
        }
    }
    return state
}