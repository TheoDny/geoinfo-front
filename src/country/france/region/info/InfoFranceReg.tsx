import "./InfoFranceReg.css"
function InfoFranceReg(props: any){
  return (
    <article id="info-france-region" className="info">
      <h2>{props.info.name}</h2>
      <div className="img">
      <figure>
        <img src="/media/cc0-images/elephant-660-480.jpg"
          alt="Logo region" />
        <figcaption>Logo</figcaption>
      </figure>
      <figure>
        <img src="/media/cc0-images/elephant-660-480.jpg"
          alt="Armoirie region" />
        <figcaption>Armoirie</figcaption>
      </figure>
      </div>
      <p>Départements: <span></span></p>
      <p>Chef-lieu: <span></span></p>
      <p>Gentilé: <span></span></p>
      <p>Superficie: <span></span></p>
      <p>Population: <span></span></p>
    </article>
  )
}

export default InfoFranceReg;