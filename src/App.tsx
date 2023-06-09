import Recipe from "./Recipe";
import { recipe } from "./utils/data/recipe";
import { sections } from "./utils/data/section";

const App = () => {
  return <Recipe recipe={recipe} genericSections={sections} />;
};

export default App;
