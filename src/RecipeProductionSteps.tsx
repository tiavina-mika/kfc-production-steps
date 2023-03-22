import { FC, useEffect, useState } from "react";

import ProductionSteps from "./components/ProductionSteps";
import { recipeSectionsFormInitialValues } from "./utils/recipeUtils";

type Props = {
  recipe: Record<string, any>;
};
const RecipeProductionSteps: FC<Props> = ({ recipe }) => {
  const [isProductionStepsEdition, setProductionStepsIsEdition] = useState<
    boolean
  >(false);
  const [initalValues, setInitialValues] = useState(null);

  console.log(initalValues);

  useEffect(() => {
    const formValues = recipeSectionsFormInitialValues(recipe, true);
    setInitialValues(formValues);
  }, [recipe]);

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
        sections={initalValues?.sections}
      />
    );
  }

  return (
    <ProductionSteps
      toggleEditForm={onEditProductionSteps}
      sections={initalValues?.sections}
    />
  );
};

export default RecipeProductionSteps;
