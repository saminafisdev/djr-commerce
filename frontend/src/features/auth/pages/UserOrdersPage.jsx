import PropTypes from "prop-types";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  Heading,
  HStack,
  Separator,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useGetUserOrdersQuery } from "@/features/order/orderApi";

const OrderCard = ({ order }) => {
  const formattedDateTime = new Date(order.order_date).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <Card.Root w={"full"} variant={"elevated"}>
      <Card.Header>Order ID # {order?.id}</Card.Header>
      <Separator my={2} />
      <Card.Body color={"fg.muted"}>
        <HStack>
          <Box flexGrow={1}>
            <Text>Bob Odenkirk</Text>
            <Text>+9911239029</Text>
            <Text>House#2a, Road#3, Sector#2</Text>
          </Box>
          <Text>
            <b>Date:</b> {formattedDateTime}
          </Text>
        </HStack>
        <HStack justifyContent={"space-between"} mt={6}>
          <Text fontWeight={"semibold"} color={"black"}>
            Amount Payable:
          </Text>
          <Text fontWeight={"semibold"}>
            &#2547;373{" "}
            <Box as="span" color={"blue.500"}>
              &#40;Paid&#41;
            </Box>
          </Text>
        </HStack>
      </Card.Body>
      <Separator my={2} />
      <Card.Footer>
        <HStack w={"full"} justify={"space-between"}>
          <HStack>
            <Text>Status:</Text>
            <Badge variant={"solid"} colorPalette={"green"}>
              Delivered
            </Badge>
          </HStack>
          <ButtonGroup variant={"surface"}>
            <Button>Order Again</Button>
            <Button colorPalette={"gray"}>View Details</Button>
          </ButtonGroup>
        </HStack>
      </Card.Footer>
    </Card.Root>
  );
};

export const UserOrdersPage = () => {
  const { data: orders = [], isLoading } = useGetUserOrdersQuery();

  if (isLoading) return <h3>Loading...</h3>;

  return (
    <Box w="full">
      <Heading size={"2xl"}>My Orders</Heading>
      <Tabs.Root
        defaultValue="all"
        variant={"subtle"}
        colorPalette={"blue"}
        size={"lg"}
        mt={6}
      >
        <Tabs.List>
          <Tabs.Trigger value="all">All</Tabs.Trigger>
          <Tabs.Trigger value="confirmed">Confirmed</Tabs.Trigger>
          <Tabs.Trigger value="delivered">Delivered</Tabs.Trigger>
          <Tabs.Trigger value="cancelled">Cancelled</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="all">
          <VStack gap={6}>
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </VStack>
        </Tabs.Content>
        <Tabs.Content value="confirmed">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </Tabs.Content>
        <Tabs.Content value="delivered">Manage your projects</Tabs.Content>
        <Tabs.Content value="cancelled">
          Manage your tasks for freelancers
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    order_date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    is_paid: PropTypes.bool.isRequired,
    customer_name: PropTypes.string,
    customer_phone: PropTypes.string,
    customer_address: PropTypes.string,
  }).isRequired,
};
