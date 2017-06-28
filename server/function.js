import _ from 'lodash';
import moment from 'moment';
import Promise from 'promise';

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
        text1: 'Vous avez reçu une invitation de',
        text2: 'tu est invité à un <em>challenge </em>',
        id: invitation._id,
        invite: invitation.players[i].pseudo,
        date: moment(challenge.date).format('LL'),
        time: moment(challenge.time).format('LT'),
        duration: challenge.duration,
        place: challenge.place,
        author: challenge.author.pseudo,
        activity: activityName,
        link: 'https://dry-plains-87997.herokuapp.com/#!/user/invitations/' + invitation._id
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


function changeAsync(challenge, mailer, callback) {

  var promesses = [];
  let activityName = challenge.activity.activityName;


  challenge.teams.forEach((team) => {
    team.players.forEach((player) => {
      mailer.sendMail({
        from: 'king-Pong@mail.com',
        to: player.email,
        subject: 'invitation au défi' + activityName,
        template: 'email_body',
        context: {
          text1: 'Une modification à été efectuer par ',
          text2: 'le <em>challenge </em> à était modifié',
          id: challenge._id,
          invite: player.pseudo,
          date: moment(challenge.date).format('LL'),
          time: moment(challenge.time).format('LT'),
          duration: challenge.duration,
          place: challenge.place,
          author: challenge.author.pseudo,
          activity: activityName,
          link: 'https://dry-plains-87997.herokuapp.com/#!/user/resum/' + challenge._id
        }
      }, function(error, response) {
        if (error) {
          console.log(error);
        } else {
          promesses.push(player);
          console.log('mail sent to ' + player.email);
          mailer.close();
        }
      });
    });
  });

  Promise.all(promesses).then(function(data) {
    console.info('Tous les email ont été envoyés avec succès');
    callback(promesses);
  }).catch(function(err) {
    console.error('Une erreur est survenue lors de l\'envoi des mails');
  });


}

//function for create teams
function teamAsynchrone(teams, infos, i, array, request, callback) {
  if (i <= teams.length - 1) {
    if (i > 0) {
      delete infos.players;
    }
    request.create(infos, (res) => {
      array.push(res);
      teamAsynchrone(teams, infos, i + 1, array, request, callback);
    });
  } else {
    callback(null, array);
  }
}

//function for filter user and community
function communityFilter(challenges, params) {
  return challenges.filter((el) => {
    return el.community == params.community;
  });
}

//function for filter user
function userFilter(challenges, params) {
  return challenges.filter((challenge) => {
    return challenge.teams.map((team) => {
      return team.players.map((player) => {
        return player._id == params.user;
      });
    });
  });
}

//function for filter result false
function resultFilter(challenges, boolean) {
  return challenges.filter((challenge) => {
    return challenge.result === boolean;
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
              players = obj.players,
              playerResults = players[players.findIndex((player) => player._id === playerId)].result;
            if (players.filter(player => player._id == playerId).length > 0) {
              if (result == 'win') {
                playerResults.win += 1;
                playerResults.play += 1;
              } else if (result == 'null') {
                playerResults.nul += 1;
                playerResults.play += 1;
              } else {
                playerResults.lost += 1;
                playerResults.play += 1;
              }
            } else {
              players.push({
                _id: playerId,
                pseudo: pseudo,
                avatar: avatar,
                result: {
                  play: 0,
                  totalpoint: 0,
                  win: 0,
                  nul: 0,
                  lost: 0
                }
              });
              if (result == 'win') {
                playerResults.win += 1;
                playerResults.play += 1;
              } else if (result == 'null') {
                playerResults.nul += 1;
                playerResults.play += 1;
              } else {
                playerResults.lost += 1;
                playerResults.play += 1;

              }

            }
          });
        } else {
          if (result == 'null') {
            table.push({
              name: activityName,
              players: [{
                _id: playerId,
                pseudo: pseudo,
                avatar: avatar,
                result: {
                  play: 1,
                  totalpoint: 0,
                  win: 0,
                  nul: 1,
                  lost: 0
                }
              }]
            });
          } else if (result == 'win') {
            table.push({
              name: activityName,
              players: [{
                _id: playerId,
                pseudo: pseudo,
                avatar: avatar,
                result: {
                  play: 1,
                  totalpoint: 0,
                  win: 1,
                  nul: 0,
                  lost: 0
                }
              }]
            });
          } else {
            table.push({
              name: activityName,
              players: [{
                _id: playerId,
                pseudo: pseudo,
                avatar: avatar,
                result: {
                  play: 1,
                  totalpoint: 0,
                  win: 0,
                  nul: 0,
                  lost: 1
                }
              }]
            });
          }
        }
      });
    });
  });
  return table;
}

//format date and time of challenge in format like date:15 Juin 2017, time: 20h17
function formatDate(challenge) {
  let date = moment(challenge.date).format('LL');
  let time = moment(challenge.time).format('LT');
  return _.assign({
    newDate: date,
    newTime: time
  }, challenge._doc);
}

export {
  invitationAsync,
  teamAsynchrone,
  communityFilter,
  userFilter,
  timeDiff,
  sortByActivity,
  formatDate,
  resultFilter,
  changeAsync
};
