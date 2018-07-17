(function () {
    //set initial variables
    var animalArr = ["cat", "dog", "hamster", "skunk", "cow", "chicken", "tiger", "monkey"];
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=SvjNWUezD6rlenyAIOiMh9Zm6a9HkkRG&limit=10&rating=pg&q=";
    var gifData = [];

    //generate initial buttons
    genBtn();

    //add new buttons
    $("#add-btn").on("click", addAnimal);

    //display still gifs upon button click
    $(document).on("click", "#animal-btn", genGif);

    //toggle animate/still state when image clicked
    $(document).on("click", "img", toggleGif);

    //generate buttons
    function genBtn(flag) {
        //display animal buttons from array
        for (let i = 0; i < animalArr.length; i++) {
            //if flag set to 'last' then update index to only append last element in array
            if (flag === "last") {
                i = animalArr.length - 1;
            }
            var btn = $("<button>");
            btn.addClass("btn btn-secondary btn-lg m-1");
            btn.attr("id", "animal-btn");
            btn.attr("type", "button");
            btn.attr("data-value", animalArr[i]);
            btn.html(animalArr[i]);
            $("#btn-section").append(btn);
        }
    }

    //generate gifs
    function genGif() {
        //capture animal name for button clicked
        var animal = $(this).attr("data-value");
        //query giphy for specific animal selected
        $.ajax({
            url: queryURL + animal,
            method: "GET"
        }).then(function (response) {
            gifData = response.data;
            //clear gif section
            $("#gif-section").empty();
            //display gifs
            for (let i = 0; i < gifData.length; i++) {
                //div container element
                var div = $("<div>");
                div.addClass("m-3");
                //image element
                var img = $("<img>")
                img.attr("src", gifData[i].images.fixed_height_still.url);
                img.attr("id", i);
                img.attr("data-state", "still");
                //rating element
                var rating = $("<h5>");
                rating.html("Rating: " + gifData[i].rating);
                rating.addClass("text-center");
                //append elements
                div.append(img);
                div.append(rating);
                $("#gif-section").append(div);
            }
        });
    }

    //add new animal button
    function addAnimal() {
        var animal = $("#input").val();
        if (animal) {
            //add input animal to animal array
            animalArr.push($("#input").val())
            //add buttons
            genBtn("last");
            //clear input field
            $("#input").val("");
        }
    }

    //toggle gif between still and animated
    function toggleGif() {
        var img = $(this);
        var imgID = img.attr("id");
        var imgState = img.attr("data-state");
        //if still then animiate
        if (imgState === "still") {
            img.attr("src", gifData[imgID].images.fixed_height.url);
            img.attr("data-state", "animated");
        }
        //else make still
        else {
            img.attr("src", gifData[imgID].images.fixed_height_still.url);
            img.attr("data-state", "still");
        }
    }

})();