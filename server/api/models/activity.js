
import mongoose from 'mongoose';



const activitySchema = new mongoose.Schema({

    activity: {
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


    findById(req, res) {
        model.findById(req.params.id, {
            password: 0
        }, (err, user) => {
            if (err || !user) {
                res.sendStatus(403);
            } else {
                res.json(user);
            }
        });
    }




}
