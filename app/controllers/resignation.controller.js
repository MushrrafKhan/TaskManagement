//const db = require("../models/resignation");
const db = require("../models");
const resign = db.resign;


exports.create = (req,res) => {
    return resign.create({ 
        emp_id: req.body.emp_id,
        reason: req.body.reason,                 
        status: req.body.status,
        reply_by: req.body.reply_by,
        
    }).then((post) => {
        var data = {
        status:true,
        msg:'employer resign successfully',
        data:post,
        }
        res.send(data);
    }).catch((err) => {
        var data = {
            status: false,
            msg:'Error while creatingtutorial'+err,
            data:err,
        }
        res.send(data);
    });
};
exports.findAll = (req,res) => {
    return resign.findAll({

    }).then((post) => {
        var data = {
            status:true,
            msg: 'resign get successfully',
            data:post,
        }
        res.send(data);

    }).catch(err => {
        var data = {
            status:false,
            msg:'Error while creating tutorial'+err,
            data:err,
        }
        res.send(data);
    });

};
exports.update =(req,res) => {
   const id = req.params.id;
   return resign.update(req.body,{
       where: {
           id:id
       }
   }).then(post => {
       if(post==1) {
           var data = {
               status:true,
               msg:'resign updated successfully with id: '+req.params.id,
               data:post,
           }
           res.send(data);
       }else{
           var data = {
               status:false,
               msg:'record not found with id '+req.params.id,
               data:[]
           }
           res.send(data);
       }
   }).catch(err => {
       var data = {
           status:false,
           msg: 'Error Somthing wrong with request'+err,
           data: err,
       }
       res.send(data);
   });
};