import { useState } from "react";

import ProductionSteps from "./components/ProductionSteps";

const App = () => {
  const [isProductionStepsEdition, setProductionStepsIsEdition] = useState<
    boolean
  >(false);

  const toggleProductionStepsIsEdition = () =>
    setProductionStepsIsEdition(!isProductionStepsEdition);

  const onEditProductionSteps = () => {
    toggleProductionStepsIsEdition();
  };

  const onSaveProductionSteps = () => {
    console.log("onSaveProductionSteps");
    toggleProductionStepsIsEdition();
  };

  const onCancelProductionSteps = () => {
    console.log("onCancelProductionSteps");
    toggleProductionStepsIsEdition();
  };

  if (isProductionStepsEdition) {
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
