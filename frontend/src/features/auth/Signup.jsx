import { PasswordInput } from "@/components/ui/password-input";
import {
  Button,
  ButtonGroup,
  Card,
  Center,
  Field,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { z } from "zod";

import { Link as RouterLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation, useRegisterUserMutation } from "./authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { LinkButton } from "@/components/ui/link-button";

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerSchema = z
    .object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      username: z.string(),
      password: z.string().min(8),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors: zodErrors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const [registerUser] = useRegisterUserMutation();
  const [login] = useLoginMutation();

  const onRegister = async (formData) => {
    try {
      await registerUser(formData).unwrap();

      const res = await login({
        username: formData.username,
        password: formData.password,
      }).unwrap();

      dispatch(setCredentials(res.auth_token));
      navigate("/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Center h={"100vh"}>
      <VStack>
        <Heading>DJRCommerce</Heading>
        <Card.Root w={"md"} variant={"elevated"}>
          <Card.Header>
            <Card.Title>Sign up</Card.Title>
            <Card.Description>
              Fill in the form below to create an account
            </Card.Description>
          </Card.Header>
          <Card.Body>
            <form>
              <Stack gap="4" w="full">
                <HStack>
                  <Field.Root invalid={zodErrors.firstName}>
                    <Field.Label>First Name</Field.Label>
                    <Input placeholder="John" {...register("firstName")} />
                    <Field.ErrorText>
                      {zodErrors.firstName?.message}
                    </Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={zodErrors.lastName}>
                    <Field.Label>Last Name</Field.Label>
                    <Input placeholder="Doe" {...register("lastName")} />
                    <Field.ErrorText>
                      {zodErrors.lastName?.message}
                    </Field.ErrorText>
                  </Field.Root>
                </HStack>
                <Field.Root invalid={zodErrors.email}>
                  <Field.Label>Email</Field.Label>
                  <Input placeholder="john@email.com" {...register("email")} />
                  <Field.ErrorText>{zodErrors.email?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={zodErrors.username}>
                  <Field.Label>Username</Field.Label>
                  <Input placeholder="johndoe" {...register("username")} />
                  <Field.ErrorText>
                    {zodErrors.username?.message}
                  </Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={zodErrors.password}>
                  <Field.Label>Password</Field.Label>
                  <PasswordInput {...register("password")} />
                  <Field.ErrorText>
                    {zodErrors.password?.message}
                  </Field.ErrorText>
                </Field.Root>
              </Stack>
            </form>
          </Card.Body>
          <Card.Footer justifyContent="space-between">
            <ButtonGroup>
              <LinkButton variant="outline" asChild>
                <RouterLink to="/">Cancel</RouterLink>
              </LinkButton>
              <Button variant="solid" onClick={handleSubmit(onRegister)}>
                Sign up
              </Button>
            </ButtonGroup>
            <Text fontSize={"sm"}>
              Already have an account?{" "}
              <Link variant={"underline"} asChild>
                <RouterLink to={"/login"}>Login</RouterLink>
              </Link>
            </Text>
          </Card.Footer>
        </Card.Root>
      </VStack>
    </Center>
  );
};
