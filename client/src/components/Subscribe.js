import { useState } from "react";

function Subscribe() {
  let [input, changeInput] = useState("");

  let onChangeInput = (e) => {
    changeInput(e.target.value);
  }

  return (
    <div className="subscribe">
      <div className="content">
        <p className="title">Subscribe<br/>And Get A <span>Discount</span></p>
        <div className="form">
          <input placeholder="Your email" value={input} onChange={onChangeInput} />
          <button className="submit">&#62;</button>
        </div>
      </div>
      <img src="/ac.png" className="ac"/>
      <img src="/abstract.jpg" className="abstract"/>
    </div>
  )
}

export default Subscribe;