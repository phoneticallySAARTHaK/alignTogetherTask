import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
} from "@chakra-ui/react";
import { FormEvent, useRef, useState } from "react";
import { List } from "../../components/List";

export type ItemType = {
  isCompleted?: boolean;
  label: string;
  theme?: string;
  id: string;
};

type Inputs = Omit<ItemType, "id" | "isCompleted">;
const inputNames: Readonly<{ [x in keyof Inputs]-?: `${x}` }> = {
  label: "label",
  theme: "theme",
};

export function Page() {
  const [items, setItems] = useState<ItemType[]>([]);

  const controlRefs = useRef<{
    input: HTMLInputElement | null;
    btn: HTMLButtonElement | null;
    color: HTMLInputElement | null;
  }>({ input: null, btn: null, color: null });

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  function handleToggle(id: string) {
    setItems((prev) => {
      const item = prev.find((it) => it.id === id);

      if (item) item.isCompleted = !item.isCompleted;

      return [...prev];
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: Partial<Inputs> = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    );

    if (!data.label) {
      return window.alert("Label is required");
    }
    if (!data.theme) {
      return window.alert("Choose a theme color");
    }

    setItems((prev) => {
      const lastId = prev[prev.length - 1]?.id ?? 0;
      return [
        ...prev,
        {
          label: data.label!,
          theme: data.theme,
          id: lastId + 1,
          isCompleted: false,
        },
      ];
    });

    if (
      controlRefs.current.btn &&
      controlRefs.current.input &&
      controlRefs.current.color
    ) {
      controlRefs.current.input.value = "";
      controlRefs.current.color.value = "";
      controlRefs.current.btn.style.color = "";
      controlRefs.current.input.style.color = "";
    }
  }

  return (
    <Grid
      maxW="40rem"
      bg="#FFF"
      mx="auto"
      mt={{ base: "2rem", lg: "4rem" }}
      py={4}
      borderRadius="0.5rem"
      gap={6}
    >
      <GridItem></GridItem>

      <GridItem>
        <List data={items} deleteFn={handleDelete} statusFn={handleToggle} />
      </GridItem>

      <GridItem px={4}>
        <Box as="form" onSubmit={handleSubmit}>
          <FormControl display="flex" gap={4}>
            <Input
              ref={(i) => (controlRefs.current.input = i)}
              name={inputNames.label}
              borderRadius="1rem"
              placeholder="Add..."
              required
            />

            <Button ref={(i) => (controlRefs.current.btn = i)} type="submit">
              Add
            </Button>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Choose color</FormLabel>
            <Input
              name={inputNames.theme}
              type="color"
              required
              ref={(i) => (controlRefs.current.color = i)}
              onChange={(e) => {
                if (!e.target.value) return;
                controlRefs.current.input &&
                  (controlRefs.current.input.style.color = e.target.value);
                controlRefs.current.btn &&
                  (controlRefs.current.btn.style.color = e.target.value);
              }}
            />
          </FormControl>
        </Box>
      </GridItem>
    </Grid>
  );
}
