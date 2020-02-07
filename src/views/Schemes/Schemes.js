import React from "react";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import LibraryBooks from "@material-ui/icons/LibraryBooks";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import CardIcon from "components/Card/CardIcon.js";
import { useGetHttp } from "../../Hooks/getHttp";

const useStyles = makeStyles(styles);

const schemes = [
  {
    legend: "Agriculture marketing",
    ideas: [
      {
        title: "National Agriculture Market (e-NAM)",
        link: "http://enam.gov.in/web/",
        content:
          "National Agriculture Market gives an e-marketing platform at the national level and support creation of infrastructure to enable e-marketing. This new market process is revolutionizing agriculture markets by guaranteeing better price discovery. It also brings in transparency & competition to enable cultivators to get improved remuneration for their produce moving towards ‘One Nation One Market’. "
      },
      {
        title: "Integrated Scheme for Agricultural Marketing(ISAM)",
        link: "http://agricoop.gov.in/sites/default/files/finalopguidelines.pdf",
        content:
          "The objective of this scheme is to promote creation of agricultural marketing infrastructure by providing backend subsidy support to State, cooperative and private sector investments to promote creation of scientific storage capacity and to promote pledge financing to increase farmers’ income;"
      }
    ]
  },
  {
    legend: "Irrigation",
    ideas: [
      {
        title: "Neem Coated Urea (NCU)",
        link: "https://www.nationalfertilizers.com/index.php?option=com_content&view=article&id=139&Itemid=158&lang=en",
        content:
          "It was launched on 1st July, 2015 with the motto of ‘Har Khet Ko Paani’ for providing end-to end solutions in irrigation supply chain, viz. water sources, distribution network and farm level applications. "
      },
      {
        title: "Micro Irrigation Fund (MIF) ",
        link: "https://pmksy.gov.in/microirrigation/Archive/Guideline_MIF03082018.pdf",
        content:
          "A dedicated MIF created with NABARD has been approved with an initial corpus of Rs. 5000 crore (Rs. 2000 crore for 2018-19 & Rs. 3000 crore for 2019-20) for encouraging public and private investments in Micro irrigation. The main objective of the fund is to facilitate the States in mobilizing the resources for expanding coverage of Micro Irrigation. "
      },
      {
        title: "Rainfed Area Development Programme (RADP)",
        link: "http://agricoop.nic.in/sites/default/files/RADP5913.pdf",
        content:
          "Rainfed Area Development Programme was started as a sub-scheme under the Rashtriya Krishi Vikas Yojana (RKVY). The aim was to improve quality of life of farmers’ especially, small & marginal farmers by giving a complete package of activities to maximize farm returns. It also help in increasing agricultural productivity of rainfed areas in a sustainable way by adopting suitable farming system based approaches. It minimises the adverse impact of possible crop failure because of drought, flood or un-even rainfall distribution through diversified & composite farming system. The programme also help in increasing farmer’s income & livelihood support for reduction of poverty in Rainfed areas."
      },
      {
        title: "Accelerated Fodder Development Programme",
        link: "http://nfsm.gov.in/Guidelines/Acceler150311.pdf",
        content:
          "Pursuant to announcement in Union Budget, a schme on ‘Accelerated Fodder Development Programme (AFDP)’ was launched in the year 2011-12 through a window of Rashtriya Krishi Vikas Yojna (RKVY). It aims at enhancing availability of green and dry fodder throughout the year and also to mitigate shortage of fodder caused by the natural calamities like droughts and floods."
      }
    ]
  },
  {
    legend: "Fund Management",
    ideas: [
      {
        title: "PM-Kisan Scheme",
        link: "www.pmkisan.gov.in/",
        content:
          "Pradhan Mantri Kisan Samman Nidhi Yojana is an initiative of the Government wherein 120 million small and marginal farmers of India with less than two hectares of landholding will get up to Rs. 6,000 per year as a minimum income support. PM-Kisan scheme has become operational since 1st December 2018. Under this scheme, cultivators will get Rs. 6000 in three installments. For more details check www.pmkisan.gov.in/"
      },
      {
        title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        link: "pmfby.gov.in/",
        content:
          "PMFBY is an actuarial premium based scheme under which farmer has to pay maximum premium of 2% for Kharif, 1.5% for Rabi food & oilseed crops and 5% for annual commercial/horticultural crops and remaining part of the actuarial/bidded premium is shared equally by the Centre and State Government."
      },
      {
        title: "Pradhan Mantri Kisan Maandhan yojana",
        link: "pmkmy.gov.in",
        content:
          "Prime Minister Narendra Modi launched a pension scheme for the small & marginal farmers of India last September. Under this pension scheme about 5 crore marginalised farmers will get a minimum pension of Rs 3000 / month on attaining the age of 60. Those who fall in the age group of 18 - 40 years will be eligible to apply for the scheme. Under this scheme, the farmers will be required to make a monthly contribution of Rs 55 to 200, depending on their age of entry, in the Pension Fund till they reach the retirement date, 60 years. The Government will make an equal contribution of the same amount in the pension fund for the cultivators. For more details click pmkmy.gov.in/"
      },
      {
        title: "Dairy Entrepreneurship Development Scheme",
        link: "https://krishijagran.com/animal-husbandry/dairy-entrepreneurship-development-scheme-how-farmers-can-get-loans-up-to-rs-20-lakh-under-this-scheme/",
        content:
          "The Department of Animal Husbandry, Dairying & Fisheries (DAHD&F) had launched a pilot scheme called as “Venture Capital Scheme for Dairy & Poultry” in the year 2005-06.  The scheme aimed at extending support for setting up small dairy farms and other components to bring structural changes in the dairy sector. Later on, DAHD&F changed its name to 'Dairy Entrepreneurship Development Scheme' (DEDS) & the revised scheme came into operation with effect from 1st September, 2010."
      }
    ]
  },
  {
    legend: "Nutrient Management",
    ideas: [
      {
        title: "Soil Health Card Scheme",
        link: "soilhealth.dac.gov.in",
        content:
          "Soil health card scheme was launched in the year 2015 in order to help the State Governments to issue Soil Health Cards to farmers of India.  The Soil Health Cards gives information to farmers on nutrient status of their soil along with recommendation on appropriate dosage of nutrients to be applied for improving soil health and its fertility. Check for more information soilhealth.dac.gov.in/"
      },
      {
        title: "Paramparagat Krishi Vikas Yojana (PKVY)",
        link: "https://krishijagran.com/agriculture-world/how-farmers-can-get-rs-50000-per-hectare-for-organic-farming-under-paramparagat-krishi-vikas-yojana/",
        content:
          "Paramparagat Krishi Vikas Yojana is implemented with the aim to promote organic cultivation in India. To improve soil health as well as organic matter content and to boost the net income of the farmer so as to realize premium prices.  Under Paramparagat Krishi Vikas Yojana, an area of 5 lakh acre is targeted to be covered though 10,000 clusters of 50 acre each, from 2015-16 to 2017-18. "
      }
    ]
  }
];

export default function Schemes() {
  const classes = useStyles();

  const [messageGet, fetchGetCall] = useGetHttp();
  const [avgValues, setAvgValues] = React.useState();

  React.useEffect(() => {
    fetchGetCall(`/graph/dealer`);
    setAvgValues(messageGet);
    console.log(avgValues);
  }, []);

  return (
    <div>
      {schemes.map(item => (
        // eslint-disable-next-line react/jsx-key
        <div>
          <h4 style={{fontWeight: 400, color: 'black'}}>{item.legend}</h4>
          <GridContainer>
          {item.ideas.map(sample => (
            // eslint-disable-next-line react/jsx-key
              <GridItem xs={12} sm={6}>
                <Card style={{minHeight: 250}}>
                  <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                      <LibraryBooks />
                    </CardIcon>
                    <p
                      className={classes.cardCategory}
                      style={{
                        fontSize: "18px!important",
                        color: "black",
                        fontWeight: 600
                      }}
                    >
                      {sample.title}
                    </p>
                  </CardHeader>
                  <CardBody>
                    {sample.content}
                    <br />
                    <b>Read More:</b> <a href={sample.link}>{sample.link}</a>
                  </CardBody>
                </Card>
              </GridItem>
          ))}
          </GridContainer>
        </div>
      ))}
    </div>
  );
}
