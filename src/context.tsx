import { createContext, useState } from "react";

export const ContractPartsContext = createContext<ContractPartsContextType>(
  {} as ContractPartsContextType
);

export type ContractPartsContextType = {
  saveContractPart: (contractPart: Array<ContractPartType>) => void;
  contractParts: Array<ContractPartType>;
};

export type ContractPartType = {
  id: string;
  name: string;
  part: string;
};

const AppContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contractParts, setContractParts] = useState<Array<ContractPartType>>(
    []
  );

  const saveContractPart = (contractPart: Array<ContractPartType>) => {
    setContractParts(contractPart);
  };

  return (
    <ContractPartsContext.Provider
      value={{
        contractParts,
        saveContractPart,
      }}
    >
      {children}
    </ContractPartsContext.Provider>
  );
};

export default AppContext;
