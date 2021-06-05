import React, { useState } from "react";
import { FacebookSelector } from "react-reactions";
import { FacebookCounter } from "react-reactions";
import blogActions from "../redux/actions/blog.actions";

const Reactions = ({ blog, dispatch, id, isAuthenticated }) => {
  const [showSelector, setShowSelector] = useState(false);

  const handleSubmitReaction = (targetType, targetId, emoji) => {
    // Match reaction name with component API
    if (emoji === "haha") emoji = "laugh";

    dispatch(blogActions.submitReaction(targetType, targetId, emoji));
    setShowSelector(false);
  };

  const toggleReactionsSelector = () =>
    setShowSelector((showSelector) => !showSelector);

  // Create reactions array for Counter component
  let reactionsCounter = [];
  if (blog && blog.reactions) {
    let reactions = blog.reactions;
    for (let property in reactions) {
      if (reactions[property] > 0) {
        for (let i = 0; i < reactions[property]; i++) {
          if (property === "laugh") property = "haha";
          reactionsCounter.push({ emoji: property, by: "ABC" });
        }
      }
    }
  }

  return (
    <div className='Reactions' style={{ width: "250px", position: "relative" }}>
      {reactionsCounter.length > 0 ? (
        <FacebookCounter
          counters={reactionsCounter}
          bg='#fafafa'
          onClick={toggleReactionsSelector}
        />
      ) : (
        <div
          style={{
            marginLeft: "8px",
            height: "40px",
            display: "flex",
          }}
          onClick={toggleReactionsSelector}
        >
          <div className='LikeButton d-flex flex-column justify-items-center justify-content-center'>
            <svg
              aria-hidden='true'
              focusable='false'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 512 512'
              style={{
                fontSize: "1em",
                width: "1em",
                display: "block",
                margin: "auto",
              }}
            >
              <path
                fill='currentColor'
                d='M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z'
                className=''
              ></path>
            </svg>
          </div>
        </div>
      )}

      {showSelector && isAuthenticated ? (
        <div
          style={{
            position: "absolute",
            bottom: "100%",
            marginBottom: "5px",
          }}
        >
          <FacebookSelector
            reactions={["like", "love", "haha", "sad", "angry"]}
            onSelect={(props) => handleSubmitReaction("Blog", id, props)}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Reactions;
