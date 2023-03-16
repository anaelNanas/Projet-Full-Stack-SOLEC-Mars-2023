export const postData = async (url = '', data = {}) => 
{
    const reponseBackEnd = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json()) // .then(json => {console.log("json", json), console.log("status", json.status)});

    // console.log("response", responsvve.error);
    // console.log("response", responsvve.status);

    return reponseBackEnd;

    // return responsvve.status;

    // if(response.status === 201) 
    // {
    //     alert('Commande enregistrée ! Rechargez la page pour voir les changements.');
    //     // retour = true;
    // }
    // else 
    // {  
    //   // const text = await response.text
    //   alert("Problème ! La Commande n'a pas été enregistrée. Faites attention aux points suivants : la date de fin doit être postérieure à la date de début et le créneau ne doit pas entrer en collision avec des créneaux déjà présents");
    // }
}

export const hashCode = (s) => {
  var h = 0, l = s.length, i = 0;
  if ( l > 0 )
    while (i < l)
      h = (h << 5) - h + s.charCodeAt(i++) | 0;
  return h;
};
