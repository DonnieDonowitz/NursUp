import { Container } from 'react-bootstrap';
import '../App.css';

function FooterNursup(props) {
  return (
    <div className=" d-flex align-items-end containerFooter">
      <Container
        fluid
        className=" mb-3vertical-center"
        style={{ backgroundColor: '#DDDDDD', position: "fixed", bottom: "0", left: "0", right: "0" }}
      >
        <p
          className="align-items-center mt-3"
          style={{ textAlign: 'center', fontSize: '14px' }}
        >
          Created by Francesco Di Franco, Carmollingo Angelo Marino, Paolo Rio,  Alberto Cipollina
        </p>
      </Container>
    </div>
  );
}
export default FooterNursup;
