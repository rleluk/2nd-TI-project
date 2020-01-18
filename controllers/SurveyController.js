const Survey = require('../models/Survey');

exports.saveAnswers = async (req, res) => {
    try {
        await Survey.saveAnswers(req.body);
        res.status(200).send({msg: 'Odpowiedzi zostały przesłane pomyślnie.'});
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
}

exports.getSurveyData = async (req, res) => {
    try {
        let response = {
            answer1: 0,
            answer2: 0,
            answer3: 0,
            answer4: 0,
            answer5: 0
        };

        let data = await Survey.getAll();

        for(let record of data) {
            switch(record.listeningTime) {
                case 'codziennie':
                    response.answer1++;
                    break;
                case '2-3 razy w tygodniu':
                    response.answer2++;
                    break;
                case 'parę razy w miesiącu':
                    response.answer3++;
                    break;
                case 'kilka razy w roku':
                    response.answer4++;
                    break;
                case 'nigdy':
                    response.answer5++;
                    break;
            }
        }

        res.status(200).send(response);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
}