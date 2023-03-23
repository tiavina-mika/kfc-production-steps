import { FC, useState } from "react";

import ProductionSteps from "./components/ProductionSteps";

type Props = {
  recipe: Record<string, any>;
};
const RecipeProductionSteps: FC<Props> = ({ recipe }) => {
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

  // just simulate the existing recipe code
  if (isProductionStepsEdition) {
    return (
      <ProductionSteps
        onSave={onSaveProductionSteps}
        onCancel={onCancelProductionSteps}
        isEdition
        recipe={recipe}
      />
    );
  }

  return (
    <ProductionSteps toggleEditForm={onEditProductionSteps} recipe={recipe} />
  );
};

export default RecipeProductionSteps;
