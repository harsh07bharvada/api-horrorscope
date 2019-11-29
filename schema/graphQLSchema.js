const Zodiac = require("./schema.js");

 

const graphql = require('graphql');

 

const {

    GraphQLObjectType, GraphQLString,

    GraphQLID, GraphQLInt,GraphQLSchema,

    GraphQLList,GraphQLNonNull

} = graphql;

 

var fakeZodiacDatabase = [

    { sign_name:"Aries", date_range:"March 31 - April 19" , good_traits : [{ trait : "G" }], bad_traits : [{ trait : "B" }], famous_people : [{ name : "F" }]},

    { sign_name:"Capricorn", date_range:"Dec 31 - Jan 19" , good_traits : [{ trait : "G" }], bad_traits : [{ trait : "B" }], famous_people :[ { name : "F" }]},

    { sign_name:"Leo", date_range:"May 31 - June 19" , good_traits : [{ trait : "G" }], bad_traits : [{ trait : "B" }], famous_people : [{ name : "F" }]}

]

 

 

const TraitType = new GraphQLObjectType({

    name : 'Trait',

    fields :{

        trait :

        { 

            type : GraphQLString

      }

    }

});

 

const FamousType = new GraphQLObjectType({

    name : 'Famous',

    fields : {

        name : { type : GraphQLString }

    }

})

 

const ZodiacType = new GraphQLObjectType({

    name : 'Zodiac',

    fields : {

        id : {type : GraphQLID},

        sign_name : { type : GraphQLString },

        date_range : { type : GraphQLString},

        good_traits : { type : new GraphQLList(TraitType),

            resolve(parent,args)

            {

               return fakeZodiacDatabase.find(element => {return element.sign_name == parent.sign_name}).good_traits;

            }},

        bad_traits : { type : new GraphQLList(TraitType),

            resolve(parent,args)

            {

               return fakeZodiacDatabase.find(element => {return element.sign_name == parent.sign_name}).bad_traits;

            } },

        famous_people : { type : new GraphQLList(FamousType)}

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

 

module.exports = new GraphQLSchema({

    query: RootQuery

});