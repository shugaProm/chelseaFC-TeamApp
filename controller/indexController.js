module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM chelsea_players ORDER by id ASC";

        chelseaDatabase.query(query, (err, result) => {
            if(err) {
                res.send(err);
                console.log(err);
            } 
            
            res.render('index', {
                title: 'welcome to chelsea-team home',
                players: result
            });
        });
    }
};