import {
  Box,
  Field,
  Fieldset,
  HStack,
  Input,
  RadioGroup,
  VStack,
} from "@chakra-ui/react";

const shippingMethods = [
  {
    label: "Free (5-7 days)",
    value: "1",
  },
  {
    label: "Express (3-5 days)",
    value: "2",
  },
  {
    label: "Next Day",
    value: "3",
  },
];

function Delivery() {
  return (
    <Box>
      <form>
        <VStack gap={6}>
          {/* Shipping Address Start */}
          <Fieldset.Root size={"lg"} colorPalette="blue">
            <Fieldset.Legend>Shipping Address</Fieldset.Legend>
            <Fieldset.Content>
              <VStack>
                <HStack width={"full"}>
                  <Field.Root required>
                    <Input placeholder="First Name" />
                  </Field.Root>
                  <Field.Root required>
                    <Input placeholder="Last Name" />
                  </Field.Root>
                </HStack>
                <Field.Root required>
                  <Input placeholder="Address Line 1" />
                </Field.Root>
                <Field.Root required>
                  <Input placeholder="Address Line 2" />
                </Field.Root>
                <HStack width={"full"}>
                  <Field.Root required>
                    <Input placeholder="City" />
                  </Field.Root>
                  <Field.Root required>
                    <Input placeholder="Province/State" />
                  </Field.Root>
                </HStack>
                <HStack width={"full"}>
                  <Field.Root required>
                    <Input placeholder="Country" />
                  </Field.Root>
                  <Field.Root required>
                    <Input placeholder="Zip/Postal Code" />
                  </Field.Root>
                </HStack>
              </VStack>
            </Fieldset.Content>
          </Fieldset.Root>
          {/* Shipping Address End */}
          {/* Shipping Method Start */}
          <Fieldset.Root size={"lg"} colorPalette="blue">
            <Fieldset.Legend>Shipping Method</Fieldset.Legend>
            <Fieldset.Content>
              <RadioGroup.Root defaultValue="1" size={"lg"}>
                <VStack alignItems={"start"} gapY={3}>
                  {shippingMethods.map((method) => (
                    <RadioGroup.Item key={method.value} value={method.value}>
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>{method.label}</RadioGroup.ItemText>
                    </RadioGroup.Item>
                  ))}
                </VStack>
              </RadioGroup.Root>
            </Fieldset.Content>
          </Fieldset.Root>
          {/* Shipping Method End */}
        </VStack>
      </form>
    </Box>
  );
}

export default Delivery;
