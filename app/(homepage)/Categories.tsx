import MenuItem from "@mui/material/MenuItem";

interface Props {
  categories: {
    id: string;
    name: string;
  }[];
}

export default function Categories({ categories }: Props) {
  return (
    <>
      {categories.map((category) => (
        <MenuItem value={category.id} style={{ padding: 2 }}>
          {category.name}
        </MenuItem>
      ))}
    </>
  );
}
