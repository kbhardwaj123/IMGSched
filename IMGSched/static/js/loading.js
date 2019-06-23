

$(document).ready(function () {
    $.ajax({
        url : "http://127.0.0.1:8000/IMGSched/schedule",
        dataType : "json",
        success : function(data) {
            // var string_1="";
            // for(var i=0; i<data.length; i++) {
            //     var name = text(data[i].name);
            //     var date = text(data[i].date);
            //     var venue = text(data[i].venue);
            //     var manager = text(data[i].manager);
            //     var description = text(data[i].description);
            //     string_1 = string_1 + "<tr><p> Name: " + name + "</p><p> Date: " + date + "</p><p> Venue: " + venue + "</p><p> Manager: " + manager + "</p><p> Description: " + description + "</p></tr>";
            // }
            // document.getElementById("jsonresp").innerHTML = string_1;
            document.getElementById("jsonresp").innerHTML = "kutta";
        }
    });
    document.getElementById("jsonresp").innerHTML = "<tr>kutta</tr>";
});

                
                