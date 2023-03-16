//import decoContact from "https://perso.isima.fr/~ancourjaud/Photos%20pour%20le%20projet%20paille/contact-us.jpg"

export const Contacts = () =>
{
    return (
        <>
            <div id="contactsContainer" className="d-flex flex-column">
                {/* <h1>Page en cours de développement...</h1> */}
                <div id="imageDeco" className="d-flex justify-content-center">
                    <img src={"https://perso.isima.fr/~ancourjaud/Photos%20pour%20le%20projet%20paille/contact-us.jpg"} alt="imageDeco" className="rounded"/>
                </div>
                <div id="mesContacts_et_créditsDéveloppeur" className="d-flex justify-content-around pt-5">
                    <div id="mesContacts" className="d-flex flex-column bg-light m-4 p-4 bg-opacity-75 rounded" style={{"width": "30%"}}>
                        <h1 className="mb-4 bg-light rounded p-4">{"Mes Contacts :"}</h1>
                        <p>Sylvain Courjaud</p>
                        <ul>
                            <li>
                                Mail : super@incroyable.com
                            </li>
                            <li>
                                Téléphone : 01.02.03.04.05
                            </li>
                        </ul>
                    </div>
                    <div id="créditsDéveloppeur" className="d-flex flex-column bg-light m-4 p-4 bg-opacity-75 rounded" style={{"width": "35%"}}>
                        <h1 className="mb-4 bg-light rounded p-4">{"Crédits :"}</h1>
                        <p className="mb-0">{"Bonjour je suis le développeur de ce site ! Si mon travail vous intéresse, n'hésitez pas à faire un petit tour sur mon site personnel pour en savoir plus sur moi ^^ :"}</p>
                        <a href="https://perso.isima.fr/~ancourjaud/" alt="kbk" target="_blank" rel="noreferrer" className="mb-3">https://perso.isima.fr/~ancourjaud/</a>
                        <ul>
                            <li>
                                Développeur : Anaël Courjaud
                            </li>
                            <li>
                                Technologies : React.js, Node express, javascript, typescript, HTML/CSS
                            </li>
                            <li>
                                Création : 20/02/2023
                            </li>
                            <li>
                                Dernière MAJ : 03/03/2023
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};