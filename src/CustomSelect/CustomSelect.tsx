import { useCallback, useMemo } from "react";
import { Select } from "antd";
import { distinctByKey } from "../utils";
import lodash from "lodash";

export type ContractPart = {
  id: string;
  part: string;
  name: string;
};

type Props = {
  id?: string;
  mode?: "multiple" | "tags";
  disabled?: boolean;
  callback?: any;
  formik: any;
  contractParties: Array<ContractPart>;
};

export const CustomSelect = ({
  id,
  mode,
  formik,
  disabled = false,
  callback,
  contractParties,
}: Props) => {
  const { values, setFieldValue, handleBlur } = formik;

  const contractPartieGroups = useMemo(
    () =>
      lodash.groupBy(
        contractParties.map(({ part, name }) => ({
          part,
          name,
        })),
        "part"
      ),
    [contractParties]
  );

  const getPartieFromGroup = useCallback(
    (key: string) => {
      const quantity = contractPartieGroups[key].length - 1;
      const [{ part, name: fullName }] = contractPartieGroups[key];
      const [name] = fullName.split(" ");

      return {
        name,
        part,
        quantity: quantity ? `+${quantity}` : "",
      };
    },
    [contractPartieGroups]
  );

  /**
   * Estratégia para encontrar a parte do contrato
   * baseado no id (index) no formik
   */
  const formValue = useMemo(() => {
    let current = lodash.cloneDeep(values);

    for (const key of id!.split(".")) {
      current = current[key];
    }

    if (mode) {
      return current ?? [];
    }

    return current ? current : undefined;
  }, [values, id, mode]);

  const handleSetValue = useCallback(
    (value: any) => setFieldValue(id, value),
    [id, setFieldValue]
  );

  const handleChange = useCallback(
    (value: any) => {
      (callback ?? handleSetValue)?.(value);
    },
    [callback, handleSetValue]
  );

  const autoAdjustPartsName = useCallback(
    ({ contractParties, mode, values }: Record<string, any>) => {
      const { instruction } =
        (values as Record<string, { parts?: Array<string>; part?: string }>) ??
        {};

      const contractPartName = contractParties.map(
        ({ part }: { part: string }) => part
      );

      const filterParts = (item: string) => contractPartName.includes(item);

      if (mode) {
        if (instruction?.parts?.length) {
          return instruction?.parts?.filter(filterParts);
        }

        return formValue.filter(filterParts);
      }

      return contractPartName.includes(instruction?.part)
        ? instruction?.part
        : undefined;
    },
    [formValue]
  );

  return (
    <Select
      id={id}
      mode={mode}
      size="large"
      style={{ width: "100%" }}
      disabled={disabled}
      onBlur={handleBlur}
      value={
        autoAdjustPartsName({
          mode,
          values,
          contractParties,
        }) as any
      }
      onChange={handleChange}
    >
      {distinctByKey({
        key: "part",
        arr: contractParties,
      }).map(({ part }) => {
        const infos = getPartieFromGroup(part);
        return (
          <Select.Option
            style={{ marginRight: 8 }}
            key={part}
            value={infos.part}
          >
            {infos.part} - {infos.name}{" "}
            {infos.quantity && (
              <span className="holder--full-name-qtd">
                &nbsp;{infos.quantity}
              </span>
            )}
          </Select.Option>
        );
      })}
    </Select>
  );
};
