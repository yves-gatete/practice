const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://yvesdrop:memorysucks00@cluster0.p16bt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

function find_company (str, mode) {
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if(err) { console.log("Connection err: " + err); return; }
      
        var dbo  = db.db("companies_db");
        var companies = dbo.collection('companies');
        
        companies.find().toArray(function(err, items) {
            if (err) {
                console.log("Error: " + err);
                return;
            } 
            else {
                for (i = 0; i < items.length; i++) {
                    if ((mode == "by_name" && str == items[i].company) || 
                        (mode == "by_ticker" && str == items[i].ticker)){
                        return "Found";
                    }
                    return "Not found";
                }
            }     	  
        });
    });
}