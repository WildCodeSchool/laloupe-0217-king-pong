import mongoose from 'mongoose';




const categorySchema = new mongoose.Schema({
    catName: {
        type: String
    },
  
});


let model = mongoose.model('Category', categorySchema);

export default class Category {


  create(req, res){
      model.create(req.body, (err,category) => {
        if (err){
          res.status(500).send(err.message);
        } else {
          res.json({
             category
          });
        }

      });

      }

    findById(req, res) {
        model.findById(req.params.id, {

        }, (err, user) => {
            if (err || !category) {
                res.sendStatus(403);
            } else {
                res.json(category);
            }
        });
    }
    update(req, res){
      model.update({_id:req.params.id
      },req.body, (err, category) =>{
        if (err || !category) {
          res.status(500).send(err.message);
        }else {res.sendStatus(200);
        }
      }
    );
    }

    delete(req, res) {
  model.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
        res.status(500).send(err.message);
    } else {
        res.sendStatus(200);
    }
  });
}


}
