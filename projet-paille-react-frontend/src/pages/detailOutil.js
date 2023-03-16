import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import {InfoPopOver} from '../components/infoPopOver.js';
import {postData, hashCode} from '../utils.js';





const mySubmit = async (e, dateDebut, dateFin, outilId) => 
{
  e.preventDefault();

  if(confirm("Passer la commande ?"))
  {
    const demandeCreneau = {
      username: e.target.username.value,
      passwordHash: hashCode(e.target.password.value).toString(),
      dateDebut: dateDebut,
      dateFin: dateFin
    }

    console.log("demandeCreneau", demandeCreneau);

    const reponseBackEnd = await postData(`https://api-solec-l8wc.onrender.com/api/creneaus/${outilId.toString()}`, demandeCreneau);

    console.log("dinguerie", reponseBackEnd);

    if(reponseBackEnd.status === 201)
    {      
        alert("Nouveau créneau réservé !!\nDate de début : " + reponseBackEnd.dateDebut + "\nDate de fin : " + reponseBackEnd.dateFin + "\n--> Rechargez la page pour faire apparaître les changements");
        e.target.reset();
    }
    else
    {
        alert("Problème !!! (erreur " + reponseBackEnd.status + ')\nMessage :  " ' + reponseBackEnd.error + ' "');
    }
  }
}

// function handleDemandeDeReservation(dateDebut, dateFin)
// {
//   const demandeCreneau = {
//     userId: "63f8f4c949bf72ca28a6b2a5",
//     passwordHash: "107961",
//     dateDebut: dateDebut,
//     dateFin: dateFin
//   }

//   postData('http://localhost:3005/api/creneaus/63f8f2c7a6d7da7b05cbe244', demandeCreneau);
// }




function tileClassName(date, appointmentDatesUserIdNum)
{
  const classNames = ['creneauPris0', 'creneauPris1', 'creneauPris2', 'creneauPris3', 'creneauPris4', 'creneauPris5'];
  let retour = null;

  // console.log(date);
  // if(appointmentDatesUserIdNum !== undefined)
  // {
    // console.log("dinguerie", appointmentDatesUserIdNum)
  for(const appointmentDate of appointmentDatesUserIdNum)
  {
    if(appointmentDate.date.toDateString() === date.date.toDateString())
    {
      retour = classNames[appointmentDate.userIdNum];
    }
  }

  return retour;
}

function tileDisabled(date, appointmentDatesUserIdNum ) 
{
  // let isAppointment = false;

  // if(appointmentDatesUserIdNum !== undefined)
  // {
  const isAppointment = appointmentDatesUserIdNum.some(
  appointmentDate => appointmentDate.date.toDateString() === date.date.toDateString()
  );
  

  return isAppointment ? true : false;
}


export const DetailOutil = ({outilList}) =>
{
    // const [outilList, setOutilList] = useContext(listOutilsContext);
    // const [value, onChange] = useState();
          const [value, onChange] = useState();
          const [selectedDebut, setSelectedDebut] = useState();
          const [selectedFin, setSelectedFin] = useState();

          const optionsDate = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };

    console.log('outilList', outilList);
    const {id: outilId} = useParams();

    console.log("outilId", outilId);

    
    let composantDetailOutil = (
      <>
        <p>Page en cours de chargement...</p>
      </>
    )

      


    const outilCourant = outilList.filter(outil => outil._id.toString() === outilId.toString());
    if(outilCourant.length === 1)
    {
        try
        {
          let appointmentDates = [];
          let appointmentDatesUserIdNum = [];

          for(const creneau of outilCourant[0].creneauxOutil)
          {
            const dateDebut = new Date(creneau.dateDebut);
            const dateFin = new Date(creneau.dateFin);
            const userIdNum = parseInt(creneau.userId.valueOf(), 16) % 6;
            // console.log("idNum", idNum);
            

            // console.log("dateDebut", dateDebut)
            // console.log("dateFin", dateFin)

            var dateCourante = dateDebut;
            // dateCourante = creneau.dateDebut;
            while(dateCourante <= dateFin)
            {
              const nouvelleDate = new Date(dateCourante);
              appointmentDates.push(nouvelleDate);
              appointmentDatesUserIdNum.push({
                date: nouvelleDate,
                userIdNum: userIdNum
              });
              // console.log("dinguerie", dateCourante)
              // dateCourante++;
              dateCourante.setDate(dateCourante.getDate() + 1);
            }
          }

          

          // let dateInitiale = new Date();
          // while(appointmentDates.some(
          //   appointmentDate => appointmentDate.toDateString() === dateInitiale.toDateString()
          // ))
          // {
          //   dateInitiale.setDate(dateInitiale.getDate() + 1);
          // }
          // useEffect(() => {
          //   onChange(dateInitiale);
          // }, []);
          if(appointmentDatesUserIdNum !== undefined)
          {

          console.log("appointmentDatesUserIdNum", appointmentDatesUserIdNum);


          console.log("value", value);
          console.log("nbrspeifications", outilCourant[0].specifications.length);
          
          let compteur = 0;
          const listeSpecifications = outilCourant[0].specifications.map(specification => {
            compteur++;
            return (
              <>
                <li key={`${compteur}`}>
                  {specification}
                </li>
              </>
            );
          });
            
          
          composantDetailOutil = (
              <>
                <div id='titre_et_courteDescription_et_galeriePhotos' className='d-flex justify-content-around pb-5'>
                  <div id='titre_et_courteDescription' className='d-flex flex-column bg-light rounded bg-opacity-75 m-5 p-4' style={{"width": "30%"}}>
                    <h1 className='fw-bold p-2 mb-4 align-self-center' style={{"border": "dashed 4px"}}>{outilCourant[0].name}</h1>
                    <p className=''>{outilCourant[0].description}</p>
                    <p className='m-0'>Spécifications techniques :</p>
                    <ul>
                      {listeSpecifications}
                    </ul>
                  </div>
                  <div id='galeriePhotos' className='d-flex'>
                  {/* <!-- Carousel --> */}
                    {/* <div id="demo" class="carousel slide" data-bs-ride="carousel">

                      <!-- Indicators/dots -->
                      <div class="carousel-indicators">
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                      </div>

                      <!-- The slideshow/carousel -->
                      <div class="carousel-inner">
                        <div class="carousel-item active">
                          <img src={outilCourant[0].image} alt="Los Angeles" class="d-block w-100" />
                        </div>
                        <div class="carousel-item">
                          <img src="chicago.jpg" alt="Chicago" class="d-block w-100" />
                        </div>
                        <div class="carousel-item">
                          <img src="ny.jpg" alt="New York" class="d-block w-100" />
                        </div>
                      </div>

                      <!-- Left and right controls/icons -->
                      <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                      </button>
                      <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                        <span class="carousel-control-next-icon"></span>
                      </button>
                    </div> */}
                    <img src={outilCourant[0].image} alt={outilCourant[0].name} width="500" className='rounded shadow-lg'/>
                  </div>
                </div>
                <div id='calendrier_et_choixCreneau_et_priseCreneau_et_infosPersonelles' className='d-flex flex-column justify-content-around bg-light bg-opacity-50 rounded w-50 p-4'>
                  <div id='calendrier_et_choixCreneau' className='d-flex flex-column justify-content-around align-items-center'>
                    <h1 className='mb-4'>Planning des créneaux :</h1>
                    <Calendar className='mb-4' onChange={onChange} value={value} tileClassName={date => tileClassName(date, appointmentDatesUserIdNum)} tileDisabled={date => tileDisabled(date, appointmentDatesUserIdNum)} view="month" />
                    <button type="button" className="btn btn-primary mb-5" disabled={value === undefined} onClick={() => selectedDebut !== undefined && selectedFin !== undefined ? (onChange(), setSelectedDebut(), setSelectedFin()) : selectedDebut === undefined ? setSelectedDebut(value) : setSelectedFin(value)} >{value === undefined ? "Sélectionnez une date de début" : selectedDebut === undefined ? "Date de début : " + value.toLocaleDateString('fr-FR', optionsDate) + " ?" : selectedFin === undefined ? "Date de début : " + selectedDebut.toLocaleDateString('fr-FR', optionsDate) + "   -->   Date de fin : " + value.toLocaleDateString('fr-FR', optionsDate) + " ?" : "Cliquez pour remettre à zéro"}</button>
                  </div>
                  <div id='infosPersonelles_et_priseCreneau' className='d-flex flex-column justify-content-center'>
                    <form id="formulaireEnvoiCommande" className='d-flex flex-column align-items-center' onSubmit={(e) => mySubmit(e, selectedDebut, selectedFin, outilId)}>
                        <h1 className='mb-4'>Informations personelles :</h1>
                        <div className="form-group mb-1">
                            <input type="text" className="form-control" id="username" placeholder='Identifiant' required/>
                        </div>
                        <div className="form-group mb-4">
                            <input type="password" className="form-control" id="password" placeholder='Mot de passe' required/>
                        </div>
                        <button type="submit" className="btn btn-danger" style={{"maxWidth": "50%"}} disabled={selectedDebut === undefined || selectedFin === undefined}>{selectedDebut === undefined || selectedFin === undefined ? "Configurez votre créneau avec le bouton bleu" : "Réserver un créneau de location du " + selectedDebut.toLocaleDateString('fr-FR', optionsDate) + " au " + selectedFin.toLocaleDateString('fr-FR', optionsDate) + " inclus ?"}</button>
                    </form>
                  </div>
                </div>
                  {/* <div>
                  </div>
                  
                  <p></p> */}
                  {/* <button type="button" className="mt-3 mb-3 btn btn-danger" onClick={() => {handleDemandeDeReservation(selectedDebut, selectedFin), onChange(), setSelectedDebut(), setSelectedFin()}} disabled={selectedDebut === undefined || selectedFin === undefined}>{selectedDebut === undefined || selectedFin === undefined ? "Envoyer une demande de Réservation ?" : "Envoyer une demande de Réservation pour un début de location du " + selectedDebut.toLocaleDateString('fr-FR', optionsDate) + " au " + selectedFin.toLocaleDateString('fr-FR', optionsDate) + " inclus ?"}</button> */}
                  

                  {/* <InfoPopOver message={"Ceci est une information importante !"} /> */}
                  {/* <p>Allez allez venez bande de petits fripands</p> */}
              </>
          );
          }

        }
        catch(error)
        {
          console.log(error.message);
          console.log("Exception levée");
        }
    }

//     console.log("outilCourant", outilCourant);
//     var idNum = 0;

//     if(outilCourant?.creneauxOutil?.length > 0)
//     {
//       idNum = parseInt(outilCourant?.creneauxOutil[0]?.userId?.valueOf(), 16);
//       idNum %= 6;
//       console.log("idNum", idNum);
//     }

//     const appointmentDates = [
//       new Date(2023, 1, 28),
//       new Date(2023, 2, 5),
//       new Date(2023, 2, 6),
//       new Date(2023, 2, 7),
//       new Date(2023, 2, 8)
//     ];

//    

//     const handleOnClickDay = (e) =>
//     {
//         console.log("OnClickDay", e);
//     }

//     function pickRandomElementFromArray(array) {
//       const randomIndex = Math.floor(Math.random() * array.length);
//       return array[randomIndex];
//     }

//     const fruits = ['creneauPris0', 'creneauPris1', 'creneauPris2', 'creneauPris3', 'creneauPris4', 'creneauPris5'];
// // const randomFruit = pickRandomElementFromArray(fruits);
// // console.log(randomFruit); // Outp

//     // function tileContent({ date }) {
//     //     const appointmentDates = [
//     //       new Date(2023, 2, 2),
//     //       new Date(2023, 2, 5)
//     //     ];
//     //     const isAppointment = appointmentDates.some(
//     //       appointmentDate => appointmentDate.toDateString() === date.toDateString()
//     //     );
//     //     return isAppointment ? <div style={{ backgroundColor: 'green' }}>Rendez-vous</div> : false;
//     //   }

//       function tileContent({ date, view }) {
//         const isWeekday = date.getDay() !== 0 && date.getDay() !== 6;
//         return view === 'month' && isWeekday ? <div style={{ backgroundColor: 'green' }}></div> : null;
//       }

//       function tileClassName({ date }) {
//         const isAppointment = appointmentDates.some(
//           appointmentDate => appointmentDate.toDateString() === date.toDateString()
//         );
//         return isAppointment ? fruits[idNum] : null;
//       }

//       function tileDisabled({ date }) {
//         const isAppointment = appointmentDates.some(
//           appointmentDate => appointmentDate.toDateString() === date.toDateString()
//         );

//         return isAppointment ? true : false;
//       }

//       const aa = ['lol'];

//         const trucAffichable = aa.map(hehe => {
          

//     return (
//         <>
//             <div>
//                 <h1>Planning des rendez-vous</h1>
//                 <Calendar onChange={onChange} value={value} onClickDay={handleOnClickDay} tileClassName={tileClassName} tileDisabled={tileDisabled} tileContent={tileContent} />
//             </div>
//             <h1>{outilCourant.name}</h1>
//             <p>{outilCourant.description}</p>
//             <p>Allez allez venez bande de petits fripands</p>
//             <img src={outilCourant.image} className="card-img-top" alt={outilCourant.name} />
//         </>
//     ); });


    


    return (
      <>
        <div className='d-flex flex-column align-items-center'>
          {composantDetailOutil}
        </div>
      </>
    );
};

/*
Pour indiquer efficacement la réservation d'une plage de jours dans un calendrier, vous pouvez utiliser la propriété tileClassName de React Calendar. Cette propriété vous permet de définir une classe CSS personnalisée pour chaque case du calendrier, en fonction de la date de la case.

Voici les étapes à suivre :

    Définir une fonction tileClassName qui prend en paramètre la date de la case et retourne la classe CSS à utiliser. Dans cet exemple, nous allons définir une plage de jours réservée du 2 mars au 5 mars :

    javascript

function tileClassName({ date }) {
  const reservationStartDate = new Date(2023, 2, 2);
  const reservationEndDate = new Date(2023, 2, 5);
  const isReservationDate = date >= reservationStartDate && date <= reservationEndDate;
  return isReservationDate ? 'reservation' : null;
}


Cette fonction vérifie si la date de la case est comprise entre la date de début et la date de fin de la réservation, et retourne la classe CSS "reservation" si c'est le cas.

Définir la classe CSS "reservation" dans votre feuille de style. Dans cet exemple, nous allons utiliser une couleur de fond jaune pour les cases réservées :

css

.reservation {
  background-color: yellow;
}

Utiliser la fonction tileClassName dans le composant Calendar :

javascript

    function MyCalendar() {
      return (
        <div>
          <h1>Réservation de la plage de jours</h1>
          <Calendar tileClassName={tileClassName} />
        </div>
      );
    }

    Ici, la propriété tileClassName est définie avec la fonction tileClassName que nous avons créée précédemment.

En suivant ces étapes, le calendrier affichera la couleur de fond jaune pour les cases correspondant à la plage de jours réservée définie dans la fonction tileClassName. Cette méthode permet de visualiser efficacement la réservation d'une plage de jours dans un calendrier.
*/