
$(document).ready(function () {
  $("select").material_select();
  $("#modal1").modal();

  $("#submit").on("click", function (event) {
    event.preventDefault();

    function validateForm () {
      var isValid = true;
      var urlRegEx = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

      $(".form-control").each(function () {
        if ($(this).val() === "") {
          isValid = false;
        }
      });

      $("#img_user").each(function () {
        if (!urlRegEx.test($(this).val())) {
          isValid = false;
        }
      });

      $(".chosen-select").each(function () {
        if (parseInt($(this).val()) === "") {
          isValid = false;
        }
      });
      return isValid;
    };

    if (validateForm() === true) {
      var newFriend = {
        name: $("#first_name").val().trim(),
        image: $("#img_user").val().trim(),
        scores: [$("#question1").val(), $("#question2").val(), $("#question3").val(), $("#question4").val(), $("#question5").val(), $("#question6").val(), $("#question7").val(), $("#question8").val(), $("#question9").val(), $("#question10").val()],
        totalScore: 0
      };
      var currentURL = window.location.origin;

      for (var i = 0; i < newFriend.scores.length; i++) {
        newFriend.scores[i] = parseInt(newFriend.scores[i]);
        newFriend.totalScore += newFriend.scores[i];
      }

      newFriend.totalScore = parseInt(newFriend.totalScore);

      $.post(currentURL + "/api/friends", newFriend,
        function (friendData) {
          $("#friend-name").text(friendData.name);
          $("#friend-photo").attr("src", friendData.image);
          $("#modal1").modal("open");
        });
    } else {
      alert("Check that each question is answered and that a valid URL was provided for the image location.");
    }
  });
});
