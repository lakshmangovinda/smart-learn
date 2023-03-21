import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import courses from "../../Utils/cources.json";
import Collapse from "react-bootstrap/Collapse";
import { db } from "../../Utils/firebase-config";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import ReactPlayer from "react-player/lazy";


const Courses = () => {
  const [open, setOpen] = useState(false);
  const [opencollpase, setCollapse] = useState(false);
  const [CoursesOfUser, setCoursesOfUser] = useState([]);
  const [watchedCoursesList, setWatchedCoursesList] = useState([]);
  const [userToken, setUserToken] = useState(sessionStorage.getItem("token"));
  async function fetchAllData() {
    const querySnapshot = await getDocs(collection(db, "Courses-List"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  }
  async function fetchAllVideos() {
    const querySnapshot = await getDocs(collection(db, "watched-videos"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  }
  useEffect(() => {
    fetchAllData()
      .then((data) => {
        let enrolledCourses = [];
        data.forEach((eachItem) => {
          if (eachItem.uid == userToken) {
            let cid = eachItem["item"]["courseId"];
            enrolledCourses.push(cid);
          }
        });
        setCoursesOfUser(enrolledCourses);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, []);
  const handleProgress = (progress, courseLevelId, courseName) => {
    fetchAllVideos()
      .then((data) => {
        let watchedCourses = [];

        if (data.length != 0) {
          data.forEach((eachItem) => {
            console.log(eachItem);
            if (eachItem.uid == userToken) {
              let cid = eachItem.courseLevelId;
              if (cid != courseLevelId) {
                if (progress.played == 1) {
                  console.log("yes");
                  addDoc(collection(db, "watched-videos"), {
                    uid: userToken.toString(),
                    courseLevelId: courseLevelId,
                    courseName: courseName,
                  });
                }
              }
              watchedCourses.push(cid);
            }

            setWatchedCoursesList(watchedCourses);
            console.log(watchedCourses);
          });
        } else {
          addDoc(collection(db, "watched-videos"), {
            uid: userToken.toString(),
            courseLevelId: courseLevelId,
            courseName: courseName,
          });
        }
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  };
  const handleSubmit = (data) => {
    addDoc(collection(db, "Courses-List"), {
      uid: userToken.toString(),
      item: data,
    });
    fetchAllData()
      .then((data) => {
        let enrolledCourses = [];

        data.forEach((eachItem) => {
          if (eachItem.uid.toString() == userToken.toString()) {
            let cid = eachItem["item"]["courseId"];
            enrolledCourses.push(cid);
          }
        });
        setCoursesOfUser(enrolledCourses);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  };

  return (
    <>
      <Container fluid="true">
        <Row>
          {courses.map((each, index) => {
            return (
              <Col
                md={{ span: 10, offset: 1 }}
                style={{ marginTop: "20px" }}
                key={index}
              >
                <Card>
                  <Card.Header as="h5">{each.courseName}</Card.Header>
                  <Card.Body>
                    <Card.Title>{each.author}</Card.Title>
                    <Card.Img
                      width="30%"
                      height="200"
                      variant="top"
                      src={each.courseImg}
                      style={{ width: "30%" }}
                    />
                    <Card.Text>
                      Enroll the <strong>{each.courseName}</strong> . today....
                    </Card.Text>
                    <div className="d-flex justify-content-end justify-content-space-between">
                      {CoursesOfUser.includes(each.courseId) ? (
                        <Button
                          variant="primary"
                          size="lg"
                          style={{ marginLeft: "10px" }}
                        >
                          Enrolled
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          size="lg"
                          onClick={() => handleSubmit(each)}
                        >
                          Enroll
                        </Button>
                      )}

                      <Button
                        variant="primary"
                        size="lg"
                        style={{ marginLeft: "10px" }}
                        onClick={() => {
                          each.viewDeatils = !each.viewDeatils;
                          setCollapse(!each.viewDeatils);
                        }}
                        aria-controls="example-collapse-text"
                        aria-expanded={each.viewDeatils}
                      >
                        View Details
                      </Button>
                      {each.viewDeatils}
                    </div>

                    <Collapse in={each.viewDeatils}>
                      <div
                        id="example-collapse-text "
                        className="d-flex flex-column justify-content-around gap-5"
                      >
                        <div>
                          {each.level.map((eachitem, index) => (
                            <div className="d-flex flex-column justify-content-around gap-5 ">
                              <h3>
                                <strong>{eachitem.levelName}</strong>
                              </h3>
                              <ReactPlayer
                                className="react-player"
                                controls={true}
                                url={eachitem.levelVideo}
                                width="30%"
                                height="30%"
                                onProgress={(progress) =>
                                  handleProgress(
                                    progress,
                                    eachitem.levelId,
                                    each.courseId
                                  )
                                }
                              ></ReactPlayer>
                              {watchedCoursesList.includes(eachitem.levelId) ? (
                                <button className="btn btn-success" disabled>
                                  Watched
                                </button>
                              ) : (
                                <button className="btn btn-primary" disabled>
                                  Pending
                                </button>
                              )}
                              <h6>Video Description:</h6>
                              <p>{eachitem.levelName} Provides.....</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Collapse>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};
export default Courses;
