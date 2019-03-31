var data = {};
$.getJSON("assets/src/data.json", function(retrievedData) {
    data = retrievedData;
});

var Gender = {
    "MALE": "male",
    "FEMALE": "female"
};

var Generator = (function(){
    var instance = {};

    function randInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    function randChunk (arr) {
        return arr[randInt(0, arr.length-1)];
    };

    function randChunks (arr, count=1) {
        var result = [];
        for (var i = 0; i < count; i++) {
            result.push(randChunk(arr));
        };
        return result;
    };

    instance.getAltmer = function(gender) {
        if (gender == Gender.MALE) {
            return randChunk(data.altmer.male.begin) + randChunks(data.altmer.male.middle, randInt(0, 2)).join("") + randChunk(data.altmer.male.end);
        } else if (gender == Gender.FEMALE) {
            return randChunk(data.altmer.female.begin) + randChunk(data.altmer.female.end);
        }
        return "&nbsp;";
    };

    instance.getArgonianJel = function(gender) {
        switch (randInt(0, 1)) {
            case 0:
                return randChunk(data.argonian[gender].middle) + "-" + randChunk(data.argonian[gender].middle);
                break;
            case 1:
                return randChunk(data.argonian[gender].begin) + randChunk(data.argonian[gender].end);
        };
    };

    instance.getArgonianTamrielic = function(gender) {
        return randChunk(data.argonian.neutral.verb) + "-" + randChunk(data.argonian.neutral.center) + "-" + randChunk(data.argonian.neutral.noun);
    };

    instance.getBosmer = function(gender) {
        return randChunk(data.bosmer[gender].begin) + randChunk(data.bosmer[gender].end);
    };

    instance.getBreton = function(gender) {
        return randChunk(data.breton[gender].name) + " " + randChunk(data.breton.neutral.surname);
    };

    instance.getChimerAzura = function(gender) {
        return randChunk(data.chimerAzura[gender].prefix) + randChunk(data.chimerAzura[gender].suffix) + " " + randChunk(data.chimerAzura.neutral.surname);
    };

    instance.getChimerOuamer = function(gender) {
        var result = randChunk(data.chimerOuamer[gender].prefix);

        var type = randChunk(["infix", "suffix", "both"]);
        if (type == "infix" || type == "both")
            result += randChunk(data.chimerOuamer[gender].infix);
        if (type == "suffix" || type == "both")
            result += randChunk(data.chimerOuamer[gender].suffix);

        result += " " + randChunk(data.chimerOuamer.neutral.surname.prefix);

        type = randChunk(["infix", "suffix", "both"]);
        if (type == "infix" || type == "both")
            result += randChunk(data.chimerOuamer.neutral.surname.infix);
        if (type == "suffix" || type == "both")
            result += randChunk(data.chimerOuamer.neutral.surname.suffix);

        return result
    };

    instance.getDunmer = function(gender) {
        return randChunk(data.dunmer[gender].name) + " " + randChunk(data.dunmer.neutral.surname);
    };

    instance.getDunmerAshlander = function(gender) {
        return randChunk(data.dunmerAshlander[gender].name) + " " + randChunk(data.dunmerAshlander.neutral.surname);
    };

    instance.getImperial = function(gender) {
        return randChunk(data.imperial[gender].name) + " " + randChunk(data.imperial.neutral.surname);
    };

    instance.getKhajiit = function(gender) {
        var result = "";
        var type = randChunk(["prefix", "suffix", "none"]);
        var long = randInt(0, 100) % 2 == 0;

        if (type == "prefix")
            result += randChunk(data.khajiit[gender].prefix);
        result += randChunk(data.khajiit[gender].begin);

        if (long)
            result += randChunk(data.khajiit[gender].middle);
        result += randChunk(data.khajiit[gender].end);

        if (type == "suffix")
            result += randChunk(data.khajiit[gender].suffix);

        return result;
    };

    instance.getNord = function(gender) {
        var result = randChunk(data.nord[gender].begin) + randChunk(data.nord[gender].end);

        switch (randChunk(["none", "title", "adjective-noun", "adjective-verb"])) {
            case "title":
                result += " the " + randChunk(data.nord.neutral.title);
                break;
            case "adjective-noun":
                result += " " + randChunk(data.nord.neutral.adjective) + "-" + randChunk(data.nord.neutral.noun);
                break;
            case "adjective-verb":
                result += " " + randChunk(data.nord.neutral.adjective) + "-" + randChunk(data.nord.neutral.verb);
                break;
        };

        return result;
    };

    instance.getOrsimer = function(gender) {
        var result = randChunk(data.orsimer[gender].name) + (gender == Gender.MALE ? " gro-" : " gra-");

        // Concat the surname:
        switch (randChunk(["father", "mother", "surname"])) {
            case "father":
                result += randChunk(data.orsimer.male.name);
                break;
            case "mother":
                result += randChunk(data.orsimer.female.name);
                break;
            case "surname":
                result += randChunk(data.orsimer.neutral.surname);
                break;
        };

        return result;
    };

    instance.getRedguard = function(gender) {
        return randChunk(data.redguard[gender].name);
    };

    return instance;
})();