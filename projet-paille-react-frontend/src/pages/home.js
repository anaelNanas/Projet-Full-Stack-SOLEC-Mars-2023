//import portrait from "../photo pap's.jpg"

export const Home = () =>
{
    return (
        <>
            <div id="Présentation_et_vision_et_competences" className="d-flex flex-column bg-light bg-opacity-75 rounded p-5">
                <div id="presentation" className="d-flex flex-row justify-content-around align-items-center my-5 py-4">
                    <div id="textePresentation" className="d-flex flex-column bg-light rounded p-4">
                        <h1>{"Une petite présentation :"}</h1>
                        <h2>{"Solec - Solutions éco-constructives"}</h2>
                        <p>{'"Avec Vous pour faire aboutir Votre projet de construction"'}</p>
                    </div>
                    <img src={"https://perso.isima.fr/~ancourjaud/Photos%20pour%20le%20projet%20paille/photo%20pap's.jpg"} width="400" alt="portrait" className="d-flex rounded"/>
                </div>
                <div id="vision" className="d-flex flex-column w-75 mb-5">
                    <h1 className="mb-4 bg-light rounded p-4">{"Ma vision :"}</h1>
                    <p>{"Nos habitations sont le théâtre de phénomènes physiques, chimiques et biologique qui interagissent; si elles sont mal conçues, faire le ménage même avec assiduité ne suffira pas à les maintenir saines, belles et confortables sur le long terme. Je pense que pour tout projet de construction ou de rénovation, une approche globale et éclairée est nécessaire."}</p>
                    <p>{"Sinon il peut arriver 1000 choses de ce genre :"}</p>
                    <ul>
                        <li className="mb-3">
                            {"La façade de la maison de famille et moche et ça a l'air humide derrière les murs, on fait venir un façadier qui propose un ravalement total avec enduit teinté dans la masse de grande qualité qui passe dans sa machine à projeter. Il dit « cet enduit est étanche , c'est pas l'eau de pluie rentrera pas par là» et c'est vrai. Vous commandez ce ravalement, le résultat est parfait, mais 3 ans plus tard vous vous rendez compte que c'est encore plus humide à l'intérieur, de la moisissure se développe en bas des plâtres. L'eau ne rentre pas par les faces verticales des murs ravalés mais elle n'en sort encore moins, l'eau du sol et le l'habitation stagne dans ces vieux mur en moellons qui ne supportent vraiment pas ces enduits de ciment plastifié à l'extérieur."}
                        </li>
                        <li className="mb-3">
                            {"Bon alors pour régler ce pb d'humidité à l'intérieur, on fait venir l'électricien pour installer une VMC (ventilation motorisé centralisée), ce qu'il fait avec efficacité et professionnalisme : bouches d'aspiration installées dans les wc, salle de bain et cuisine. Après un mois de fonctionnement ça sent toujours les moisissures et impossible de lancer le poêle à bois sans avoir de la fumée dans la pièce. Du coup cette VMC est désormais éteinte la plupart du temps, de toutes façons ça faisait un bruit faible mais audible. La VMC met l'air de la maison en dépression ce qui contrarie le tirage du poêle, et les entrées d'air qui ne sont pas centralisées, elles, viennent d'un peu partout où ça passe dont les interstices dans les murs, là où l'eau stagne, où les souris nichent, etc..."}
                        </li>
                        <li className="mb-3">
                            {"Lors de la rénovation de cette belle landaise en banlieue bordelaise, ce jeune couple plein de goût  voulait une grande baie vitrée au sud sur un grand volume jusqu'au toit qui donne sur une mezzanine pour la pièce principale chauffée par un poêle à bois. Résultat en hiver quand le poêle fonctionne suffisamment pour qu'on soit à l'aise en bas, c'est le sauna dans la mezzanine, et  heureusement que la baie vitrée a un volet car il reste fermé l'été sous peine de faire entrer la canicule dans toute la maison."}
                        </li>
                    </ul>
                    <p>{"J'ai fait des erreurs moi aussi, à peu près à chaque première fois, et comme j'ai beaucoup expérimenté, ça fait pas mal d'erreurs. L'important est de ne pas se répéter, et de faire profiter les autres de son expérience."}</p>
                </div>
                <div id="competences" className="d-flex flex-column w-75">
                    <h1 className="mb-4 bg-light rounded p-4">{"Mes compétences"}</h1>
                    <ul>
                        <li className="mb-3">
                            {"électricité générale (conception et installation réseaux monophasés et triphasées pour habitat et tertiaire, mise au norme C15-100, consuel, calcul de besoins d'éclairement, flux lumineux)"}
                        </li>
                        <li className="mb-3">
                            {"plomberie (conception et installation de réseaux d’adduction, écoulement et chauffage pour habitat et tertiaire, calculs de charge pour chauffage collectif, plomberie solaire,etc..)"}
                        </li>
                        <li className="mb-3">
                            {"aérologie (VMC simple et double flux, puits canadiens, chauffage au sol par air, gestion etc..)"}
                        </li>
                        <li className="mb-3">
                            {"charpente légères"}
                        </li>
                        <li className="mb-3">
                            {"menuiseries, calculs d'escaliers"}
                        </li>
                        <li className="mb-3">
                            {"plâtrerie, isolation"}
                        </li>
                        <li className="mb-3">
                            {"aménagement, conception d'espaces"}
                        </li>
                        <li className="mb-3">
                            {"etc..."}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};