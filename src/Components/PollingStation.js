import { formatError } from "near-api-js/lib/utils/rpc_errors";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import LoadingCircles from "../assets/loading1.gif";


const PollingStation = (props) => {

  const [candidate1URL, changeCandidate1Url] = useState(LoadingCircles);
  const [candidateName1, setCandidateName1] = useState(LoadingCircles);
  const [candidate2URL, changeCandidate2Url] = useState(LoadingCircles);
  const [candidateName2, setCandidateName2] = useState(LoadingCircles);
  const [showresults, changeResultsDisplay] = useState(false);
  const [buttonStatus, changeButtonStatus] = useState(false);
  const [candidate1Votes, changeVote1] = useState("--");
  const [candidate2Votes, changeVote2] = useState("--");
  const [prompt, changePrompt] = useState("--");

  useEffect(() => {
    const getInfo = async () => {
      // Vote count stuff
      let voteCount = await window.contract.getVotes({
        prompt: localStorage.getItem("prompt"),
      });
      changeVote1(voteCount[0]);
      changeVote2(voteCount[1]);

      //name
      setCandidateName1(
        localStorage.getItem("Candidate1")
      );

      setCandidateName2(
        localStorage.getItem("Candidate2")
      )

      // Image stuff

      changeCandidate1Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate1"),
        })
      );
      changeCandidate2Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate2"),
        })
      );

      changePrompt(localStorage.getItem("prompt"));

      // Vote checking stuff

      let didUserVote = await window.contract.didParticipate({
        prompt: localStorage.getItem("prompt"),
        user: window.accountId,
      });

      changeResultsDisplay(didUserVote);
      changeButtonStatus(didUserVote);
    };

    getInfo();
  }, []);

  const addVote = async (index) => {
    changeButtonStatus(true);
    await window.contract.addVote({
      prompt: localStorage.getItem("prompt"),
      index: index,
    });

    await window.contract.recordUser({
      prompt: localStorage.getItem("prompt"),
      user: window.accountId,
    });

    let voteCount = await window.contract.getVotes({
      prompt: localStorage.getItem("prompt"),
    });
    changeVote1(voteCount[0]);
    changeVote2(voteCount[1]);
    changeResultsDisplay(true);
  };



  return (
    <Container>
      <Row>
        <Col className='justify-content-center d-flex'>
          <Container>
            <Row style={{ marginTop: "5vh", backgroundColor: "#0000" }}>
              <div
              id="inside"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "3vw",
                }}>
                <img
                  style={{
                    height: "35vh",
                    width: "20vw",
                  }}
                  src={candidate1URL}></img>
              </div>
              <Row>
                <div
                style={{
                  fontSize: "1vw",
                }}
                ><center>
                  {candidateName1}
                </center></div>
              </Row>
            </Row>
            {showresults ? (
              <Row
                className='justify-content-center d-flex'
                style={{ marginTop: "5vh" }}
              >
                <div
                id="inside1"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "6vw",
                    padding: "7px",
                    backgroundColor: "#0000",
                  }}
                >
                  {candidate1Votes}
                </div>
              </Row>
            ) : null}
            <Row
              style={{ marginTop: "5vh" }}
              className='justify-content-center d-flex'>
              <Button disabled={buttonStatus} onClick={() => addVote(0)}>
                Vote
              </Button>
            </Row>
          </Container>
        </Col>
        <Col className='justify-content-center d-flex align-items-center'>
          <div
          id="inside2"
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#0000",
              height: "20vh",
              alignItems: "center",
              padding: "2vw",
              textAlign: "center",
            }}
          >
            {prompt}
          </div>
        </Col>
        <Col className='justify-content-center d-flex'>
          <Container>
            <Row style={{ marginTop: "5vh", backgroundColor: "#0000" }}>
              <div
              id="inside"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "3vw",
                }}>
                <img
                  style={{
                    height: "35vh",
                    width: "20vw",
                  }}
                  src={candidate2URL}>
                </img>
                </div>
              <Row>
                <div 
                style={{
                  fontSize: "1vw",
                }}
                ><center>
                  {candidateName2}
                  </center>
                </div>

              </Row>
            </Row>

            {showresults ? (
              <Row
                className='justify-content-center d-flex'
                style={{ marginTop: "5vh" }}
              >
                <div
                id="inside1"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "6vw",
                    padding: "7px",
                    backgroundColor: "#0000",
                  }}
                >
                  {candidate2Votes}
                </div>
              </Row>
            ) : null}
            <Row style={{ marginTop: "5vh" }}
              className='justify-content-center d-flex'>
              <Button disabled={buttonStatus} onClick={() => addVote(1)}>
                Vote
              </Button>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
  
};



export default PollingStation;