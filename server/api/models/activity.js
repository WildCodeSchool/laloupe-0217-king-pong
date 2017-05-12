
import mongoose from 'mongoose';



const activitySchema = new mongoose.Schema({

    activityName: {
        type: String
    },
    author: {
        type: String
    },
    description: {
        type: String
    },
    resultRule: {
        type: String
    },
    numberOfTeam: {
        type: Number,
        default:2
    },
    numberOfplayer: {
        type: Number,
        default:1
    },
    duration: {
        type: String
    }
});


let model = mongoose.model('Activity', activitySchema);

export default class Activity {

  findAll(req, res) {
    model.find({}, {
      password: 0
    }, (err, communitys) => {
      if (err || !communitys) {
        res.sendStatus(403);
      } else {
        res.json(communitys);
      }
    });
  }

    findById(req, res) {
        model.findById(req.params.id, {
            password: 0
          }, (err, activity) => {
            if (err || !activity) {
                res.sendStatus(403);
            } else {
                res.json(activity);
                  console.log(res.json);
            }
        });
    }

  create(req, res){
      model.create(req.body, (err,activity) => {
        if (err ||!activity){
          res.status(500).send(err.message);
        } else {
          res.json({
             activity
          });
        }
  });

  }


}
