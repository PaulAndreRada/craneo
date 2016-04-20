
var test = function(){
    var bar;
    obj = [{ commands : ['hey'] }, {}];

    for (i in obj) {
	bar = obj[i].commands;
    }

    return console.log('all seems good', bar);
};

test();



