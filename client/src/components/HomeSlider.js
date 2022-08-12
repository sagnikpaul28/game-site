import { useState } from "react";

function HomeSlider(props) {
  const [featuredGamesList, updateFeaturedGamesList] = useState(props.featuredGames);

  const onClickArrows = (index) => {
    let tempFeaturedGamesList = [...featuredGamesList];
    if (index === 1) {
      let shiftedElement = tempFeaturedGamesList.shift();
      tempFeaturedGamesList.push(shiftedElement);
    } else {
      let shiftedElement = tempFeaturedGamesList.pop();
      tempFeaturedGamesList.unshift(shiftedElement);
    }
    updateFeaturedGamesList(tempFeaturedGamesList);
  }

  return (
    <div className="slider">
      <div className="primary">
        <img src={"/img/featured/" + featuredGamesList[0].details.featuredImage} />
        <div className="content">
          <p className="title">{featuredGamesList[0].name}</p>
          <div className="controls">
            <button className="left" onClick={() => onClickArrows(-1)}>&#10132;</button>
            <button className="right" onClick={() => onClickArrows(1)}>&#10132;</button>
          </div>
        </div>
      </div>
      <div className="slides">
        {featuredGamesList.map((item, index) => {
          if (index > 0) {
            return (
              <div className="item" key={index}>
                <img src={"/img/featured/" + item.details.featuredImage} />
                <div className="content">
                  <p>{item.name}</p>
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default HomeSlider