
module.exports = function(obj_one,obj_two){
    // merges object 2 into object 1's top level
    var obj = obj_one;
    // replace or create a new property with
    // obj2's props
    for( prop in obj_two){
        obj[prop] = obj_two[prop];
    }
    // return the merged object
    return obj;
};
