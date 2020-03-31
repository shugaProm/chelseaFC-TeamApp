module.exports = {
    

    saveNewPlayer: (req, res) => {
        console.log(req.body);
        let id = req.body.id;
        let firstname = req.body.firstname;
        let middlename = req.body.middlename;
        let lastname = req.body.lastname;
        let nickname = req.body.nickname;
        let position = req.body.position;
        let number = req.body.number;


    //ES6 syntax: let {id, firstname, middlename, lastname, nickname, position, number} = req.body

        if (id == "" || id == null){

            let query = `INSERT INTO chelsea_players VALUES( "", "${firstname}", "${middlename}", "${lastname}", "${nickname}", "${position}" , "${number}" )`;
            chelseaDatabase.query(query, (err, result) =>{
                if(err){
                    throw err;
                    console.log(err);

                } res.redirect('/');
                
            });
            
            
        } else {

            let get_player_query = `UPDATE chelsea_players SET firstname = "${firstname}", middlename = "${middlename}", lastname = "${lastname}",
             nickname = "${nickname}", position = "${position}", number = "${number}" WHERE id = ${id}`;

             chelseaDatabase.query(get_player_query, (err, result) => {
                 if(err) {
                     console.log(err);
                     throw err;
                 }
                 console.log(result);
                 res.redirect('/');
             });
        }
        

    },


    getPlayerForEdit: (req, res) => {
        console.log(req.params);
        let id = req.params.id;

        let query = `SELECT * FROM chelsea_players WHERE id = ${id}`;

        chelseaDatabase.query(query, (err, result) => {
            if(err){
                throw err;
                console.log(err);
            }

            console.log(result);

            let query = "SELECT * FROM chelsea_players ORDER BY id ASC";

            chelseaDatabase.query(query, (err, players) => {
                if(err){
                    console.log(err);
                }
                res.render('index', {
                    title: "welcome to chelsea-team home",
                    player: result[0],
                    players
                });
            })

        });

    },


    deletePlayer: (req,res) => {
        let id =  req.params.id;

        let query = `DELETE FROM chelsea_players WHERE id = ${id}`;

        chelseaDatabase.query(query, (err, result) => {
          if (err){
              console.log(err);
              throw(err);
          }

          let query = "SELECT * FROM chelsea_players ORDER BY ASC";

            chelseaDatabase.query(query, (err, result) => {
                
                if (err){
                    res.redirect('/');
                }
                res.render('index', {
                    title: "welcome to chelsea-team home",
                    chelsea_players: chelsea_players
                });
            })

        });


    }


};
