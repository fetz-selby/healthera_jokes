import express from 'express';
    
export default class UserRoutes{

    constructor(UserModel){
        this.UserModel = UserModel;
    }

    routes(){
        const userRouter = express.Router();

        userRouter.route('/')
            .get((req, res)=>{
                
                try{


                }catch(error){
                    res.status(400)
                    .json({
                        success: false,
                        message: error.message
                    })
                }
            });

        userRouter.route('/:id')
            .get((req, res)=>{
                
                try{


                }catch(error){
                    res.status(400)
                    .json({
                        success: false,
                        message: error.message
                    })
                }
            });

        return userRouter;
    }
}