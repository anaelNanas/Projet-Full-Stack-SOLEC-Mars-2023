import { useState } from 'react';
import {postData, hashCode} from '../utils.js';


const mySubmit = async (e, setPassword, setConfirmPassword) => 
{
    e.preventDefault();

    const nouveauCustomer = {
    name: e.target.username.value,
    passwordHash: hashCode(e.target.password.value).toString(),
    numTelephone: e.target.customerPhone.value
    };

    console.log("nouveauCustomer", nouveauCustomer);

    const reponseBackEnd = await postData('https://api-solec-l8wc.onrender.com/api/customers', nouveauCustomer);

    console.log("dinguerie", reponseBackEnd);

    if(reponseBackEnd.status === 201)
    {      
        alert("Nouvel utilisateur enregistré !!\nIdentifiant : " + reponseBackEnd.newCustomerName + "\nTéléphone : " + reponseBackEnd.newCustomerPhone);
        e.target.reset();
        setPassword();
        setConfirmPassword();
    }
    else
    {
        alert("Problème !!! (erreur " + reponseBackEnd.status + ')\nMessage :  " ' + reponseBackEnd.error + ' "');
    }
}


export const SignIn = () => 
{
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    console.log("password", password);
    console.log("confirmPassword", confirmPassword);


    return (
        <>
            <div id='pageContainer' className='d-flex justify-content-center align-items-center h-100'>
                <div className="card bg-secondary-light p-4" >
                    <form id="formulaireEnvoiCommande" onSubmit={(e) => mySubmit(e, setPassword, setConfirmPassword)} className="d-flex flex-column justify-content-around align-items-center">
                        <h3>{"Formulaire d'inscription : "}</h3>
                        <div className="form-group m-1">
                            <label htmlFor="username">Identifiant (4 à 12 caractères)</label>
                            <input type="text" className="form-control" id="username" placeholder="JeanMichel" required minLength="4" maxLength="12"/>
                        </div>
                        <div className="form-group m-1">
                            <label htmlFor="customerPhone">Téléphone</label>
                            <input type="tel" className="form-control" id="customerPhone" placeholder='01.23.45.67.89' required pattern='0\d(\.\d{2}){4}'/>
                        </div>
                        <div className="form-group m-1">
                            <label htmlFor="password">Mot de Passe</label>
                            <input type="password" className="form-control" id="password" placeholder="mOt_de!PAsse45" onChange={e => setPassword(e.target.value)} required/>
                        </div>
                        <div className="d-flex flex-column form-group m-1">
                            <label htmlFor="password-confirm">Confirmer le mot de passe</label>
                            <input type="password" className="form-control" id="password-confirm" placeholder="mOt_de!PAsse45" onChange={e => setConfirmPassword(e.target.value)} required />
                            {password === undefined || confirmPassword === undefined ? <span style={{"opacity": "0"}}>Mots de passe correspondants</span> : password === confirmPassword ? <span className='d-flex align-self-center' style={{color: 'green'}}>Mots de passe correspondants</span> : <span className='d-flex align-self-center' style={{color: 'red'}}>Mots de passe différents</span>}
                        </div>
                        {/* <div className="form-group">
                            <label className="form-label" htmlFor="customermail">Adresse E-mail</label>
                            <input type="text" className="form-control" id="customermail" placeholder='jeanmicheldu33@boitemail.com' />
                        </div> */}
                        <button type="submit" className="btn btn-primary m-2" disabled={password === undefined || confirmPassword === undefined || password !== confirmPassword} >{"S'inscrire"}</button>
                    </form>
                </div>
            </div>
        </>
    );
};