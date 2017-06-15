import mongoose from 'mongoose';
import Challenge from './challenge.js';
// import User from './user.js';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

const invitationSchema = new mongoose.Schema({



  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenge"
  },
  player: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"

  }]

});


let model = mongoose.model('Invitation', invitationSchema);


var mailer = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "djo.moutier@gmail.com",
    pass: "19mars1985"
  }
});


var options = {
  viewEngine: {
    extname: '.hbs',
    layoutsDir: './api/views/email/',
    defaultLayout: 'template',
    partialsDir: './api/views/partials/'
  },
  viewPath: './api/views/email/',
  extName: '.hbs'
};


function invitationAsync(invitation, mailer, i, ok, err, callback) {
    let activityName = invitation.challenge.activity.activityName;
    let challenge = invitation.challenge;
  if (i <= invitation.player.length - 1) {
    mailer.use('compile', hbs(options));
    mailer.sendMail({
      from: 'king-Pong@mail.com',
      to: invitation.player[i].email,
      subject: 'invitation au défi' + activityName,
      template: 'email_body',
      context: {
        id:invitation._id,
        invite: invitation.player[i].pseudo,
        date: challenge.date,
        time: challenge.time,
        duration: challenge.duration,
        place: challenge.place,
        author: challenge.author,
        activity:activityName
      }
    }, function(error, response) {
      if (error) {
        err.push(invitation.player[i]);
        console.log(error);
      } else {
        ok.push(invitation.player[i]);
        console.log('mail sent to ');
        mailer.close();
      }
      invitationAsync(invitation, mailer, i + 1, ok, err, callback);
    });

  } else {
    callback(ok, err);
  }

}




export default class Activity {

  findAll(req, res) {
    model.find({}, {

    }, (err, invitations) => {
      if (err || !invitations) {
        res.sendStatus(403);
      } else {
        res.json(invitations);
      }
    });
  }

  findById(req, res) {
    model.findById(req.params.id, {

    }, (err, invitation) => {
      if (err || !invitation) {
        res.sendStatus(403);
      } else {
        res.json(invitation);
        console.log(res.json);
      }
    });
  }

  create(req, res) {
    model.create(req, (err, invitation) => {
        if (err) {
          res.sendStatus(500);

          console.log(err);
        } else {
          model.findById({
              _id: invitation._id
            }).populate('player')
            .populate({path:'challenge',populate:{path:'activity'}})
            .exec((err, result) => {
                if (err || !result) {
                  res.sendStatus(500);

                  console.log(err);
                } else {

                 console.log(result); invitationAsync(result, mailer, 0, [], [], function(ok, err) {
                res({
                  status: 'mail send ' + ok.length + ' of ' + req.player.length
                });

              });
            }

        });

    }
  });
}

// create(req, res) {
//     model.create(req.body, (err, invitation) => {
//         if (err || !invitation) {
//             res.status(500).send(err.message);
//         } else {
//             // req.body.teams.forEach((player) => {
//             //     let playerInfos = {
//             //         player: player.id
//             //     };
//             mailer.use('compile', hbs(options));
//             mailer.sendMail({
//                 from: 'king-Pong@mail.com',
//                 to: 'nailletine.lajoie19@gmail.com',
//                 subject: 'Any Subject',
//                 template: 'email_body',
//                 context: {
//                     variable1: reg.body.player,
//                     variable2: req.body.date
//                 }
//             }, function(error, response) {
//                 console.log('mail sent to ' + to);
//                 mailer.close();
//
//             });
//
//         }
//     });
// }

delete(req, res) {
  model.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200);
    }
  });
}
}
