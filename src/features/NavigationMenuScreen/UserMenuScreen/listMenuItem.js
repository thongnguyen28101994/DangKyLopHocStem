import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ListItemLink from "../../../component/MaterialDesign/CustomComponent/ListItemLink";
import { useRouteMatch } from "react-router-dom";

export const MainListItems = () => {
  const root = useRouteMatch();
  return (
    <React.Fragment>
      {/* <ListItemLink
        to={`${root.url}/lophoc`}
        primary={"Lớp Học"}
        icon={<DashboardIcon />}
      ></ListItemLink> */}
      <ListItemLink
        to={`${root.url}/loptaphuan`}
        primary={"Danh Sách Đăng Ký"}
        icon={<DashboardIcon />}
      ></ListItemLink>
      <ListItemLink
        to={`${root.url}/danhsachchinhthuc`}
        primary={"Danh Sách Chính Thức"}
        icon={<SummarizeIcon />}
      ></ListItemLink>
      {/* <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton> */}
    </React.Fragment>
  );

  // export const secondaryListItems = (
  //   <React.Fragment>
  //     {/* <ListSubheader component="div" inset>
  //       Saved reports
  //     </ListSubheader>
  //     <ListItemButton>
  //       <ListItemIcon>
  //         <AssignmentIcon />
  //       </ListItemIcon>
  //       <ListItemText primary="Current month" />
  //     </ListItemButton>
  //     <ListItemButton>
  //       <ListItemIcon>
  //         <AssignmentIcon />
  //       </ListItemIcon>
  //       <ListItemText primary="Last quarter" />
  //     </ListItemButton>
  //     <ListItemButton>
  //       <ListItemIcon>
  //         <AssignmentIcon />
  //       </ListItemIcon>
  //       <ListItemText primary="Year-end sale" />
  //     </ListItemButton> */}
  //   </React.Fragment>
  // )
};
