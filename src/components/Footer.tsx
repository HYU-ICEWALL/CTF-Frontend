import "../styles/Footer.css";

function Footer() {
  return (
    <>
      <footer style={
          {
            fontSize: '10px',
            color: 'gray',
          }
        }>
        <p>ICEWALL © 2024</p>
        <p>Frontend design and development by <a href="https://github.com/ingyu1008">@ingyu1008</a></p>
        <p>Backend development by <a href="https://github.com/raipier8818">@raipier8818</a></p>
      </footer>
    </>
  );
}

export default Footer;
