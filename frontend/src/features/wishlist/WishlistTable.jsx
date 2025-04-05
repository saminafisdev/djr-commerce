import { Table } from "@chakra-ui/react";
import WishlistItem from "./WishlistItem";
import PropTypes from "prop-types";

export const WishlistTable = ({ wishlist }) => {
  return (
    <Table.Root size={"lg"} interactive>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader w={40}></Table.ColumnHeader>
          <Table.ColumnHeader></Table.ColumnHeader>
          <Table.ColumnHeader>Product name</Table.ColumnHeader>
          <Table.ColumnHeader>Unit price</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {wishlist?.items.map((item) => (
          <WishlistItem key={item.id} item={item} />
        ))}
      </Table.Body>
    </Table.Root>
  );
};

WishlistTable.propTypes = {
  wishlist: PropTypes.shape({
    id: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        product: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          slug: PropTypes.string.isRequired,
          unit_price: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
};
