import "./welcome-message.css";

// Components can take inputs in the form of props (or properties).
interface IProps {
  name: string;
  greeting: string;
}

function WelcomeMessage(props: IProps) {
  // console.log(props);

  // const name = props.name;
  // const greeting = props.greeting;
  const { name, greeting } = props;

  // Inside of JSX, {} allows us to insert a JS expression.
  return (
    <p className="welcome-message">
      {greeting}, {name}!
    </p>
  );
}

export default WelcomeMessage;
