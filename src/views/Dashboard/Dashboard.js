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
import Cloud from "@material-ui/icons/Cloud";
import CloudOff from "@material-ui/icons/CloudOff";
import CloudQueue from "@material-ui/icons/CloudQueue";
import CloudCircle from "@material-ui/icons/CloudCircle";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
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
import { usePostHttp } from "../../Hooks/postHttp";
import { useGetHttp } from "../../Hooks/getHttp";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

var Chartist = require("chartist");
const useStyles = makeStyles(styles);

const useStyles2 = makeStyles(theme => ({
  fab: {
    position: "fixed",
    right: 0,
    bottom: 0,
    marginRight: theme.spacing(4),
    marginBottom: theme.spacing(2),
    zIndex: 1000
  },
  chat: {
    position: "fixed",
    right: 50,
    bottom: 100,
    zIndex: 1000,
    border: 0
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const classes2 = useStyles2();

  const [values, setValues] = React.useState("BIHAR");
  const [circular, setCircular] = React.useState(false);
  const [year, setYear] = React.useState();
  const [year_rain_annually, setYearRain] = React.useState();
  const [year_rain_monthly, setMonthRain] = React.useState();
  const [predicted_rain, setPredictedRain] = React.useState();

  const [message, fetchCall] = useEditHttp();
  const [yearRain, fetchPostCall] = usePostHttp();
  const [messageGet, fetchGetCall] = useGetHttp();

  const [yearData, setGraphData] = React.useState();
  const [regions, setRegions] = React.useState();
  const [display, setDisplay] = React.useState(false);
  const [avgValues, setAvgValues] = React.useState();

  // <script type="text/javascript">
  const googleTranslateElementInit2 = () => {
    const google = window.google;
    new google.translate.TranslateElement(
      { pageLanguage: "en", autoDisplay: false },
      "google_translate_element2"
    );

    // eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('6 7(a,b){n{4(2.9){3 c=2.9("o");c.p(b,f,f);a.q(c)}g{3 c=2.r();a.s(\'t\'+b,c)}}u(e){}}6 h(a){4(a.8)a=a.8;4(a==\'\')v;3 b=a.w(\'|\')[1];3 c;3 d=2.x(\'y\');z(3 i=0;i<d.5;i++)4(d[i].A==\'B-C-D\')c=d[i];4(2.j(\'k\')==E||2.j(\'k\').l.5==0||c.5==0||c.l.5==0){F(6(){h(a)},G)}g{c.8=b;7(c,\'m\');7(c,\'m\')}}',43,43,'||document|var|if|length|function|GTranslateFireEvent|value|createEvent||||||true|else|doGTranslate||getElementById|google_translate_element2|innerHTML|change|try|HTMLEvents|initEvent|dispatchEvent|createEventObject|fireEvent|on|catch|return|split|getElementsByTagName|select|for|className|goog|te|combo|null|setTimeout|500'.split('|'),0,{}))

  };
  //  </script>

  const handleFab = event => {
    setDisplay(!display);
  };
  const handleChange = async event => {
    setValues(event.target.value);
    const payload = {
      region: event.target.value
    };
    const rainData = await fetchPostCall(
      `/graph/yearly_rain/`,
      JSON.stringify(payload)
    );

    const payload2 = {
      region: "SUBDIVISION_" + event.target.value
    };
    const predictedRain = await fetchPostCall(
      `/graph/predicted_rain/`,
      JSON.stringify(payload2)
    );

    console.log(predictedRain);

    setYearRain(rainData);
    setPredictedRain(predictedRain);
    console.log(rainData.Rainfall);
  };

  const handleChangeYear = async event => {
    setYear(event.target.value);
    const payload = {
      Region: values,
      Year: event.target.value
    };
    const monthlyRainData = await fetchPostCall(
      `/graph/monthly_rainfall`,
      JSON.stringify(payload)
    );
    let temp = [];
    Object.values(monthlyRainData.Monthly_Rain).map(item => temp.push(item));
    let temp2 = [];
    temp.map(item => item.map(result => temp2.push(result)));
    console.log(temp2);
    setMonthRain(temp2);
    console.log([year_rain_monthly]);
  };

  React.useEffect(() => {
    fetchCall(`/graph/regions`);
    setRegions(message);
    fetchGetCall(`/graph/range`);
    setAvgValues(messageGet);
  }, []);
  console.log(avgValues);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <CloudOff />
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontSize: "18px!important" }}
              >
                Below 500mm
              </p>
            </CardHeader>
            <CardBody>
              <span style={{ color: "black" }}>HARYANA & DELHI </span> ,{" "}
              <span> </span>
              <span style={{ color: "black" }}>WEST RAJASTHAN</span>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <CloudQueue />
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontSize: "18px!important" }}
              >
                500 - 1000 mm
              </p>
            </CardHeader>
            <CardBody>
              <span style={{ color: "black" }}>UTTAR PRADESH</span>,{" "}
              <span> </span>
              <span style={{ color: "black" }}>PUNJAB</span> , <span> </span>
              <span style={{ color: "black" }}>SAURASHTRA & KUTCH</span>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <CloudCircle />
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontSize: "18px!important" }}
              >
                1000 - 1500 mm
              </p>
            </CardHeader>
            <CardBody>
              <span style={{ color: "black" }}>ORISSA</span>, <span> </span>
              <span style={{ color: "black" }}>VIDARBHA</span>, <span> </span>
              <span style={{ color: "black" }}>CHHATTISGARH</span>,{" "}
              <span> </span>
              <span style={{ color: "black" }}>BIHAR</span>, <span> </span>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Cloud />
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontSize: "18px!important" }}
              >
                Above 1500mm
              </p>
            </CardHeader>
            <CardBody>
              <span style={{ color: "black" }}>ARUNACHAL PRADESH</span>,{" "}
              <span> </span>
              <span style={{ color: "black" }}>KONKAN & GOA</span>,{" "}
              <span> </span>
              <span style={{ color: "black" }}>ASSAM & MEGHALAYA</span>,{" "}
              <span> </span>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer style={{ justifyContent: "center", textAlign: "center" }}>
        <GridItem
          xs={6}
          style={{
            display: "flex",
            // justifyContent: "center",
            marginBottom: "20px!important"
          }}
        >
          {/* <h3 style={{color: 'rgba(0,0,0,0.9)', fontWeight: 500}}>Select Your Region To Predict Rainfall</h3> */}
          <FormControl
            variant="outlined"
            className={classes.formControl}
            style={{ minWidth: 400, marginBottom: 30 }}
          >
            <InputLabel htmlFor="outlined-age-simple">
              Select Region To Predict Rainfall
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
        <GridItem xs={6}>
          {values && <p>Showing Results For {values} Region</p>}
        </GridItem>
        <GridItem xs={10} style={{ textAlign: "center" }}>
          {circular && <CircularProgress className={classes.progress} />}
        </GridItem>
        {!circular && year_rain_annually && (
          <GridItem xs={6}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    labels: [
                      "2003",
                      "2004",
                      "2005",
                      "2006",
                      "2007",
                      "2008",
                      "2009",
                      "2010",
                      "2011",
                      "2012",
                      "2013",
                      "2014",
                      "2015",
                      "2016",
                      "2017",
                      "2018"
                    ],
                    series: [year_rain_annually.Rainfall]
                  }}
                  type="Line"
                  options={{
                    lineSmooth: Chartist.Interpolation.cardinal({
                      tension: 0
                    }),
                    low: Math.min(...year_rain_annually.Rainfall),
                    high: Math.max(...year_rain_annually.Rainfall) + 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                    chartPadding: {
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0
                    },
                    height: 450
                  }}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody style={{ display: "flex" }}>
                <h4
                  className={classes.cardTitle}
                  style={{ flex: 1, marginTop: 10 }}
                >
                  Previous Rainfall of last 15 years
                </h4>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  style={{ minWidth: 250 }}
                >
                  <InputLabel htmlFor="outlined-age-simple">
                    View Single Year Analysis
                  </InputLabel>
                  <Select
                    value={year}
                    onChange={handleChangeYear}
                    // labelWidth={labelWidth}
                    inputProps={{
                      name: "Region",
                      id: "outlined-age-simple"
                    }}
                  >
                    <MenuItem value={2000}>2003</MenuItem>
                    <MenuItem value={2001}>2004</MenuItem>
                    <MenuItem value={2002}>2005</MenuItem>
                    <MenuItem value={2003}>2006</MenuItem>
                    <MenuItem value={2004}>2007</MenuItem>
                    <MenuItem value={2005}>2008</MenuItem>
                    <MenuItem value={2006}>2009</MenuItem>
                    <MenuItem value={2007}>2010</MenuItem>
                    <MenuItem value={2008}>2011</MenuItem>
                    <MenuItem value={2009}>2012</MenuItem>
                    <MenuItem value={2010}>2013</MenuItem>
                    <MenuItem value={2011}>2014</MenuItem>
                    <MenuItem value={2012}>2015</MenuItem>
                    <MenuItem value={2013}>2016</MenuItem>
                    <MenuItem value={2014}>2017</MenuItem>
                    <MenuItem value={2015}>2018</MenuItem>
                  </Select>
                </FormControl>
              </CardBody>
            </Card>
          </GridItem>
        )}

        {year_rain_annually && year_rain_monthly && (
          <GridItem xs={6}>
            <Card chart>
              <CardHeader color="primary">
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    labels: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "Mai",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec"
                    ],
                    series: [year_rain_monthly]
                  }}
                  type="Bar"
                  options={{
                    axisX: {
                      showGrid: false
                    },
                    low: 0,
                    high: Math.max(...year_rain_monthly) + 10,
                    height: 450,
                    chartPadding: {
                      top: 0,
                      right: 5,
                      bottom: 0,
                      left: 0
                    }
                  }}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>
                  Rainfall Analysis of the year {year + 3}
                </h4>
              </CardBody>
            </Card>
          </GridItem>
        )}

        {!circular && predicted_rain && (
          <GridItem xs={12}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    labels: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "Mai",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec"
                    ],
                    series: [
                      [
                        predicted_rain["months_JAN"][0],
                        predicted_rain["months_FEB"][0],
                        predicted_rain["months_MAR"][0],
                        predicted_rain["months_APR"][0],
                        predicted_rain["months_MAY"][0],
                        predicted_rain["months_JUN"][0],
                        predicted_rain["months_JUL"][0],
                        predicted_rain["months_AUG"][0],
                        predicted_rain["months_SEP"][0],
                        predicted_rain["months_OCT"][0],
                        predicted_rain["months_NOV"][0],
                        predicted_rain["months_DEC"][0]
                      ]
                    ]
                  }}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody style={{ margin: "12px 0px", alignItems: "center" }}>
                <h4 className={classes.cardTitle}>
                  Rainfall Prediction of the year 2020
                </h4>
              </CardBody>
            </Card>
          </GridItem>
        )}
      </GridContainer>
      <Fab
        color="primary"
        aria-label="add"
        className={classes2.fab}
        onClick={handleFab}
      >
        <AddIcon />
      </Fab>
      {display && (
        <iframe
          allow="microphone;"
          width="350"
          height="430"
          src="https://console.dialogflow.com/api-client/demo/embedded/66399058-a9e5-496a-9f33-3a3268e4a7b3"
          className={classes2.chat}
        ></iframe>
      )}
      {/* <select onChange={googleTranslateElementInit2}>
        <option value="">Select Language</option>
        <option value="en|af">Afrikaans</option>
        <option value="en|sq">Albanian</option>
        <option value="en|ar">Arabic</option>
        <option value="en|hy">Armenian</option>
        <option value="en|az">Azerbaijani</option>
        <option value="en|eu">Basque</option>
        <option value="en|be">Belarusian</option>
        <option value="en|bg">Bulgarian</option>
        <option value="en|ca">Catalan</option>
        <option value="en|zh-CN">Chinese (Simplified)</option>
        <option value="en|zh-TW">Chinese (Traditional)</option>
        <option value="en|hr">Croatian</option>
        <option value="en|cs">Czech</option>
        <option value="en|da">Danish</option>
        <option value="en|nl">Dutch</option>
        <option value="en|en">English</option>
        <option value="en|et">Estonian</option>
        <option value="en|tl">Filipino</option>
        <option value="en|fi">Finnish</option>
        <option value="en|fr">French</option>
        <option value="en|gl">Galician</option>
        <option value="en|ka">Georgian</option>
        <option value="en|de">German</option>
        <option value="en|el">Greek</option>
        <option value="en|ht">Haitian Creole</option>
        <option value="en|iw">Hebrew</option>
        <option value="en|hi">Hindi</option>
        <option value="en|hu">Hungarian</option>
        <option value="en|is">Icelandic</option>
        <option value="en|id">Indonesian</option>
        <option value="en|ga">Irish</option>
        <option value="en|it">Italian</option>
        <option value="en|ja">Japanese</option>
        <option value="en|ko">Korean</option>
        <option value="en|lv">Latvian</option>
        <option value="en|lt">Lithuanian</option>
        <option value="en|mk">Macedonian</option>
        <option value="en|ms">Malay</option>
        <option value="en|mt">Maltese</option>
        <option value="en|no">Norwegian</option>
        <option value="en|fa">Persian</option>
        <option value="en|pl">Polish</option>
        <option value="en|pt">Portuguese</option>
        <option value="en|ro">Romanian</option>
        <option value="en|ru">Russian</option>
        <option value="en|sr">Serbian</option>
        <option value="en|sk">Slovak</option>
        <option value="en|sl">Slovenian</option>
        <option value="en|es">Spanish</option>
        <option value="en|sw">Swahili</option>
        <option value="en|sv">Swedish</option>
        <option value="en|th">Thai</option>
        <option value="en|ur">Urdu</option>
        <option value="en|bn">Bengali</option>
        <option value="en|gu">Gujarati</option>
        <option value="en|mr">Marathi</option>
      </select> */}
      {/* <div id="google_translate_element2"></div> */}
    </div>
  );
}
