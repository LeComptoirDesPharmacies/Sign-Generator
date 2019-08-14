import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SignOverviewPage from "../../pages/SignOverviewPage/SignOverviewPage"
import CreateSignPage from "../../pages/CreateSignPage/CreateSignPage"
import HandleBannerPage from "../../pages/HandleBannerPage/HandleBannerPage"
import SettingsPage from "../../pages/SettingsPage/SettingsPage"
import UploadBannerPage from "../../pages/UploadBannerPage/UploadBannerPage"

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [id, setId] = React.useState(0);
  const [update, setUpdate] = React.useState(false);

  function handleChange(event, newValue) {
    setValue(newValue);
    setId(0)
    setUpdate(false)
  }

  React.useEffect((event) => {
    if (props.location.state) {
      if (props.location.state.value === 7) {
        setValue(props.location.state.value)
        props.location.state.value = -7
      }
      if (props.location.state.value === -7) {
        setValue(5)
        props.location.state.value = 10
      }
    }
  })

  if (props.location.state) {
    if (props.location.state.value === -1) {
      setValue(1)
      props.location.state.value = 1
    }
    if (props.location.state.update === true) {
      setUpdate(props.location.state.update)
      props.location.state.update = false
      setId(props.location.state.id)
      props.location.state.id = 0
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <LinkTab label="Signatures" />
          <LinkTab label="Créer signature" />
          <LinkTab label="Télécharger un bandeau" />
          <LinkTab label="Gérer bandeaux" />
          <LinkTab label="Paramètres" />
        </Tabs>
      </AppBar>
      {value === 0 && <TabContainer><SignOverviewPage></SignOverviewPage></TabContainer>}
      {value === 1 && <TabContainer><CreateSignPage id={id} update={update}></CreateSignPage></TabContainer>}
      {value === 2 && <TabContainer><UploadBannerPage></UploadBannerPage></TabContainer>}
      {value === 5 && <TabContainer><UploadBannerPage></UploadBannerPage></TabContainer>}
      {value === 3 && <TabContainer><HandleBannerPage></HandleBannerPage></TabContainer>}
      {value === 4 && <TabContainer><SettingsPage next={true}></SettingsPage></TabContainer>}
    </div>
  );
}