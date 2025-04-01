import { Container, Heading, Steps } from "@chakra-ui/react";
import { useLocation } from "react-router";
import Delivery from "./Delivery";

export const Checkout = () => {
  const location = useLocation();
  console.log(location);

  return (
    <Container>
      <Heading size={"4xl"} textAlign={"center"}>
        Checkout
      </Heading>
      <Steps.Root defaultStep={1} count={3}>
        <Steps.List>
          {steps.map((step, index) => (
            <Steps.Item key={index} index={index} title={step.title}>
              <Steps.Trigger>
                <Steps.Indicator />
                <Steps.Title>{step.title}</Steps.Title>
                <Steps.Description />
              </Steps.Trigger>
              <Steps.Separator />
            </Steps.Item>
          ))}
        </Steps.List>
        {steps.map((step, index) => (
          <Steps.Content key={index} index={index}>
            <Delivery />
          </Steps.Content>
        ))}
        <Steps.CompletedContent />
        <Steps.PrevTrigger />
        <Steps.NextTrigger />
      </Steps.Root>
    </Container>
  );
};

const steps = [
  {
    title: "Delivery",
  },
  {
    title: "Payment",
  },
  {
    title: "Confirmation",
  },
];
