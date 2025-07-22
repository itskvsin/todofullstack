import { asyncHandler } from "../utils/asyncHandler.js";


const registerUser = asyncHandler(async (req,res) => {

    //Fetch data from the request 
    //Check if the fetched data from the request is null  or not 
    //check if user exits or not
    //then check if there are images or not
    //if there are then upload them if there are not then dont upload them and  send an apiError
    //If everythign is completed the save the user
    //remove password and refresh token field from the user object in response
    //check if user created
    //return res


    return res
    .status(200)
    .json(200, "Hello World")
})

export {
    registerUser,
};