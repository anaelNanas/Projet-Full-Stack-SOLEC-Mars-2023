

export const Outils = ({outilList}) =>
{
    // const [outilList, setOutilList] = useContext(listOutilsContext);
    console.log('outilList', outilList);

    const outilCards = outilList.map(outil => {
        return (
            <div key={outil._id} className="card w-25 mx-3 mb-4 bg-secondary-light p-2" >
                <img src={outil.image} className="card-img-top rounded" alt={outil.name} style={{"border" : "solid 0px"}}/>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title flex-grow-1">{outil.name}</h5>
                    <p className="card-text flex-grow-1">{outil.description}</p>
                    {/* <span className="fw-bold">{outil.creneauxOutil.length} créneaux pris</span> */}
                    <a href={`outils/${outil._id}`} className="btn btn-primary mx-3 d-flex align-self-center">Réserver un créneau <br></br> ({outil.creneauxOutil.length} pris)</a>
                    {/* <Link className="btn btn-primary mx-3" aria-current="page" to={`:${menu.url}`}>{menu.name}</Link> */}
                </div>
            </div>
        );
    });


    return (
        <>
            <div className="d-flex flex-wrap justify-content-around">
                {outilCards}
            </div>
        </>
    );
};