$(function(){


    $("#todayDate").text(moment().format("MMM, Do YYYY") );

    var d = new Date();
    currentTime = d.getHours();
    var storedEvents = JSON.parse(localStorage.getItem("events"));
    if(storedEvents===null){
        storedEvents = new Array(8);
    }
    for(var i = 0;i <9 ;i++){
        var rowDiv = $("#time-row").clone();
        rowDiv.removeClass("d-none");
        var timeEl = rowDiv.find(".hour");
        var  hours = 9+i;
        if(9+i<12){
            timeEl.text(9+i+"AM");
        }
        else if(9+i===12){
            timeEl.text(9+i+"PM");
        }
        else{
            timeEl.text(9+i-12+"PM");
           
            hours = 9+i-12;
            console.log(hours);
        }
        //add a space to the text for hours less than 10 to make the times align nicely.
        if(hours<10){
            timeEl.html("&nbsp&nbsp"+timeEl.text());
        }

        var textAreaEL =rowDiv.find(".text");
        textAreaEL.attr("data-index",i);
        if(i+9 < currentTime){
            textAreaEL.addClass("bg-light-grey");
        }
        else if(i+9===currentTime){
            textAreaEL.addClass("bg-danger");
        }
        else{
            textAreaEL.addClass("bg-yellow-green");
        }
        if(storedEvents[i]!==null||storedEvents[i]!==""){
            textAreaEL.val(storedEvents[i]);
        }

        $("#2ndcontainer").append(rowDiv);
    }
    $(".save").click(function(){
        var index = $(this).prev().attr("data-index");
        var eventValue = $(this).prev().val();
        if(eventValue===""){
            return;
        }
        else{
            storedEvents[index] = eventValue;
            localStorage.setItem("events", JSON.stringify(storedEvents));
        }
    })
});
