import express from 'express';
import _ from 'lodash';
    
export default class JokeRoutes{

    constructor(JokeModel, JokeGroupModel, TagModel){
        this.JokeModel = JokeModel;
        this.JokeGroupModel = JokeGroupModel;
        this.TagModel = TagModel;
    }

    routes(){
        const app = this;
        const jokeRouter = express.Router();

        jokeRouter.route('/')
            .get((req, res)=>{
                const {tags} = req.query;
                try{
                    this.fetchJokes(res, tags);
                }catch(error){
                    res.status(400)
                    .json({
                        success: false,
                        message: error.message
                    })
                }
            });

        jokeRouter.route('/:id')
            .get((req, res)=>{
                const {id} = req.params;
                try{
                    app.fetchJoke(res, id);
                }catch(error){
                    res.status(400)
                    .json({
                        success: false,
                        message: error.message
                    })
                }
            });


        jokeRouter.route('/:id')
            .put((req, res)=>{
                const {sentence,tags} = req.body;
                const {id} = req.params;
                try{
                    app.updateJoke(res, id, sentence, tags);
                }catch(error){
                    res.status(400)
                    .json({
                        success: false,
                        message: error.message
                    })
                }
            });

        jokeRouter.route('/')
            .post((req, res)=>{
                const {sentence, tags} = req.body;
                try{
                   if(!sentence){
                       throw new Error('sentence is required');
                   }

                   app.addJoke(res, sentence, tags);
                }catch(error){
                    res.status(400)
                    .json({
                        success: false,
                        message: error.message
                    })
                }
            });
        
        jokeRouter.route('/:id')
            .delete((req, res)=>{
                const {id} = req.params;
                try{
                    app.deleteJoke(res,id);
                }catch(error){
                    res.status(400)
                    .json({
                        success: false,
                        message: error.message
                    })
                }
            });

        return jokeRouter;
    }

    async addJoke(res, sentence, lTtags){
        const app = this;
        let joke,tags;
        try{
            if(lTtags){
                tags = _.uniq(lTtags);
                const isTagsValid = await app.isTagsValid(tags);
                if(!isTagsValid){
                    throw new Error('Invalid tags association');
                }

                joke = await app.JokeModel.create({sentence});
                tags.map(async(tagId)=>{
                    await app.JokeGroupModel.create({
                        joke_id: joke.id,
                        tag_id: tagId
                    })
                   })
            }else{
                joke = await app.JokeModel.create({sentence});
            }

           res.status(200)
           .json({
               success: true,
               message: 'Joke added successfully',
               results: {
                   id: joke.id,
                   sentence: joke.sentence,
                   tags
               }
           })
        }catch(error){
            res.status(400)
            .json({
                success: false,
                message: error.message
            })
        }
    }

    async fetchJoke(res, id){
        const app = this;
        try{
            const joke = await app.JokeModel.findOne({where:{id, status: 'A'}, attributes: ['id', 'sentence']});
            const tags = await app.JokeGroupModel.findAll({where: {joke_id:joke.id, status: 'A'}, include: [{model: app.TagModel, attributes: ['id', 'name']}]});
            const flatTags = tags.map((tag)=>({id: tag.tag_id, name:tag.tag.name}));
            
            res.status(200)
            .json({
                success: true,
                message: 'Joke request successful',
                results: {
                    id: joke.id,
                    sentence: joke.sentence,
                    tags: flatTags
                }
            })
        }catch(error){
            res.status(400)
            .json({
                success: false,
                message: error.message
            })
        }
    }

    async fetchJokes(res, tags){
        try{
           if(!tags){
               const jokes = await this.JokeModel.findAll({where: {status: 'A'}, attributes: ['id', 'sentence']});
               res.status(200)
               .json({
                   success: true,
                   message: 'Jokes request successful',
                   results: jokes
               });
               return;
            }
            const jokes = [];
            tags.map(async (tag)=>{
                const jokeGroup = await this.JokeGroupModel.findAll({where: {tag_id:tag, status: 'A'}, include:[{model: app.JokeModel, attributes: ['id', 'sentence']}] });
                if(jokeGroup){
                    jokeGroup.map((sJoke)=>{
                        jokes.push(sJoke.joke);
                    })
                }
            });
            res.status(200)
            .json({
                success: true,
                message: 'Jokes request successful',
                results: jokes
            })
        }catch(error){
            res.status(400)
            .json({
                success: false,
                message: error.message
            })
        }
    }

    async updateJoke(res, id, sentence, lTags){
        const app = this;
        const tags = _.uniq(lTags);
        try{

            //Validate tags
            if(tags){
                const isValidTags = await app.isTagsValid(tags);
                if(!isValidTags){
                    throw new Error('Invalid tags association');
                }

                const hasChanged = await app.hasChanged(id, tags);
                if(hasChanged){
                    await app.removeAllTags(id);
                    await app.associateTags(id, tags);
                }
            }

            const joke = await app.JokeModel.update({sentence}, {where:{id, status: 'A'}});
            
            res.status(200)
            .json({
                success: true,
                message: 'Joke update request successful',
                results: {
                    id: joke.id,
                    sentence: joke.sentence
                }
            })
        }catch(error){
            res.status(400)
            .json({
                success: false,
                message: error.message
            })
        }
    }

    async deleteJoke(res, id){
        try{
            const update = await this.JokeModel.update({status:'D'}, {where: {id, status:'A'}});
            await this.JokeGroupModel.update({status: 'D'}, {where: {joke_id:id, status:'A'}})
            
            if(!update){
                throw new Error('Joke delete request failed');
            }

            res.status(200)
            .json({
                success: true,
                message: 'Joke deleted successfully'
            })
        }catch(error){
            res.status(400)
            .json({
                success: false,
                message: error.message
            })
        }
    }

    async hasChanged(jokeId, tags){
        const app = this;

        return new Promise(async(resolve, reject)=>{
            const allTags = await app.JokeGroupModel.findAll({where:{joke_id: jokeId, 
                                                                    status: 'A'}, attributes: ['tag_id']});
            
            const uniqTagsDB = _.sortedUniq(allTags.map((tag)=>tag.tag_id));
            const uniqTags = _.sortedUniq(tags);

            if(uniqTagsDB.length != uniqTags.length){
                return resolve(true);
            }

            return resolve(!_.isEmpty(_.difference(uniqTags, uniqTagsDB)));
        })
    }

    async removeAllTags(jokeId){
        const app = this;

        return new Promise(async(resolve, reject)=>{
            try{
                const update = await app.JokeGroupModel.update({status: 'D'}, {where:{joke_id: jokeId, status: 'A'}});
                if(update) return resolve(true);
                return resolve(false);
            }catch(error){
                return reject(error);
            }
        })
    }

    async associateTags(jokeId, tags){
        const app = this;

        return new Promise(async(resolve, reject)=>{
            try{
                const groupTags = tags.map(async(tag)=>{
                    return await app.JokeGroupModel.create({
                        tag_id: tag,
                        joke_id: jokeId
                    })
                });

                return resolve(groupTags)
            }catch(error){
                return reject(error);
            }
        })
    }

    async isTagsValid(tags){
        const app = this;

        return new Promise(async(resolve, reject)=>{
            tags.map(async(tag)=>{
                const result = await app.TagModel.findOne({where:{id: tag, status: 'A'}});
                if(!result){
                    return resolve(false)
                }
            });
        })
    }
}