class RequestError extends Error{
    constructor(message, statusCode) {
        super(message); 
        this.statusCode = statusCode; 
    }
}


function errorHandler(error,response){
    if(error instanceof RequestError) {
        return response.status(error.statusCode).json({message: error.message});
    }
    else{
        response.status(500).json({message:"Internal server error"});
        console.log(error.message)
    }
}




module.exports = {RequestError,errorHandler};