import {
  Box,
  Button,
  createListCollection,
  Field,
  Fieldset,
  HStack,
  Image,
  Input,
  Select,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useGetUserInfoQuery } from "./authApi";
import { useEffect } from "react";

const schema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  gender: z.string(),
  birth_date: z.coerce.date().max(new Date()),
  email: z.string().email(),
  phone: z.string().regex(/^(\+8801|01)[3-9]\d{8}$/, {
    message: "Please enter a valid phone number",
  }),
});

export const AccountPage = () => {
  const { data } = useGetUserInfoQuery();
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      gender: "",
      birth_date: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (data) {
      reset({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        gender: data.gender || "",
        birth_date: data.birth_date || "",
        email: data.email || "",
        phone: data.phone || "",
      });
    }
  }, [data, reset]);

  const onProfileUpdate = async (data) => {
    console.log(data);
  };

  return (
    <Box flexGrow={1}>
      <form onSubmit={handleSubmit(onProfileUpdate)}>
        <Fieldset.Root size={"lg"} colorPalette={"blue"}>
          <Fieldset.Legend fontSize={"2xl"}>View Profile</Fieldset.Legend>
          <Fieldset.Content>
            <Image
              src="https://bit.ly/naruto-sage"
              boxSize="150px"
              borderRadius="full"
              fit="cover"
              alt="Naruto Uzumaki"
              mx={"auto"}
              my={4}
            />
            <HStack>
              <Field.Root invalid={errors.first_name}>
                <Field.Label>First Name</Field.Label>
                <Input {...register("first_name")} />
                <Field.ErrorText>{errors.first_name?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={errors.last_name}>
                <Field.Label>Last Name</Field.Label>
                <Input {...register("last_name")} />
                <Field.ErrorText>{errors.last_name?.message}</Field.ErrorText>
              </Field.Root>
            </HStack>
            <HStack>
              <Field.Root>
                <Field.Label>Gender</Field.Label>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <Select.Root
                      name={field.name}
                      value={field.value}
                      onValueChange={({ value }) => field.onChange(value)}
                      collection={genders}
                    >
                      <Select.HiddenSelect />
                    </Select.Root>
                  )}
                />
              </Field.Root>
              <Field.Root invalid={errors.birth_date}>
                <Field.Label>Date of Birth</Field.Label>
                <Input
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  {...register("birth_date")}
                />
                <Field.ErrorText>{errors.birth_date?.message}</Field.ErrorText>
              </Field.Root>
            </HStack>
            <HStack>
              <Field.Root required invalid={errors.email}>
                <Field.Label>Email Address</Field.Label>
                <Input type="email" {...register("email")} />
                <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={errors.phone}>
                <Field.Label>Phone Number</Field.Label>
                <Input type="tel" {...register("phone")} />
                <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
              </Field.Root>
            </HStack>
          </Fieldset.Content>
          <Button size={"lg"} type="submit" alignSelf={"flex-end"}>
            Update Profile
          </Button>
        </Fieldset.Root>
      </form>
    </Box>
  );
};

const genders = createListCollection({
  items: [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ],
});
