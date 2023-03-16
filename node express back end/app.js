const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customer');
const Outil = require('./models/outil');
const Creneau = require('./models/creneau');
const cors = require('cors');
const creneau = require('./models/creneau');

const app = express();
mongoose.set('strictQuery', false);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config();
} // else les lignes suivantes vont prédominer
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;



let se = "Moi";

const hashCode = (s) => {
    var h = 0, l = s.length, i = 0;
    if ( l > 0 )
      while (i < l)
        h = (h << 5) - h + s.charCodeAt(i++) | 0;
    return h;
  };

var afficherInfosDeveloppeur = true;

// const customerttt = new Customer({
// name: 'caleb',
// hashMdp: hashCode(se)
// });

// // customerttt.save();

// console.log("lol.objectId", hashCode(se));

// const monCreneau = new creneau({ 
//     userId: "000000000000000000000500",
//     outilId: "000000000000000000000000",
//     dateDebut: new Date(),
//     dateFin: new Date()
// });


// //  monCreneau.save(); 


// const monOutil = new Outil({
//     name: "Scie sauteuse",
//     description: "Très efficace pour menacer son collègue de bureau qui ne laisse pas de café aux autres",
//     specifications: ["df", "lknf", "hoh"],
//     image: "lol"
// });

// monOutil.save(); 

app.get('/', (req, res) =>
{
    res.send('Welcome !');

    if(afficherInfosDeveloppeur)
    {
        console.log("j'ai eu une requête get toute simple !");
    }
});

app.get('/api/outils', async (req, res) =>
{
    // console.log(await mongoose.connection.db.listCollections().toArray());
    try
    {
        const storedOutils = await Outil.find();
        const storedCustomers = await Customer.find();
        const storedCreneaux = await Creneau.find();
       
        for(let indiceOutil = 0; indiceOutil < storedOutils.length; indiceOutil++)
        {
            const creneauxOutil = storedCreneaux.filter(creneau => creneau.outilId.toString() === storedOutils[indiceOutil]._id.toString());
            
            for(let indiceCreneau = 0; indiceCreneau < creneauxOutil.length; indiceCreneau++)
            {
                const customerDeCreneau = storedCustomers.filter(customer => customer._id.toString() === creneauxOutil[indiceCreneau].userId.toString());
                if(customerDeCreneau.length !== 1)
                {
                    throw new Error("Le nombre de customers correspondant à ce créneau est strictement différent de 1");
                }

                const nouveauCreneau = {
                    ...creneauxOutil[indiceCreneau]._doc, // parce que mongoose fait des ptites modifs dans son coin (c'est pour éviter le truc moche commenté ci-dessous)
                    customerName: customerDeCreneau[0].name
                };

                // creneauxOutil[indiceCreneau] = {
                //     userId: creneauxOutil[indiceCreneau].userId,                
                //     outilId: creneauxOutil[indiceCreneau].outilId,
                //     dateDebut: creneauxOutil[indiceCreneau].dateDebut,
                //     dateFin: creneauxOutil[indiceCreneau].dateFin,
                //     customerName: customerDeCreneau[0].name
                // }

                // console.log("nouveauCreneau", nouveauCreneau)

                creneauxOutil[indiceCreneau]._doc = nouveauCreneau;
                // console.log("blublbu", creneauxOutil[indiceCreneau])
            }

            // console.log("creneauxOutil", creneauxOutil);

            // console.log("letsgro");

            const nouvelOutil = {
                ...storedOutils[indiceOutil]._doc,
                creneauxOutil: creneauxOutil
            };

            // console.log("creneauxOutil", nouvelOutil);
            storedOutils[indiceOutil]._doc = nouvelOutil;
        }

        res.json(storedOutils);
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }

    if(afficherInfosDeveloppeur)
    {
        console.log("J'ai eu une requête get dans outils sans request params !");
    }
});


// app.get('/api/outils', async (req, res) =>
// {
//     // console.log(await mongoose.connection.db.listCollections().toArray());
//     try
//     {
//         const result = await Outil.find();
//         res.json({"outils": result});
//     }
//     catch(error)
//     {
//         res.status(500).json({error: error.message});
//     }

//     if(afficherInfosDeveloppeur)
//     {
//         console.log("J'ai eu une requête get dans outils sans request params !");
//     }
// });








app.get('/api/creneaus/:id', async (req, res) =>
{
    // console.log(await mongoose.connection.db.listCollections().toArray());

    if(afficherInfosDeveloppeur)
    {
        console.log({
            requestParams: req.params,
            requestQuery: req.query
        });
    }

    try
    {
        const {id: userId} = req.params;
        const creneau = await Creneau.find();
        const creneauUser = creneau.filter(cren => cren.userId.toString() === userId);

        if(afficherInfosDeveloppeur)
        {
            console.log(userId);
            console.log("creneau", creneau);
            console.log("creneauUser", creneauUser);
        }

        if(creneauUser.length <= 0)
        {
            res.status(404).json({'error': 'Creneau not found'});
        }
        else
        {
            res.json({"creneauUser": creneauUser}); 
        }
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }

    if(afficherInfosDeveloppeur)
    {
        console.log("J'ai eu une requête get dans creneaux avec id comme request params !");
    }
});




/**
 * req.body = {
 *  name,
 *  passwordHash,
 *  numTelephone
 * }
 */
app.post('/api/customers', async (req, res) => 
{
    try
    {
        console.log(req.body);
        if(req.body.passwordHash.length > 0 && req.body.passwordHash !== String)
        {

            const storedCustomers = await Customer.find();
            // console.log(storedCustomers);
            
            if(storedCustomers.filter(storedCustomer => storedCustomer.name === req.body.name).length <= 0)
            {
                const customer = new Customer({
                    name: req.body.name,
                    hashMdp: req.body.passwordHash,
                    numTelephone: req.body.numTelephone
                });

                await customer.save();
                res.status(201).json({newCustomerName: customer.name, newCustomerPhone: customer.numTelephone, status: 201})
            }
            else
            {
                // console.log("oh no !");
                res.status(400).json({error: "cet identifiant est déjà pris !!", status: 400})
            }
        }
        else
        {
            res.status(400).json({error: "le mdp n'est pas valide (string plus au moins 1 caractère) !!", status: 400})
        }
    }
    catch(error)
    {
        res.status(500).json({error: error.message, status: 500});
    }
});





/*
req.body = {
    username,
    passwordHash,
    dateDebut,
    dateFin
}
 */
app.post('/api/creneaus/:id', async (req, res) => 
{
    if(afficherInfosDeveloppeur)
    {
        console.log({
            requestParams: req.params,
            requestQuery: req.query
        });

        console.log(req.body);
    }

    try
    {
        const {id: outilId} = req.params;


        const storedCustomers = await Customer.find();
        const storedCustomerAvecCetUsername = storedCustomers.filter(storedCustomer => storedCustomer.name.toString() === req.body.username);


        if(storedCustomerAvecCetUsername.length !== 1)
        {
            if(storedCustomerAvecCetUsername.length === 0)
            {
                res.status(404).json({error: "Identifiant inconnu !!", status: 404});
            }
            else
            {
                res.status(409).json({error: "Identifiant pas unique !!", status: 409});
            }
        }
        else
        {
            if(storedCustomerAvecCetUsername[0].hashMdp.toString() !== req.body.passwordHash.toString())
            {
                res.status(401).json({error: "Mot de passe erroné !!", status: 401});
            }
            else
            {
                const nouveauCreneau = new Creneau({
                    userId: storedCustomerAvecCetUsername[0]._id,
                    outilId: outilId,
                    dateDebut: req.body.dateDebut,
                    dateFin: req.body.dateFin
                });
                await nouveauCreneau.validate();

                const storedCreneaus = await Creneau.find();
                const storedCreneausDeCetOutil = storedCreneaus.filter(storedCreneau => storedCreneau.outilId.toString() === outilId);
         
                let pasDeProbleme = true;
                if(storedCreneausDeCetOutil.length > 0)
                {
                    for(const storedCreneau of storedCreneausDeCetOutil)
                    {
                        if(pasDeProbleme)
                        {
                            if(!((storedCreneau.dateDebut < nouveauCreneau.dateDebut && storedCreneau.dateFin < nouveauCreneau.dateDebut) || (storedCreneau.dateDebut > nouveauCreneau.dateFin && storedCreneau.dateFin > nouveauCreneau.dateFin)))
                            {
                                res.status(403).json({error: "Le créneau demandé entre en collision avec au moins un créneau déjà réservé !!", status: 403});
                                pasDeProbleme = false;
                            }
                        }
                    }
                }
                
                if(pasDeProbleme)
                {
                    await nouveauCreneau.save();
                    res.status(201).json({dateDebut: nouveauCreneau.dateDebut, dateFin: nouveauCreneau.dateFin, status: 201});
                }
            }
        }
    }
    catch(error)
    {
        res.status(500).json({error: error.message, status: 500});
    }
})

















/*

app.get('/api/customers', async (req, res) =>
{
    // console.log(await mongoose.connection.db.listCollections().toArray());
    try
    {
        const result = await Customer.find();
        res.json({"customers": result});
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }

    console.log("J'ai eu une requête get dans customers sans request params !");
});



app.get('/api/customers/:id', async (req, res) =>
{
    console.log({
        requestParams: req.params,
        requestQuery: req.query
    });

    try
    {
        const {id: customerId} = req.params;
        console.log(customerId);
        const customer = await Customer.findById(customerId);
        console.log(customer);
        if(!customer)
        {
            res.status(404).json({'error': 'User not found'});
        }
        else
        {
            res.json({customer}); 
        }
    }
    catch(error)
    {
        res.status(500).json({error: 'something went wrong'});
    }


    console.log("J'ai eu une requête get dans customers avec request params !");
});

app.put('/api/customers/:id', async (req, res) =>
{
    try
    {
        const customerId = req.params.id;
        const result = await Customer.replaceOne({_id: customerId}, req.body);
        console.log(result);
        res.json({updatedCount: result.modifiedCount});
    }
    catch(error)
    {
        res.status(500).json({error: 'something went wrong'});
    }
});
 

app.delete('/api/customers/:id', async (req, res) =>
{
    try
    {
        const customerId = req.params.id;
        const result = await Customer.deleteOne({_id: customerId});
        res.json({deletedCount: result.deletedCount});
    }
    catch(error)
    {
        res.status(500).json({error: 'something went wrong'});
    }
    {
        const result = await Customer.find();
        res.json({"customers": result});
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }

    console.log("J'ai eu une requête get dans customers sans request params !");
});



app.get('/api/customers/:id', async (req, res) =>
{
    console.log({
        requestParams: req.params,
        requestQuery: req.query
    });

    try
    {
        const {id: customerId} = req.params;
        console.log(customerId);
        const customer = await Customer.findById(customerId);
        console.log(customer);
        if(!customer)
        {
            res.status(404).json({'error': 'User not found'});
        }
        else
        {
            res.json({customer}); 
        }
    }
    catch(error)
    {
        res.status(500).json({error: 'something went wrong'});
    }


    console.log("J'ai eu une requête get dans customers avec request params !");
});

app.put('/api/customers/:id', async (req, res) =>
{
    try
    {
        const customerId = req.params.id;
        const result = await Customer.replaceOne({_id: customerId}, req.body);
        console.log(result);
        res.json({updatedCount: result.modifiedCount});
    }
    catch(error)
    {
        res.status(500).json({error: 'something went wrong'});
    }
});
 

app.delete('/api/customers/:id', async (req, res) =>
{
    try
    {
        const customerId = req.params.id;
        const result = await Customer.deleteOne({_id: customerId});
        res.json({deletedCount: result.deletedCount});
    }
    catch(error)
    {
        res.status(500).json({error: 'something went wrong'});
    }
});


app.post('/', (req, res) =>
{
    res.send('This is a post request !');
});
{
    res.send('This is a post request !');
});

*/


// app.post('/api/customers', async (req, res) => 
// {
//     console.log(req.body);
//     const customer = new Customer(req.body);
//     try
//     {
//         await customer.save();
//         res.status(201).json({customer})
//     }
//     catch(error)
//     {
//         res.status(400).json({error: error.message});
//     }
// })



const start = async() =>
{
    try
    {
        await mongoose.connect(DATABASE_URL);
    
        app.listen(PORT, () => 
        {
            console.log('App listening on port ' + PORT);
        });

        const date = new Date(2023, 1, 24);
        console.log(date);
    }
    catch(error)
    {
        console.log(error.message);
    }
}

start();







/*
Get infos des sites : collection pageDatas

get les outils, get les customers et get les créneaux pour afficher la description et le planning de chaque outil


post nouvel utilisateur (vérifier que l'identifiant est bien unique)
post nouveau creneau (vérifier qu'il est bien disponible)




fonctionnalité supplémentaire :
    - rajouter onglet "créneaux" où on a le choix entre afficher tous les créneaux à venir ou seulement les siens auquel cas il s'identifie pour get ses créneaux et peut choisir celui qu'il veut delete (id + mdp pour valider un delete) 
    - L'utilisateur peut rajouter une adresse mail si il veut

    */