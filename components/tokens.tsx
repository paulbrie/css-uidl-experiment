import store from '../store';

const Tokens = () => {
  const tokens = store.tokens.hook();
  return (
    <div style={{ height: 200 }}>
      <h2>Tokens</h2>
      <ul>
        {Object.keys(tokens).map((key, index) => {
          return (
            <li key={index}>
              {key}
              <br />
              <pre>{tokens[key]}</pre>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tokens;
