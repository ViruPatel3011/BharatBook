import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import YourFriendsItem from "./YourFriendsItem";
import FriendsHeader from "./FriendsHeader";
import { IYourFriend } from "../../Models/YourFriends";
import { FilterStatus, RequestType } from "../../Utils/const";
import { getFriendListForUser } from "../../Services/AllApiRequests/UserRequest";
import useLastItemObserver from "../../Utils/helper";
import { YourFriendsLoader } from "../Loaders/Loaders";

const YourFriends: React.FC = () => {
  const [value, setValue] = React.useState<string>("1");
  const [sentRequestData, setSentRequestData] = useState<IYourFriend[]>([]);
  const [receiveRequestData, setReceiveRequestData] = useState<IYourFriend[]>(
    []
  );
  const [sentRequestCount, setSentRequestCount] = useState<number>(0);
  const [receiveRequestCount, setReceiveRequestCount] = useState<number>(0);
  const [loadingSent, setLoadingSent] = useState<boolean>(true);
  const [sentReqPgNum, setSentReqPgNum] = useState<number>(1);
  const [hasSentReqMore, setHasSentReqMore] = useState<boolean>(false);
  const [loadingReceive, setLoadingReceive] = useState<boolean>(true);
  const [receiveReqPgNum, setReceiveReqPgNum] = useState<number>(1);
  const [hasReceiveReqMore, setHasReceiveReqMore] = useState<boolean>(false);

  const sentReqPagSize = 5;
  const receiveReqPagSize = 5;

  const lastSentReqData = useLastItemObserver(
    loadingSent,
    hasSentReqMore,
    setSentReqPgNum
  );

  const lastReceiveReqData = useLastItemObserver(
    loadingReceive,
    hasReceiveReqMore,
    setReceiveReqPgNum
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchSentReqData = async () => {
      try {
        const sentData = await getFriendListForUser(
          sentReqPgNum,
          sentReqPagSize,
          FilterStatus.ACCEPTED,
          RequestType.SENT
        );

        if (sentData) {
          setSentRequestData((prevSentReqData) => [
            ...prevSentReqData,
            ...sentData.records,
          ]);
        }
        if (sentRequestData.length < sentData.totalCount) {
          setHasSentReqMore(sentData.records.length > 0);
          setLoadingSent(false);
          setSentRequestCount(sentData.totalCount);
        } else {
          setHasSentReqMore(false);
        }
      } catch (e) {
        throw e;
      }
    };
    fetchSentReqData();
  }, [sentReqPgNum]);

  useEffect(() => {
    const fetchReceiveReqData = async () => {
      try {
        const receiveData = await getFriendListForUser(
          receiveReqPgNum,
          receiveReqPagSize,
          FilterStatus.ACCEPTED,
          RequestType.RECEIVED
        );
        if (receiveData) {
          setReceiveRequestData((preRecData) => [
            ...preRecData,
            ...receiveData.records,
          ]);
        }
        if (receiveRequestData.length < receiveData.totalCount) {
          setHasReceiveReqMore(receiveData.records.length > 0);
          setLoadingReceive(false);
          setReceiveRequestCount(receiveData.totalCount);
        } else {
          setHasSentReqMore(false);
        }
      } catch (e) {
        throw e;
      }
    };

    fetchReceiveReqData();
  }, [receiveReqPgNum]);

  return (
    <React.Fragment>
      <FriendsHeader headerText="Your Friends" />
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: "white",
          margin: "1rem",
          padding: "1rem 2rem",
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
                <Tab label={`SENT(${sentRequestCount})`} value="1" />
                <Tab label={`RECEIVED(${receiveRequestCount})`} value="2" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ padding: 0 }}>
              {sentRequestData.length > 0 ? (
                sentRequestData.map((data, index) => (
                  <YourFriendsItem
                    reference={lastSentReqData}
                    key={`sent-${index}`}
                    friendRequestData={data}
                    requestType={data.requestType}
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
                  <YourFriendsLoader />
                </Grid>
              )}
            </TabPanel>

            <TabPanel value="2" sx={{ padding: 0 }}>
              {receiveRequestData.length > 0 ? (
                receiveRequestData.map((data, index) => (
                  <YourFriendsItem
                    reference={lastReceiveReqData}
                    key={`received-${index}`}
                    friendRequestData={data}
                    requestType={data.requestType}
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
                  <YourFriendsLoader />
                </Grid>
              )}
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default YourFriends;
