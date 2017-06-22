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
  let array = [];
  challenges.forEach((challenge) => {
    challenge.teams.forEach((team) => {
      team.players.forEach((player) => {
        if (player._id == params.player && challenge.community == params.community) {
          array.push(challenge);
        }
      });
    });
  });
  return array;
}

//function for filter user
function userFilter(challenges, user) {
  let array = [];
  challenges.forEach((challenge) => {
    challenge.teams.forEach((team) => {
      team.players.forEach((player) => {
        if (player._id == user) {
          array.push(challenge);
        }
      });
    });
  });
  return array;
}

// function for adding time diff in challenge
function timeDiff(challenges) {
  return _.map(challenges, (challenge) => {
    return _.assign({
      diff: moment(challenge.date).fromNow()
    }, challenge._doc);
  });
}


export  {invitationAsync, teamAsynchrome, userCommunityFilter, userFilter, timeDiff};
