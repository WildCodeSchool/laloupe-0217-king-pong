import _ from 'lodash';
import moment from 'moment';


moment.locale('fr');

//function for sending mail
function invitationAsync(invitation, mailer, i, ok, err, callback) {
  let activityName = invitation.challenge.activity.activityName;
  let challenge = invitation.challenge;
  if (i <= invitation.players.length - 1) {
    mailer.sendMail({
      from: 'king-Pong@mail.com',
      to: invitation.players[i].email,
      subject: 'invitation au défi' + activityName,
      template: 'email_body',
      context: {
        id: invitation._id,
        invite: invitation.players[i].pseudo,
        date: moment(challenge.date).format('LL'),
        time: moment(challenge.time).format('LT'),
        duration: challenge.duration,
        place: challenge.place,
        author: challenge.author.pseudo,
        activity: activityName
      }
    }, function(error, response) {
      if (error) {
        err.push(invitation.players[i]);
        console.log(error);
      } else {
        ok.push(invitation.players[i]);
        console.log('mail sent to ' + invitation.players[i].email);
        mailer.close();
      }
      invitationAsync(invitation, mailer, i + 1, ok, err, callback);
    });
  } else {
    callback(ok, err);
  }
}

//function for create teams
function teamAsynchrome(teams, infos, i, array, request, callback) {
  if (i <= teams.length - 1) {
    console.log('if 1', i);
    if (i > 0) {
      console.log('if 2', i);
      delete infos.players;
    }
    request.create(infos, (res) => {
      array.push(res);
      teamAsynchrome(teams, infos, i + 1, array, request, callback);
    });
  } else {

    callback(null, array);
  }
}

//function for filter user and community
function userCommunityFilter(challenges, params) {
  return challenges.filter((challenge) => challenge.community == params.community).filter((challenge) => {
    return challenge.teams.map((team) => {
      return team.players.map((player) => {
        return player._id == params.player;
      });
    });
  });
}

//function for filter user
function userFilter(challenges, user) {
  return challenges.filter((challenge) => {
    return challenge.teams.map((team) => {
      return team.players.map((player) => {
        return player._id == user;
      });
    });
  });
}

// function for adding time diff in challenge
function timeDiff(challenges) {
  return challenges.map((challenge) => {
    return _.assign({
      diff: moment(challenge.date).fromNow()
    }, challenge._doc);
  });
}
//function for extra score by activity and player
function sortByActivity(challenges) {
  let table = [];
  challenges.forEach((challenge) => {
    let activityName = challenge.activity.activityName;
    challenge.teams.forEach((team) => {
      let result = team.resultat;
      team.players.forEach((player) => {
        let playerId = player._id,
          pseudo = player.pseudo,
          avatar = player.avatar;
        if (table.filter(activity => activity.name == activityName).length > 0) {
          table.forEach((obj) => {
            let activity = obj.name,
              players = obj.players;
            if (players.filter(player => player._id == playerId).length > 0) {
              players[players.findIndex((player) => player._id === playerId)].result.push(result);
            } else {
              players.push({
                _id: playerId,
                pseudo: pseudo,
                avatar: avatar,
                result: [result]
              });
            }
          });
        } else {
          table.push({
            name: activityName,
            players: [{
              _id: playerId,
              pseudo: pseudo,
              avatar: avatar,
              result: [result]
            }]
          });
        }
      });
    });
  });
  return table;
}

//format date and time of challenge in format like date:15 Juin 2017, time: 20h17
function formatDate(challenge){
  challenge.date = moment(challenge.date).format('LL');
  challenge.time = moment(challenge.time).format('LT');
  return challenge;
}



export {
  invitationAsync,
  teamAsynchrome,
  userCommunityFilter,
  userFilter,
  timeDiff,
  sortByActivity,
  formatDate
};
