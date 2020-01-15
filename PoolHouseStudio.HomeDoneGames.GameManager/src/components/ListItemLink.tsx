import { ListItem, ListItemText, Typography } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from "react-router-dom";

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      margin: "1rem auto"
    },
    listItemLink: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      padding: "1rem",
      textAlign: "center",
      "&:hover": {
        background: theme.palette.primary.dark
      }
    }
  })
);

const ListItemLink: React.FC<ListItemLinkProps> = ({ icon, primary, to }) => {
  const classes = useStyles();

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, "to">>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li className={classes.listItem}>
      <ListItem button component={renderLink} className={classes.listItemLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText>
          <Typography variant="h4">{primary}</Typography>
        </ListItemText>
      </ListItem>
    </li>
  );
};

export default ListItemLink;
