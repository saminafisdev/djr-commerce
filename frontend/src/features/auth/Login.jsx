import {
  Button,
  ButtonGroup,
  Card,
  Center,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Link as RouterLink } from "react-router";

export const Login = () => (
  <Center h={"100vh"}>
    <Card.Root w={"md"}>
      <Card.Header>
        <Card.Title>Sign in</Card.Title>
      </Card.Header>
      <Card.Body>
        <Stack gap="4" w="full">
          <Field label="First Name">
            <Input />
          </Field>
          <Field label="Last Name">
            <Input />
          </Field>
        </Stack>
      </Card.Body>
      <Card.Footer justifyContent="space-between">
        <ButtonGroup>
          <Button variant="outline">Cancel</Button>
          <Button variant="solid">Sign in</Button>
        </ButtonGroup>
        <Text fontSize={"sm"}>
          Don&apos;t have an account?{" "}
          <Link variant={"underline"}>
            {" "}
            <RouterLink to={"/signup"}>Sign up</RouterLink>
          </Link>
        </Text>
      </Card.Footer>
    </Card.Root>
  </Center>
);
