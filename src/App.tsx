import {
  Form,
  Field,
  useFormik,
  FieldArray,
  ErrorMessage,
  FormikProvider,
} from "formik";

const App = () => {
  const formik = useFormik({
    initialValues: {
      contractParties: [
        {
          name: "",
          email: "",
        },
      ],
    },
    onSubmit: (values) => {
      const parsedValue = JSON.stringify(values, null, 2);

      console.log(parsedValue);

      alert(parsedValue);
    },
  });

  return (
    <>
      <pre>
        <p>Forms Values: {JSON.stringify(formik.values)}</p>
        <p>Forms: {formik.values.contractParties.length}</p>
      </pre>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <FieldArray
            name="contractParties"
            render={(formActions) => (
              <div>
                {formik.values.contractParties.length > 0 &&
                  formik.values.contractParties.map((friend, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <label htmlFor={`contractParties.${index}.name`}>
                          Nome:{" "}
                        </label>
                        <Field
                          name={`contractParties.${index}.name`}
                          placeholder="Digite seu nome"
                          type="text"
                        />
                        <ErrorMessage
                          name={`contractParties.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </div>

                      <div className="col">
                        <label htmlFor={`contractParties.${index}.email`}>
                          Email:{" "}
                        </label>
                        <Field
                          name={`contractParties.${index}.email`}
                          placeholder="Digite seu email"
                          type="email"
                        />
                        <ErrorMessage
                          name={`contractParties.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </div>

                      <hr />
                      <div className="col">
                        {formik.values.contractParties.length > 1 && (
                          <button
                            type="button"
                            className="secondary"
                            onClick={() => formActions.remove(index)}
                          >
                            Remover
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                <button
                  disabled={formik.values.contractParties.length === 5}
                  type="button"
                  className="secondary"
                  onClick={() => {
                    formActions.push({
                      name: "",
                      email: "",
                    });
                  }}
                >
                  Adicionar nova parte
                </button>
              </div>
            )}
          />
          <button type="submit">Cadastrar</button>
        </Form>
      </FormikProvider>
    </>
  );
};

export default App;
