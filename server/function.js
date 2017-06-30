import _ from 'lodash';
import moment from 'moment';
// import Promise from 'promise';

moment.locale('fr');

//function for sending mail
function invitationAsync(invitation, mailer) {
  var promises = [];
  let activityName = invitation.challenge.activity.activityName;
  let challenge = invitation.challenge;
  invitation.players.forEach((player) => {
    let promise = new Promise((resolve, reject) => {
      mailer.sendMail({
        from: 'king-Pong@mail.com',
        to: player.email,
        subject: 'invitation au défi' + activityName,
        template: 'email_body',
        context: {
          text1: 'Vous avez reçu une invitation de',
          text2: 'tu est invité à un challenge ',
          id: invitation._id,
          invite: player.pseudo,
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
          reject(error);
          console.log(error);
        } else {
          console.log('mail sent to ' + player.email);
          mailer.close();
          resolve(player);
        }
      });
    });
    promises.push(promise);
  });


  return Promise.all(promises);

}


function changeDefyAsync(challenge, mailer) {

  var promises = [];
  let activityName = challenge.activity.activityName;

  challenge.teams.forEach((team) => {
    team.players.forEach((player) => {
      let promise = new Promise((resolve, reject) => {
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
            reject(error);
            console.log(error);
          } else {
            console.log('mail sent to ' + player.email);
            mailer.close();
            resolve(player);
          }
        });
      });
      promises.push(promise);
    });
  });
  return Promise.all(promises);

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
  if (challenges !== undefined){
    return challenges.filter((el) => {
      return el.community == params.community;
    });

  }

}

//function for filter user
function userFilter(challenges, params) {
  let array = [];
  challenges.forEach((challenge) => {
    challenge.teams.forEach((team) => {
      team.players.forEach((player) => {
        if (player._id.toString() == params.player) {
          array.push(challenge);
        }
      });
    });
  });
  return array;
}

function userFilterInvitation(invitations, params) {
  let array = [];
   invitations.forEach((invitation) => {
     invitation.players.forEach((player) => {
      if( player == params.player){
        array.push(invitation);
      }
    });
  });
  return array;
}

//function for filter result false
function resultFilter(challenges, boolean) {
  if (challenges !== undefined)
    return challenges.filter((challenge) => {
      return challenge.result === boolean;
    });
}

// function for adding time diff in challenge
function timeDiff(challenges) {
  if (challenges !== undefined)

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
      console.log(result);
      team.players.forEach((player) => {
        let playerId = player._id,
          pseudo = player.pseudo,
          avatar = player.avatar;
          console.log(result);

        if (table.filter(activity => activity.name == activityName).length > 0) {
          table.forEach((obj) => {
            console.log(result);

            let activity = obj.name,
              players = obj.players;
              console.log(result);
            if (players.filter(player => player._id == playerId).length > 0) {
              if (result == 'win') {
                players[players.findIndex((player) => player._id === playerId)].result.win += 1;
                players[players.findIndex((player) => player._id === playerId)].result.play += 1;
              } else if (result == 'null') {
                players[players.findIndex((player) => player._id === playerId)].result.nul += 1;
                players[players.findIndex((player) => player._id === playerId)].result.play += 1;
              } else {
                players[players.findIndex((player) => player._id === playerId)].result.lost += 1;
                players[players.findIndex((player) => player._id === playerId)].result.play += 1;
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
                players[players.findIndex((player) => player._id === playerId)].result.win += 1;
                players[players.findIndex((player) => player._id === playerId)].result.play += 1;
              } else if (result == 'null') {
                players[players.findIndex((player) => player._id === playerId)].result.nul += 1;
                players[players.findIndex((player) => player._id === playerId)].result.play += 1;
              } else {
                players[players.findIndex((player) => player._id === playerId)].result.lost += 1;
                players[players.findIndex((player) => player._id === playerId)].result.play += 1;

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
  userFilterInvitation,
  timeDiff,
  sortByActivity,
  formatDate,
  resultFilter,
  changeDefyAsync
};
