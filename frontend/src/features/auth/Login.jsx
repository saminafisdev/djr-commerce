import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Center,
  Input,
  Link as ChakraLink,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { useLoginMutation } from "./authApi";
import { useDispatch } from "react-redux";
import { setUser } from "./authSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });

  const [login, { isLoading, error }] = useLoginMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(formData).unwrap();
      console.log(data);
      dispatch(setUser(data.auth_token));
      navigate("/products");
    } catch (err) {
      console.error(err);
    } finally {
      setFormData({ ...formData, password: "" });
    }
  };

  return (
    <Center h={"100vh"}>
      <Card.Root w={"md"}>
        <Card.Header>
          <Card.Title>Sign in</Card.Title>
          {error?.data?.non_field_errors && (
            <Alert.Root status={"error"}>
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>
                  {error?.data?.non_field_errors
                    ? error?.data?.non_field_errors[0]
                    : "There was some error"}
                </Alert.Title>
              </Alert.Content>
            </Alert.Root>
          )}
        </Card.Header>
        <Card.Body>
          <form id="login_form" onSubmit={handleSubmit}>
            <Stack gap="4" w="full">
              <Field
                label="Username"
                invalid={error?.data?.username}
                errorText={error?.data?.username ? error.data.username[0] : ""}
                required
              >
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Field>
              <Field
                label="Password"
                invalid={error?.data?.password}
                errorText={error?.data?.password ? error.data.password[0] : ""}
                required
              >
                <PasswordInput
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Field>
            </Stack>
          </form>
        </Card.Body>
        <Card.Footer justifyContent="space-between">
          <ButtonGroup>
            <Button variant="outline">Cancel</Button>
            <Button
              type="submit"
              form="login_form"
              variant="solid"
              disabled={isLoading}
            >
              Sign in
            </Button>
          </ButtonGroup>
          <Text fontSize={"sm"}>
            Don&apos;t have an account?{" "}
            <ChakraLink variant={"underline"} asChild>
              <RouterLink to={"/signup"}>Sign up</RouterLink>
            </ChakraLink>
          </Text>
        </Card.Footer>
      </Card.Root>
    </Center>
  );
};
