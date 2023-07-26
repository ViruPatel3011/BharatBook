import React from "react";
import { PropagateLoader, FadeLoader, BeatLoader } from "react-spinners";

const PostLoaders: React.FC = () => {
  return (
    <div
      className="spinner-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PropagateLoader color="#2bb0f1" size={20} />
    </div>
  );
};
export default PostLoaders;

export const SuggestLoader: React.FC = () => {
  return (
    <div
      className="spinner-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FadeLoader color="#2bb0f1" height={25} />
    </div>
  );
};

export const YourFriendsLoader: React.FC = () => {
  return (
    <div
      className="spinner-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BeatLoader color="#2bb0f1" size={20} />
    </div>
  );
};
