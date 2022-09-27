import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export default function ListItemLink(props) {
  const { icon, primary, to } = props;
  //   const renderLink = () => {
  //     return <Link to={to}></Link>;
  //   };
  // chua hieu
  const renderLink = React.useMemo(
    () =>
      React.forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to]
  );
  return (
    <ListItem button component={renderLink}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItem>
  );
}
