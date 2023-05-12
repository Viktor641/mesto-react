function Card(props) {

  function handleClick() {
    props.onCardClick(props.card)
  }

  return (
    <div className="card">
      <img
        src={props.link}
        alt={props.name}
        className="card__image" onClick={handleClick}
      />
    <button type="button" className="card__delete"/>
    <div className="card__item">
      <h2 className="card__paragraph">{props.name}</h2>
      <div className="card__like-container">
        <button type="button" className="card__like" />
        <p className="card__like-counter">{props.likes}</p>
      </div>
    </div>
  </div>
  )
}

export default Card