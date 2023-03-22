import { useState } from "react";

import ProductionSteps from "./components/ProductionSteps";

const App = () => {
  const [isEdition, setIsEdition] = useState<boolean>(false);

  const toggleIsEdition = () => setIsEdition(!isEdition);

  const onEditProductionSteps = () => {
    toggleIsEdition();
  };

  const onSaveProductionSteps = () => {
    console.log("onSaveProductionSteps");
    toggleIsEdition();
  };

  const onCancelProductionSteps = () => {
    console.log("onCancelProductionSteps");
    toggleIsEdition();
  };

  if (isEdition) {
    return (
      <ProductionSteps
        onSave={onSaveProductionSteps}
        onCancel={onCancelProductionSteps}
        isEdition
      />
    );
  }

  return <ProductionSteps toggleEditForm={onEditProductionSteps} />;
};

export default App;
