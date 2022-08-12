function LatestGames(props) {
  return (
    <div className="latest-games">
      <p className="title">Latest Games</p>
      <div className="games">
        {props.latestGames.map(item => {
          return (
            <div className="item" key={item.id} >
              <img src={'/img/covers/' + item.image} />
              <div className="content">
                <p className="name">{item.name}</p>
                <button className="more-info">More Info</button>
              </div>
            </div>
          )
        })}
      </div>
      <div className="see-more">See More</div>
    </div>
  )
}

export default LatestGames