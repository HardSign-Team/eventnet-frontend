import React, { useState } from "react";
import styles from "./index.module.scss";
import { Token, TokenInput } from "@skbkontur/react-ui";
import { TokenInputType } from "@skbkontur/react-ui/components/TokenInput";
import { cropped } from "../../../utils/cropHelpers";
import { TagNameViewModel } from "../../../viewModels/TagNameViewModel";
import { requestTags } from "../../../api/tags/getTags";

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
  const [tags, setTags] = useState<TagNameViewModel[]>([]);
  const getItems = (q: string): Promise<never[]> =>
    Promise.resolve(
      tags
        .map((tagName) => tagName.name)
        .filter(
          (x) => x.toLowerCase().includes(q.toLowerCase()) || x.toString() === q
        )
        .map((x) => x.toLowerCase())
    ).then();

  const onInputValueChange = (value: string) => {
    if (value === "") return;
    requestTags(value)
      .then((tags) => {
        for (let tag of tags) {
          if (!tags.some((t) => t.id === tag.id)) {
            setTags(tags.concat(tag));
          }
        }
      })
      .catch(console.error);
  };

  return (
    <div className={styles.eventTagsPicker}>
      <span className={styles.eventTagsPicker__label}>Теги</span>
      <TokenInput
        type={TokenInputType.Combined}
        getItems={getItems}
        onInputValueChange={onInputValueChange}
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
