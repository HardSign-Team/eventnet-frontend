import React from "react";
import styles from "./TagsPicker.module.scss";
import { Gapped, Token, TokenInput } from "@skbkontur/react-ui";
import { TokenInputType } from "@skbkontur/react-ui/components/TokenInput";
import { getItems } from "../../main/SideBar/Toolbar";

type TagsPickerProps = {
  selectedTags: never[];
  setSelectedTags: (value: never[]) => void;
};
const TagsPicker: React.FC<TagsPickerProps> = ({
  selectedTags,
  setSelectedTags,
}) => {
  return (
    <Gapped gap={10} className={styles.eventTagsPicker}>
      <span className={styles.eventTagsPicker__label}>Теги</span>
      <TokenInput
        type={TokenInputType.Combined}
        getItems={getItems}
        selectedItems={selectedTags}
        className={styles.eventTagsPicker__tokenInput}
        onValueChange={setSelectedTags}
        renderToken={(item, tokenProps) => (
          <Token key={item} {...tokenProps}>
            {item}
          </Token>
        )}
      />
    </Gapped>
  );
};

export default TagsPicker;
