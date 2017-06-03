console.log("Hello World");

function createPost(elemObj) {
    var post = $("#postId").val();


    var inputData = {
            "POST": post,
            "POST_TYPE": "TEXT",
            "PATH_OF_POST": null
        }
        //var url = "http://localhost:3010/post/";
    var url = "http://localhost:8080/baba/springs/rest/create";

    var jqxhr = $.ajax({
        url: url,
        data: JSON.stringify(inputData),
        type: "POST",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
        }
    });

    jqxhr.done(function(data) {
        console.log(data);
        readAllPost(); //refresh new contents
        $("#postId").val("");
    });

    jqxhr.fail(function(err) {
        console.log(err);
    });
}

function readAllPost() {
    // var url = "http://localhost/lastday/read_all_post.php";
    // var url = "http://localhost:8080/temp1/first";
    // var url = "http://localhost:3010/post/";
    var url = "http://localhost:8080/baba/springs/rest/post";
    var jqxhr = $.get(url);
    jqxhr.done(function(data) {
        console.log(data);
        displayInitialPost(data);
    });

    jqxhr.fail(function(err) {
        console.log(err);
    });
}

function displayInitialPost(data) {
    if (data) {
        for (var i = 0; i < data.length; i++) {
            var newTemplate = $("#templateId").clone(true).css("display", "block").removeAttr("id");
            newTemplate.children().first().children().first().html(data[i].POST);



            $("#parentId").prepend(newTemplate);
        }
    }
}

readAllPost();