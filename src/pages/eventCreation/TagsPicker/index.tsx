import React from "react";
import styles from "./index.module.scss";
import { Token, TokenInput } from "@skbkontur/react-ui";
import { TokenInputType } from "@skbkontur/react-ui/components/TokenInput";
import { getItems } from "../../events/SideBar/Toolbar/Toolbar";
import { cropped } from "../../../utils/cropHelpers";

type TagsPickerProps = {
  selectedTags: never[];
  setSelectedTags: (value: never[]) => void;
  maxSelectedTagsCount?: number;
};

const DEFAULT_MAX_SELECTED_TAGS_COUNT = 20;

const TagsPicker: React.FC<TagsPickerProps> = ({
  selectedTags,
  setSelectedTags,
  maxSelectedTagsCount = DEFAULT_MAX_SELECTED_TAGS_COUNT,
}) => {
  return (
    <div className={styles.eventTagsPicker}>
      <span className={styles.eventTagsPicker__label}>Теги</span>
      <TokenInput
        type={TokenInputType.Combined}
        getItems={getItems}
        selectedItems={cropped(selectedTags, maxSelectedTagsCount)}
        className={styles.eventTagsPicker__tokenInput}
        onValueChange={setSelectedTags}
        renderToken={(item, tokenProps) => (
          <Token key={item} {...tokenProps}>
            {item}
          </Token>
        )}
      />
    </div>
  );
};

export default TagsPicker;
