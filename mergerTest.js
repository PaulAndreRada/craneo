
var mergeObj = function(objOne,objTwo){
    // merges object 2 into object 1's top level
    var o = objOne;
    // replace or create a new property with
    // obj2's props
    for(p in objTwo){
	o[p] = objTwo[p];
    }
    // return the merged object
    return o;
};
var to1 = {
    banana: 'the old one', 
    pringle: 'the old one',
    dongle: 'the old one',
    obj: { banker : 'old obj' }
}, 
    to2 = { 
	banana: 'the replaced one', 
	jingle:  'the new one',
	obj: { name: 'newobj' }
};

console.log( mergeObj( to1, to2 ) );
