/**
 * QuizController
 *
 * @description :: Server-side logic for managing quizzes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create : function (req, res, next) {

    var tempOptions = [];
    var tempQuestion = [];

    Quiz.create(req.params.all(), function quizCreated(err, quiz) {
      if (err) {
        console.log(err);
        res.status(200).json({
          err : err
        });
        return;
      }

      tempOptions.push(quiz.op1);
      tempOptions.push(quiz.op2);
      tempOptions.push(quiz.op3);
      tempOptions.push(quiz.op4);
      quiz.options = tempOptions;

      tempQuestion.push(quiz.questionName);
      tempQuestion.push(quiz.options);

      quiz.question = tempQuestion;

      user.save(
        function (err) {
          console.log('saving records for user');
        }
      );
      //console.log(user);


      req.session.authenticated = true;
      req.session.User = user;


      req.session.flash = {
        success: "Successfully Registered!",
        //ip: us_ip,
        //response: us_response
      };
      //Mailer.sendWelcomeMail(user);
      return res.json({user: user, token: sailsTokenAuth.issueToken(user.id)});
      //return res.redirect('/register');

  });
  },




};

