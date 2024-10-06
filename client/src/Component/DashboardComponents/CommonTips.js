import React, { useState } from "react";
import "../../Styles/common.css";
import { Card, Button, Row, Col, ListGroup, Container } from "react-bootstrap";

// Import the images
import BalancedNutrition from "../../Assets/Balanced-Nutrition.png";
import RegularExercise from "../../Assets/Regular-Exercise.png";
import AdequateSleep from "../../Assets/Adequate-sleep.png";
import GreatMeals from "../../Assets/Great-meals.png";
import StayHydrated from "../../Assets/Stay-hydrated.png";
import Fitness from "../../Assets/Fitness.png";

const CommonTips = () => {
  // Array of objects containing image, title, and description
  const data = [
    {
      id: 1,
      image: BalancedNutrition,
      title: "Card Title 1",
      description: "This is a description for card 1.",
    },
    {
      id: 2,
      image: RegularExercise,
      title: "Card Title 2",
      description: "This is a description for card 2.",
    },
    {
      id: 3,
      image: AdequateSleep,
      title: "Card Title 3",
      description: "This is a description for card 3.",
    },
    {
      id: 4,
      image: GreatMeals,
      title: "Card Title 4",
      description: "This is a description for card 4.",
    },
    {
      id: 5,
      image: StayHydrated,
      title: "Card Title 5",
      description: "This is a description for card 5.",
    },
    {
      id: 6,
      image: Fitness,
      title: "Card Title 6",
      description: "This is a description for card 6.",
    },
  ];

  // State to toggle between showing 3 cards and all cards
  const [showAll, setShowAll] = useState(false);

  // Function to toggle between showing 3 cards and all cards
  const toggleShowAll = () => setShowAll(!showAll);

  // Limit cards to 3 initially, show all when "View All" is clicked
  const displayedCards = showAll ? data : data.slice(0, 3);

  return (
    <Container className="my-4 commonTips">
      <Row className="mb-2">
        <Col xs={12}>
          <div className="d-flex justify-content-between align-items-center mb-5">
            <p
              className={`mt-3 ${showAll ? "text-center" : "text-start"}`}
              style={{ fontWeight: "bold", marginBottom: 0 }}
            >
              Common Health Tips
            </p>

            <div className="d-flex mt-3">
              {showAll && (
                <Button
                  variant="link"
                  onClick={toggleShowAll}
                  className="text-white me-2 border-0"
                  style={{ textDecoration: "none", color: "#0d0059" }}
                >
                  Back
                </Button>
              )}
              <Button
                variant="link"
                onClick={toggleShowAll}
                className="text-white border-0"
                style={{ textDecoration: "none", fontWeight: "bold", color: "#0d0059" }}
              >
                {showAll ? "" : "View All"}
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {showAll ? (
        <ListGroup className="commonTips-container mx-auto" style={{ maxWidth: "600px" }}>
          {displayedCards.map((item) => (
            <ListGroup.Item key={item.id} className="mb-4 p-2">
              <Row>
                <Col xs={4} sm={3} className="d-flex justify-content-center align-items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "100px", height: "auto" }}
                  />
                </Col>
                <Col xs={8} sm={9}>
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Row>
          {displayedCards.map((item) => (
            <Col xs={12} md={6} lg={4} key={item.id}>
              <Card className="mb-4 p-2">
                <Row className="g-0">
                  <Col xs={4} sm={4} className="d-flex justify-content-center align-items-center">
                    <Card.Img
                      src={item.image}
                      alt={item.title}
                      style={{ width: "100px", height: "auto" }}
                    />
                  </Col>
                  <Col xs={8} sm={8}>
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CommonTips;
