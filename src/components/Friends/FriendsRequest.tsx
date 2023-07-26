import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SingleFriendRequest from "./SingleFriendRequest";
import FriendsHeader from "./FriendsHeader";
import { getFriendListForUser } from "../../Services/AllApiRequests/UserRequest";
import { RequestType } from "../../Utils/const";
import { FilterStatus } from "../../Utils/const";
import { IUserRequest } from "../../Models/FriendsRequest";
import useLastItemObserver from "../../Utils/helper";
import { SuggestLoader } from "../Loaders/Loaders";

const FriendsRequest: React.FC = () => {
  const [sentReqData, setSentReqData] = useState<IUserRequest[]>([]);
  const [receiveReqData, setReceiveReqData] = useState<IUserRequest[]>([]);
  const [sentCount, setSentCount] = useState<number>(0);
  const [receiveCount, setReceiveCount] = useState<number>(0);
  const [value, setValue] = React.useState<string>("1");
  const [loadingSent, setLoadingSent] = useState<boolean>(true);
  const [sentReqPgNum, setSentReqPgNum] = useState<number>(1);
  const [hasSentReqMore, setHasSentReqMore] = useState<boolean>(false);
  const [loadingReceive, setLoadingReceive] = useState<boolean>(true);
  const [receiveReqPgNum, setReceiveReqPgNum] = useState<number>(1);
  const [hasReceiveReqMore, setHasReceiveReqMore] = useState<boolean>(false);

  const sentReqPagSize = 5;
  const receiveReqPagSize = 5;

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const lastSentReq = useLastItemObserver(
    loadingSent,
    hasSentReqMore,
    setSentReqPgNum
  );

  const lastReceiveReq = useLastItemObserver(
    loadingReceive,
    hasReceiveReqMore,
    setReceiveReqPgNum
  );

  useEffect(() => {
    const fetchSentRequests = async () => {
      try {
        const sentRequest = await getFriendListForUser(
          sentReqPgNum,
          sentReqPagSize,
          FilterStatus.PENDING,
          RequestType.SENT
        );
        if (sentRequest) {
          setSentReqData((prevSentReq) => [
            ...prevSentReq,
            ...sentRequest.records,
          ]);
        }
        if (sentReqData.length < sentRequest.totalCount) {
          setHasSentReqMore(sentRequest.records.length > 0);
          setLoadingSent(false);
          setSentCount(sentRequest.totalCount);
        } else {
          setHasSentReqMore(false);
        }
      } catch (e) {
        throw e;
      }
    };
    fetchSentRequests();
  }, [sentReqPgNum]);

  useEffect(() => {
    const fetchReceiveRequests = async () => {
      try {
        const requestRecive = await getFriendListForUser(
          receiveReqPgNum,
          receiveReqPagSize,
          FilterStatus.PENDING,
          RequestType.RECEIVED
        );
        if (requestRecive) {
          setReceiveReqData((prevReceiveReq) => [
            ...prevReceiveReq,
            ...requestRecive.records,
          ]);
        }
        setHasReceiveReqMore(requestRecive.records.length > 0);
        setLoadingReceive(false);
        setReceiveCount(requestRecive.totalCount);
      } catch (e) {
        throw e;
      }
    };

    fetchReceiveRequests();
  }, [receiveReqPgNum]);

  return (
    <React.Fragment>
      <FriendsHeader headerText="Friends Request" />
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: "white",
          margin: "1rem",
          padding: ["0.7rem 1rem", "1rem 2rem"],
          borderRadius: "1rem",
        }}
      >
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label={`SENT(${sentCount})`} value="1" />
                <Tab label={`RECEIVED(${receiveCount})`} value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Grid
                container
                justifyContent="start"
                spacing={1}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {sentReqData.length > 0 ? (
                  sentReqData.map((request) => (
                    <SingleFriendRequest
                      reference={lastSentReq}
                      key={request.requestId}
                      request={request}
                      requestType={RequestType.SENT}
                    />
                  ))
                ) : (
                  <Typography sx={{ color: "gray", fontSize: "1.3rem" }}>
                    No data available
                  </Typography>
                )}
                {loadingSent && (
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
            </TabPanel>
            <TabPanel value="2">
              <Grid container justifyContent="start" spacing={2}>
                {receiveReqData.length > 0 ? (
                  receiveReqData.map((request) => (
                    <SingleFriendRequest
                      reference={lastReceiveReq}
                      key={request.requestId}
                      request={request}
                      requestType={RequestType.RECEIVED}
                    />
                  ))
                ) : (
                  <Typography sx={{ color: "gray", fontSize: "1.3rem" }}>
                    No data available
                  </Typography>
                )}
                {loadingReceive && (
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
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default FriendsRequest;
