# -- Setup
{
  Code = "Code/"
  Data = "Data/"
  Model = "Model/"
  Score = "Score/"
  
  require(dplyr)
  require(data.table)
#   require(fastDummies)
#   require(lubridate)
#   require(stringr)
#   require(DescTools)
#   require(readxl)
#   require(bit64)
#   require(vcd)
#   require(caret)
#   require(ranger)
#   require(randomForest)
#   require(xgboost)
  require(gbm)
  require(e1071)
  require(MASS)
}

# -- Load Pre-trained models
{
  mAB = readRDS("Model/modelAB202011.RDS")
  mATL = readRDS("Model/modelATL202011.RDS")
  mBC = readRDS("Model/modelBC202011.RDS")
  mON = readRDS("Model/modelON202011.RDS")
  mQC = readRDS("Model/modelQC202011.RDS")
  mSKMB = readRDS("Model/modelSKMB202011.RDS")
}

# -- Load the datasets

{
fullManifold = readRDS("Data/fullManifold2020.RDS")
fullRPS = readRDS("Data/fullRPS2020.RDS")
lookupCREA = readRDS("Data/cleanCREALookup2020.RDS")
crea = readRDS("Data/cleanCREAData2020.RDS")
econNat = readRDS("Data/cleanEconomic2020National.RDS")
econProv = readRDS("Data/cleanEconomic2020Province.RDS")
multiplier = readRDS("Data/202101modelAdjustmentRawData.RDS")

}

#* @filter cors
cors <- function(res) {
    res$setHeader("Access-Control-Allow-Origin", "*")
    plumber::forward()
}

# -- Predict house price
#* @serializer unboxedJSON
#* @post /predict_house_price
function(postalCode, propertyStyle ,fsa, province , propertyAge , sizeBuild , sizeLot , propertyTax){
			 
  obs = data.frame('postalCode' = c(postalCode),
                   'propertyStyle' = as.integer(c(propertyStyle)),
                   'fsa' = c(substr(postalCode, 1, 3)),
                   'province' = c(province),
                   'propertyAge' = as.integer(c(propertyAge)),
                   'sizeBuild' = as.integer(c(sizeBuild)),
                   'sizeLot' = as.integer(c(sizeLot)),
                   'propertyTax' = as.integer(c(propertyTax))
				   ,  stringsAsFactors = FALSE
                 )
  
#  fullManifold = readRDS("Data/fullManifold2020.RDS")
  manifold = fullManifold[postalCode==obs$postalCode,][.N,-c(1,2,69)] 

#  fullRPS = readRDS("Data/fullRPS2020.RDS")
  rps = fullRPS[postalCode==obs$postalCode & propertyStyle==obs$propertyStyle,][.N,-c(1,2,26,27)] 

#  lookupCREA = readRDS("Data/cleanCREALookup2020.RDS")
#  crea = readRDS("Data/cleanCREAData2020.RDS")
  lookup = lookupCREA[FSALDU==obs$postalCode][.N,c(6)]
  creaHPI = crea[lookup$CREA_Region==CREA_Region][.N,c(4)]

#  econNat = readRDS("Data/cleanEconomic2020National.RDS")
#  econProv = readRDS("Data/cleanEconomic2020Province.RDS")

  econNational = econNat[.N,c(2:4)]

  econProvincial = econProv[Region==obs$province][.N,3:6]

  obs = cbind(obs,creaHPI,econNational,econProvincial,rps,manifold)

  obs = obs[,-c(1,3:4)]

  med = exp(predict.gbm(mON,obs))
    
  final = data.frame('postalCode' = c(postalCode),
                   'fsa' = c(substr(postalCode, 1, 3)),
                   'province' = c(province)
                          ,stringsAsFactors = FALSE)

  fact = multiplier[postalCode==final$postalCode & fsa==final$fsa,]$factor
    
  if (fact == 1) {
      adjusted_house_price = med *1.25
      low = 0.85*adjusted_house_price
      high = 1.35*adjusted_house_price
  } else {
      adjusted_house_price = med*1.1
      low = 0.75*adjusted_house_price
      high = 1.15*adjusted_house_price
  }  

#   response = data.frame('low' = c(ceiling(low)), 'med' = c(ceiling(med)), 'high' = c(ceiling(high)))
#   return(list(ceiling(low),ceiling(med),ceiling(high)))
#   return(jsonlite::toJSON(as.list(response), auto_unbox = TRUE))
  response <- list( 'low' = ceiling(low),
          'med' = ceiling(adjusted_house_price),
          'high' = ceiling(high))
#   return(jsonlite::toJSON( response , auto_unbox = TRUE))
  return(response) 
}



