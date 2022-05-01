import { Tab } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Table, Container, Button } from "react-bootstrap";

const Home = (props) => {
  const [promptList, changePromptList] = useState([]);

  useEffect(() => {
    const getPrompts = async () => {
      changePromptList(await window.contract.getAllPrompts());
      console.log(await window.contract.getAllPrompts());
    };
    getPrompts();
  }, []);

  return (
    <Container id="inside4">
      <Table id="inside3"
       style={{ margin: "centre"}}
       striped bordered hover>
        <thead id="table">
          <tr>
            <th>#</th>
            <th>List of Polls</th>
            <th>Go to Poll</th>
          </tr>
        </thead>
        <tbody id="table">
          {promptList.map((el, index) => {
            return (
              <tr id="table" key={index}>
                <td >{index + 1}</td>
                <td>{el}</td>
                <td>
                  {" "}
                  <Button variant="primary" onClick={() => props.changeCandidates(el)}>
                    Go to Poll
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
