import React, { useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import FriendsHeader from "./FriendsHeader";
import SuggestedFrdItem from "./SuggestedFrdItem";
import Typography from "@mui/material/Typography";
import { SuggestionForUser } from "../../Services/AllApiRequests/User";
import { ISuggested } from "../../Models/Suggestions";
import useLastItemObserver from "../../Utils/helper";
import { SuggestLoader } from "../Loaders/Loaders";

const SuggestedFriends: React.FC = () => {
  const [suggestions, setSuggestions] = useState<ISuggested[]>([]);
  const [loadingSugg, setLoadingSugg] = useState<boolean>(true);
  const [suggPageNumber, setSuggPageNumber] = useState<number>(1);
  const [hasSuggMore, setHasSuggMore] = useState<boolean>(false);

  const lastSuggest = useLastItemObserver(
    loadingSugg,
    hasSuggMore,
    setSuggPageNumber
  );
  useEffect(() => {
    const SuggestedFriends = async () => {
      try {
        const suggestion = await SuggestionForUser(suggPageNumber, 5);
        if (suggestion) {
          setSuggestions((prevSugg) => [...prevSugg, ...suggestion.records]);
        }
        setHasSuggMore(suggestion.records.length > 0);
        setLoadingSugg(false);
      } catch (err) {
        throw err;
      }
    };
    SuggestedFriends();
  }, [suggPageNumber]);

  const RemoveSuggestion = (id: number) => {
    const updatedSuggestion = suggestions.filter(
      (suggest) => suggest.userId != id
    );
    setSuggestions(updatedSuggestion);
  };

  return (
    <React.Fragment>
      <FriendsHeader headerText="Suggested Friends " />
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: "white",
          margin: "1rem",
          padding: ["0.7rem 1rem", "1rem 2rem"],
          borderRadius: "1rem",
          display: "flex",
          flexWrap: "wrap",
          width: "auto",
        }}
      >
        {suggestions.length > 0 ? (
          suggestions.map((suggest, index) => {
            if (suggestions.length === index + 1) {
              return (
                <SuggestedFrdItem
                  reference={lastSuggest}
                  key={index}
                  suggestion={suggest}
                  onRemoveSuggestion={RemoveSuggestion}
                />
              );
            } else {
              return (
                <SuggestedFrdItem
                  key={index}
                  suggestion={suggest}
                  onRemoveSuggestion={RemoveSuggestion}
                />
              );
            }
          })
        ) : (
          <Typography sx={{ color: "gray", fontSize: "1.3rem" }}>
            No data available
          </Typography>
        )}
        {loadingSugg && (
          <Grid
            sx={{
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SuggestLoader />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default SuggestedFriends;
