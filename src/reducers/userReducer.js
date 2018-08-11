export default function reducer(state= {
    tweets: [],
    fetching: false,
    fetched: null,
    error: null,
}, action) {
    switch (action.type){
        case "FETCH_TWEETS" : {
            return {
                ...state, 
                fetching: true
            }
        }
        case "FETCH_TWEETS_REJECTED" : {
            return {
                ...state, 
                fetching: false, 
                error: action.payload
            }
        }
        case "FETCH_TWEETS_FULFILLED" : {
            return {
                ...state, 
                fetching: false, 
                fetched: true, 
                tweets: action.paylod 
            }
        }
        case "ADD_TWEET" : {
            return {
                ...state,
                tweets: [
                    ...state.tweets,
                    action.payload
                ]
            }
        }
        case "UPDATE_TWEET" : {
            const {id, text} = action.paylod
            const newTweets = [...state.tweets] 
            const tweetUpdates = newTweets.findIndex(tweet => tweet.id === id)
            newTweets[tweetUpdates] = action.paylod;
            
            return{
                ...state, 
                tweets: newTweets
            }
        }

        case "DELTE_TWEET" : {
            return{
                ...state,
                tweets: state.tweets.filter(tweet => tweet.id !== action.payload),
            }
        }
    }
    return state
}