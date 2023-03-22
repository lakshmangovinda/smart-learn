import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import courses from "../../Utils/cources.json";
import { db } from "../../Utils/firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import ReactPlayer from "react-player/lazy";

const Courses = () => {
  const [listOfCourses, setListOfCourses] = useState(courses);
  const [CoursesOfUser, setCoursesOfUser] = useState([]);
  const [watchedCoursesList, setWatchedCoursesList] = useState([]);
  const userToken = sessionStorage.getItem("token");
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
          if (eachItem.uid === userToken) {
            let cid = eachItem["item"]["courseId"];
            enrolledCourses.push(cid);
          }
        });
        setCoursesOfUser(enrolledCourses);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const expandingCourse = (courseId) => {
    let updatedCourses = [...listOfCourses];
    const objIndex = updatedCourses.findIndex(
      (obj) => obj.courseId === courseId
    );
    updatedCourses[objIndex].viewDetails =
      !updatedCourses[objIndex].viewDetails;
    setListOfCourses(updatedCourses);
  };

  const handleProgress = (progress, courseLevelId, courseName) => {
    fetchAllVideos()
      .then((data) => {
        let watchedCourses = [];
        if (data.length !== 0) {
          data.forEach((eachItem) => {
            console.log(eachItem);
            if (eachItem.uid === userToken) {
              let cid = eachItem.courseLevelId;
              if (cid !== courseLevelId) {
                if (progress.played === 1) {
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
          if (eachItem.uid.toString() === userToken.toString()) {
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
          {listOfCourses.map((each, index) => {
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
                      src={process.env.PUBLIC_URL+each.courseImg}
                      style={{ width: "30%" }}
                    />
                    <Card.Text>
                      <p className="mt-3">Enroll the <strong>{each.courseName}</strong> . today....</p>
                      <p>We like to say, if our best clients and our organisation were people, they’d be friends. We want to understand your business and sit beside you at the table, not across from you. We’re built to help you understand and leverage technology all the way from the Reception Desk to the Board Room. We’re big on the cloud and the opportunity it presents.</p>
				              <p>Whether your requirements are totally on-premises, totally in the cloud, or somewhere in between, Evologic is flexible in its application of the right technology. IT has to work for you.</p>
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

                      {each.viewDetails ? (
                        <Button
                          variant="primary"
                          size="lg"
                          style={{ marginLeft: "10px" }}
                          onClick={() => expandingCourse(each.courseId)}
                          aria-controls="example-collapse-text"
                        >
                          Hide details
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          size="lg"
                          style={{ marginLeft: "10px" }}
                          onClick={() => expandingCourse(each.courseId)}
                          disabled={!CoursesOfUser.includes(each.courseId)}
                          aria-controls="example-collapse-text"
                        >
                          View details
                        </Button>
                      )}
                    </div>

                    {each.viewDetails ? (
                      <div>
                        {each.level.map((eachitem, index) => (
                          <div className="d-flex flex-column justify-content-around gap-5 ">
                            <h3>
                              <strong>{eachitem.levelName}</strong>
                            </h3>
                            <ReactPlayer
                              className="react-player"
                              controls={true}
                              url={process.env.PUBLIC_URL+eachitem.levelVideo}
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
                    ) : null}
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
