import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import { Helmet } from "react-helmet";

import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { bugs, website, server } from "variables/general.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useEditHttp } from "../../Hooks/editHttp";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import './style.css';
const useStyles = makeStyles(styles);

const rows = ['asdf','sdafs','asdf','dafs','dsf']

export default function Dashboard() {
  const classes = useStyles();
  const [values, setValues] = React.useState();
  const [regions, setRegions] = React.useState();

  const [circular, setCircular] = React.useState(false);
  const [year, setYear] = React.useState();
  const [message, fetchCall] = useEditHttp();

  const handleChange = event => {
    setValues(event.target.value);
  };

  const handleChangeYear = event => {
    setYear(event.target.value);
  };

  const handleSubmit = event => {
    let searchString = "diseases of rice in india";
    let elements = window.google.search.cse.element.getAllElements();
    Object.keys(elements).forEach(element => {
      elements[element].execute(searchString);
    });
  };

  React.useEffect(() => {
    fetchCall(`/graph/regions`);
    setRegions(message);
  }, []);
  return (
    <div>
      <GridContainer style={{ justifyContent: "center", textAlign: "center" }}>
        <GridItem
          xs={4}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px!important"
          }}
        >
          <FormControl
            variant="outlined"
            className={classes.formControl}
            style={{ minWidth: 400, marginBottom: 30 }}
          >
            <InputLabel htmlFor="outlined-age-simple">
              Select Region For Farming
            </InputLabel>
            <Select
              value={values}
              onChange={handleChange}
              // labelWidth={labelWidth}
              inputProps={{
                name: "Region",
                id: "outlined-age-simple"
              }}
            >
              {message &&
                message.map(item => <MenuItem value={item}>{item}</MenuItem>)}
            </Select>
          </FormControl>
        </GridItem>

        <GridItem xs={10} style={{ textAlign: "center" }}>
          {circular && <CircularProgress className={classes.progress} />}
        </GridItem>
        {!circular && (
          <GridItem xs={10}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody style={{ display: "flex" }}>
                <h4
                  className={classes.cardTitle}
                  style={{ flex: 1, marginTop: 10 }}
                >
                  Predicted Rainfall of year 2020
                </h4>
              </CardBody>
            </Card>
          </GridItem>
        )}
      </GridContainer>
          <table >
            <tr>
            <th>Crop</th>
            <th>Solid Required</th>
            <th>Annual Rainfall Required</th>
            <th>Temperature Required</th>
            </tr>
          
            <tr>
              <td>sadf</td>
              <td>sadf</td>
              <td>sadf</td>
              <td>sadf</td>

            </tr>
          </table>
      <Helmet>
        <script
          async
          src="https://cse.google.com/cse.js?cx=013071202003806884029:5zihfoylkih"
        ></script>
      </Helmet>
      {/* <div class="gcse-search"></div> */}
      <form
        method="get"
        title="Search Form"
        action="https://cse.google.com/cse.js?cx=013071202003806884029:5zihfoylkih"
      >
        <div class="gcse-search">
          <input
            type="text"
            id="q"
            name="q"
            title="Search this site"
            alt="Search Text"
            maxlength="256"
          />
          <input
            type="hidden"
            id="cx"
            name="cx"
            value="013071202003806884029:5zihfoylkih"
          />
          <input
            type="image"
            id="searchSubmit"
            name="submit"
            src="https://www.flaticon.com/free-icon/active-search-symbol_34148"
            alt="Go"
            title="Submit Search Query"
          />
        </div>
      </form>
      <button onClick={handleSubmit}>Submit</button>
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                )
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                )
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                )
              }
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer> */}
    </div>
  );
}
