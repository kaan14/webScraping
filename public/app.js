
function comments(){
$("#submit").on("click", function(event){
    event.preventDefault; 
    var addComments = $("textArea").val(); 
    console.log(addComments); 

    $.ajax({
        method: "POST",
        url: "/" 
    })
})   
}






comments(); 
