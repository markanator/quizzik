import animationImage from "../../images/beeple-potus-3012.gif";
import "./about-page.css";

function AboutPage() {
  return (
    <main>
      <h1>About Me</h1>

      <h2>Mark Ambrocio</h2>
      <p>
        I'm learning <em>TypeScript</em>!
      </p>

      <p>Some things I've been doing lately:</p>
      <ul className="emoji-list">
        <li>Riding bikes with my daughter</li>
        <li>Working on coverting past projects to TypeScript</li>
        <li>Applying for jobs!</li>
      </ul>
      <p>Some languages or libraries I have used:</p>
      <ul className="emoji-list">
        <li>HTML</li>
        <li>CSS</li>
        <li>JS</li>
        <li>TS</li>
        <li>React</li>
      </ul>

      <p>
        An app I used daily is{" "}
        <a
          href="https://twitter.com/_mark_ambro"
          target="_blank"
          rel="noreferrer"
        >
          twitter: @_mark_ambro
        </a>
        .
      </p>

      <img src={animationImage} alt="Some cool art" width="300" />
    </main>
  );
}

export default AboutPage;
