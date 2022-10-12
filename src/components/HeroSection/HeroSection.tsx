import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import "./hero.css";

import FormComponent from '../Form/Form';

import downArrow from './down-arrow.png';

const HeroSectionComponent: React.FC = () => {
  return (
    <div className='heroSection'>
      <Container>
        <Row className='heroRow'>
          <Col md={12} lg={6} className='leftTxtLayout'>
            <h1 className='heading_01'>Make money driving with Bolt</h1>
            <p className='para'>Become a Bolt driver, set your schedule and earn extra money by driving!</p>
            <Button variant="link">Learn More <img src={downArrow} alt="learn more icon" /></Button>
          </Col>
          <Col md={12}  lg={6} className='rightFormLayout'>
            <FormComponent />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default HeroSectionComponent;
