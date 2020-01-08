$(function(){


    $("#todayDate").text(moment().format("MMM, Do YYYY") );
    hours = 9;
    var d = new Date();
    currentTime = d.getHours();
    var storedEvents = JSON.parse(localStorage.getItem("events"));
    if(storedEvents===null){
        storedEvents = new Array(8);
    }
    for(var i = 0;i <9 ;i++){
        var rowDiv = $("#time-row").clone();
        rowDiv.removeClass("d-none");
        var timeEl = rowDiv.children().eq(0);
        if(9+i<12){
            timeEl.text(9+i+"AM");
        }
        else if(9+i===12){
            timeEl.text(9+i+"PM");
        }
        else{
            timeEl.text(9+i-12+"PM");
        }

        var textAreaDiv = rowDiv.children().eq(1);
        textAreaDiv.attr("data-index",i);

        var textAreaEL = textAreaDiv.children().eq(0);
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
        var eventValue = $(this).prev().children(0).val();
        if(eventValue===""){
            return;
        }
        else{
            storedEvents[index] = eventValue;
            localStorage.setItem("events", JSON.stringify(storedEvents));
        }
    })
});
