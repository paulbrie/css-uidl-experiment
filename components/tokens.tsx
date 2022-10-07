import store from '../store';
import SectionTitle from './sectionTitle';
const Tokens = () => {
  const tokens = store.tokens.hook();
  return (
    <div style={{ height: 200 }}>
      <SectionTitle>Tokens</SectionTitle>
      <ul>
        {Object.keys(tokens).map((key, index) => {
          return (
            <li key={index}>
              {key}
              <br />
              <pre>
                {Object.keys(tokens[key]).map((cssAttr) => {
                  return cssAttr + ': ' + tokens[key][cssAttr];
                })}
              </pre>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tokens;
