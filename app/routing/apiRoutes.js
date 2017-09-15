var friendsData = require("../data/friends.js");

module.exports = function (app) {
  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function (req, res) {
    var submitFriend = req.body;
    var friendZoneIndex = -1;
    var currentFriendZoneScore = 0;
    var bestFriendZoneScore = 100;
    var friendDetails = {};

    for (var i = 0; i < friendsData.length; i++) {
      currentFriendZoneScore = Math.abs(submitFriend.totalScore - friendsData[i].totalScore);

      if (currentFriendZoneScore <= bestFriendZoneScore) {
        bestFriendZoneScore = currentFriendZoneScore;
        friendZoneIndex = i;
      }
      currentFriendZoneScore = 0;
    }

    friendsData.push(submitFriend);
    friendDetails = friendsData[friendZoneIndex];
    res.json(friendDetails);
  });
};
