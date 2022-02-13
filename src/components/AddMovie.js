import React, { useRef } from "react";
import classes from "./AddMovie.module.css";

const AddMovie = props => {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  const submitHandler = event => {
    event.preventDefault();
    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };
    props.onAddMovie(movie);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input ref={titleRef} type="text" id="title" />
      </div>
      <div className={classes.control}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea ref={openingTextRef} id="opening-text" rows="5"></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Release Date</label>
        <input ref={releaseDateRef} type="text" id="date" />
      </div>
      <button>Add Movie</button>
    </form>
  );
};

export default AddMovie;
