# -- Clean
rm(list=ls())
gc()

# -- Setup
{
  setwd("C:/Users/TA/Desktop/")
  Code = "Code/"
  Data = "Data/"
  Model = "Model/"
  Score = "Score/"
  
  require(dplyr)
  require(data.table)
  require(fastDummies)
  require(lubridate)
  require(stringr)
  require(DescTools)
  require(readxl)
  require(bit64)
  require(vcd)
  require(caret)
  require(ranger)
  require(randomForest)
  require(xgboost)
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

# -- Predict house price
{
  obs = read.csv("Model/testPropertyON.csv"); obs = obs[,c(1:8)] # colnames(obs) = c(paste0("var", 1:ncol(obs)))

  fullManifold = readRDS("Data/fullManifold2020.RDS")
  manifold = fullManifold[postalCode==obs$postalCode,][.N,-c(1,2,69)] 

  fullRPS = readRDS("Data/fullRPS2020.RDS")
  rps = fullRPS[postalCode==obs$postalCode & propertyStyle==obs$propertyStyle,][.N,-c(1,2,26,27)] 
  
  lookupCREA = readRDS("Data/cleanCREALookup2020.RDS")
  crea = readRDS("Data/cleanCREAData2020.RDS")
  lookup = lookupCREA[FSALDU==obs$postalCode][.N,c(6)]
  creaHPI = crea[lookup$CREA_Region==CREA_Region][.N,c(4)]
  
  econNat = readRDS("Data/cleanEconomic2020National.RDS")
  econProv = readRDS("Data/cleanEconomic2020Province.RDS")
  econNational = econNat[.N,c(2:4)]
  econProvincial = econProv[Region==obs$province][.N,3:6]
  
  obs = cbind(obs,creaHPI,econNational,econProvincial,rps,manifold)
  obs = obs[,-c(1,3:4)]
  
  colnames(obs)
  
  ceiling(exp(predict.gbm(mON,obs))) # 680000
} 
