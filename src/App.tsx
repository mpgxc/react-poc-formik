import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect, useState } from "react";
import { Divider, Row, Col } from "antd";
import {
  Form,
  Field,
  useFormik,
  FieldArray,
  ErrorMessage,
  FormikProvider,
} from "formik";

import "antd/dist/antd.css";
import SelectContractParties from "./CustomSelect";
import { ContractPartsContext, ContractPartsContextType } from "./context";

export type ContractPartType = {
  id: string;
  name: string;
  part: string;
};

const formInitialValues = {
  id: uuidv4(),
  name: "",
  part: "Parte A",
};

const App = () => {
  const { contractParts, saveContractPart } =
    useContext<ContractPartsContextType>(ContractPartsContext);

  const formik = useFormik({
    initialValues: {
      contractParties: contractParts.length
        ? contractParts
        : [formInitialValues],
    },
    onSubmit: (values) => {
      saveContractPart(values.contractParties);
      formik.resetForm();
      setQtdPart(1);
    },
  });

  const [qtdPart, setQtdPart] = useState(
    formik.values.contractParties?.length || 1
  );

  useEffect(() => {
    formik.values.contractParties = formik.values.contractParties.map(
      (item, index) => ({
        ...item,
        part: `Parte ${String.fromCharCode(65 + index)}`,
      })
    );

    return () => {};
  }, [qtdPart]);

  return (
    <div style={{ margin: 24 }}>
      <Row>
        <Col span={6}>
          <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
              <FieldArray
                name="contractParties"
                render={(formActions) => (
                  <div>
                    {formik.values.contractParties.length > 0 &&
                      formik.values.contractParties.map((friend, index) => {
                        return (
                          <>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <h1>{friend.part}</h1>
                              <div className="col">
                                {formik.values.contractParties.length > 1 && (
                                  <button
                                    type="button"
                                    className="secondary"
                                    onClick={() => {
                                      setQtdPart(qtdPart - 1);
                                      formActions.remove(index);
                                    }}
                                  >
                                    X
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className="row" key={index}>
                              <div className="col">
                                <label
                                  htmlFor={`contractParties.${index}.name`}
                                >
                                  Nome:{" "}
                                </label>
                                <Field
                                  name={`contractParties.${index}.name`}
                                  placeholder="Digite seu nome"
                                />
                                <ErrorMessage
                                  name={`contractParties.${index}.name`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>
                              <hr />
                            </div>
                          </>
                        );
                      })}

                    <div
                      style={{
                        display: "flex",

                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        disabled={qtdPart === 26}
                        type="button"
                        className="secondary"
                        onClick={() => {
                          setQtdPart(qtdPart + 1);
                          formActions.push({
                            ...formInitialValues,
                            id: uuidv4(),
                          });
                        }}
                      >
                        Adicionar
                      </button>
                      <button type="submit">Cadastrar</button>
                    </div>
                  </div>
                )}
              />
            </Form>
          </FormikProvider>
        </Col>

        <Col span={1}>
          <Divider type="vertical" style={{ height: "100%", color: "#000" }} />
        </Col>

        <Col span={8}>
          <pre>{JSON.stringify(formik.values, null, 4)}</pre>
        </Col>

        <Col span={1}>
          <Divider type="vertical" style={{ height: "100%", color: "#000" }} />
        </Col>

        <Col span={8}>
          <SelectContractParties />
        </Col>
      </Row>
    </div>
  );
};

export default App;
