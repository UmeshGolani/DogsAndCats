import React from "react";

const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
  { id: 4, name: "Item 4" },
  { id: 5, name: "Item 5" },
  { id: 6, name: "Item 6" },
  { id: 7, name: "Item 7" },
  { id: 8, name: "Item 8" },
  { id: 9, name: "Item 9" },
];

const ListView = () => {
  return (
    <div className="list-container" style={styles.container}>
      {items.map((item) => (
        <div key={item.id} className="list-item" style={styles.item}>
          {item.name}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap", // Allows wrapping of divs onto new rows when space is insufficient
    gap: "10px", // Gap between the items
  },
  item: {
    width: "calc(33.333% - 10px)", // Fixed width for 3 items in a row (subtracting the gap)
    height: "200px", // Fixed height for all items
    display: "flex", // Flexbox for centering
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    border: "1px solid #ccc",
    boxSizing: "border-box",
    textAlign: "center", // Center text inside the div
  },
};

// Media queries to adjust the number of divs in a row
const mediaStyles = `
  @media (max-width: 1024px) {
    .list-item {
      width: calc(50% - 10px); // 2 items per row for medium screens
    }
  }

  @media (max-width: 768px) {
    .list-item {
      width: calc(100% - 10px); // 1 item per row for small screens
    }
  }
`;

const ListViewWithMedia = () => (
  <>
    <style>{mediaStyles}</style>
    <ListView />
  </>
);

export default ListViewWithMedia;
