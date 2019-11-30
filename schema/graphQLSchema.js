const Zodiac = require("./schema.js");

 

const graphql = require('graphql');

 

const {

    GraphQLObjectType, GraphQLString,

    GraphQLID, GraphQLSchema,

    GraphQLList,GraphQLNonNull, GraphQLInputObjectType

} = graphql;

 

var fakeZodiacDatabase = [

    { sign_name:"Aries", date_range:"March 31 - April 19" , good_traits : [{ trait : "G" }], bad_traits : [{ trait : "B" }], famous_people : [{ name : "F" }]},

    { sign_name:"Capricorn", date_range:"Dec 31 - Jan 19" , good_traits : [{ trait : "G" }], bad_traits : [{ trait : "B" }], famous_people :[ { name : "F" }]},

    { sign_name:"Leo", date_range:"May 31 - June 19" , good_traits : [{ trait : "G" }], bad_traits : [{ trait : "B" }], famous_people : [{ name : "F" }]}

]

 

 // TRAIT TYPES

const TraitType = new GraphQLObjectType({

    name : 'Trait',

    fields :{

        trait :

        { 

            type : GraphQLString

      }

    }

});

const TraitInputType = new GraphQLInputObjectType({

    name : 'TraitInput',
    fields :{

        trait :{ 
            type : GraphQLString
        }
    }

});



 
//FAMOUS TYPES
const FamousType = new GraphQLObjectType({

    name : 'Famous',

    fields : {

        name : { type : GraphQLString }

    }

});

const FamousInputType = new GraphQLInputObjectType({

    name : 'FamousInput',

    fields : {

        name : { type : GraphQLString }

    }

});

 
//ZODIAC TYPES

const ZodiacType = new GraphQLObjectType({

    name : 'Zodiac',

    fields : {

       sign_name : { type : GraphQLString },

        date_range : { type : GraphQLString},

        good_traits : { type : new GraphQLList(TraitType)
        },

        bad_traits : { type : new GraphQLList(TraitType)
         },

        famous_people : { type : new GraphQLList(FamousType)}

    }

});

const ZodiacInputType = new GraphQLInputObjectType({

    name : 'ZodiacInput',

    fields : {

        sign_name : { type : GraphQLString },

        date_range : { type : GraphQLString},

        good_traits : { type : new GraphQLList(TraitInputType)},

        bad_traits : { type : new GraphQLList(TraitInputType)},

        famous_people : { type : new GraphQLList(FamousInputType)}

    }

});

 

const RootQuery = new GraphQLObjectType({

    name : 'RootQueryType',

    fields:{

        zodiac : {

            type : ZodiacType,

            args :{ sign_name : { type : GraphQLString}},

            resolve(parent,args) {

                // return Zodiac.find((item)=>{ return item.sign_name == args.sign_name});

                return fakeZodiacDatabase.find(element => {return element.sign_name == args.sign_name});

            }

        }

    }

});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addZodiac:{
            type:ZodiacType,
            args :
            { 
                input: { type: ZodiacInputType }
            },
            resolve(parent,args){
                
                let zodiacNewObject = new Zodiac({
                    sign_name : args.input.sign_name,
                    date_range: args.input.date_range,
                    good_traits : args.input.good_traits,
                    bad_traits : args.input.bad_traits,
                    famous_people : args.input.famous_people
                });
                
                return zodiacNewObject.save();
            }
        }
    } 
})
 

module.exports = new GraphQLSchema({

    query: RootQuery,
    mutation : Mutation

});