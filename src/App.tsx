import { useState } from "react";
import ProductionSteps from "./components/ProductionSteps";
import ProductionStepsForm from "./components/ProductionStepsForm";

const App = () => {
  const [openProductionStepEditForm, setOpenProductionStepEditForm] = useState<
    boolean
  >(false);

  const toggleProductionStepEditForm = () =>
    setOpenProductionStepEditForm(!openProductionStepEditForm);

  const onEditProductionSteps = () => {
    toggleProductionStepEditForm();
  };

  const onSaveProductionSteps = () => {
    console.log("onSaveProductionSteps");
    toggleProductionStepEditForm();
  };

  const onCancelProductionSteps = () => {
    console.log("onCancelProductionSteps");
    toggleProductionStepEditForm();
  };

  if (openProductionStepEditForm) {
    return (
      <ProductionStepsForm
        onSave={onSaveProductionSteps}
        onCancel={onCancelProductionSteps}
      />
    );
  }

  return <ProductionSteps toggleEditForm={onEditProductionSteps} />;
};

export default App;
