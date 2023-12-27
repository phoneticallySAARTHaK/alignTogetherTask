import {
  Button,
  Checkbox,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { FC } from "react";
import { ItemType } from "../pages/Root/page";

export const List: FC<{
  data: ItemType[];
  deleteFn: (id: string) => void;
  statusFn: (id: string) => void;
}> = ({ data, deleteFn, statusFn }) => {
  return data.length ? (
    <UnorderedList listStyleType="none" listStylePos="inside" m={0}>
      {data.map(({ label, isCompleted, theme, id }) => (
        <ListItem
          display="flex"
          alignItems="center"
          gap={4}
          flexWrap="wrap"
          borderBottom="1px solid"
          borderColor={theme}
          px={4}
          py={2}
          color={theme}
          key={id}
        >
          <Checkbox isChecked={isCompleted} onChange={() => statusFn(id)} />{" "}
          {label}{" "}
          <Button ml="auto" onClick={() => deleteFn(id)}>
            Delete
          </Button>
        </ListItem>
      ))}
    </UnorderedList>
  ) : (
    <Text align="center">Add some Items...</Text>
  );
};
