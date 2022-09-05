import { useFormik } from "formik";

import "antd/dist/antd.css";
import { CustomSelect } from "./CustomSelect";
import { ContractPartsContext, ContractPartsContextType } from "../context";
import { useContext } from "react";

const formInitialValues: Array<string> = [];

const App = () => {
  const { contractParts } =
    useContext<ContractPartsContextType>(ContractPartsContext);

  const formik = useFormik({
    initialValues: {
      selectContractParts: formInitialValues,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div style={{ margin: 24 }}>
      <CustomSelect
        id="selectContractParts"
        mode="multiple"
        contractParties={contractParts}
        formik={formik}
      />
    </div>
  );
};

export default App;
