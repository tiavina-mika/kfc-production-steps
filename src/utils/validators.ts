import * as Yup from "yup";

export const RecipeSchema = Yup.object().shape({
  sections: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Obligatoire"),
      steps: Yup.array().of(
        Yup.object().shape({
          description: Yup.string().required("Obligatoire"),
          ingredients: Yup.array().of(
            Yup.object().shape({
              supplierItem: Yup.mixed().notOneOf(
                [null, undefined],
                "Obligatoire"
              ),
              grossWeight: Yup.number().required("Obligatoire"),
              cookingMode: Yup.mixed().notOneOf(
                [null, undefined],
                "Obligatoire"
              )
            })
          )
        })
      )
    })
  )
});
