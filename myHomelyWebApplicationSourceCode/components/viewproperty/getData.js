import React, { useState, useEffect } from "react";
import axios from "axios";

export default function getData(postalCode) {
  // NeighborhoodInsights Data
  const [AgeDemographicsInsights, setAgeDemographicsInsights] = useState([]); // set to obscure variables to prevent reverse engineering of API
  const [AgeDemographicsMedian, setAgeDemographicsMedian] = useState(0);
  const [AgeDemographicsSecondary, setAgeDemographicsSecondary] = useState([]);
  const [AgeDemographicMarried, setAgeDemographicMarried] = useState(0);

  // EDUCATION

  const [
    educationDemographicsInsights,
    setEducationDemographicsInsights,
  ] = useState([]);

  // INCOME

  const [incomeDemographicInsights, setIncomeDemographicInsights] = useState(
    []
  );
  const [
    incomeDemographicInsightsAvg,
    setIncomeDemographicInsightsAvg,
  ] = useState(0);

  const [
    percentageOfFamiliesWithChildren,
    setPercentageOfFamiliesWithChildren,
  ] = useState([]);

  // EMPLOYMENT
  const [percentageEmployment, setPercentageEmployment] = useState([]);
  const [
    employmentDemographicInsightsTransportation,
    setEmploymentDemographicInsightsTransportation,
  ] = useState([]);
  const [
    employmentDemographicInsightsTime,
    setEmploymentDemographicInsightsTime,
  ] = useState([]);

  // DIVERSITY
  const [
    diversityDemographicInsights,
    setDiversityDemographicInsights,
  ] = useState([]);
  const [totalMinorityPopulation, setTotalMinorityPopulation] = useState([]);

  // OCCUPATION
  const [
    occupationDemographicInsights,
    setOccupationDemographicInsights,
  ] = useState([]);

  // DWELLING
  const [
    dwellingDemographicInsights,
    setDwellingDemographicInsights,
  ] = useState([]);

  const [
    dwellingPrivatlyOwnedInsights,
    setDwellingPrivatlyOwnedInsights,
  ] = useState([]);

  const [rpsData, setRPSData] = useState([]);

  const [rpsAvgData, setRPSAvgData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios({
      method: "POST",
      url:
        "https://5v479nrmxh.execute-api.us-east-2.amazonaws.com/v1/postalcode",
      data: {
        password:
          "$2b$12$5BfAv3A4ia8wZAVyYpyivOfrEbCA88tc6RJJIDIcig00iTIMt/vwe",
        postalcode: postalCode, // data.postalcode
      },
    })
      .then((res) => {
        if (!res.data) {
          setLoading(true);
          setError(false);
        } else if (res.data.statusCode === 200) {
          setLoading(false);
          setError(false);
          const raw = Object.values(res.data.body);
          const i = [];
          for (let j = 0; j < raw.length; j++) {
            let obj = Object.values(raw[j]);
            i.push(obj[1]);
          }
          setAgeDemographicsInsights([
            {
              id: "0-14 years old",
              label: " 0-14 years old",
              value: i[1],
            },
            {
              id: "15-29 years old",
              label: "15-29 years old",
              value: i[2],
            },
            {
              id: "30-44 years old",
              label: "30-44 years old",
              value: i[3],
            },
            {
              id: "45-59 years old",
              label: "45-59 years old",
              value: i[4],
            },
            {
              id: "60+ years old",
              label: "60+ years old",
              value: i[5],
            },
          ]);
          setAgeDemographicsMedian(i[6]);
          setAgeDemographicMarried(i[7]);
          setAgeDemographicsSecondary([
            {
              id: "Married",
              label: "Married",
              value: i[7],
            },
            {
              id: "Never Married",
              label: "Never Married",
              value: i[8],
            },
            {
              id: "Other (living common law, seperated, divorced and widowed)",
              label: "Other",
              value: i[9],
            },
          ]);

          // EDUCATION
          setEducationDemographicsInsights([
            {
              id: "No certificate, diploma or degree",
              label: "No Certificate",
              value: i[10],
            },
            {
              id: "Secondary school diploma or equivalency certificate",
              label: "Secondary School",
              value: i[11],
            },
            {
              id: "Apprenticeship or trades certificate or diploma",
              label: "Apprenticeship / Trades",
              value: i[12],
            },
            {
              id:
                "College / University / non-university certificate or diploma below bachelor level",
              label: "College",
              value: i[13],
            },
            {
              id: "Bachelor's degree",
              label: "Bachelor's degree",
              value: i[14],
            },
            {
              id:
                "University certificate or diploma above bachelor level / Master's degree",
              label: "Master's degree",
              value: i[15],
            },
            {
              id:
                "Degree in medicine, dentistry, veterinary medicine or optometry or Earned doctorate",
              label: "Medicine / Dentistry ",
              value: i[16],
            },
          ]);

          // INCOME
          setIncomeDemographicInsights([
            {
              id: "Total household income under $25,000",
              label: "Under $25,000",
              value: i[16],
            },
            {
              id: " Total household income from $25,000 to $59,999",
              label: "$25,000 - $59,999",
              value: i[17],
            },
            {
              id: "Total household income from $60,000 to $99,999",
              label: "$60,000 - $99,999",
              value: i[18],
            },
            {
              id: "Total household income $100,000 and over",
              label: "Above $100,000",
              value: i[19],
            },
          ]);
          setIncomeDemographicInsightsAvg(i[21]);

          setPercentageOfFamiliesWithChildren([
            {
              id: "Families without Children",
              label: "Families Without Kids",
              value: i[58],
            },

            {
              id: "Families with Children",
              label: "Families With Kids",
              value: i[59],
            },
          ]);

          // EMPLOYMENT
          setPercentageEmployment([
            {
              id: "Unemployed People Above The Age of 15",
              label: "Unemployed",
              value: 100 - i[28],
            },
            {
              id: "Employed People Above The Age of 15",
              label: "Employed",
              value: i[28],
            },
          ]);

          setEmploymentDemographicInsightsTransportation([
            {
              id: "Public Transit",
              label: "Public transit",
              value: i[24],
            },
            {
              id: "Walked",
              label: "Walked",
              value: i[25],
            },
            {
              id: "Bicycle",
              label: "Bicycle",
              value: i[26],
            },
            {
              id: "Other Method",
              label: "Other Method",
              value: i[27],
            },
          ]);

          setEmploymentDemographicInsightsTime([
            {
              id: "0 - 29 minutes",
              label: "0 - 29 mins",
              value: i[28],
            },
            {
              id: "30 - 59 minutes",
              label: "30 - 59 mins",
              value: i[29],
            },
            {
              id: "60 minutes +",
              label: "60 mins +",
              value: i[30],
            },
          ]);

          // DIVERSITY
          setTotalMinorityPopulation([
            {
              id: "Visible Minority",
              label: "Visible Minority",
              value: i[31],
            },
            {
              id: "Non-Minority",
              label: "Non-Minority",
              value: i[32],
            },
          ]);
          setDiversityDemographicInsights([
            {
              id: "South Asian",
              label: "South Asian",
              value: i[33],
            },
            {
              id: "Chinese",
              label: "Chinese",
              value: i[34],
            },
            {
              id: " Black",
              label: "Black",
              value: i[35],
            },
            {
              id: " Latin American",
              label: " Latin American",
              value: i[36],
            },
            {
              id: "Arab and West Asian",
              label: "Arab / West Asian",
              value: i[37],
            },
            {
              id: "Filipino, Southeast Asian, Korean, Japanese",
              label: "Southeast",
              value: i[38],
            },
            {
              id: "Others",
              label: "Others",
              value: i[39],
            },
          ]);

          // OCCUPATION
          setOccupationDemographicInsights([
            {
              id: "Management Occupations",
              label: "Management Occupations",
              value: i[40],
            },
            {
              id: "Business, finance and administration occupations",
              label: "Business / Finance",
              value: i[41],
            },
            {
              id: " Natural and applied sciences and related occupations",
              label: "Natural / Applied Sciences",
              value: i[42],
            },
            {
              id: "Health Occupations",
              label: "Health occupations",
              value: i[43],
            },
            {
              id:
                "Education, Law and Social, Community and Government services",
              label: "Community / Government",
              value: i[44],
            },
            {
              id: "Art, Culture, Recreation and Sport",
              label: "Art / Culture / Recreation",
              value: i[45],
            },
            {
              id: "Sales and service occupations",
              label: "Sales / Service",
              value: i[46],
            },
            {
              id:
                "Trades, Transport and Equipment Operators and related occupations",
              label: "Trades / Transport",
              value: i[47],
            },
            {
              id:
                "Natural resources, agriculture and related production occupations",
              label: "Resources / Agriculture",
              value: i[48],
            },
            {
              id: "Manufacturing and Utilities",
              label: "Manufacturing and Utilities",
              value: i[49],
            },
          ]);

          // DWELLING
          setDwellingDemographicInsights([
            {
              id: "Structural Type: Single-Detached House",
              label: "Single-Detached House",
              value: i[50],
            },
            {
              id: "Structural Type: Semi-Detached House",
              label: "Semi-Detached House",
              value: i[51],
            },
            {
              id: "Structural Type: Row House",
              label: "Row House",
              value: i[52],
            },
            {
              id: "Structural Type: Apartment, Detached duplex",
              label: "Apartment / Detached duplex",
              value: i[53],
            },
            {
              id: "Other (single-attached house or Movable dewlling)",
              label: "Other",
              value: i[54],
            },
          ]);

          // PRIVATELY OWNED
          setDwellingPrivatlyOwnedInsights([
            {
              id: "Private Households Owned",
              label: "Households Owned",
              value: i[55],
            },
            {
              id: "Private Households Rented",
              label: "Households Rented",
              value: 100 - i[55],
            },
          ]);

          // RPS
          setRPSData([i[60], i[61], i[62], i[63], i[64]]);

          setRPSAvgData([i[80], i[81], i[82], i[83]]);
        } else if (res.data.statusCode === 404) {
          setLoading(false);
          setError(true);
        }
      })
      .catch((err) => console.log(err));
  }, [postalCode]);

  if (loading) {
    return {
      error: error,
      loading: loading,
    };
  }
  if (error)
    return {
      error: error,
    };
  return {
    error: false,
    loading: false,
    marriageInsights: {
      chart: AgeDemographicsSecondary,
      median: AgeDemographicMarried,
    },
    ageInsights: {
      chart: AgeDemographicsInsights,
      median: AgeDemographicsMedian,
    },
    educationInsights: educationDemographicsInsights,
    occupationInsights: occupationDemographicInsights,
    incomeInsights: {
      chart: incomeDemographicInsights,
      avg: incomeDemographicInsightsAvg,
      familiesWithChildren: percentageOfFamiliesWithChildren,
    },
    employmentInsights: {
      employed: percentageEmployment,
      commuteTimes: employmentDemographicInsightsTime,
      transportation: employmentDemographicInsightsTransportation,
    },
    dwelling: {
      privatelyOwned: dwellingPrivatlyOwnedInsights,
      structuralType: dwellingDemographicInsights,
    },
    diversity: {
      chart: diversityDemographicInsights,
      totalMinority: totalMinorityPopulation,
    },
    proximity: {
      data: rpsData,
      avg: rpsAvgData,
    },
  };
}
